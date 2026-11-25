import {
  createHash,
  randomBytes,
  randomUUID,
  timingSafeEqual,
} from "node:crypto";
import postgres from "postgres";

const MAX_CALLS = 5;
const VAPI_URL = "https://api.vapi.ai";
const TOKEN_PATTERN = /^[A-Za-z0-9_-]{43}$/;
const UUID_PATTERN = /^[a-f0-9]{8}-(?:[a-f0-9]{4}-){3}[a-f0-9]{12}$/i;

type Invite = {
  calls_used: number;
  active: boolean;
  reservation_id: string | null;
  vapi_call_id: string | null;
};

type DemoState = "ready" | "invalid" | "busy" | "exhausted";
type DemoCall = { url: string; roomToken?: string };

let database: ReturnType<typeof postgres> | undefined;

function getConfig() {
  const databaseUrl = process.env.DEMO_DATABASE_URL;
  const key = process.env.VAPI_PRIVATE_API_KEY;
  const assistantId = process.env.VAPI_DEMO_ASSISTANT_ID;
  if (!databaseUrl || !key || !assistantId || !UUID_PATTERN.test(assistantId)) {
    return null;
  }
  database ??= postgres(databaseUrl, {
    max: 2,
    prepare: false,
    connect_timeout: 5,
    idle_timeout: 20,
  });
  return { sql: database, key, assistantId };
}

type Config = NonNullable<ReturnType<typeof getConfig>>;

function hashToken(token: string) {
  return createHash("sha256").update(token).digest();
}

export async function administerDemo(
  authorization: string,
  action: "create" | "revoke",
  inviteId: unknown
) {
  const secret = process.env.DEMO_ADMIN_TOKEN;
  if (
    !secret ||
    secret.length < 32 ||
    !timingSafeEqual(hashToken(authorization), hashToken(`Bearer ${secret}`))
  ) {
    return { status: 401, body: { error: "Código de gestão inválido." } };
  }

  const config = getConfig();
  if (!config)
    return {
      status: 503,
      body: { error: "A demonstração ainda não está configurada." },
    };
  const { sql } = config;

  if (action === "revoke") {
    if (typeof inviteId !== "string" || !UUID_PATTERN.test(inviteId)) {
      return {
        status: 400,
        body: { error: "Indique o ID de gestão do convite." },
      };
    }
    const [invite] = await sql`
      UPDATE linea_demo_invites SET revoked_at = now()
      WHERE id = ${inviteId} AND revoked_at IS NULL RETURNING id
    `;
    return invite
      ? { status: 200, body: { revoked: true } }
      : {
          status: 404,
          body: { error: "Convite inexistente ou já desativado." },
        };
  }

  const token = randomBytes(32).toString("base64url");
  const tokenHash = hashToken(token).toString("hex");
  const id = randomUUID();
  const [invite] = await sql<{ expires_at: Date }[]>`
    INSERT INTO linea_demo_invites (id, token_hash) VALUES (${id}, ${tokenHash})
    RETURNING expires_at
  `;
  return {
    status: 201,
    body: { token, id, expiresAt: invite.expires_at.toISOString() },
  };
}

function vapiRequest(key: string, endpoint: string, options: RequestInit = {}) {
  return fetch(`${VAPI_URL}${endpoint}`, {
    ...options,
    cache: "no-store",
    signal: AbortSignal.timeout(10_000),
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
  });
}

