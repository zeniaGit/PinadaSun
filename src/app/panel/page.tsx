"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { fmtEuro, fmtShort, localISO } from "@/lib/dates";
import {
  IconCheck,
  IconX,
  IconCalendar,
  IconShieldCheck,
  IconLock,
  IconTrash,
  IconCopy,
  IconExternalLink,
  IconStar,
} from "@/components/icons";
import { Logo } from "@/components/logo";

type BookingRow = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  guests: number;
  checkIn: string;
  checkOut: string;
  nights: number;
  totalPrice: number;
  notes: string | null;
  status: "pendiente" | "confirmada" | "cancelada";
  createdAt: string;
};

type BlockedRow = {
  id: number;
  date: string;
  note: string | null;
};

type PanelData = { bookings: BookingRow[]; blocked: BlockedRow[] };

const BADGE: Record<BookingRow["status"], string> = {
  pendiente: "bg-[#efe0b8] text-[#7a5b16] border-[#dcc68a]",
  confirmada: "bg-sage/15 text-sage border-sage/30",
  cancelada: "bg-ink/5 text-ink-soft border-line",
};

export default function PanelPage() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginBusy, setLoginBusy] = useState(false);

  const [data, setData] = useState<PanelData | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [acting, setActing] = useState<number | null>(null);
  const [blockDate, setBlockDate] = useState("");
  const [blockDateEnd, setBlockDateEnd] = useState("");
  const [blockNote, setBlockNote] = useState("");
  const [blockMsg, setBlockMsg] = useState<string | null>(null);
  const [blockBusy, setBlockBusy] = useState(false);
  const [copiedReview, setCopiedReview] = useState(false);

  // Recuperación de clave
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotBusy, setForgotBusy] = useState(false);
  const [forgotMsg, setForgotMsg] = useState<string | null>(null);
  const [forgotError, setForgotError] = useState<string | null>(null);

  const GOOGLE_REVIEW_URL = "https://g.page/r/CX3tNGuZfWsbEBM/review";

  const handleCopyReview = async () => {
    try {
      await navigator.clipboard.writeText(GOOGLE_REVIEW_URL);
      setCopiedReview(true);
      setTimeout(() => setCopiedReview(false), 2500);
    } catch {
      // fallback
    }
  };

  // Comprobar autenticación inicial
  const checkAuth = useCallback(async () => {
    try {
      const r = await fetch("/api/auth/me", { cache: "no-store" });
      if (r.ok) {
        setAuthed(true);
        load();
      } else {
        setAuthed(false);
      }
    } catch {
      setAuthed(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const load = useCallback(async () => {
    try {
      const r = await fetch("/api/panel", { cache: "no-store" });
      if (r.status === 401) {
        setAuthed(false);
        return;
      }
      if (!r.ok) throw new Error();
      setData((await r.json()) as PanelData);
      setLoadError(null);
    } catch {
      setLoadError("No se pudieron cargar los datos del panel.");
    }
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!username || !password || loginBusy) return;
    setLoginBusy(true);
    setLoginError(null);

    try {
      const r = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const res = await r.json();
      if (!r.ok) throw new Error(res.error ?? "Credenciales incorrectas.");
      setAuthed(true);
      setPassword("");
      load();
    } catch (err) {
      setLoginError(err instanceof Error ? err.message : "Error al iniciar sesión.");
    } finally {
      setLoginBusy(false);
    }
  }

  async function handleForgot(e: React.FormEvent) {
    e.preventDefault();
    if (!forgotEmail || forgotBusy) return;
    setForgotBusy(true);
    setForgotMsg(null);
    setForgotError(null);

    try {
      const r = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotEmail }),
      });
      const res = await r.json();
      if (!r.ok) throw new Error(res.error ?? "No se pudo procesar la solicitud.");
      setForgotMsg(res.message || "Si el correo está autorizado, recibirás el enlace en breve.");
    } catch (err: any) {
      setForgotError(err.message || "Error al solicitar la recuperación.");
    } finally {
      setForgotBusy(false);
    }
  }

  async function handleLogout() {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } finally {
      setAuthed(false);
      setData(null);
    }
  }

  const stats = useMemo(() => {
    if (!data) return { total: 0, pending: 0, upcoming: 0, nights: 0, revenue: 0 };
    const today = localISO();
    const active = data.bookings.filter(
      (b) => b.status !== "cancelada" && b.checkOut >= today,
    );
    const confirmed = data.bookings.filter((b) => b.status === "confirmada");
    const pending = data.bookings.filter((b) => b.status === "pendiente");
    return {
      total: data.bookings.length,
      pending: pending.length,
      upcoming: active.length,
      nights: confirmed.reduce((s, b) => s + b.nights, 0),
      revenue: confirmed.reduce((s, b) => s + b.totalPrice, 0),
    };
  }, [data]);

  async function setStatus(id: number, status: "confirmada" | "cancelada") {
    setActing(id);
    try {
      const r = await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!r.ok) throw new Error();
      load();
    } catch {
      setBlockMsg("No se pudo actualizar la reserva.");
    } finally {
      setActing(null);
    }
  }

  async function addBlocked(e: React.FormEvent) {
    e.preventDefault();
    if (!blockDate || blockBusy) return;
    setBlockBusy(true);
    setBlockMsg(null);

    // Generar rango de fechas
    const dates: string[] = [];
    const end = blockDateEnd && blockDateEnd >= blockDate ? blockDateEnd : blockDate;
    const cur = new Date(blockDate + "T00:00:00");
    const last = new Date(end + "T00:00:00");
    while (cur <= last) {
      dates.push(cur.toISOString().slice(0, 10));
      cur.setDate(cur.getDate() + 1);
    }

    try {
      let lastError: string | null = null;
      for (const date of dates) {
        const r = await fetch("/api/blocked", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ date, note: blockNote }),
        });
        const d = await r.json();
        if (!r.ok) lastError = d.error ?? "No se pudo bloquear.";
      }
      if (lastError) throw new Error(lastError);
      setBlockDate("");
      setBlockDateEnd("");
      setBlockNote("");
      load();
    } catch (err) {
      setBlockMsg(err instanceof Error ? err.message : "Error.");
    } finally {
      setBlockBusy(false);
    }
  }

  async function removeBlocked(date: string) {
    setActing(-1);
    try {
      const r = await fetch(
        `/api/blocked?date=${encodeURIComponent(date)}`,
        { method: "DELETE" },
      );
      if (!r.ok) throw new Error();
      load();
    } catch {
      setBlockMsg("No se pudo liberar la fecha.");
    } finally {
      setActing(null);
    }
  }

  async function deleteBooking(id: number, name: string) {
    const refCode = `CM-${String(id).padStart(4, "0")}`;
    const ok = window.confirm(
      `¿Deseas eliminar definitivamente la reserva ${refCode} (${name})?\n\nEsta acción liberará las fechas en el calendario y dejará el número de reserva disponible para la siguiente reserva.`
    );
    if (!ok) return;

    setActing(id);
    try {
      const r = await fetch(`/api/bookings/${id}`, {
        method: "DELETE",
      });
      if (!r.ok) throw new Error();
      load();
    } catch {
      setBlockMsg("No se pudo eliminar la reserva.");
    } finally {
      setActing(null);
    }
  }

  async function resetAllBookings() {
    const ok = window.confirm(
      "⚠️ ¿Confirmas que deseas RESETEAR todas las reservas registradas?\n\nSe eliminarán del panel y el contador de reservas volverá al inicio (CM-0001) para la próxima solicitud."
    );
    if (!ok) return;

    setActing(-2);
    try {
      const r = await fetch("/api/bookings", {
        method: "DELETE",
      });
      if (!r.ok) throw new Error();
      load();
    } catch {
      setBlockMsg("No se pudieron resetear las reservas.");
    } finally {
      setActing(null);
    }
  }

  // ── Pantalla de Carga ──
  if (authed === null) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-linen">
        <div className="flex items-center gap-3 text-sm text-ink-soft">
          <span className="h-4 w-4 rounded-full border-2 border-ocean-light border-t-transparent spin" />
          Verificando sesión segura…
        </div>
      </div>
    );
  }

  // ── Pantalla de Login ──
  if (!authed) {
    return (
      <div className="relative flex min-h-svh flex-col justify-center bg-linen px-5 py-12">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-8 text-center">
            <Link href="/" className="inline-block transition-transform hover:scale-102">
              <Logo />
            </Link>
          </div>

          <div className="border border-line bg-cream p-7 shadow-xl shadow-black/5 sm:p-9">
            <div className="mb-6 flex items-center justify-between border-b border-line pb-4">
              <div>
                <h1 className="font-display text-2xl font-bold text-ocean">
                  Acceso al Panel
                </h1>
                <p className="text-[13px] text-ink-soft mt-0.5">
                  Administración de reservas y calendario
                </p>
              </div>
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-ocean/10 text-ocean">
                <IconLock className="h-5 w-5" />
              </span>
            </div>

            <form onSubmit={handleLogin} className="space-y-4" autoComplete="off">
              <div>
                <label className="mb-1.5 block text-[11.5px] font-semibold uppercase tracking-wider text-ink-soft">
                  Usuario
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="usuario@email.com"
                  required
                  autoFocus
                  autoComplete="new-password"
                  className="w-full border border-line bg-linen/50 px-3.5 py-2.5 text-sm outline-none transition-all focus:border-ocean focus:bg-cream"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="block text-[11.5px] font-semibold uppercase tracking-wider text-ink-soft">
                  Contraseña
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setShowForgot(true);
                    setForgotMsg(null);
                    setForgotError(null);
                  }}
                  className="text-[11.5px] font-medium text-ocean underline hover:text-ocean-light transition-colors"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full border border-line bg-linen/50 px-3.5 py-2.5 text-sm outline-none transition-all focus:border-ocean focus:bg-cream"
              />

              {loginError && (
                <div className="border border-rose-200 bg-rose-50 px-3.5 py-2.5 text-[13px] font-medium text-rose-700">
                  {loginError}
                </div>
              )}

              <button
                type="submit"
                disabled={loginBusy || !username || !password}
                className="mt-2 flex w-full items-center justify-center gap-2 bg-ocean px-5 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-ocean-light disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loginBusy ? (
                  <>
                    <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent spin" />
                    Accediendo…
                  </>
                ) : (
                  "Iniciar sesión"
                )}
              </button>
            </form>

            {/* Modal / Vista de Recuperación de Contraseña */}
            {showForgot && (
              <div className="mt-6 border-t border-line pt-6">
                <div className="rounded-lg border border-ocean/20 bg-ocean/5 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <h2 className="text-sm font-bold text-ocean">Recuperar Contraseña</h2>
                    <button
                      type="button"
                      onClick={() => setShowForgot(false)}
                      className="text-xs font-semibold text-ink-soft hover:text-ocean transition-colors"
                    >
                      Cerrar ✕
                    </button>
                  </div>
                  <p className="mb-3 text-xs text-ink-soft leading-relaxed">
                    Introduce tu correo autorizado. Te enviaremos un enlace seguro para restablecer tu clave.
                  </p>
                  <form onSubmit={handleForgot} className="space-y-3">
                    <input
                      type="email"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      placeholder="tucorreo@ejemplo.com"
                      required
                      className="w-full border border-line bg-white px-3 py-2 text-xs outline-none focus:border-ocean"
                    />
                    {forgotError && (
                      <div className="text-[12px] font-medium text-rose-700">{forgotError}</div>
                    )}
                    {forgotMsg && (
                      <div className="rounded border border-emerald-200 bg-emerald-50 p-2 text-[12px] font-medium text-emerald-800">
                        {forgotMsg}
                      </div>
                    )}
                    <button
                      type="submit"
                      disabled={forgotBusy || !forgotEmail}
                      className="w-full bg-ocean px-3 py-2 text-xs font-semibold text-white shadow hover:bg-ocean-light disabled:opacity-50 transition-all flex items-center justify-center gap-1.5"
                    >
                      {forgotBusy ? (
                        <>
                          <span className="h-3 w-3 rounded-full border-2 border-white border-t-transparent spin" />
                          Enviando enlace…
                        </>
                      ) : (
                        "Enviar enlace de recuperación"
                      )}
                    </button>
                  </form>
                </div>
              </div>
            )}

            <div className="mt-6 flex items-center justify-between border-t border-line pt-4 text-[12px] text-ink-soft">
              <Link href="/" className="hover:text-ocean transition-colors">
                ← Volver a la web
              </Link>
              <span className="flex items-center gap-1 text-[11px] text-ink-soft/80">
                <IconShieldCheck className="h-3.5 w-3.5 text-sage" /> Sesión cifrada
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Panel de Control Autenticado ──
  return (
    <div className="min-h-svh bg-linen">
      {/* Cabecera */}
      <header className="border-b border-line bg-cream">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-5 md:px-8">
          <div className="flex items-center gap-4">
            <Link href="/" className="transition-transform hover:opacity-90">
              <Logo />
            </Link>
            <span className="hidden sm:inline-block h-6 w-px bg-line" />
            <span className="hidden sm:inline-block text-[12px] font-semibold uppercase tracking-wider text-ocean-light">
              Panel de Gestión
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="px-3.5 py-1.5 text-[13px] font-medium text-ink-soft hover:text-ink transition-colors"
            >
              Ver web pública
            </Link>
            <button
              onClick={handleLogout}
              className="border border-line bg-linen/60 px-3.5 py-1.5 text-[13px] font-semibold text-ink-soft hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200 transition-all"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-10 md:px-8">
        {/* Métricas */}
        <section className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="border border-line bg-cream p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-soft">
              Pendientes
            </p>
            <p className="tnum mt-2 font-display text-3xl font-bold text-amber-700">
              {stats.pending}
            </p>
          </div>
          <div className="border border-line bg-cream p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-soft">
              Próximas
            </p>
            <p className="tnum mt-2 font-display text-3xl font-bold text-ocean">
              {stats.upcoming}
            </p>
          </div>
          <div className="border border-line bg-cream p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-soft">
              Noches vendidas
            </p>
            <p className="tnum mt-2 font-display text-3xl font-bold text-ocean-light">
              {stats.nights}
            </p>
          </div>
          <div className="border border-line bg-cream p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-soft">
              Total facturado
            </p>
            <p className="tnum mt-2 font-display text-3xl font-bold text-sage">
              {fmtEuro(stats.revenue)}
            </p>
          </div>
        </section>

        {/* Enlace directo Google Reviews */}
        <section className="mt-8 border border-line bg-cream p-5 sm:p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 bg-amber-500/10 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-amber-700">
                  <IconStar className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                  Google Reviews
                </span>
                <h3 className="font-display text-lg font-bold text-ocean">
                  Enlace directo para 5 estrellas
                </h3>
              </div>
              <p className="text-[13px] text-ink-soft">
                Copia y envía este enlace por WhatsApp o email a tus huéspedes tras el check-out para pedir su valoración directa.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <div className="flex items-center gap-2 border border-line bg-linen/50 px-3.5 py-2 text-xs text-ink select-all font-mono">
                <span className="truncate max-w-[220px] sm:max-w-xs">{GOOGLE_REVIEW_URL}</span>
              </div>
              <button
                type="button"
                onClick={handleCopyReview}
                className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold shadow-xs transition-all ${
                  copiedReview
                    ? "bg-sage text-white"
                    : "bg-ocean text-white hover:bg-ocean-light"
                }`}
              >
                {copiedReview ? (
                  <>
                    <IconCheck className="h-4 w-4" />
                    ¡Copiado!
                  </>
                ) : (
                  <>
                    <IconCopy className="h-4 w-4" />
                    Copiar enlace
                  </>
                )}
              </button>
              <a
                href={GOOGLE_REVIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 border border-line bg-cream px-3 py-2 text-xs font-medium text-ink-soft hover:text-ocean hover:border-ocean transition-colors"
                title="Abrir enlace de reseña en una nueva pestaña"
              >
                <IconExternalLink className="h-4 w-4" />
                <span className="hidden sm:inline">Probar</span>
              </a>
            </div>
          </div>
        </section>

        {loadError && (
          <div className="mt-8 border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
            {loadError}
          </div>
        )}

        {/* Listado de reservas */}
        <section className="mt-10">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-display text-2xl text-ocean">Solicitudes y Reservas</h2>
            <div className="flex items-center gap-3">
              {data && data.bookings.length > 0 && (
                <button
                  onClick={resetAllBookings}
                  disabled={acting !== null}
                  className="inline-flex items-center gap-1.5 border border-rose-200 bg-rose-50 px-3 py-1.5 text-[12.5px] font-semibold text-rose-700 transition-colors hover:bg-rose-100 hover:text-rose-800 disabled:opacity-50"
                  title="Eliminar todas las reservas registradas y reiniciar la numeración desde CM-0001"
                >
                  <IconTrash className="h-3.5 w-3.5" />
                  Resetear reservas de prueba
                </button>
              )}
              <button
                onClick={load}
                className="text-[13px] text-ink-soft underline hover:text-ink"
              >
                Actualizar
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {data?.bookings.length === 0 && (
              <div className="border border-line bg-cream p-8 text-center text-sm text-ink-soft">
                Todavía no hay reservas registradas.
              </div>
            )}
            {data?.bookings.map((b) => (
              <div
                key={b.id}
                className="border border-line bg-cream p-5 transition-shadow hover:shadow-sm sm:p-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-display text-lg font-bold text-ink">
                        {b.name}
                      </span>
                      <span
                        className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${
                          BADGE[b.status]
                        }`}
                      >
                        {b.status}
                      </span>
                      <span className="text-[11px] text-ink-soft">
                        Ref: CM-{String(b.id).padStart(4, "0")}
                      </span>
                    </div>

                    <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-[13px] text-ink-soft">
                      <span>✉ {b.email}</span>
                      {b.phone && <span>☎ {b.phone}</span>}
                      <span>👥 {b.guests} {b.guests === 1 ? "huésped" : "huéspedes"}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="tnum font-display text-xl font-bold text-ocean">
                      {fmtEuro(b.totalPrice)}
                    </p>
                    <p className="text-[12px] text-ink-soft">
                      {b.nights} noches ({fmtShort(b.checkIn)} → {fmtShort(b.checkOut)})
                    </p>
                  </div>
                </div>

                {b.notes && (
                  <div className="mt-3.5 border-t border-line/60 pt-3 text-[13px] text-ink-soft">
                    <strong className="text-ink">Nota:</strong> {b.notes}
                  </div>
                )}

                {/* Acciones */}
                <div className="mt-4 flex flex-wrap items-center justify-end gap-2.5 border-t border-line pt-3.5">
                  {b.status === "pendiente" && (
                    <>
                      <button
                        onClick={() => setStatus(b.id, "confirmada")}
                        disabled={acting === b.id}
                        className="inline-flex items-center gap-1.5 bg-sage px-3.5 py-1.5 text-[12.5px] font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                      >
                        <IconCheck className="h-3.5 w-3.5" />
                        Confirmar reserva
                      </button>
                      <button
                        onClick={() => setStatus(b.id, "cancelada")}
                        disabled={acting === b.id}
                        className="inline-flex items-center gap-1.5 border border-line bg-cream px-3.5 py-1.5 text-[12.5px] font-semibold text-rose-700 hover:bg-rose-50 disabled:opacity-50"
                      >
                        <IconX className="h-3.5 w-3.5" />
                        Rechazar
                      </button>
                    </>
                  )}

                  {b.status === "confirmada" && (
                    <button
                      onClick={() => setStatus(b.id, "cancelada")}
                      disabled={acting === b.id}
                      className="text-[12.5px] text-rose-700 hover:underline disabled:opacity-50"
                    >
                      Cancelar reserva
                    </button>
                  )}

                  {b.status === "cancelada" && (
                    <button
                      onClick={() => setStatus(b.id, "confirmada")}
                      disabled={acting === b.id}
                      className="text-[12.5px] text-sage hover:underline disabled:opacity-50"
                    >
                      Reactivar reserva
                    </button>
                  )}

                  <button
                    onClick={() => deleteBooking(b.id, b.name)}
                    disabled={acting === b.id}
                    className="inline-flex items-center gap-1 border border-rose-200 bg-rose-50/80 px-2.5 py-1.5 text-[12px] font-semibold text-rose-700 transition-colors hover:bg-rose-100 hover:text-rose-800 disabled:opacity-50"
                    title="Eliminar reserva definitivamente y liberar fechas"
                  >
                    <IconTrash className="h-3.5 w-3.5" />
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bloqueo manual de fechas */}
        <section className="mt-12">
          <div className="mb-4">
            <h2 className="font-display text-2xl text-ocean">Bloquear fechas manualmente</h2>
            <p className="text-[13px] text-ink-soft">
              Para reservas externas (Airbnb, Booking, Vrbo) o días de uso de los propietarios.
            </p>
          </div>

          <div className="border border-line bg-cream p-5 sm:p-6">
            <form onSubmit={addBlocked} className="flex flex-wrap items-end gap-4">
              <div className="min-w-[160px]">
                <label className="mb-1 block text-[11.5px] font-semibold uppercase tracking-wider text-ink-soft">
                  Desde
                </label>
                <input
                  type="date"
                  min={localISO()}
                  value={blockDate}
                  onChange={(e) => {
                    setBlockDate(e.target.value);
                    if (blockDateEnd && e.target.value > blockDateEnd) setBlockDateEnd("");
                  }}
                  required
                  className="w-full border border-line bg-linen/50 px-3 py-2 text-sm outline-none focus:border-ocean"
                />
              </div>

              <div className="min-w-[160px]">
                <label className="mb-1 block text-[11.5px] font-semibold uppercase tracking-wider text-ink-soft">
                  Hasta <span className="normal-case font-normal">(opcional)</span>
                </label>
                <input
                  type="date"
                  min={blockDate || localISO()}
                  value={blockDateEnd}
                  onChange={(e) => setBlockDateEnd(e.target.value)}
                  className="w-full border border-line bg-linen/50 px-3 py-2 text-sm outline-none focus:border-ocean"
                />
              </div>

              <div className="min-w-[240px] flex-1">
                <label className="mb-1 block text-[11.5px] font-semibold uppercase tracking-wider text-ink-soft">
                  Motivo / Nota (opcional)
                </label>
                <input
                  type="text"
                  placeholder="Ej: Reserva Airbnb - John"
                  value={blockNote}
                  onChange={(e) => setBlockNote(e.target.value)}
                  className="w-full border border-line bg-linen/50 px-3 py-2 text-sm outline-none focus:border-ocean"
                />
              </div>

              <button
                type="submit"
                disabled={!blockDate || blockBusy}
                className="bg-ocean px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-ocean-light disabled:opacity-50"
              >
                {blockBusy
                  ? "Bloqueando…"
                  : blockDateEnd && blockDateEnd > blockDate
                  ? "Bloquear rango"
                  : "Bloquear fecha"}
              </button>
            </form>

            {blockMsg && (
              <p className="mt-3 text-[13px] text-rose-700">{blockMsg}</p>
            )}

            {/* Lista de bloqueos */}
            <div className="mt-6 border-t border-line pt-5">
              <h3 className="text-[12px] font-semibold uppercase tracking-wider text-ink-soft">
                Fechas bloqueadas actualmente ({data?.blocked.length ?? 0})
              </h3>

              {data?.blocked.length === 0 ? (
                <p className="mt-2 text-[13px] text-ink-soft">No hay fechas bloqueadas manualmente.</p>
              ) : (
                <div className="mt-3 flex flex-wrap gap-2">
                  {data?.blocked.map((b) => (
                    <div
                      key={b.date}
                      className="flex items-center gap-2 border border-line bg-linen/60 px-3 py-1.5 text-[12.5px]"
                    >
                      <span className="font-semibold text-ocean">{fmtShort(b.date)}</span>
                      {b.note && <span className="text-ink-soft">({b.note})</span>}
                      <button
                        onClick={() => removeBlocked(b.date)}
                        className="text-rose-600 hover:text-rose-800"
                        title="Liberar fecha"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
