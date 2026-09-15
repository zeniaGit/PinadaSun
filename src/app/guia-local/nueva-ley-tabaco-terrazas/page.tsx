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
import { VisitCounter } from "@/components/visit-counter";

export const metadata: Metadata = {
  title: "Nueva Ley del Tabaco en Terrazas de Orihuela Costa | Pinada Sun",
  description:
    "¿Qué cambia con la nueva Ley del Tabaco en las terrazas de Orihuela Costa? Lo que debes saber para tus próximas vacaciones sobre la prohibición de fumar y vapear.",
  keywords: [
    "ley tabaco terrazas",
    "fumar terrazas orihuela costa",
    "vapear bares alicante",
    "normativa tabaco hosteleria 2026",
    "turismo orihuela costa",
  ],
  alternates: {
    canonical: "https://pinadasun.com/guia-local/nueva-ley-tabaco-terrazas",
  },
  openGraph: {
    type: "article",
    locale: "es_ES",
    url: "https://pinadasun.com/guia-local/nueva-ley-tabaco-terrazas",
    siteName: "Pinada Sun",
    title: "Nueva Ley del Tabaco en las terrazas de Orihuela Costa",
    description:
      "Descubre cómo afecta el nuevo proyecto de ley del tabaco a los bares y restaurantes de Orihuela Costa.",
    images: [
      {
        url: "/images/ley-tabaco.jpg",
        width: 1200,
        height: 630,
        alt: "Terrazas libres de humo en Orihuela Costa",
      },
    ],
  },
};

