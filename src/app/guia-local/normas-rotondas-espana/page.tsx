import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import {
  IconArrowRight,
  IconShieldCheck,
  IconStar,
} from "@/components/icons";
import { APARTMENT } from "@/lib/apartment";
import { VisitCounter } from "@/components/visit-counter";

export const metadata: Metadata = {
  title: "Normas de Circulación en Rotondas en España | Guía Local",
  description:
    "Descubre por qué hay tantos accidentes en las rotondas en España y cómo circular correctamente según la Ley de Seguridad Vial: siempre salir por el carril exterior.",
  keywords: [
    "normas rotondas españa",
    "como circular rotonda dgt",
    "carril exterior rotonda",
    "accidentes glorietas",
    "ceder el paso rotonda",
  ],
  alternates: {
    canonical: "https://pinadasun.com/guia-local/normas-rotondas-espana",
  },
  openGraph: {
    type: "article",
    locale: "es_ES",
    url: "https://pinadasun.com/guia-local/normas-rotondas-espana",
    siteName: "Pinada Sun",
    title: "Normas de Circulación en Rotondas en España",
    description:
      "Aprende la norma de oro para evitar accidentes en las rotondas de España: salir siempre por el carril exterior.",
    images: [
      {
        url: "/images/rotonda.jpg",
        width: 1200,
        height: 1200,
        alt: "Normas de circulación en rotondas",
      },
    ],
  },
};

