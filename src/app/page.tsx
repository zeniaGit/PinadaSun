import Image from "next/image";
import { Header } from "@/components/header";
import { Reveal, MaskLines } from "@/components/reveal";
import { BookingWidget, StarRow } from "@/components/booking/booking-widget";
import { GallerySlider, DetailPhotoGrid } from "@/components/gallery-slider";
import { InteractiveMap } from "@/components/interactive-map";
import { Logo } from "@/components/logo";
import {
  PartnerTrustBar,
  LogoAirbnb,
  LogoBooking,
  LogoVrbo,
  LogoPayPal,
  LogoBankTransfer,
} from "@/components/partner-logos";
import {
  IconArrowDown,
  IconArrowRight,
  IconClock,
  IconMail,
  IconPhone,
  IconPin,
  IconStar,
  AmenityIcon,
  IconShieldCheck,
  IconWhatsApp,
  IconExternalLink,
} from "@/components/icons";
import {
  APARTMENT,
  AMENITIES,
  GUARANTEES,
  GALLERY,
  DETAIL_PHOTOS,
  IMAGES,
  MARQUEE_ITEMS,
  PLACES,
  REVIEWS,
} from "@/lib/apartment";
import { fmtEuro } from "@/lib/dates";

function SectionLabel({
  children,
  color = "gold",
}: {
  children: React.ReactNode;
  color?: "gold" | "pine" | "clay" | "ocean";
}) {
  const colorClass =
    color === "gold"
      ? "text-sun"
      : color === "pine" || color === "ocean"
      ? "text-ocean-light"
      : "text-clay";

  const lineClass =
    color === "gold"
      ? "bg-sun"
      : color === "pine" || color === "ocean"
      ? "bg-ocean-light"
      : "bg-clay";

  return (
    <p
      className={`mb-4 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] ${colorClass}`}
    >
      <span className={`h-px w-8 ${lineClass}`} />
      {children}
    </p>
  );
}

