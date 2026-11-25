import {
  createHash,
  createHmac,
  randomBytes,
  randomUUID,
  timingSafeEqual,
} from "node:crypto";
import postgres from "postgres";
import { siteUrl } from "./site-url";

const MAX_DURATION_SECONDS = 180;
const VAPI_URL = "https://api.vapi.ai";
const TOKEN_PATTERN = /^[A-Za-z0-9_-]{43}$/;
const UUID_PATTERN = /^[a-f0-9]{8}-(?:[a-f0-9]{4}-){3}[a-f0-9]{12}$/i;

type Invite = {
  calls_used: number;
  call_limit: number;
  active: boolean;
  reservation_id: string | null;
  vapi_call_id: string | null;
};

type DemoState = "ready" | "invalid" | "busy" | "exhausted";
type DemoCall = { url: string; roomToken?: string };

export type DemoInviteSummary = {
  id: string;
  clinicName: string | null;
  callLimit: number;
  remaining: number;
  expiresAt: string;
};

let database: ReturnType<typeof postgres> | undefined;

function getConfig() {
  const databaseUrl = process.env.DEMO_DATABASE_URL;
  const key = process.env.VAPI_PRIVATE_API_KEY?.trim();
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

function matchesAdminToken(authorization: string, secret: string) {
  return timingSafeEqual(
    hashToken(authorization),
    hashToken(`Bearer ${secret}`)
  );
}

export async function administerDemo(
  authorization: string,
  operation:
    | { action: "create"; callLimit: unknown; clinicName: unknown }
    | { action: "revoke"; id: unknown }
    | { action: "list" }
) {
  const secret = process.env.DEMO_ADMIN_TOKEN?.trim();
  if (!secret || secret.length < 32) {
    return {
      status: 503,
      body: {
        error: "O código de gestão ainda não está configurado neste ambiente.",
      },
    };
  }
  if (!matchesAdminToken(authorization, secret)) {
    return { status: 401, body: { error: "Código de gestão inválido." } };
  }

  const config = getConfig();
  if (!config)
    return {
      status: 503,
      body: { error: "A demonstração ainda não está configurada." },
    };
  const { sql } = config;

  if (operation.action === "list") {
    const invites = await sql<DemoInviteSummary[]>`
      SELECT id, clinic_name AS "clinicName", call_limit AS "callLimit",
             greatest(call_limit - calls_used, 0) AS remaining, expires_at AS "expiresAt"
      FROM linea_demo_invites
      WHERE revoked_at IS NULL AND expires_at > now() AND calls_used < call_limit
      ORDER BY expires_at DESC, id
    `;
    return { status: 200, body: { invites } };
  }

  if (operation.action === "revoke") {
    const inviteId = operation.id;
    if (typeof inviteId !== "string" || !UUID_PATTERN.test(inviteId)) {
      return {
        status: 400,
        body: { error: "Selecione o convite a desativar." },
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

  const { callLimit } = operation;
  if (callLimit !== 1 && callLimit !== 3) {
    return { status: 400, body: { error: "Escolhe uma ou três tentativas." } };
  }
  const clinicName =
    typeof operation.clinicName === "string" ? operation.clinicName.trim() : "";
  if (!clinicName || clinicName.length > 120 || clinicName.includes("\0")) {
    return {
      status: 400,
      body: { error: "Indique o nome da clínica (até 120 caracteres)." },
    };
  }
  const token = randomBytes(32).toString("base64url");
  const tokenHash = hashToken(token).toString("hex");
  const id = randomUUID();
  const [invite] = await sql<{ expires_at: Date }[]>`
    INSERT INTO linea_demo_invites (id, token_hash, call_limit, clinic_name)
    VALUES (${id}, ${tokenHash}, ${callLimit}, ${clinicName})
    RETURNING expires_at
  `;
  return {
    status: 201,
    body: {
      token,
      id,
      clinicName,
      callLimit,
      remaining: callLimit,
      expiresAt: invite.expires_at.toISOString(),
    },
  };
}

function vapiRequest(key: string, endpoint: string, options: RequestInit = {}) {
  const headers = new Headers(options.headers);
  headers.set("Authorization", `Bearer ${key}`);
  headers.set("Content-Type", "application/json");
  return fetch(`${VAPI_URL}${endpoint}`, {
    ...options,
    cache: "no-store",
    signal: AbortSignal.timeout(10_000),
    headers,
  });
}

function signWebCallToken(
  key: string,
  orgId: string,
  assistantId: string,
  origin: string
) {
  const header = Buffer.from(
    JSON.stringify({ alg: "HS256", typ: "JWT" })
  ).toString("base64url");
  const payload = Buffer.from(
    JSON.stringify({
      orgId,
      exp: Math.floor(Date.now() / 1000) + 120,
      token: {
        tag: "public",
        restrictions: {
          allowedOrigins: [origin],
          allowedAssistantIds: [assistantId],
        },
      },
    })
  ).toString("base64url");
  const unsigned = `${header}.${payload}`;
  const signature = createHmac("sha256", key)
    .update(unsigned)
    .digest("base64url");
  return `${unsigned}.${signature}`;
}

function classifyVapiFailure(status: number, message: string) {
  if (
    status === 402 ||
    /insufficient (?:credits|funds|balance)|payment|billing|credit balance/i.test(
      message
    )
  ) {
    return { status, reason: "billing" };
  }
  if (
    /assistant.{0,60}(?:not found|does not exist|could not be found)|(?:not found|could not find).{0,30}assistant/i.test(
      message
    )
  ) {
    return { status, reason: "assistant_not_found" };
  }
  if (status === 401 || status === 403) {
    return { status, reason: "authorization" };
  }
  if (status === 429) return { status, reason: "rate_limit" };
  if (/transport|daily/i.test(message)) return { status, reason: "transport" };
  if (/maxDurationSeconds|assistantOverrides/i.test(message))
    return { status, reason: "assistant_overrides" };
  return {
    status,
    reason: status < 500 ? "request_rejected" : "provider_error",
  };
}

async function vapiDiagnostic(
  response: Response,
  key: string,
  authorization: string
) {
  const error = await response
    .clone()
    .json()
    .catch(() => null);
  const parts: unknown[] = Array.isArray(error?.message)
    ? error.message
    : [error?.message];
  const message =
    parts.filter(part => typeof part === "string").join(" ") ||
    (await response.text().catch(() => ""));
  const failure = classifyVapiFailure(response.status, message);
  console.warn("Vapi rejected Linea demo request", failure);
  const secret = process.env.DEMO_ADMIN_TOKEN?.trim();
  if (
    !secret ||
    secret.length < 32 ||
    !matchesAdminToken(authorization, secret)
  )
    return {};
  return {
    providerFailure: {
      ...failure,
      detail:
        message
          .split(key)
          .join("[redacted]")
          .replace(/https?:\/\/\S+/gi, "[url]")
          .replace(/[a-z0-9_.-]{24,}/gi, "[identifier]")
          .replace(/\s+/g, " ")
          .trim()
          .slice(0, 400) || undefined,
    },
  };
}

async function getInvite({ sql, key }: Config, hash: string) {
  const [invite] = await sql<Invite[]>`
    SELECT calls_used, call_limit, reservation_id, vapi_call_id,
           (revoked_at IS NULL AND expires_at > now()) AS active
    FROM linea_demo_invites WHERE token_hash = ${hash}
  `;
  if (!invite?.active) return { state: "invalid", remaining: 0 } as const;

  const allowance = {
    remaining: Math.max(0, invite.call_limit - invite.calls_used),
    limit: invite.call_limit,
  };
  if (allowance.remaining === 0)
    return { state: "exhausted", ...allowance } as const;
  if (!invite.reservation_id) return { state: "ready", ...allowance } as const;
  if (!invite.vapi_call_id) return { state: "busy", ...allowance } as const;

  // Only the provider can confirm the last call ended. Leaving a tab is not authoritative.
  const response = await vapiRequest(key, `/call/${invite.vapi_call_id}`);
  if (!response.ok || (await response.json()).status !== "ended") {
    return { state: "busy", ...allowance } as const;
  }
  const [cleared] = await sql`
    UPDATE linea_demo_invites SET reservation_id = NULL, vapi_call_id = NULL
    WHERE token_hash = ${hash} AND reservation_id = ${invite.reservation_id}
    RETURNING token_hash
  `;
  return { state: cleared ? "ready" : "busy", ...allowance } as const;
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
  start: boolean,
  authorization = ""
): Promise<{
  state: DemoState | "unavailable";
  remaining?: number;
  limit?: number;
  call?: DemoCall;
  providerFailure?: { status: number; reason: string; detail?: string };
}> {
  if (!TOKEN_PATTERN.test(token)) return { state: "invalid", remaining: 0 };
  const config = getConfig();
  if (!config) return { state: "unavailable" };

  const { sql, key, assistantId } = config;
  const hash = hashToken(token).toString("hex");
  const status = await getInvite(config, hash);
  if (!start || status.state !== "ready") return status;

  const assistant = await vapiRequest(key, `/assistant/${assistantId}`);
  if (!assistant.ok) {
    return {
      ...status,
      state: "unavailable",
      ...(await vapiDiagnostic(assistant, key, authorization)),
    };
  }
  const { orgId } = await assistant.json();
  if (typeof orgId !== "string" || !UUID_PATTERN.test(orgId)) {
    console.warn("Vapi did not return the Linea assistant organization");
    return { ...status, state: "unavailable" };
  }
  const origin = new URL(siteUrl).origin;
  const webToken = signWebCallToken(key, orgId, assistantId, origin);

  // Claim both the use and the concurrency slot in one statement.
  const reservationId = randomUUID();
  const [reservation] = await sql<Pick<Invite, "calls_used" | "call_limit">[]>`
    UPDATE linea_demo_invites
    SET calls_used = calls_used + 1, reservation_id = ${reservationId}
    WHERE token_hash = ${hash}
      AND revoked_at IS NULL AND expires_at > now()
      AND calls_used < call_limit AND reservation_id IS NULL
    RETURNING calls_used, call_limit
  `;
  if (!reservation) {
    const current = await getInvite(config, hash);
    return {
      ...current,
      state: current.state === "ready" ? "busy" : current.state,
    };
  }

  const limit = reservation.call_limit;
  const remaining = limit - reservation.calls_used;
  const response = await vapiRequest(webToken, "/call/web", {
    method: "POST",
    headers: { Origin: origin },
    body: JSON.stringify({
      assistantId,
      assistantOverrides: { maxDurationSeconds: MAX_DURATION_SECONDS },
      roomDeleteOnUserLeaveEnabled: true,
    }),
  });
  if (!response.ok) {
    const diagnostic = await vapiDiagnostic(response, key, authorization);
    if ([400, 401, 402, 403, 404, 422, 429].includes(response.status)) {
      await sql`
        UPDATE linea_demo_invites SET calls_used = calls_used - 1, reservation_id = NULL
        WHERE token_hash = ${hash} AND reservation_id = ${reservationId}
      `;
      return {
        state: "unavailable",
        remaining: remaining + 1,
        limit,
        ...diagnostic,
      };
    }
    // A timeout or upstream error can mean that Vapi accepted the call.
    // Keep the claim until its outcome is known rather than creating a second call.
    return { state: "unavailable", remaining, limit, ...diagnostic };
  }
  const payload = await response.json();
  if (typeof payload?.id !== "string" || !UUID_PATTERN.test(payload.id)) {
    return { state: "unavailable", remaining, limit };
  }
  await sql`
    UPDATE linea_demo_invites SET vapi_call_id = ${payload.id}
    WHERE token_hash = ${hash} AND reservation_id = ${reservationId}
  `;
  const call = parseDemoCall(payload);
  return call
    ? { state: "ready", remaining, limit, call }
    : { state: "unavailable", remaining, limit };
}
