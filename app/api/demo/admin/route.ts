import { NextResponse } from "next/server";
import { administerDemo } from "@/lib/demo";

export const runtime = "nodejs";

const headers = { "Cache-Control": "no-store" };

export async function POST(request: Request) {
  const data = await request.json().catch(() => null);
  if (data?.action !== "create" && data?.action !== "revoke") {
    return NextResponse.json(
      { error: "Operação inválida." },
      { status: 400, headers }
    );
  }

  try {
    const result = await administerDemo(
      request.headers.get("authorization") ?? "",
      data.action === "create"
        ? { action: "create", callLimit: data.callLimit }
        : { action: "revoke", id: data.id }
    );
    return NextResponse.json(result.body, { status: result.status, headers });
  } catch {
    return NextResponse.json(
      { error: "A gestão de convites está temporariamente indisponível." },
      { status: 503, headers }
    );
  }
}