export default function Home() {
  return (
    <div id="top" className="overflow-x-clip bg-linen">
      <Header />

      {/* ═══ HERO ═══ */}
      <section className="relative flex min-h-svh flex-col justify-end">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={IMAGES.hero}
            alt="Gran terraza privada de Pinada Sun con pérgola y barbacoa"
            className="kb object-cover"
            fill
            priority
            sizes="100vw"
            quality={85}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-pine-deep via-pine-deep/70 to-pine-deep/40" />
          <div className="absolute inset-0 bg-black/25" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-16 pt-40 md:px-8 md:pb-20">
          <MaskLines
            lines={["VIVIENDA VACACIONAL DE ALTA GAMA", "VILLAMARTÍN · ORIHUELA COSTA"]}
            lineClassName="hero-badge-shadow text-[11px] font-body font-semibold uppercase tracking-[0.32em] text-sun-light"
            delay={100}
            stagger={100}
          />

          <h1 className="hero-title-shadow mt-6 font-display text-[13vw] leading-[0.95] tracking-tight text-cream sm:text-[10vw] md:text-[6.8vw]">
            <MaskLines
              lines={["El sol del Mediterráneo,", "el confort más exclusivo."]}
              lineClassName=""
              delay={350}
              stagger={160}
            />
          </h1>

          <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <Reveal delay={900}>
              <p className="hero-text-shadow tnum max-w-lg text-[15.5px] font-medium leading-relaxed text-cream/95">
                {APARTMENT.bedrooms} dormitorios confort · hasta {APARTMENT.maxGuests}{" "}
                huéspedes · {APARTMENT.surface} m² · Planta baja con gran terraza privada,
                barbacoa y piscina comunitaria.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <a
                  href="#reserva"
                  className="group inline-flex items-center gap-3 bg-sun px-6 py-3.5 text-[15px] font-semibold text-pine-deep shadow-lg shadow-black/40 transition-all hover:bg-sun-light gold-glow"
                >
                  <span>Reservar directo · Mejor precio garantizado</span>
                  <IconArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                </a>
                <a
                  href="#calidades"
                  className="hero-text-shadow text-[14px] font-medium text-cream underline decoration-sun/60 underline-offset-4 transition-colors hover:text-sun-light"
                >
                  Conocer nuestras calidades →
                </a>
              </div>
              <p className="hero-text-shadow mt-4 text-[11px] uppercase tracking-[0.22em] text-cream/50">
                Sin comisiones · Confirmación en menos de 24 h · Trato personal directo
              </p>
            </Reveal>

            <Reveal delay={1050} className="md:pb-1">
              <div className="flex items-center gap-4 rounded-xl border border-cream/15 bg-pine-deep/40 p-4 backdrop-blur-md">
                <StarRow className="text-sun-light drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]" />
                <div className="text-right">
                  <p className="hero-title-shadow tnum font-display text-3xl text-cream">
                    desde {fmtEuro(APARTMENT.pricePerNight)}
                  </p>
                  <p className="hero-badge-shadow text-[11px] uppercase tracking-widest text-cream/80">
                    tarifa directa oficial
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="absolute bottom-8 right-6 z-10 hidden flex-col items-center gap-3 md:flex">
          <span className="text-[10px] uppercase tracking-[0.3em] text-cream/60 [writing-mode:vertical-rl]">
            Explorar
          </span>
          <span className="cue-line block h-12 w-px bg-sun/60" />
        </div>
      </section>

      {/* ═══ MARQUESINA ═══ */}
      <div className="overflow-hidden border-y border-sun/20 bg-pine-deep py-3 text-cream">
        <div className="marquee-track flex w-max items-center gap-8 whitespace-nowrap">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              aria-hidden={copy === 1}
              className="flex items-center gap-8"
            >
              {MARQUEE_ITEMS.map((item: string) => (
                <span
                  key={item}
                  className="flex items-center gap-8 text-[12.5px] font-medium uppercase tracking-[0.2em] text-cream/90"
                >
                  {item}
                  <IconStar className="h-3 w-3 text-sun" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ═══ TRUST BAR PARTNERS (AIRBNB, BOOKING, VRBO) ═══ */}
      <PartnerTrustBar />

      {/* ═══ MANIFIESTO DE MARCA ═══ */}
      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <SectionLabel color="gold">Pinada Sun · Estancia Exclusiva</SectionLabel>
            <Reveal>
              <p className="font-display text-4xl leading-[1.1] tracking-tight md:text-6xl text-ink">
                Un refugio luminoso donde el confort lo es todo:{" "}
                <span className="text-pine">gran terraza con barbacoa</span>, piscina y la tranquilidad de Orihuela Costa a pasos de{" "}
                <em className="text-clay italic">Zenia Boulevard y las calas</em>.
              </p>
            </Reveal>
          </div>
          <div className="flex flex-col justify-end gap-8 md:col-span-5 md:pl-8">
            <Reveal delay={150}>
              <p className="text-[16px] leading-relaxed text-ink-soft">
                Diseñado para quienes buscan una experiencia superior a un alquiler convencional. En Pinada Sun cuidamos cada detalle: descanso garantizado en camas de confort premium, climatización eficiente, cocina completamente equipada y una terraza privada donde el sol y las sobremesas son los protagonistas.
              </p>
            </Reveal>
            <div className="grid grid-cols-4 gap-4 border-t border-line pt-6">
              {[
                { n: `${APARTMENT.surface}`, l: "m² privados" },
                { n: `${APARTMENT.bedrooms}`, l: "dormitorios" },
                { n: `${APARTMENT.maxGuests}`, l: "huéspedes" },
                { n: "5'", l: "a Zenia" },
              ].map((s, i) => (
                <Reveal key={s.l} delay={200 + i * 100}>
                  <p className="tnum font-display text-3xl md:text-4xl text-pine">
                    {s.n}
                  </p>
                  <p className="mt-1 text-[11px] uppercase tracking-widest text-ink-soft">
                    {s.l}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ GARANTÍA & AUTORIDAD (NUEVO BLOQUE) ═══ */}
      <section id="calidades" className="border-y border-line bg-paper/60 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="max-w-2xl">
            <SectionLabel color="gold">Estándar de Excelencia</SectionLabel>
            <Reveal>
              <h2 className="font-display text-4xl leading-tight tracking-tight md:text-5xl text-ink">
                Compromiso de calidad y garantía de estancia
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="mt-4 text-[16px] leading-relaxed text-ink-soft">
                Trato directo con los propietarios, preparamos cada estancia como si fuera la primera vez y cuidamos cada detalle para que tus vacaciones sean perfectas.
              </p>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {GUARANTEES.map((g, i) => (
              <Reveal key={g.title} delay={i * 90}>
                <div className="flex h-full flex-col border border-line bg-cream p-7 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-sun hover:shadow-md">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-pine text-sun">
                    <AmenityIcon name={g.icon} className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 font-display text-xl tracking-tight text-ink">
                    {g.title}
                  </h3>
                  <p className="mt-2.5 flex-1 text-[14px] leading-relaxed text-ink-soft">
                    {g.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ EL ESPACIO & CALIDADES ═══ */}
      <section id="espacio" className="bg-cream">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 py-24 md:px-8 md:py-32 lg:grid-cols-2 lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionLabel color="pine">El Apartamento</SectionLabel>
            <Reveal>
              <h2 className="font-display text-4xl leading-tight tracking-tight md:text-5xl text-ink">
                Equipamiento de alta gama
                <br />
                pensado para tu confort
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-6 max-w-md text-[16px] leading-relaxed text-ink-soft">
                Desde la terraza con barbacoa hasta la ducha XL de 150 cm y la climatización integral, cada estancia combina diseño contemporáneo y funcionalidad absoluta:
              </p>
            </Reveal>

            <div className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
              {AMENITIES.map((a, i) => (
                <Reveal key={a.title} delay={i * 70}>
                  <div className="group flex gap-4">
                    <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center border border-line bg-linen text-pine transition-all duration-300 group-hover:border-sun group-hover:bg-pine group-hover:text-sun">
                      <AmenityIcon name={a.icon} className="h-5.5 w-5.5" />
                    </span>
                    <div>
                      <p className="text-[15px] font-semibold text-ink">{a.title}</p>
                      <p className="mt-0.5 text-[13.5px] leading-snug text-ink-soft">
                        {a.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <Reveal>
              <figure className="group relative overflow-hidden shadow-sm">
                <img
                  src={IMAGES.spaceA}
                  alt="Salón amplio y luminoso de Pinada Sun"
                  loading="lazy"
                  className="h-[340px] w-full object-cover transition-transform duration-700 group-hover:scale-105 md:h-[430px]"
                />
                <figcaption className="absolute bottom-4 left-4 bg-pine-deep/80 px-3.5 py-1.5 text-[12px] font-medium tracking-wide text-cream backdrop-blur-xs">
                  Salón luminoso con climatización y zona de comedor
                </figcaption>
              </figure>
            </Reveal>
            <Reveal delay={120} className="lg:ml-14">
              <figure className="group relative overflow-hidden shadow-sm">
                <img
                  src={IMAGES.spaceB}
                  alt="Dormitorio principal con cama de matrimonio de gran confort"
                  loading="lazy"
                  className="h-[320px] w-full object-cover transition-transform duration-700 group-hover:scale-105 md:h-[400px]"
                />
                <figcaption className="absolute bottom-4 left-4 bg-pine-deep/80 px-3.5 py-1.5 text-[12px] font-medium tracking-wide text-cream backdrop-blur-xs">
                  Dormitorio principal con cama de matrimonio
                </figcaption>
              </figure>
            </Reveal>

            {/* Fotos de detalles y estancias verticales con Lightbox */}
            <Reveal delay={160} className="lg:ml-7">
              <div className="border-t border-line/60 pt-6">
                <p className="mb-3 text-[11.5px] font-semibold uppercase tracking-[0.24em] text-ocean-light">
                  Detalles & Acabados de Calidad
                </p>
                <DetailPhotoGrid items={DETAIL_PHOTOS} />
              </div>
            </Reveal>

            <Reveal delay={200} className="lg:ml-7">
              <div className="border-l-2 border-sun pl-6">
                <p className="font-display text-2xl leading-snug text-ink">
                  “Desayunar al sol en la terraza privada y relajarse en la piscina al atardecer es una experiencia inmejorable.”
                </p>
                <p className="mt-3 text-[13px] uppercase tracking-widest text-ink-soft">
                  — Lo que más repiten quienes vuelven
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ GALERÍA ═══ */}
      <section id="galeria" className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <SectionLabel color="gold">Galería Fotográfica</SectionLabel>
              <Reveal>
                <h2 className="font-display text-4xl tracking-tight md:text-5xl text-ink">
                  Espacios diseñados
                  <br />
                  para vivir y disfrutar
                </h2>
              </Reveal>
            </div>
            <Reveal delay={150}>
              <p className="flex items-center gap-2 text-[13.5px] font-medium text-ink-soft">
                Explora cada rincón
                <IconArrowRight className="h-4 w-4 text-sun" />
              </p>
            </Reveal>
          </div>
        </div>

        <GallerySlider items={GALLERY} />
      </section>

      {/* ═══ ESCENA NARRATIVA ═══ */}
      <section className="bg-linen py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-5 text-center md:px-8">
          <Reveal>
            <p className="font-display text-2xl leading-relaxed text-ink md:text-3xl">
              &ldquo;Son las 9 de la mañana. El café huele bien,
              la terraza tiene sol desde primera hora
              y las calas están a diez minutos.&rdquo;
            </p>
            <p className="mt-5 text-[14px] uppercase tracking-[0.28em] text-ink-soft">
              Este es el ritmo de Pinada Sun.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══ EL ENTORNO ═══ */}
      <section id="entorno" className="bg-pine text-cream">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 py-24 md:px-8 md:py-32 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <p className="mb-4 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-sun-light">
              <span className="h-px w-8 bg-sun" />
              Ubicación Privilegiada
            </p>
            <Reveal>
              <h2 className="font-display text-4xl leading-tight tracking-tight md:text-5xl">
                Orihuela Costa.
                <br />
                Golf, calas de ensueño y sol.
              </h2>
            </Reveal>
            <Reveal delay={150}>
              <p className="mt-5 text-[15px] leading-relaxed text-cream/80">
                Situado en el tranquilo residencial de Villamartín, a pocos minutos de las mejores playas con bandera azul de la Costa Blanca y frente a campos de golf de renombre internacional.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <figure className="group relative mt-8 overflow-hidden rounded-lg">
                <img
                  src={IMAGES.beach}
                  alt="Calas y playas de Orihuela Costa a pocos minutos de Pinada Sun"
                  loading="lazy"
                  className="h-[280px] w-full object-cover transition-transform duration-700 group-hover:scale-105 md:h-[360px]"
                />
              </figure>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <div className="divide-y divide-cream/15 border-y border-cream/15">
              {PLACES.map((p, i) => (
                <Reveal key={p.name} delay={i * 80}>
                  <div className="group flex items-baseline justify-between gap-6 py-5 transition-colors">
                    <div className="flex-1">
                      <p className="font-display text-2xl transition-colors group-hover:text-sun-light md:text-[28px]">
                        {p.name}
                      </p>
                      <p className="mt-1 text-[14px] text-cream/70">{p.desc}</p>
                    </div>
                    <div className="shrink-0 text-right space-y-1">
                      <span className="inline-block rounded bg-sun/15 px-2.5 py-0.5 text-[12px] font-bold text-sun-light border border-sun/30">
                        {p.distance}
                      </span>
                      <p className="tnum text-[12px] font-medium uppercase tracking-wider text-cream/80">
                        {p.time}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={200}>
              <figure className="group relative mt-10 overflow-hidden rounded-lg">
                <img
                  src={IMAGES.cathedral}
                  alt="Terraza soleada y entorno residencial"
                  loading="lazy"
                  className="h-[220px] w-full object-cover transition-transform duration-700 group-hover:scale-105 md:h-[280px]"
                />
                <figcaption className="absolute bottom-4 left-4 bg-pine-deep/80 px-3.5 py-1.5 text-[12px] font-medium tracking-wide text-cream backdrop-blur-xs">
                  Porche exterior y barbacoa
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>

        {/* ── MAPA INTERACTIVO CON MARCADOR DE CASA ── */}
        <Reveal delay={250} className="mt-14">
          <InteractiveMap lang="es" />
        </Reveal>
      </section>

      {/* ═══ OPINIONES ═══ */}
      <section id="opiniones" className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <div className="mb-12 max-w-2xl">
          <SectionLabel color="gold">Opiniones Verificadas</SectionLabel>
          <Reveal>
            <h2 className="font-display text-4xl tracking-tight md:text-5xl text-ink">
              La experiencia de nuestros huéspedes
            </h2>
          </Reveal>
        </div>

        <div className="grid gap-10 md:grid-cols-3 md:gap-8">
          {REVIEWS.map((r, i) => (
            <Reveal
              key={r.author}
              delay={i * 120}
              className={i === 1 ? "md:translate-y-8" : ""}
            >
              <blockquote className="flex h-full flex-col border border-line bg-cream p-7 shadow-xs">
                <StarRow className="text-sun" />
                <p className="mt-5 flex-1 font-display text-[20px] leading-snug text-ink">
                  “{r.quote}”
                </p>
                <footer className="mt-6 border-t border-line pt-4">
                  <p className="text-[14px] font-semibold text-ink">{r.author}</p>
                  <p className="text-[12px] uppercase tracking-widest text-ink-soft">
                    {r.from}
                  </p>
                </footer>
              </blockquote>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══ RESERVA DIRECTA ═══ */}
      <section id="reserva" className="border-t border-line bg-paper/60">
        <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
          <div className="mb-14 max-w-2xl">
            <SectionLabel color="gold">Reserva Directa Oficial</SectionLabel>
            <Reveal>
              <h2 className="font-display text-4xl tracking-tight md:text-6xl text-ink">
                Selecciona tus fechas
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-5 text-[16px] leading-relaxed text-ink-soft">
                Disponibilidad actualizada en tiempo real. Al reservar directamente en <strong className="text-ink">pinadasun.com</strong> disfrutas de la mejor tarifa garantizada, sin comisiones de terceros y con confirmación directa en menos de 24 horas.
              </p>
            </Reveal>
          </div>
          <Reveal delay={150}>
            <BookingWidget />
          </Reveal>
          <Reveal delay={250}>
            <div className="mt-10 border-l-2 border-sun pl-6 max-w-xl">
              <p className="font-display text-xl leading-snug text-ink">
                Mínimo 11 noches: porque las vacaciones de verdad merecen tiempo.
              </p>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
                El suficiente para desconectar, explorar la costa y volver a casa sintiéndote otro.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="bg-pine-deep text-cream">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:grid-cols-3 md:px-8">
          <div>
            <Logo isLight className="mb-4" />
            <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-cream/70">
              {APARTMENT.subtitle}. Trato directo y exclusivo: te asistimos personalmente antes, durante y después de tu estancia.
            </p>
            <div className="mt-6 flex items-center gap-2 text-[13px] font-medium text-sun-light">
              <IconShieldCheck className="h-4 w-4" />
              <span>Garantía de Reserva Oficial · pinadasun.com</span>
            </div>
            <a
              href="#reserva"
              className="group mt-6 inline-flex items-center gap-2 text-[14px] font-semibold text-sun-light transition-colors hover:text-cream"
            >
              Consultar fechas libres
              <IconArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>

          <div className="space-y-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-sun-light">
              Contacto Directo
            </p>
            <a
              href={`mailto:${APARTMENT.email}`}
              className="flex items-center gap-3 text-[15px] text-cream/90 transition-colors hover:text-sun-light"
            >
              <IconMail className="h-4.5 w-4.5 text-sun-light shrink-0" />
              <span>{APARTMENT.email}</span>
            </a>
            <a
              href={`tel:${APARTMENT.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-3 text-[15px] text-cream/90 transition-colors hover:text-sun-light"
            >
              <IconPhone className="h-4.5 w-4.5 text-sun-light shrink-0" />
              <span>{APARTMENT.phone}</span>
            </a>
            <a
              href={APARTMENT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-[15px] text-cream/90 transition-colors hover:text-emerald-400"
            >
              <IconWhatsApp className="h-4.5 w-4.5 text-emerald-400 shrink-0" />
              <span>WhatsApp: {APARTMENT.whatsapp}</span>
            </a>
            <p className="flex items-center gap-3 text-[15px] text-cream/90">
              <IconPin className="h-4.5 w-4.5 text-sun-light shrink-0" />
              <span>{APARTMENT.address}</span>
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-sun-light">
              La Vivienda
            </p>
            <p className="flex items-center gap-3 text-[15px] text-cream/90">
              <IconClock className="h-4.5 w-4.5 text-sun-light shrink-0" />
              Check-in {APARTMENT.checkIn} · Check-out {APARTMENT.checkOut}
            </p>
            <p className="text-[14px] leading-relaxed text-cream/70">
              Condiciones claras y cancelación flexible. Máxima higiene certificada antes de cada llegada.
            </p>
            <p className="tnum text-[12.5px] text-cream/50">
              {APARTMENT.ibl}
            </p>
          </div>
        </div>

        {/* Badges de plataformas y métodos de pago en Footer */}
        <div className="border-t border-cream/10 bg-black/15 py-6">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-5 md:px-8">
            <p className="text-[11.5px] uppercase tracking-widest text-cream/60">
              Partners Oficiales & Métodos de Pago Seguros:
            </p>
            <div className="flex flex-wrap items-center gap-6 text-cream/80 sm:gap-8">
              <LogoAirbnb className="h-5.5 text-cream" />
              <LogoBooking className="h-5.5 text-cream" />
              <LogoVrbo className="h-5.5 text-cream" />
              <span className="hidden h-4 w-px bg-cream/20 md:block" />
              <div className="rounded-md bg-white/10 px-2.5 py-1">
                <LogoPayPal className="h-5" />
              </div>
              <div className="rounded-md bg-white/10 px-2.5 py-1">
                <LogoBankTransfer className="h-5 text-cream" />
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-cream/10">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-6 text-[12px] text-cream/50 md:px-8">
            <div className="flex flex-wrap items-center gap-4">
              <p>© 2026 {APARTMENT.name} · {APARTMENT.domain} · Todos los derechos reservados.</p>
              <span className="hidden sm:inline text-cream/20">|</span>
              <a
                href="/guia-local"
                className="transition-colors hover:text-sun-light underline"
              >
                Guía Local de Orihuela Costa
              </a>
            </div>
            <a href="/panel" className="transition-colors hover:text-sun-light">
              Panel de administración →
            </a>
          </div>
        </div>
      </footer>

      {/* ═══ BOTÓN FLOTANTE WHATSAPP ═══ */}
      <a
        href={APARTMENT.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="group fixed bottom-6 right-6 z-40 flex items-center gap-2.5 rounded-full bg-[#25D366] px-4 py-3 text-white shadow-lg shadow-black/30 transition-all duration-300 hover:bg-[#20ba5a] hover:scale-105 hover:shadow-xl active:scale-95"
      >
        <IconWhatsApp className="h-5 w-5 fill-white text-white" />
        <span className="hidden text-[13px] font-semibold tracking-wide sm:inline">
          WhatsApp
        </span>
      </a>
    </div>
  );
}
