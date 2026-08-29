import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  verifyPasswordResetToken,
  markResetTokenAsUsed,
  updateAdminPassword,
} from "@/lib/auth";
import { getClientIp, isHostAllowed, checkIpSecurity } from "@/lib/security";

export async function POST(req: Request) {
  try {
    if (!isHostAllowed(req)) {
      return NextResponse.json({ error: "Host no permitido." }, { status: 403 });
    }

    const clientIp = getClientIp(req);
    const ipSec = checkIpSecurity(clientIp);
    if (!ipSec.allowed) {
      return NextResponse.json(
        {
          error: `Demasiados intentos. Tu IP está temporalmente bloqueada. Espera ${ipSec.minutesRemaining} minutos.`,
        },
        { status: 429 },
      );
    }

    const body = await req.json();
    const token = String(body.token ?? "").trim();
    const password = String(body.password ?? "");

    if (!token) {
      return NextResponse.json({ error: "Token de recuperación no proporcionado." }, { status: 400 });
    }

    if (!password || password.length < 6) {
      return NextResponse.json(
        { error: "La nueva contraseña debe tener al menos 6 caracteres." },
        { status: 400 },
      );
    }

    const tokenVerification = await verifyPasswordResetToken(token);
    if (!tokenVerification.valid || !tokenVerification.email) {
      return NextResponse.json(
        { error: tokenVerification.error || "El enlace no es válido o ha caducado." },
        { status: 400 },
      );
    }

    // Actualizar la contraseña
    updateAdminPassword(password);
    markResetTokenAsUsed(token);

    // Enviar notificación de confirmación de cambio de contraseña
    try {
      const apiKey = (process.env.RESEND_API_KEY || process.env["Resend"] || "")
        .trim()
        .replace(/^["']|["']$/g, "");

      if (apiKey) {
        const rawFrom =
          process.env.RESEND_FROM_EMAIL?.trim().replace(/^["']|["']$/g, "") || "onboarding@resend.dev";
        const fromAddress = rawFrom.includes("<") ? rawFrom : `Pinada Sun Seguridad <${rawFrom}>`;

        const resend = new Resend(apiKey);
        await resend.emails.send({
          from: fromAddress,
          to: tokenVerification.email,
          subject: "✅ Contraseña actualizada — Panel Pinada Sun",
          html: `
            <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
              <h2 style="color: #0f3b5c;">Contraseña Actualizada con Éxito</h2>
              <p>Te informamos de que la contraseña del panel de administración de <strong>Pinada Sun</strong> ha sido modificada correctamente.</p>
              <p>Ya puedes acceder al panel con tu nueva clave.</p>
              <p style="font-size: 12px; color: #718096; margin-top: 24px;">Si no realizaste esta acción, ponte en contacto de inmediato con el administrador.</p>
            </div>
          `,
        });
      }
    } catch (notifyErr) {
      console.error("Error sending password reset confirmation email:", notifyErr);
    }

    return NextResponse.json({ ok: true, message: "Contraseña actualizada correctamente." });
  } catch (err) {
    console.error("Error in reset-password route:", err);
    return NextResponse.json(
      { error: "Error al actualizar la contraseña." },
      { status: 500 },
    );
  }
}
