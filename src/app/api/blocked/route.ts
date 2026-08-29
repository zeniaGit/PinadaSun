import { NextResponse } from "next/server";
import { blockDateEntry, unblockDateEntry } from "@/lib/store";
import { localISO } from "@/lib/dates";
import { isAuthenticated } from "@/lib/auth";

const ISO_RE = /^\d{4}-\d{2}-\d{2}$/;

export async function POST(req: Request) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Acceso no autorizado." }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Petición no válida." }, { status: 400 });
  }

  const date = String(body.date ?? "");
  const note = String(body.note ?? "").trim();

  if (!ISO_RE.test(date)) {
    return NextResponse.json({ error: "Fecha no válida." }, { status: 400 });
  }
  if (date < localISO()) {
    return NextResponse.json(
      { error: "Solo se pueden bloquear fechas a partir de hoy." },
      { status: 400 },
    );
  }

  try {
    const res = await blockDateEntry(date, note || null);
    if (!res.ok) {
      return NextResponse.json({ error: res.error ?? "No se pudo bloquear." }, { status: 409 });
    }
    return NextResponse.json({ ok: true, id: res.id }, { status: 201 });
  } catch (err) {
    console.error("Error blocking date:", err);
    return NextResponse.json({ error: "Error al bloquear la fecha." }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Acceso no autorizado." }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date") ?? "";
  if (!ISO_RE.test(date)) {
    return NextResponse.json({ error: "Fecha no válida." }, { status: 400 });
  }

  try {
    const ok = await unblockDateEntry(date);
    if (!ok) {
      return NextResponse.json({ error: "Fecha no encontrada." }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Error unblocking date:", err);
    return NextResponse.json({ error: "Error al desbloquear la fecha." }, { status: 500 });
  }
}
