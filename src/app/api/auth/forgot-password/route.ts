import { NextResponse } from "next/server";
import { Resend } from "resend";
import { isEmailAuthorized, createPasswordResetToken } from "@/lib/auth";
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
    const rawEmail = String(body.email ?? "").trim();

    // Mensaje de respuesta seguro contra enumeración
    const genericResponse = {
      ok: true,
      message:
        "Si la dirección de correo electrónico está autorizada, recibirás un enlace de recuperación en los próximos minutos.",
    };

    if (!rawEmail || !isEmailAuthorized(rawEmail)) {
      // Devolver siempre respuesta exitosa genérica sin enviar correo
      return NextResponse.json(genericResponse);
    }

    const token = await createPasswordResetToken(rawEmail);
    const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://pinadasun.com").replace(/\/$/, "");
    const resetUrl = `${siteUrl}/panel/reset?token=${token}`;

    const apiKey = (process.env.RESEND_API_KEY || process.env["Resend"] || "")
      .trim()
      .replace(/^["']|["']$/g, "");

    if (apiKey) {
      const rawFrom =
        process.env.RESEND_FROM_EMAIL?.trim().replace(/^["']|["']$/g, "") || "onboarding@resend.dev";
      const fromAddress = rawFrom.includes("<") ? rawFrom : `Pinada Sun Seguridad <${rawFrom}>`;

      const resend = new Resend(apiKey);
      const { error: resendError } = await resend.emails.send({
        from: fromAddress,
        to: rawEmail,
        subject: "🔐 Recuperación de contraseña — Panel Pinada Sun",
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f7f6f2; color: #1c2b36; margin: 0; padding: 24px; }
              .card { max-width: 540px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e3dec3; padding: 32px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
              .logo { color: #0f3b5c; font-size: 20px; font-weight: 800; letter-spacing: -0.5px; margin-bottom: 24px; }
              .logo span { color: #d4a359; }
              h1 { font-size: 20px; font-weight: 700; color: #0f3b5c; margin-bottom: 16px; }
              p { font-size: 14px; line-height: 1.6; color: #455a64; margin-bottom: 20px; }
              .btn { display: inline-block; background-color: #0f3b5c; color: #ffffff !important; font-weight: 600; text-decoration: none; padding: 12px 28px; border-radius: 8px; font-size: 14px; margin: 10px 0 24px 0; }
              .btn:hover { background-color: #174e78; }
              .note { font-size: 12px; color: #8898aa; border-top: 1px solid #ede8d5; padding-top: 16px; margin-top: 24px; }
              .link-alt { word-break: break-all; color: #0f3b5c; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="card">
              <div class="logo">PINADA<span>SUN</span></div>
              <h1>Recuperación de Contraseña</h1>
              <p>Hemos recibido una solicitud para restablecer la contraseña de acceso al panel de administración de Pinada Sun para la cuenta <strong>${rawEmail}</strong>.</p>
              <p>Haz clic en el siguiente botón para establecer una nueva clave. Este enlace es de un solo uso y caduca en <strong>30 minutos</strong>:</p>
              <a href="${resetUrl}" class="btn" target="_blank">Restablecer mi Contraseña</a>
              <p>O copia y pega este enlace en tu navegador:</p>
              <p class="link-alt">${resetUrl}</p>
              <div class="note">
                <p>Si tú no has solicitado este cambio, puedes ignorar este correo de forma segura. Tu contraseña actual no será modificada.</p>
              </div>
            </div>
          </body>
          </html>
        `,
      });

      if (resendError) {
        console.error("Resend API Error al enviar recuperación:", resendError);
      }
    } else {
      console.warn("RESEND_API_KEY no configurada. Enlace generado en log:", resetUrl);
    }

    return NextResponse.json(genericResponse);
  } catch (err) {
    console.error("Error in forgot-password:", err);
    return NextResponse.json(
      { error: "Error al procesar la solicitud de recuperación." },
      { status: 500 },
    );
  }
}
