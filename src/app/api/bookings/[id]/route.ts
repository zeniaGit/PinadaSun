import { NextRequest, NextResponse } from "next/server";
import { updateBookingStatus, deleteBooking } from "@/lib/store";
import { isAuthenticated } from "@/lib/auth";

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Acceso no autorizado." }, { status: 401 });
  }

  const { id } = await context.params;
  const num = Number(id);
  if (!Number.isInteger(num) || num <= 0) {
    return NextResponse.json({ error: "Reserva no encontrada." }, { status: 404 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Petición no válida." }, { status: 400 });
  }

  const status = body.status;
  if (status !== "confirmada" && status !== "cancelada") {
    return NextResponse.json(
      { error: "Estado no válido." },
      { status: 400 },
    );
  }

  try {
    const ok = await updateBookingStatus(num, status);
    if (!ok) {
      return NextResponse.json({ error: "Reserva no encontrada." }, { status: 404 });
    }
    return NextResponse.json({ ok: true, id: num, status });
  } catch (err) {
    console.error("Error updating booking status:", err);
    return NextResponse.json({ error: "Error al actualizar estado." }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Acceso no autorizado." }, { status: 401 });
  }

  const { id } = await context.params;
  const num = Number(id);
  if (!Number.isInteger(num) || num <= 0) {
    return NextResponse.json({ error: "Reserva no encontrada." }, { status: 404 });
  }

  try {
    const ok = await deleteBooking(num);
    if (!ok) {
      return NextResponse.json({ error: "Reserva no encontrada." }, { status: 404 });
    }
    return NextResponse.json({ ok: true, id: num });
  } catch (err) {
    console.error("Error deleting booking:", err);
    return NextResponse.json({ error: "Error al eliminar la reserva." }, { status: 500 });
  }
}

