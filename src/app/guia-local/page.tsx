import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import {
  IconArrowRight,
  IconShieldCheck,
  IconClock,
  IconStar,
} from "@/components/icons";
import { APARTMENT } from "@/lib/apartment";

export const metadata: Metadata = {
  title: "Guía Local de Orihuela Costa & Villamartín | Consejos, Normas y Experiencias",
  description:
    "Descubre la Guía Local de Orihuela Costa y Villamartín creada por Pinada Sun: costumbres, gastronomía típica, ordenanzas municipales, playas con Bandera Azul y consejos para tu viaje.",
  keywords: [
    "guia local orihuela costa",
    "guia turismo villamartin",
    "que hacer en orihuela costa",
    "consejos vacaciones orihuela costa",
    "normas y costumbres alicante",
  ],
  alternates: {
    canonical: "https://pinadasun.com/guia-local",
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://pinadasun.com/guia-local",
    siteName: "Pinada Sun",
    title: "Guía Local de Orihuela Costa y Villamartín | Pinada Sun",
    description:
      "Artículos y guías locales para aprovechar al máximo tu estancia en Orihuela Costa.",
    images: [
      {
        url: "/images/terrace-hero.webp",
        width: 1200,
        height: 630,
        alt: "Guía Local de Orihuela Costa",
      },
    ],
  },
};

const ARTICLES = [
  {
    slug: "/guia-local/costumbres-y-normas",
    badge: "Costumbres & Usos",
    title: "Costumbres locales y normas prácticas en Orihuela Costa: Guía para el viajero",
    desc: "Aprende los usos del sur de Alicante: vestimenta en comercios, pago en hostelería, tapas típicas (marineras, arroz del senyoret) y conducción en rotondas.",
    readTime: "4 min",
  },
  {
    slug: "/guia-normativa-orihuela-costa",
    badge: "Ordenanzas & Playas",
    title: "Normas, playas y ordenanzas municipales en Orihuela Costa",
    desc: "Regulación de patinetes eléctricos (VMP), horarios de descanso vecinal, horarios de socorristas y significado oficial de las banderas de baño.",
    readTime: "5 min",
  },
];

export default function GuiaLocalHubPage() {
  return (
    <div className="min-h-svh bg-linen text-ink">
      <Header />

      {/* ═══ CABECERA DEL HUB ═══ */}
      <section className="relative bg-pine-deep text-cream pt-36 pb-20 px-5 md:px-8 overflow-hidden">
        <div className="mx-auto max-w-5xl">
          <nav className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sun-light/80">
            <Link href="/" className="hover:text-cream transition-colors">
              Inicio
            </Link>
            <span>/</span>
            <span className="text-cream">Guía Local</span>
          </nav>

          <span className="inline-flex items-center gap-2 rounded bg-sun/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-sun-light border border-sun/30">
            <IconShieldCheck className="h-4 w-4" />
            Conocimiento y Consejos de Expertos Locales
          </span>

          <h1 className="mt-6 font-display text-4xl font-bold tracking-tight md:text-6xl leading-tight text-cream">
            Guía Local de Orihuela Costa
          </h1>

          <p className="mt-5 text-base md:text-lg leading-relaxed text-cream/80 max-w-3xl">
            Todo lo que necesitas saber para disfrutar de una estancia perfecta en Villamartín y Orihuela Costa: normas, costumbres, playas, gastronomía y recomendaciones directas de anfitriones.
          </p>
        </div>
      </section>

      {/* ═══ LISTADO DE ARTÍCULOS ═══ */}
      <main className="mx-auto max-w-5xl px-5 py-16 md:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          {ARTICLES.map((art) => (
            <article
              key={art.slug}
              className="flex flex-col justify-between border border-line bg-cream p-7 sm:p-8 shadow-xs hover:shadow-md transition-all group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="bg-sun/15 text-sun-dark px-2.5 py-1 text-[11px] uppercase tracking-wider text-amber-800">
                    {art.badge}
                  </span>
                  <span className="flex items-center gap-1 text-ink-soft">
                    <IconClock className="h-3.5 w-3.5" />
                    {art.readTime}
                  </span>
                </div>

                <h2 className="font-display text-xl sm:text-2xl font-bold text-ocean group-hover:text-ocean-light transition-colors leading-snug">
                  <Link href={art.slug}>{art.title}</Link>
                </h2>

                <p className="text-xs sm:text-sm leading-relaxed text-ink-soft">
                  {art.desc}
                </p>
              </div>

              <div className="mt-6 border-t border-line pt-4">
                <Link
                  href={art.slug}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-ocean hover:text-ocean-light transition-colors"
                >
                  Leer guía completa
                  <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Tarjeta de Alojamiento Recomendado */}
        <div className="border border-line bg-pine-deep text-cream p-8 md:p-10 shadow-lg mt-16 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-sun-light text-xs font-semibold uppercase tracking-wider">
              <IconStar className="h-4 w-4 fill-sun text-sun" />
              <span>Alojamiento de Calidad en Orihuela Costa</span>
            </div>
            <h3 className="font-display text-2xl font-bold text-cream">
              {APARTMENT.name} · {APARTMENT.neighborhood}
            </h3>
            <p className="text-xs md:text-sm text-cream/80 max-w-xl">
              {APARTMENT.subtitle}. Reserva directa oficial sin intermediarios al mejor precio garantizado.
            </p>
          </div>

          <Link
            href="/#reserva"
            className="inline-flex items-center justify-center gap-2 bg-sun px-6 py-3.5 text-xs md:text-sm font-semibold text-pine-deep shadow-md hover:bg-sun-light transition-all shrink-0"
          >
            Reservar estancia
            <IconArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-line bg-cream py-8 text-center text-xs text-ink-soft">
        <div className="mx-auto max-w-5xl px-5 space-y-2">
          <p>© 2026 {APARTMENT.name} · {APARTMENT.domain}</p>
          <p>
            <Link href="/" className="text-ocean underline hover:text-ocean-light">
              ← Volver a la página principal
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
