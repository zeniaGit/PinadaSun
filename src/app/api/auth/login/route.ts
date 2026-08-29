import { NextResponse } from "next/server";
import { COOKIE_NAME, createSessionToken, validateCredentials } from "@/lib/auth";
import {
  getClientIp,
  isHostAllowed,
  checkIpSecurity,
  recordFailedLogin,
  recordSuccessfulLogin,
} from "@/lib/security";

export async function POST(req: Request) {
  try {
    // 1. Validación de DNS / Host permitido
    if (!isHostAllowed(req)) {
      return NextResponse.json({ error: "Acceso no permitido desde este host." }, { status: 403 });
    }

    // 2. Detección de IP y control anti-fuerza bruta
    const clientIp = getClientIp(req);
    const ipSec = checkIpSecurity(clientIp);

    if (!ipSec.allowed) {
      return NextResponse.json(
        {
          error: `Acceso temporalmente bloqueado por múltiples intentos fallidos. Inténtalo de nuevo en ${ipSec.minutesRemaining} minutos.`,
        },
        { status: 429 },
      );
    }

    const body = await req.json();
    const username = String(body.username ?? "").trim();
    const password = String(body.password ?? "");

    if (!username || !password) {
      return NextResponse.json(
        { error: "Por favor, introduce usuario y contraseña." },
        { status: 400 },
      );
    }

    // 3. Validación de credenciales
    if (!validateCredentials(username, password)) {
      const failResult = recordFailedLogin(clientIp);
      if (failResult.blocked) {
        return NextResponse.json(
          {
            error: `Has superado el límite de intentos. Tu IP (${clientIp}) ha sido bloqueada durante 15 minutos.`,
          },
          { status: 429 },
        );
      }
      return NextResponse.json(
        {
          error: `Usuario o contraseña incorrectos. Te quedan ${failResult.remainingAttempts} intento(s) antes del bloqueo.`,
        },
        { status: 401 },
      );
    }

    // 4. Éxito: limpiar contador de IP y generar sesión
    recordSuccessfulLogin(clientIp);
    const token = await createSessionToken(username);
    const res = NextResponse.json({ ok: true, username });

    res.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 días
    });

    return res;
  } catch (err) {
    console.error("Error in login:", err);
    return NextResponse.json({ error: "Error al iniciar sesión." }, { status: 500 });
  }
}