async function getInvite({ sql, key }: Config, hash: string) {
  const [invite] = await sql<Invite[]>`
    SELECT calls_used, reservation_id, vapi_call_id,
           (revoked_at IS NULL AND expires_at > now()) AS active
    FROM linea_demo_invites WHERE token_hash = ${hash}
  `;
  if (!invite?.active) return { state: "invalid", remaining: 0 } as const;

  const remaining = MAX_CALLS - invite.calls_used;
  if (remaining === 0) return { state: "exhausted", remaining } as const;
  if (!invite.reservation_id) return { state: "ready", remaining } as const;
  if (!invite.vapi_call_id) return { state: "busy", remaining } as const;

  // Only the provider can confirm the last call ended. Leaving a tab is not authoritative.
  const response = await vapiRequest(key, `/call/${invite.vapi_call_id}`);
  if (!response.ok || (await response.json()).status !== "ended") {
    return { state: "busy", remaining } as const;
  }
  const [cleared] = await sql`
    UPDATE linea_demo_invites SET reservation_id = NULL, vapi_call_id = NULL
    WHERE token_hash = ${hash} AND reservation_id = ${invite.reservation_id}
    RETURNING token_hash
  `;
  return { state: cleared ? "ready" : "busy", remaining } as const;
}

function parseDemoCall(value: unknown): DemoCall | null {
  if (!value || typeof value !== "object") return null;
  const { webCallUrl, transport } = value as {
    webCallUrl?: unknown;
    transport?: { callUrl?: unknown; callToken?: unknown };
  };
  const roomUrl = webCallUrl ?? transport?.callUrl;
  if (typeof roomUrl !== "string") return null;
  const url = new URL(roomUrl);
  if (url.protocol !== "https:" || !url.hostname.endsWith(".daily.co"))
    return null;
  const roomToken = transport?.callToken;
  return {
    url: url.href,
    roomToken: typeof roomToken === "string" ? roomToken : undefined,
  };
}

export async function handleDemoRequest(
  token: string,
  start: boolean
): Promise<{
  state: DemoState | "unavailable";
  remaining?: number;
  call?: DemoCall;
}> {
  if (!TOKEN_PATTERN.test(token)) return { state: "invalid", remaining: 0 };
  const config = getConfig();
  if (!config) return { state: "unavailable" };

  const { sql, key, assistantId } = config;
  const hash = hashToken(token).toString("hex");
  const status = await getInvite(config, hash);
  if (!start || status.state !== "ready") return status;

  // Claim both the use and the concurrency slot in one statement.
  const reservationId = randomUUID();
  const [reservation] = await sql<{ calls_used: number }[]>`
    UPDATE linea_demo_invites
    SET calls_used = calls_used + 1, reservation_id = ${reservationId}
    WHERE token_hash = ${hash}
      AND revoked_at IS NULL AND expires_at > now()
      AND calls_used < ${MAX_CALLS} AND reservation_id IS NULL
    RETURNING calls_used
  `;
  if (!reservation) {
    const current = await getInvite(config, hash);
    return {
      ...current,
      state: current.state === "ready" ? "busy" : current.state,
    };
  }

  const remaining = MAX_CALLS - reservation.calls_used;
  const response = await vapiRequest(key, "/call/web", {
    method: "POST",
    body: JSON.stringify({
      assistantId,
      assistantOverrides: { maxDurationSeconds: 120 },
      roomDeleteOnUserLeaveEnabled: true,
    }),
  });
  if (!response.ok) {
    if ([400, 401, 403, 404, 422, 429].includes(response.status)) {
      await sql`
        UPDATE linea_demo_invites SET calls_used = calls_used - 1, reservation_id = NULL
        WHERE token_hash = ${hash} AND reservation_id = ${reservationId}
      `;
      return { state: "unavailable", remaining: remaining + 1 };
    }
    // A timeout or upstream error can mean that Vapi accepted the call.
    // Keep the claim until its outcome is known rather than creating a second call.
    return { state: "unavailable", remaining };
  }
  const payload = await response.json();
  if (typeof payload?.id !== "string" || !UUID_PATTERN.test(payload.id)) {
    return { state: "unavailable", remaining };
  }
  await sql`
    UPDATE linea_demo_invites SET vapi_call_id = ${payload.id}
    WHERE token_hash = ${hash} AND reservation_id = ${reservationId}
  `;
  const call = parseDemoCall(payload);
  return call
    ? { state: "ready", remaining, call }
    : { state: "unavailable", remaining };
}
