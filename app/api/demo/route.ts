import { NextResponse } from "next/server";
import { handleDemoRequest } from "@/lib/demo";

export const runtime = "nodejs";
export const maxDuration = 30;

const headers = { "Cache-Control": "no-store" };

export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.startsWith("application/json")) {
    return NextResponse.json({ state: "invalid" }, { status: 415, headers });
  }

  const data = await request.json().catch(() => null);
  if (
    typeof data?.token !== "string" ||
    !["start", "status"].includes(data?.action)
  ) {
    return NextResponse.json({ state: "invalid" }, { status: 400, headers });
  }

  try {
    const result = await handleDemoRequest(data.token, data.action === "start");
    return NextResponse.json(result, {
      status: result.state === "unavailable" ? 503 : 200,
      headers,
    });
  } catch {
    return NextResponse.json(
      { state: "unavailable" },
      { status: 503, headers }
    );
  }
}
