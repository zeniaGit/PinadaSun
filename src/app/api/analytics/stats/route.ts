import { NextResponse } from "next/server";
import { getVisitorAnalytics, clearVisitorAnalytics } from "@/lib/store";
import { isAuthenticated } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Acceso no autorizado." }, { status: 401 });
  }

  try {
    const stats = await getVisitorAnalytics(200);
    return NextResponse.json(stats);
  } catch (err) {
    console.error("Error in /api/analytics/stats:", err);
    return NextResponse.json({ error: "Error al obtener estadísticas." }, { status: 500 });
  }
}

export async function DELETE() {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Acceso no autorizado." }, { status: 401 });
  }

  try {
    await clearVisitorAnalytics();
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Error clearing analytics:", err);
    return NextResponse.json({ error: "Error al resetear analítica." }, { status: 500 });
  }
}