export default function LeyTabacoPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "¿Qué cambia con la nueva Ley del Tabaco en las terrazas de Orihuela Costa?",
    description: "Lo que debes saber para tus próximas vacaciones sobre la normativa del tabaco y vapeadores en hostelería.",
    inLanguage: "es-ES",
    mainEntityOfPage: "https://pinadasun.com/guia-local/nueva-ley-tabaco-terrazas",
    datePublished: "2026-09-11T12:00:00+02:00",
    publisher: {
      "@type": "Organization",
      name: "Pinada Sun",
      logo: "https://pinadasun.com/images/logopinadasun.webp",
    },
    author: {
      "@type": "Organization",
      name: "Pinada Sun Guía Local",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <div className="min-h-svh bg-linen text-ink">
        <Header />

        {/* ═══ CABECERA ═══ */}
        <section className="relative bg-pine-deep text-cream pt-36 pb-20 px-5 md:px-8 overflow-hidden">
          <div className="mx-auto max-w-4xl">
            <nav className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sun-light/80">
              <Link href="/" className="hover:text-cream transition-colors">
                Inicio
              </Link>
              <span>/</span>
              <Link href="/guia-local" className="hover:text-cream transition-colors">
                Guía Local
              </Link>
              <span>/</span>
              <span className="text-cream">Actualidad</span>
            </nav>

            <span className="inline-flex items-center gap-2 rounded bg-sun/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-sun-light border border-sun/30">
              <IconShieldCheck className="h-4 w-4" />
              Actualidad / Consejos para huéspedes
            </span>

            <h1 className="mt-6 font-display text-3xl font-bold tracking-tight md:text-5xl leading-tight text-cream">
              ¿Qué cambia con la nueva Ley del Tabaco en las terrazas de Orihuela Costa?
            </h1>

            <p className="mt-5 text-base md:text-lg leading-relaxed text-cream/80 max-w-3xl">
              Lo que debes saber para tus próximas vacaciones y cómo repercutirá en el ocio de nuestra costa.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-6 border-t border-cream/15 pt-6 text-xs text-cream/60">
              <span>Publicado: Septiembre, 2026</span>
              <span>•</span>
              <span>Lectura: 3 min</span>
              <span>•</span>
              <span>Ámbito: Orihuela Costa, Turismo, Hostelería, Salud</span>
            </div>
          </div>
        </section>

        {/* ═══ CUERPO DEL ARTÍCULO ═══ */}
        <main className="mx-auto max-w-4xl px-5 py-16 md:px-8 space-y-14">
          <p className="text-sm md:text-base leading-relaxed text-ink-soft">
            Disfrutar de un café al sol por la mañana o de una cena tranquila en una terraza es uno de los mayores placeres de pasar unos días de vacaciones en Orihuela Costa. Sin embargo, en los últimos meses el sector de la hostelería y los turistas se hacen una pregunta muy repetida: <strong>¿Cómo afecta la nueva normativa sobre el tabaco a las terrazas de los bares y restaurantes?</strong>
          </p>

          <p className="text-sm md:text-base leading-relaxed text-ink-soft">
            Si estás planeando tu próxima escapada o estancia de media temporada en nuestros apartamentos, te contamos el estado actual de la medida, qué va a cambiar y cómo repercutirá en el ocio de nuestra costa.
          </p>

          <figure className="group relative overflow-hidden rounded-lg shadow-sm my-8">
            <img
              src="/images/ley-tabaco.jpg"
              alt="Terraza libre de humo en la costa"
              loading="lazy"
              className="h-[280px] w-full object-cover transition-transform duration-700 group-hover:scale-105 md:h-[400px]"
            />
            <figcaption className="absolute bottom-4 left-4 bg-pine-deep/80 px-3.5 py-1.5 text-[12px] font-medium tracking-wide text-cream backdrop-blur-xs rounded">
              Hacia un modelo de hostelería sin humo al aire libre.
            </figcaption>
          </figure>

          {/* Sección 1 */}
          <section className="space-y-4">
            <h2 className="font-display text-2xl font-bold text-ocean md:text-3xl">
              1. ¿Qué propone exactamente el nuevo proyecto de ley?
            </h2>
            <p className="text-sm md:text-base leading-relaxed text-ink-soft">
              El Consejo de Ministros aprobó el anteproyecto de reforma de la Ley del Tabaco, un movimiento legislativo que busca ampliar de forma notable los espacios libres de humo en toda España. Los puntos clave que afectarán directamente a los locales de restauración y zonas de ocio son:
            </p>

            <div className="grid gap-4 sm:grid-cols-3 pt-2">
              <div className="border border-line bg-cream p-5">
                <h3 className="font-display text-base font-bold text-ocean">
                  Adiós al humo en terrazas
                </h3>
                <p className="mt-2 text-xs md:text-sm text-ink-soft leading-relaxed">
                  La norma contempla la prohibición de fumar en <strong>cualquier terraza de bares y restaurantes</strong>, eliminando las antiguas diferencias entre espacios completamente abiertos o aquellos semicerrados con toldos, mamparas o pérgolas.
                </p>
              </div>

              <div className="border border-line bg-cream p-5">
                <h3 className="font-display text-base font-bold text-ocean">
                  Tabaco y vapeadores
                </h3>
                <p className="mt-2 text-xs md:text-sm text-ink-soft leading-relaxed">
                  Los cigarrillos electrónicos, vapers (con o sin nicotina) y los dispositivos de tabaco calentado quedan <strong>estrictamente equiparados</strong> al tabaco tradicional. Tampoco se podrán utilizar en las zonas de terraza.
                </p>
              </div>

              <div className="border border-line bg-cream p-5">
                <h3 className="font-display text-base font-bold text-ocean">
                  Nuevos entornos
                </h3>
                <p className="mt-2 text-xs md:text-sm text-ink-soft leading-relaxed">
                  Se extienden las restricciones a zonas al aire libre muy concurridas en época estival, como playas, piscinas públicas o recintos deportivos.
                </p>
              </div>
            </div>
          </section>

          {/* Sección 2 */}
          <section className="space-y-4">
            <h2 className="font-display text-2xl font-bold text-ocean md:text-3xl">
              2. ¿Está ya en vigor esta prohibición en Orihuela Costa?
            </h2>
            <p className="text-sm md:text-base leading-relaxed text-ink-soft">
              Este es el punto que genera más dudas entre los visitantes. <strong>A fecha de hoy, la prohibición en terrazas aún no es efectiva de forma inmediata.</strong>
            </p>
            <div className="border border-line bg-cream p-6 space-y-4">
              <p className="text-xs md:text-sm text-ink-soft leading-relaxed">
                La medida aprobada por el Gobierno es un <strong>proyecto de ley</strong> que actualmente se encuentra en trámite en las Cortes Generales para su debate y posibles modificaciones.
              </p>
              <ul className="list-disc list-inside space-y-2 text-xs md:text-sm text-ink-soft">
                <li>Mientras se completa este proceso parlamentario y se publica de forma definitiva en el Boletín Oficial del Estado (BOE), <strong>sigue rigiendo la normativa anterior</strong>.</li>
                <li>Esto significa que, con carácter general, todavía se puede fumar en aquellas terrazas donde los establecimientos lo permitan, siempre respetando las ordenanzas locales o las normas específicas que cada local decida aplicar por iniciativa propia.</li>
              </ul>
            </div>
          </section>

          {/* Sección 3 */}
          <section className="space-y-4">
            <h2 className="font-display text-2xl font-bold text-ocean md:text-3xl">
              3. Un valor en alza: El turismo de bienestar y espacios limpios
            </h2>
            <p className="text-sm md:text-base leading-relaxed text-ink-soft">
              Independientemente de los plazos legislativos, la tendencia en la hostelería de la Costa Blanca camina claramente hacia la creación de espacios más saludables y respetuosos. Para muchos viajeros —especialmente familias con niños o personas que prefieren ambientes libres de humos—, el auge de las terrazas 100% limpias es un atractivo muy valorado a la hora de elegir dónde comer, tomar algo o pasar las vacaciones.
            </p>

            <figure className="group relative overflow-hidden rounded-lg shadow-sm my-6">
              <img
                src="/images/smoke-free-terrace.jpg"
                alt="Turistas disfrutando de una terraza libre de humos"
                loading="lazy"
                className="h-[280px] w-full object-cover transition-transform duration-700 group-hover:scale-105 md:h-[400px]"
              />
              <figcaption className="absolute bottom-4 left-4 bg-pine-deep/80 px-3.5 py-1.5 text-[12px] font-medium tracking-wide text-cream backdrop-blur-xs rounded">
                Turismo de bienestar en ambientes saludables.
              </figcaption>
            </figure>
            
            <div className="bg-linen p-5 border border-line mt-4">
              <p className="text-sm leading-relaxed text-ink-soft">
                En <strong>Pinada Sun</strong>, apostamos por un turismo de calidad, enfocado al descanso, la tranquilidad y el bienestar en un entorno privilegiado de Orihuela Costa. Ya sea que busques estancias de media temporada o unos días de desconexión, mantenerte informado sobre estos cambios te ayudará a planificar cada detalle de tu viaje con total comodidad.
              </p>
            </div>
            
            <p className="text-sm italic text-ink-soft mt-4">
              ¿Tienes alguna duda sobre tu próxima reserva o necesitas recomendaciones de locales adaptados en la zona? ¡Escríbenos o déjanos un comentario!
            </p>
          </section>

          {/* Tarjeta de Alojamiento Recomendado */}
          <div className="border border-line bg-pine-deep text-cream p-8 md:p-10 shadow-lg mt-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-sun-light text-xs font-semibold uppercase tracking-wider">
                <IconStar className="h-4 w-4 fill-sun text-sun" />
                <span>Alojamiento de Calidad en Orihuela Costa</span>
              </div>
              <h3 className="font-display text-2xl font-bold text-cream">
                Disfruta de Pinada Sun con total tranquilidad
              </h3>
              <p className="text-xs md:text-sm text-cream/80 max-w-xl">
                Apartamento exclusivo con gran terraza privada, piscina comunitaria y barbacoa en Villamartín. Reserva directa sin comisiones.
              </p>
            </div>

            <Link
              href="/#reserva"
              className="inline-flex items-center justify-center gap-2 bg-sun px-6 py-3.5 text-xs md:text-sm font-semibold text-pine-deep shadow-md hover:bg-sun-light transition-all shrink-0"
            >
              Consultar fechas libres
              <IconArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-line bg-cream py-8 text-center text-xs text-ink-soft">
          <div className="mx-auto max-w-4xl px-5 space-y-2">
            <p>© 2026 {APARTMENT.name} · {APARTMENT.domain}</p>
            <div className="flex justify-center gap-4 text-ocean">
              <Link href="/guia-local" className="hover:underline">
                ← Volver a la Guía Local
              </Link>
              <span>•</span>
              <Link href="/" className="hover:underline">
                Inicio
              </Link>
            </div>
          </div>
        </footer>
        <VisitCounter pagePath="/guia-local/nueva-ley-tabaco-terrazas" />
      </div>
    </>
  );
}
