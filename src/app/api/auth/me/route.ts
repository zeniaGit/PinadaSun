import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  return NextResponse.json({ authenticated: true });
}