export default function NormasRotondasPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Normas de Circulación en Rotondas en España",
    description:
      "Descubre por qué hay tantos accidentes en las rotondas en España y cómo circular correctamente según la Ley de Seguridad Vial.",
    inLanguage: "es-ES",
    mainEntityOfPage: "https://pinadasun.com/guia-local/normas-rotondas-espana",
    datePublished: new Date().toISOString(),
    publisher: {
      "@type": "Organization",
      name: "Pinada Sun",
      url: "https://pinadasun.com",
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
              <span className="text-cream">Rotondas</span>
            </nav>

            <span className="inline-flex items-center gap-2 rounded bg-sun/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-sun-light border border-sun/30">
              <IconShieldCheck className="h-4 w-4" />
              Seguridad Vial
            </span>

            <h1 className="mt-6 font-display text-3xl font-bold tracking-tight md:text-5xl leading-tight text-cream">
              Cómo circular correctamente por las rotondas en España
            </h1>

            <p className="mt-5 text-base md:text-lg leading-relaxed text-cream/80 max-w-3xl">
              Descubre por qué ocurren tantos accidentes en las glorietas y la norma de oro de la Ley de Seguridad Vial que todo conductor debe conocer para circular con seguridad.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-6 border-t border-cream/15 pt-6 text-xs text-cream/60">
              <span>Actualizado: 17 Septiembre 2026</span>
              <span>•</span>
              <span>Lectura: 3 min</span>
            </div>
          </div>
        </section>

        {/* ═══ CUERPO DEL ARTÍCULO ═══ */}
        <main className="mx-auto max-w-4xl px-5 py-16 md:px-8 space-y-14">
          <div className="border-l-4 border-sun bg-cream p-6 shadow-xs border-y border-r border-line">
            <h2 className="font-display text-base font-bold uppercase tracking-wider text-ocean">
              En resumen
            </h2>
            <p className="mt-2 text-sm md:text-base leading-relaxed text-ink-soft">
              Según la Ley de Seguridad Vial en España, <strong>solo se puede abandonar una rotonda desde el carril más externo</strong>. Si un vehículo circula por un carril interior y pretende salir, siempre debe ceder el paso al vehículo que circula por el carril exterior, incluso si este último decide continuar dando la vuelta a la glorieta.
            </p>
          </div>

          <section className="space-y-6">
            <h2 className="font-display text-2xl font-bold text-ocean md:text-3xl">
              El error más común y causa principal de accidentes
            </h2>
            <p className="text-sm md:text-base leading-relaxed text-ink-soft">
              En España existe un gran número de accidentes, golpes laterales y fricciones en las rotondas (también conocidas como glorietas). La inmensa mayoría de estos siniestros se deben a un desconocimiento generalizado de una norma fundamental de la <strong>Ley de Seguridad Vial</strong>.
            </p>
            <p className="text-sm md:text-base leading-relaxed text-ink-soft">
              Muchos conductores creen erróneamente que, por el simple hecho de señalizar con el intermitente, tienen derecho a &quot;cruzar&quot; desde un carril interior directamente hacia la salida, cortando la trayectoria de los vehículos que circulan por su derecha. <strong>Esta maniobra está terminantemente prohibida y es la causa de casi todos los siniestros en estas intersecciones.</strong>
            </p>

            <h2 className="font-display text-2xl font-bold text-ocean md:text-3xl pt-6">
              La regla de oro: El carril exterior es el único de salida
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 pt-2">
              <div className="border border-line bg-cream p-5">
                <h3 className="font-display text-base font-bold text-ocean">
                  Para salir de la rotonda
                </h3>
                <p className="mt-2 text-xs md:text-sm text-ink-soft leading-relaxed">
                  Es obligatorio situarse con la suficiente antelación en el <strong>carril más externo (el de la derecha)</strong>. Es físicamente el único carril que conecta con las vías de salida.
                </p>
              </div>

              <div className="border border-line bg-cream p-5">
                <h3 className="font-display text-base font-bold text-ocean">
                  Si estás en el interior y quieres salir
                </h3>
                <p className="mt-2 text-xs md:text-sm text-ink-soft leading-relaxed">
                  Debes cambiarte al carril exterior previamente. Si al intentar hacerlo hay otro vehículo circulando por el exterior, <strong>debes cederle el paso siempre</strong>.
                </p>
              </div>
            </div>

            <h3 className="font-display text-xl font-bold text-ocean pt-4">
              ¿Qué ocurre si no me da tiempo a cambiar al carril exterior?
            </h3>
            <p className="text-sm md:text-base leading-relaxed text-ink-soft">
              Si el tráfico en el carril exterior te impide desplazarte a la derecha para tomar tu salida de forma segura, la norma es clara: <strong>no debes detenerte ni forzar el cruce</strong>. La solución correcta es dar una vuelta más completa a la glorieta hasta que puedas incorporarte al carril derecho con total seguridad.
            </p>

            <h3 className="font-display text-xl font-bold text-ocean pt-4">
              El vehículo del carril exterior siempre tiene prioridad
            </h3>
            <p className="text-sm md:text-base leading-relaxed text-ink-soft">
              Otra creencia falsa es pensar que quien va por el carril exterior está obligado a salir de la rotonda. Esto no es cierto. Un vehículo puede circular por el carril exterior y continuar dando la vuelta a la glorieta (por ejemplo, para tomar la tercera o cuarta salida). En caso de impacto, la culpa legal siempre será del vehículo que, desde el interior, invade el carril exterior cruzando la trayectoria del otro coche.
            </p>
          </section>

          {/* Tarjeta de Alojamiento Recomendado */}
          <div className="border border-line bg-pine-deep text-cream p-8 md:p-10 shadow-lg mt-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-sun-light text-xs font-semibold uppercase tracking-wider">
                <IconStar className="h-4 w-4 fill-sun text-sun" />
                <span>Tu Alojamiento Exclusivo en Orihuela Costa</span>
              </div>
              <h3 className="font-display text-2xl font-bold text-cream">
                Pinada Sun · Villamartín
              </h3>
              <p className="text-xs md:text-sm text-cream/80 max-w-xl">
                Apartamento vacacional de alta gama con gran terraza privada, piscina comunitaria y barbacoa. Reserva directa oficial sin intermediarios.
              </p>
            </div>

            <Link
              href="/#reserva"
              className="inline-flex items-center justify-center gap-2 bg-sun px-6 py-3.5 text-xs md:text-sm font-semibold text-pine-deep shadow-md hover:bg-sun-light transition-all shrink-0"
            >
              Ver disponibilidad
              <IconArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-line bg-cream py-8 text-center text-xs text-ink-soft">
          <div className="mx-auto max-w-4xl px-5 space-y-2">
            <p>© {new Date().getFullYear()} {APARTMENT.name} · {APARTMENT.domain}</p>
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
        <VisitCounter pagePath="/guia-local/normas-rotondas-espana" />
      </div>
    </>
  );
}
