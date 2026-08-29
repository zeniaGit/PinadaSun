"use client";

import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { IconLock, IconShieldCheck, IconCheck, IconX } from "@/components/icons";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token") || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      setError("Falta el token de recuperación en el enlace.");
      return;
    }
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setBusy(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "No se pudo restablecer la contraseña.");
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/panel");
      }, 3000);
    } catch (err: any) {
      setError(err.message || "Error al procesar la solicitud.");
    } finally {
      setBusy(false);
    }
  };

  if (!token) {
    return (
      <div className="border border-line bg-cream p-7 shadow-xl shadow-black/5 sm:p-9 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-rose-600">
          <IconX className="h-6 w-6" />
        </div>
        <h1 className="font-display text-xl font-bold text-ocean">Enlace no válido</h1>
        <p className="mt-2 text-sm text-ink-soft">
          Este enlace de recuperación no contiene un token válido o está incompleto.
        </p>
        <div className="mt-6">
          <Link
            href="/panel"
            className="inline-block bg-ocean px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-ocean-light transition-all"
          >
            ← Volver al Panel
          </Link>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="border border-line bg-cream p-7 shadow-xl shadow-black/5 sm:p-9 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <IconCheck className="h-6 w-6" />
        </div>
        <h1 className="font-display text-xl font-bold text-ocean">¡Contraseña restablecida!</h1>
        <p className="mt-2 text-sm text-ink-soft">
          Tu nueva clave ha sido guardada correctamente. Redirigiendo al panel de administración…
        </p>
        <div className="mt-6">
          <Link
            href="/panel"
            className="inline-block bg-ocean px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-ocean-light transition-all"
          >
            Ir al inicio de sesión ahora →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-line bg-cream p-7 shadow-xl shadow-black/5 sm:p-9">
      <div className="mb-6 flex items-center justify-between border-b border-line pb-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-ocean">
            Nueva Contraseña
          </h1>
          <p className="text-[13px] text-ink-soft mt-0.5">
            Introduce tu nueva clave de acceso al panel
          </p>
        </div>
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-ocean/10 text-ocean">
          <IconLock className="h-5 w-5" />
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
        <div>
          <label className="mb-1.5 block text-[11.5px] font-semibold uppercase tracking-wider text-ink-soft">
            Nueva Contraseña (mín. 6 caracteres)
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••••••"
            required
            autoFocus
            className="w-full border border-line bg-linen/50 px-3.5 py-2.5 text-sm outline-none transition-all focus:border-ocean focus:bg-cream"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-[11.5px] font-semibold uppercase tracking-wider text-ink-soft">
            Confirmar Nueva Contraseña
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••••••"
            required
            className="w-full border border-line bg-linen/50 px-3.5 py-2.5 text-sm outline-none transition-all focus:border-ocean focus:bg-cream"
          />
        </div>

        {error && (
          <div className="border border-rose-200 bg-rose-50 px-3.5 py-2.5 text-[13px] font-medium text-rose-700">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={busy || !password || !confirmPassword}
          className="mt-2 flex w-full items-center justify-center gap-2 bg-ocean px-5 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-ocean-light disabled:cursor-not-allowed disabled:opacity-50"
        >
          {busy ? (
            <>
              <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent spin" />
              Guardando…
            </>
          ) : (
            "Actualizar Contraseña"
          )}
        </button>
      </form>

      <div className="mt-6 flex items-center justify-between border-t border-line pt-4 text-[12px] text-ink-soft">
        <Link href="/panel" className="hover:text-ocean transition-colors">
          ← Volver al Panel
        </Link>
        <span className="flex items-center gap-1 text-[11px] text-ink-soft/80">
          <IconShieldCheck className="h-3.5 w-3.5 text-sage" /> Enlace Cifrado
        </span>
      </div>
    </div>
  );
}

export default function ResetPage() {
  return (
    <div className="relative flex min-h-svh flex-col justify-center bg-linen px-5 py-12">
      <div className="mx-auto w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-block transition-transform hover:scale-102">
            <Logo />
          </Link>
        </div>
        <Suspense
          fallback={
            <div className="flex items-center justify-center p-12 text-sm text-ink-soft">
              <span className="h-4 w-4 rounded-full border-2 border-ocean-light border-t-transparent spin mr-2" />
              Cargando…
            </div>
          }
        >
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  );
}
