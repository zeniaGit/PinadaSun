import { NextRequest, NextResponse } from "next/server";
import { recordVisitorSession } from "@/lib/store";
import { extractClientIp, extractGeoLocation, parseUserAgent } from "@/lib/analytics";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { sessionId, page = "/", referrer = null, isWebdriver = false } = body;

    if (!sessionId || typeof sessionId !== "string") {
      return NextResponse.json({ error: "Missing sessionId" }, { status: 400 });
    }

    const headers = req.headers;
    const ua = headers.get("user-agent") || "";
    const ip = extractClientIp(headers);
    const parsedUa = parseUserAgent(ua, isWebdriver);
    const geo = extractGeoLocation(headers, ip);

    await recordVisitorSession({
      sessionId,
      ip,
      country: geo.country,
      countryCode: geo.countryCode,
      city: geo.city,
      device: parsedUa.device,
      os: parsedUa.os,
      browser: parsedUa.browser,
      isBot: parsedUa.isBot,
      botName: parsedUa.botName,
      page,
      referrer,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Error in /api/analytics/track:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
