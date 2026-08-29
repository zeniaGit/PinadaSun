import { NextResponse } from "next/server";
import { APARTMENT, quoteStay } from "@/lib/apartment";
import { localISO, nightsBetween } from "@/lib/dates";
import { checkBookingClash, createBooking } from "@/lib/store";
import { Resend } from "resend";

const ISO_RE = /^\d{4}-\d{2}-\d{2}$/;

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Petición no válida." }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const guests = Number(body.guests ?? 2);
  const notes = String(body.notes ?? "").trim();
  const checkIn = String(body.checkIn ?? "");
  const checkOut = String(body.checkOut ?? "");

  if (name.length < 2) {
    return NextResponse.json(
      { error: "Indícanos tu nombre, por favor." },
      { status: 400 },
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Necesitamos un email válido para confirmar." },
      { status: 400 },
    );
  }
  if (!ISO_RE.test(checkIn) || !ISO_RE.test(checkOut)) {
    return NextResponse.json(
      { error: "Las fechas no son válidas." },
      { status: 400 },
    );
  }
  const today = localISO();
  if (checkIn < today) {
    return NextResponse.json(
      { error: "La fecha de llegada ya ha pasado." },
      { status: 400 },
    );
  }
  const nights = nightsBetween(checkIn, checkOut);
  if (nights < APARTMENT.minNights) {
    return NextResponse.json(
      {
        error: `La estancia mínima es de ${APARTMENT.minNights} noches.`,
      },
      { status: 400 },
    );
  }
  if (!Number.isInteger(guests) || guests < 1 || guests > APARTMENT.maxGuests) {
    return NextResponse.json(
      { error: "Número de huéspedes no válido." },
      { status: 400 },
    );
  }

  try {
    const isClashing = await checkBookingClash(checkIn, checkOut);
    if (isClashing) {
      return NextResponse.json(
        {
          error:
            "Esas fechas se acaban de ocupar o están bloqueadas. Elige otros días, por favor.",
        },
        { status: 409 },
      );
    }

    const quote = quoteStay(checkIn, checkOut, guests);
    const totalPrice = quote.total;

    const result = await createBooking({
      name,
      email,
      phone: phone || null,
      guests,
      checkIn,
      checkOut,
      nights,
      totalPrice,
      notes: notes || null,
    });

    try {
      const apiKey = (process.env.RESEND_API_KEY || process.env["Resend"] || "").trim().replace(/^["']|["']$/g, "");
      if (apiKey) {
        const rawFrom = process.env.RESEND_FROM_EMAIL?.trim().replace(/^["']|["']$/g, "") || "onboarding@resend.dev";
        const fromAddress = rawFrom.includes("<") ? rawFrom : `Pinada Sun <${rawFrom}>`;

        const resend = new Resend(apiKey);
        const { data, error: resendError } = await resend.emails.send({
          from: fromAddress,
          to: "contact@pinadasun.com",
          subject: `Nueva Reserva: ${name} (${checkIn} a ${checkOut})`,
          html: `
            <h2>Nueva Reserva en Pinada Sun</h2>
            <p><strong>Nombre:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Teléfono:</strong> ${phone || "No indicado"}</p>
            <p><strong>Fechas:</strong> ${checkIn} al ${checkOut} (${nights} noches)</p>
            <p><strong>Huéspedes:</strong> ${guests}</p>
            <p><strong>Precio Total:</strong> ${totalPrice} €</p>
            <p><strong>Notas:</strong> ${notes || "Ninguna"}</p>
          `,
        });

        if (resendError) {
          console.error("Resend API error:", resendError);
        } else {
          console.log("Resend email sent successfully:", data?.id);
        }
      } else {
        console.warn("RESEND_API_KEY no está configurada.");
      }
    } catch (emailErr) {
      console.error("Error sending email notification:", emailErr);
    }

    return NextResponse.json(
      { ok: true, id: result.id, total: totalPrice },
      { status: 201 },
    );
  } catch (err) {
    console.error("Error creating booking:", err);
    return NextResponse.json(
      { error: "No se pudo procesar la reserva. Inténtalo de nuevo." },
      { status: 500 },
    );
  }
}

export async function DELETE() {
  const { isAuthenticated } = await import("@/lib/auth");
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Acceso no autorizado." }, { status: 401 });
  }

  try {
    const { resetAllBookings } = await import("@/lib/store");
    await resetAllBookings();
    return NextResponse.json({ ok: true, message: "Todas las reservas han sido reseteadas." });
  } catch (err) {
    console.error("Error resetting bookings:", err);
    return NextResponse.json({ error: "Error al resetear las reservas." }, { status: 500 });
  }
}

