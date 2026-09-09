import { NextRequest, NextResponse } from "next/server";
import { updateSessionDuration } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    let body: any = {};
    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      body = await req.json().catch(() => ({}));
    } else {
      const text = await req.text();
      try {
        body = JSON.parse(text);
      } catch {
        body = {};
      }
    }

    const { sessionId, durationSeconds, page } = body;

    if (!sessionId || typeof sessionId !== "string") {
      return NextResponse.json({ error: "Missing sessionId" }, { status: 400 });
    }

    if (typeof durationSeconds === "number") {
      await updateSessionDuration(sessionId, durationSeconds, page);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Error in /api/analytics/ping:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
