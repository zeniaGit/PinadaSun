import { NextResponse } from "next/server";
import { getPanelData } from "@/lib/store";
import { isAuthenticated } from "@/lib/auth";

export const dynamic = "force-dynamic";

/** Datos para el panel de la casa: reservas recientes y fechas bloqueadas. */
export async function GET() {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Acceso no autorizado." }, { status: 401 });
  }

  try {
    const data = await getPanelData();
    return NextResponse.json(data);
  } catch (err) {
    console.error("Error in panel route:", err);
    return NextResponse.json({ bookings: [], blocked: [] });
  }
}
