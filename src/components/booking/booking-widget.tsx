"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Calendar } from "./calendar";
import { APARTMENT, quoteStay } from "@/lib/apartment";
import { fmtEuro, fmtLong, fmtShort, nightsBetween } from "@/lib/dates";
import { IconCheck, IconClock, IconStar } from "@/components/icons";
import { LogoPayPal, LogoBankTransfer } from "@/components/partner-logos";

const { pricePerNight, cleaningFee, minNights, maxGuests } = APARTMENT;

type FormState = {
  name: string;
  email: string;
  phone: string;
  guests: number;
  notes: string;
};

const EMPTY_FORM: FormState = {
  name: "",
  email: "",
  phone: "",
  guests: 2,
  notes: "",
};

export function BookingWidget({ lang = "es" }: { lang?: "es" | "en" }) {
  const [unavailable, setUnavailable] = useState<Set<string>>(new Set());
  const [loadingCal, setLoadingCal] = useState(true);
  const [value, setValue] = useState<[string, string] | null>(null);
  const [hint, setHint] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<{ ref: string; in_: string; out: string; nights: number } | null>(null);
  const confirmationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (done && confirmationRef.current) {
      const timer = setTimeout(() => {
        confirmationRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 60);
      return () => clearTimeout(timer);
    }
  }, [done]);

  const loadCalendar = useCallback(async () => {
    try {
      const r = await fetch("/api/calendar", { cache: "no-store" });
      if (!r.ok) throw new Error();
      const data = (await r.json()) as { unavailable: string[] };
      setUnavailable(new Set(data.unavailable));
    } catch {
      setHint("No se pudo cargar la disponibilidad. Recarga la página.");
    } finally {
      setLoadingCal(false);
    }
  }, []);

  useEffect(() => {
    loadCalendar();
  }, [loadCalendar]);

  const quote =
    value && value[0] !== value[1] ? quoteStay(value[0], value[1], form.guests) : null;
  const nights = quote ? quote.nights : 0;
  const nightsOk = nights >= minNights;
  const subtotal = quote ? quote.lodging : 0;
  const total = quote ? quote.total : 0;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!value || !nightsOk || busy) return;
    setBusy(true);
    setError(null);
    try {
      const r = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          guests: form.guests,
          notes: form.notes.trim(),
          checkIn: value[0],
          checkOut: value[1],
        }),
      });
      let data: Record<string, unknown> = {};
      try {
        const text = await r.text();
        data = text ? JSON.parse(text) : {};
      } catch {
        data = {};
      }
      if (!r.ok) throw new Error((data.error as string) ?? "No se pudo enviar la solicitud.");
      const bookingRef = String(data.id).padStart(4, "0");
      if (typeof window !== "undefined") {
        const win = window as unknown as { dataLayer?: unknown[] };
        win.dataLayer = win.dataLayer || [];
        win.dataLayer.push({
          event: "generate_lead",
          value: total,
          currency: "EUR",
          booking_id: bookingRef,
          nights,
          check_in: value[0],
          check_out: value[1],
          guests: form.guests,
        });
      }
      setDone({
        ref: bookingRef,
        in_: value[0],
        out: value[1],
        nights,
      });
      setForm(EMPTY_FORM);
      setValue(null);
      loadCalendar();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error inesperado.");
      loadCalendar();
    } finally {
      setBusy(false);
    }
  }

  const isEn = lang === "en";

  return (
    <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
      {/* ── Calendario + Cuadro de Tarifas ── */}
      <div className="space-y-6">
        {/* Cuadro de Tarifas en fondo azul corporativo con letras blancas */}
        <div className="border border-ocean-light/40 bg-ocean p-5 text-white shadow-sm sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/15 pb-3.5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-sun-light">
              {isEn ? "Official Rates Table" : "Cuadro de Tarifas Oficiales"}
            </p>
            <p className="text-[12px] font-medium text-white/80">
              {isEn ? "Direct booking with zero commission" : "Reserva directa sin comisiones"}
            </p>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="rounded-md border border-white/15 bg-white/5 p-3.5 backdrop-blur-xs">
              <span className="block text-[10.5px] font-semibold uppercase tracking-wider text-sun-light">
                {isEn ? "High Season" : "Temporada Alta"}
              </span>
              <p className="mt-1 font-display text-2xl font-bold text-white">
                119 € <span className="text-xs font-normal text-white/70">/ {isEn ? "night" : "noche"}</span>
              </p>
              <p className="mt-1 text-[11.5px] text-white/80">
                {isEn ? "July & August" : "Julio y Agosto"}
              </p>
            </div>

            <div className="rounded-md border border-white/15 bg-white/5 p-3.5 backdrop-blur-xs">
              <span className="block text-[10.5px] font-semibold uppercase tracking-wider text-sun-light">
                {isEn ? "Mid Season" : "Temporada Media"}
              </span>
              <p className="mt-1 font-display text-2xl font-bold text-white">
                99 € <span className="text-xs font-normal text-white/70">/ {isEn ? "night" : "noche"}</span>
              </p>
              <p className="mt-1 text-[11.5px] text-white/80">
                {isEn ? "Apr, May, Jun, Sep, Dec" : "Abr, May, Jun, Sep, Dic"}
              </p>
            </div>

            <div className="rounded-md border border-white/15 bg-white/5 p-3.5 backdrop-blur-xs">
              <span className="block text-[10.5px] font-semibold uppercase tracking-wider text-sun-light">
                {isEn ? "Low Season" : "Temporada Baja"}
              </span>
              <p className="mt-1 font-display text-2xl font-bold text-white">
                79 € <span className="text-xs font-normal text-white/70">/ {isEn ? "night" : "noche"}</span>
              </p>
              <p className="mt-1 text-[11.5px] text-white/80">
                {isEn ? "Jan, Feb, Mar, Oct, Nov" : "Ene, Feb, Mar, Oct, Nov"}
              </p>
            </div>
          </div>

          <div className="mt-4 border-t border-white/10 pt-3 text-[12px] leading-relaxed text-white/90">
            <p>
              {isEn
                ? <>• Base rates for <strong>2 guests</strong> · <strong>+€10/night</strong> per additional guest (up to 4).</>
                : <>• Precios base para <strong>2 personas</strong> · <strong>+10 €/noche</strong> por persona adicional (hasta 4 huéspedes).</>}
            </p>
            <p className="mt-0.5 text-white/75">
              {isEn
                ? <>• Cleaning & linen fee: <strong>80 €</strong> per stay · Minimum stay: {minNights} nights.</>
                : <>• Gastos de limpieza y lencería: <strong>80 €</strong> por estancia · Estancia mínima: {minNights} noches.</>}
            </p>
          </div>
        </div>

        {/* Contenedor Calendario */}
        <div className="border border-line bg-cream p-5 sm:p-7">
          <div className="mb-6 flex items-baseline justify-between">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-soft">
              {isEn ? "Availability (Next 12 Months)" : "Disponibilidad (próximos 12 meses)"}
            </p>
            <p className="tnum text-sm font-semibold text-ocean-light">
              {isEn ? `from ${fmtEuro(pricePerNight)}/night` : `desde ${fmtEuro(pricePerNight)}/noche`}
            </p>
          </div>

        {loadingCal ? (
          <div className="flex h-72 items-center justify-center text-sm text-ink-soft">
            <span className="mr-3 inline-block h-4 w-4 rounded-full border-2 border-line border-t-clay spin" />
            {isEn ? "Loading calendar…" : "Cargando calendario…"}
          </div>
        ) : (
          <Calendar
            unavailable={unavailable}
            value={value}
            onChange={(v) => {
              setValue(v);
              setHint(null);
            }}
            lang={lang}
          />
        )}

        <p className="mt-5 flex items-start gap-2 text-[13px] leading-relaxed text-ink-soft">
          <IconClock className="mt-0.5 h-4 w-4 shrink-0" />
          {isEn
            ? `Minimum stay of ${minNights} nights · check-in ${APARTMENT.checkIn} · check-out ${APARTMENT.checkOut}`
            : `Estancia mínima de ${minNights} noches · check-in ${APARTMENT.checkIn} · check-out ${APARTMENT.checkOut}`}
        </p>
        {hint && (
          <p className="mt-3 border border-clay/30 bg-clay/10 px-3 py-2 text-[13px] text-clay-deep">
            {hint}
          </p>
        )}
      </div>
    </div>

    {/* ── Resumen + formulario ── */}
    <div className="lg:sticky lg:top-28 lg:self-start">
        {done ? (
          <div ref={confirmationRef} id="solicitud-enviada" className="border border-sage/40 bg-cream p-7 shadow-sm">
            <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-sage/15 text-sage">
              <IconCheck className="h-6 w-6" />
            </span>
            <h3 className="font-display text-3xl">{isEn ? "Booking Request Sent!" : "Solicitud enviada"}</h3>
            <p className="tnum mt-1 text-sm font-semibold uppercase tracking-widest text-clay">
              {isEn ? `Reference CM-${done.ref}` : `Referencia CM-${done.ref}`}
            </p>
            <dl className="mt-6 space-y-2 border-t border-line pt-5 text-[15px]">
              <div className="flex justify-between gap-4">
                <dt className="text-ink-soft">{isEn ? "Check-in" : "Llegada"}</dt>
                <dd className="text-right">{fmtLong(done.in_)}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-ink-soft">{isEn ? "Check-out" : "Salida"}</dt>
                <dd className="text-right">{fmtLong(done.out)}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-ink-soft">{isEn ? "Duration" : "Duración"}</dt>
                <dd className="tnum text-right font-semibold">
                  {done.nights} {isEn ? (done.nights === 1 ? "night" : "nights") : (done.nights === 1 ? "noche" : "noches")}
                </dd>
              </div>
            </dl>
            <p className="mt-6 text-[14px] leading-relaxed text-ink-soft">
              {isEn
                ? "We will contact you in under 24 hours to confirm your reservation and coordinate arrival details. The dates are held for you in the meantime."
                : "Te escribiremos en menos de 24 h para confirmar la estancia y coordinar la llegada. La fecha queda apartada mientras tanto."}
            </p>
            <button
              type="button"
              onClick={() => setDone(null)}
              className="mt-6 w-full border border-ink px-5 py-3 text-sm font-semibold transition-colors hover:bg-ink hover:text-cream"
            >
              {isEn ? "Search other dates" : "Buscar otras fechas"}
            </button>
          </div>
        ) : (
          <div>
            {/* Resumen */}
            <div className="border border-line bg-cream p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-soft">
                {isEn ? "Stay Summary" : "Resumen de la estancia"}
              </p>
              {value ? (
                <>
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="text-[11px] uppercase tracking-widest text-ink-soft">
                        {isEn ? "Check-in" : "Llegada"}
                      </p>
                      <p className="font-medium">{fmtLong(value[0])}</p>
                    </div>
                    <span className="font-display text-2xl text-clay">→</span>
                    <div className="text-right">
                      <p className="text-[11px] uppercase tracking-widest text-ink-soft">
                        {isEn ? "Check-out" : "Salida"}
                      </p>
                      <p className="font-medium">{fmtLong(value[1])}</p>
                    </div>
                  </div>
                  {value[0] !== value[1] ? (
                    <div
                      className={`mt-4 border-t border-line pt-4 text-[14px] ${
                        nightsOk ? "" : "text-clay-deep"
                      }`}
                    >
                      {!nightsOk ? (
                        <p>
                          {isEn
                            ? `Minimum stay of ${minNights} nights — select until at least ${fmtShort(value[0])} + ${minNights} nights.`
                            : `Estancia mínima de ${minNights} noches — selecciona hasta el ${fmtShort(value[0])} + ${minNights}.`}
                        </p>
                      ) : (
                        <>
                          <div className="flex justify-between">
                            <span className="text-ink-soft">
                              {nights} {isEn ? (nights === 1 ? "night" : "nights") : (nights === 1 ? "noche" : "noches")} ({form.guests} {isEn ? (form.guests === 1 ? "guest" : "guests") : (form.guests === 1 ? "huésped" : "huéspedes")})
                            </span>
                            <span className="tnum">{fmtEuro(subtotal)}</span>
                          </div>
                          {quote && quote.average > 0 && (
                            <p className="text-[12px] text-ink-soft/80">
                              {isEn ? `Average: ${fmtEuro(quote.average)}/night` : `Promedio: ${fmtEuro(quote.average)}/noche`}
                            </p>
                          )}
                          <div className="mt-1.5 flex justify-between">
                            <span className="text-ink-soft">
                              {isEn ? "Cleaning & linen fee" : "Gastos de limpieza y lencería"}
                            </span>
                            <span className="tnum">{fmtEuro(cleaningFee)}</span>
                          </div>
                          <div className="mt-3 flex items-baseline justify-between border-t border-line pt-3">
                            <span className="font-semibold">{isEn ? "Total" : "Total"}</span>
                            <span className="tnum font-display text-3xl text-clay">
                              {fmtEuro(total)}
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                  ) : (
                    <p className="mt-4 border-t border-line pt-4 text-[14px] text-ink-soft">
                      {isEn ? "Now select your check-out date to view pricing." : "Ahora selecciona el día de salida para ver el precio."}
                    </p>
                  )}
                </>
              ) : (
                <p className="mt-4 border-t border-line pt-4 text-[14px] leading-relaxed text-ink-soft">
                  {isEn
                    ? "Select your check-in and check-out dates on the calendar. All available dates shown are 100% live and updated in real time."
                    : "Elige en el calendario el día de llegada y el de salida. Lo que ves libre está realmente libre: cada reserva actualiza el calendario al momento."}
                </p>
              )}
            </div>

            {/* Formulario */}
            <form
              onSubmit={handleSubmit}
              className="mt-6 border border-line bg-cream p-6"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-soft">
                {isEn ? "Your Details" : "Tus datos"}
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <label className="block sm:col-span-2">
                  <span className="mb-1.5 block text-[13px] font-medium">
                    {isEn ? "Full Name *" : "Nombre y apellidos *"}
                  </span>
                  <input
                    type="text"
                    required
                    minLength={2}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder={isEn ? "John Smith" : "Ana García"}
                    className="w-full border border-line bg-linen/60 px-3 py-2.5 text-[15px] outline-none transition-colors placeholder:text-ink-soft/50 focus:border-ink"
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-[13px] font-medium">
                    {isEn ? "Email Address *" : "Email *"}
                  </span>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="john@example.com"
                    className="w-full border border-line bg-linen/60 px-3 py-2.5 text-[15px] outline-none transition-colors placeholder:text-ink-soft/50 focus:border-ink"
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-[13px] font-medium">
                    {isEn ? "Phone Number" : "Teléfono"}
                  </span>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+44 7000 000 000"
                    className="w-full border border-line bg-linen/60 px-3 py-2.5 text-[15px] outline-none transition-colors placeholder:text-ink-soft/50 focus:border-ink"
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-[13px] font-medium">
                    {isEn ? "Guests" : "Huéspedes"}
                  </span>
                  <select
                    value={form.guests}
                    onChange={(e) =>
                      setForm({ ...form, guests: Number(e.target.value) })
                    }
                    className="w-full border border-line bg-linen/60 px-3 py-2.5 text-[15px] outline-none transition-colors focus:border-ink"
                  >
                    {Array.from({ length: maxGuests }, (_, i) => i + 1).map(
                      (n) => (
                        <option key={n} value={n}>
                          {n} {isEn ? (n === 1 ? "guest" : "guests") : (n === 1 ? "persona" : "personas")}
                        </option>
                      ),
                    )}
                  </select>
                </label>
                <label className="block sm:col-span-2">
                  <span className="mb-1.5 block text-[13px] font-medium">
                    {isEn ? "Special requests or notes?" : "¿Algo que debamos saber?"}
                  </span>
                  <textarea
                    rows={3}
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    placeholder={isEn ? "Late arrival, baby cot, questions…" : "Llegada tarde, cuna, mascotas…"}
                    className="w-full resize-none border border-line bg-linen/60 px-3 py-2.5 text-[15px] outline-none transition-colors placeholder:text-ink-soft/50 focus:border-ink"
                  />
                </label>
              </div>

              {error && (
                <p className="mt-4 border border-clay/40 bg-clay/10 px-3 py-2.5 text-[13px] font-medium text-clay-deep">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={!value || !nightsOk || busy}
                className="mt-5 flex w-full items-center justify-center gap-2 bg-clay px-5 py-3.5 text-[15px] font-semibold text-cream transition-all hover:bg-clay-deep disabled:cursor-not-allowed disabled:bg-line disabled:text-ink-soft"
              >
                {busy ? (
                  <>
                    <span className="inline-block h-4 w-4 rounded-full border-2 border-cream/40 border-t-cream spin" />
                    {isEn ? "Submitting…" : "Enviando…"}
                  </>
                ) : !value || !nightsOk ? (
                  isEn ? "Select dates to submit" : "Selecciona fechas para enviar"
                ) : (
                  <>{isEn ? "Request booking" : "Solicitar reserva"} · {nights > 0 ? fmtEuro(total) : ""}</>
                )}
              </button>
              <p className="mt-3 text-center text-[12px] leading-relaxed text-ink-soft">
                {isEn
                  ? "No online charge: we hold your dates and confirm payment details securely via email or WhatsApp in under 24 hours."
                  : "Sin pago directo en la web: te apartamos las fechas y confirmamos los detalles de pago de forma segura por email o WhatsApp en menos de 24 h."}
              </p>

              {/* Formas de pago aceptadas */}
              <div className="mt-5 border-t border-line pt-4">
                <p className="mb-2.5 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-ocean-light">
                  {isEn ? "Accepted Payment Methods" : "Formas de Pago Admitidas"}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-5 rounded-lg border border-line bg-linen/50 p-3">
                  <div className="flex items-center gap-1.5">
                    <LogoPayPal className="h-6" />
                  </div>
                  <span className="h-5 w-px bg-line" />
                  <div className="flex items-center gap-1.5">
                    <LogoBankTransfer className="h-6" />
                  </div>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export function StarRow({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex gap-0.5 text-clay ${className}`}>
      {Array.from({ length: 5 }, (_, i) => (
        <IconStar key={i} className="h-3.5 w-3.5" />
      ))}
    </span>
  );
}
