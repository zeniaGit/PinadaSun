import { NextResponse } from "next/server";
import { addMonthsISO, localISO } from "@/lib/dates";
import { getUnavailableDates } from "@/lib/store";

export const dynamic = "force-dynamic";
export const revalidate = 0;

/** Devuelve todas las fechas no disponibles (reservas activas + bloqueos) en ISO en tiempo real. */
export async function GET() {
  try {
    const today = localISO();
    const cap = addMonthsISO(today, 12);
    const unavailable = await getUnavailableDates(today, cap);
    return NextResponse.json(
      { unavailable },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
        },
      },
    );
  } catch (err) {
    console.error("Error in calendar route:", err);
    return NextResponse.json(
      { unavailable: [] },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
        },
      },
    );
  }
}
