import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Logo } from "@/components/logo";
import {
  IconArrowRight,
  IconShieldCheck,
  IconClock,
  IconPhone,
  IconStar,
} from "@/components/icons";
import { APARTMENT } from "@/lib/apartment";

export const metadata: Metadata = {
  title: "Guía de Ordenanzas y Normas en Orihuela Costa | Playas, Patinetes y Descanso",
  description:
    "Guía práctica de ordenanzas municipales y convivencia en Orihuela Costa y Villamartín: uso de patinetes eléctricos (VMP), horarios de descanso, socorristas, significado de banderas y teléfonos de emergencia.",
  keywords: [
    "ordenanza municipal orihuela costa",
    "normativa patinetes electricos orihuela costa",
    "horarios socorristas playas orihuela costa",
    "significado banderas playa orihuela costa",
    "horario descanso orihuela costa ruidos",
    "alojamiento turistico orihuela costa normas",
    "guia vacaciones villamartin",
  ],
  alternates: {
    canonical: "https://pinadasun.com/guia-normativa-orihuela-costa",
  },
  openGraph: {
    type: "article",
    locale: "es_ES",
    url: "https://pinadasun.com/guia-normativa-orihuela-costa",
    siteName: "Pinada Sun",
    title: "Guía de Ordenanzas y Convivencia en Orihuela Costa | Playas, Movilidad y Descanso",
    description:
      "Información esencial sobre ordenanzas municipales de Orihuela Costa: patinetes, descanso, playas, banderas y emergencias.",
    images: [
      {
        url: "/images/terrace-hero.webp",
        width: 1200,
        height: 630,
        alt: "Guía de convivencia y ordenanzas en Orihuela Costa",
      },
    ],
  },
};

export default function GuiaNormativaPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": "https://pinadasun.com/guia-normativa-orihuela-costa#article",
        headline: "Guía de Ordenanzas Municipales y Convivencia en Orihuela Costa",
        description:
          "Normativa básica para huéspedes y residentes en Orihuela Costa: regulación de patinetes eléctricos, horarios de ruido, socorrismo en playas y gestión de residuos.",
        inLanguage: "es-ES",
        mainEntityOfPage: "https://pinadasun.com/guia-normativa-orihuela-costa",
        datePublished: "2026-01-15T09:00:00+01:00",
        dateModified: "2026-08-24T10:00:00+02:00",
        publisher: {
          "@type": "Organization",
          name: "Pinada Sun",
          url: "https://pinadasun.com",
          logo: "https://pinadasun.com/images/logopinadasun.webp",
        },
        author: {
          "@type": "Organization",
          name: "Pinada Sun Guía Turística",
        },
      },
      {
        "@type": "FAQPage",
        "@id": "https://pinadasun.com/guia-normativa-orihuela-costa#faq",
        mainEntity: [
          {
            "@type": "Question",
            name: "¿Se puede circular en patinete eléctrico por las aceras en Orihuela Costa?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Según la ordenanza municipal de movilidad y la DGT, los patinetes eléctricos (VMP) tienen prohibida la circulación por aceras, paseos marítimos y zonas peatonales. Deben circular por carriles bici o por la calzada en vías urbanas.",
            },
          },
          {
            "@type": "Question",
            name: "¿Cuáles son los horarios de descanso y límites de ruido en Orihuela Costa?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "El horario de descanso nocturno rige de 23:00 a 08:00 horas. Durante este periodo está prohibido generar ruidos excesivos, fiestas en terrazas o música alta que perturbe el descanso de los vecinos.",
            },
          },
          {
            "@type": "Question",
            name: "¿Cuál es el horario de los socorristas en las playas de Orihuela Costa?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Durante la temporada estival (junio a septiembre), el servicio de salvamento y socorrismo opera habitualmente de 10:00 a 19:00 o 20:00 horas en todas las playas con Bandera Azul (La Zenia, Cala Capitán, Playa Flamenca, Cabo Roig).",
            },
          },
          {
            "@type": "Question",
            name: "¿Qué significan los colores de las banderas en la playa?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Verde indica baño permitido con buenas condiciones; Amarilla indica precaución por olas o corrientes; Roja prohíbe el baño por alto riesgo; y la bandera Blanca con pictograma de medusas alerta de presencia de fauna marina urticante.",
            },
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://pinadasun.com/guia-normativa-orihuela-costa#breadcrumbs",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Inicio",
            item: "https://pinadasun.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Guía de Ordenanzas y Normas en Orihuela Costa",
            item: "https://pinadasun.com/guia-normativa-orihuela-costa",
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <div className="min-h-svh bg-linen text-ink">
        <Header />

        {/* ═══ CABECERA DEL ARTÍCULO ═══ */}
        <section className="relative bg-pine-deep text-cream pt-36 pb-20 px-5 md:px-8 overflow-hidden">
          <div className="mx-auto max-w-4xl">
            <nav className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sun-light/80">
              <Link href="/" className="hover:text-cream transition-colors">
                Inicio
              </Link>
              <span>/</span>
              <span className="text-cream">Guía & Normativa</span>
            </nav>

            <span className="inline-flex items-center gap-2 rounded bg-sun/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-sun-light border border-sun/30">
              <IconShieldCheck className="h-4 w-4" />
              Guía de Convivencia y Ordenanzas Municipales
            </span>

            <h1 className="mt-6 font-display text-3xl font-bold tracking-tight md:text-5xl leading-tight text-cream">
              Normas, playas y convivencia en Orihuela Costa y Villamartín
            </h1>

            <p className="mt-5 text-base md:text-lg leading-relaxed text-cream/80 max-w-3xl">
              Información esencial sobre las ordenanzas municipales para disfrutar de una estancia agradable, respetuosa y segura: normativa de patinetes eléctricos, descanso nocturno, servicio de playas y teléfonos útiles.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-6 border-t border-cream/15 pt-6 text-xs text-cream/60">
              <span>Actualizado: 2026</span>
              <span>•</span>
              <span>Ámbito: Orihuela Costa (Villamartín, La Zenia, Playa Flamenca)</span>
            </div>
          </div>
        </section>

        {/* ═══ CUERPO DEL ARTÍCULO ═══ */}
        <main className="mx-auto max-w-4xl px-5 py-16 md:px-8 space-y-14">
          {/* Bloque de Respuesta Directa GEO */}
          <div className="border-l-4 border-sun bg-cream p-6 shadow-xs border-y border-r border-line">
            <h2 className="font-display text-lg font-bold text-ocean">
              Resumen ejecutivo para viajeros y residentes
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              El municipio de Orihuela (Orihuela Costa) cuenta con ordenanzas específicas de convivencia ciudadana, playas y movilidad. Las cuatro normas clave que todo huésped debe conocer son: <strong>prohibición de patinetes en aceras</strong>, <strong>horario de descanso de 23:00 a 08:00 h</strong>, respeto riguroso a las <strong>banderas de las playas</strong> y depósito de <strong>residuos a partir de las 20:00 h</strong>.
            </p>
          </div>

          {/* Sección 1: Patinetes Eléctricos */}
          <section id="patinetes" className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded bg-ocean/10 text-sm font-bold text-ocean">
                1
              </span>
              <h2 className="font-display text-2xl font-bold text-ocean md:text-3xl">
                Uso de patinetes eléctricos (VMP) y bicicletas
              </h2>
            </div>
            <p className="text-sm md:text-base leading-relaxed text-ink-soft">
              El uso de Vehículos de Movilidad Personal (VMP) como los patinetes eléctricos está regulado por la normativa de la DGT y las ordenanzas locales de movilidad urbana para garantizar la seguridad de peatones y conductores:
            </p>

            <div className="grid gap-4 sm:grid-cols-2 pt-2">
              <div className="border border-line bg-cream p-5">
                <h3 className="font-display text-base font-bold text-ocean">
                  Vías de circulación autorizadas
                </h3>
                <ul className="mt-3 space-y-2 text-xs md:text-sm text-ink-soft list-disc list-inside">
                  <li><strong>Permitido</strong>: Carriles bici habilitados y calzadas urbanas limitadas a 30 km/h.</li>
                  <li><strong>Estrictamente prohibido</strong>: Aceras, paseos marítimos peatonales y travesías o vías interurbanas.</li>
                  <li>Velocidad máxima autorizada: <strong>25 km/h</strong>.</li>
                </ul>
              </div>

              <div className="border border-line bg-cream p-5">
                <h3 className="font-display text-base font-bold text-ocean">
                  Requisitos de seguridad y multas
                </h3>
                <ul className="mt-3 space-y-2 text-xs md:text-sm text-ink-soft list-disc list-inside">
                  <li>Uso obligatorio de <strong>casco de protección homologado</strong>.</li>
                  <li>Alumbrado delantero blanco y trasero rojo con reflectantes obligatorios de noche.</li>
                  <li><strong>Prohibido</strong> el uso de auriculares, teléfono móvil o circular 2 personas en un mismo patinete.</li>
                  <li>Tasa de alcohol 0,0 para menores y sujeta a límites generales para adultos.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Sección 2: Horarios de Descanso */}
          <section id="descanso" className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded bg-ocean/10 text-sm font-bold text-ocean">
                2
              </span>
              <h2 className="font-display text-2xl font-bold text-ocean md:text-3xl">
                Horario de descanso y ordenanza contra el ruido
              </h2>
            </div>
            <p className="text-sm md:text-base leading-relaxed text-ink-soft">
              En las urbanizaciones residenciales de Villamartín y Orihuela Costa, el descanso y la buena vecindad son prioritarios para garantizar el confort de todos:
            </p>

            <div className="border border-line bg-cream p-6 space-y-4">
              <div className="flex items-center gap-3 text-ocean font-semibold text-sm">
                <IconClock className="h-5 w-5 text-sun" />
                <span>Franja de Descanso Nocturno: de 23:00 h a 08:00 h</span>
              </div>
              <p className="text-xs md:text-sm text-ink-soft leading-relaxed">
                Durante este horario no está permitido realizar actividades que generen ruidos molestos en el interior de las viviendas, zonas comunitarias ni terrazas exteriores (música a alto volumen, fiestas, arrastre de muebles o conversaciones estridentes).
              </p>
              <div className="bg-linen p-4 border border-line text-xs text-ink-soft">
                <strong>Piscina y zonas comunitarias</strong>: Respeta las normas internas de la urbanización, manteniendo un ambiente sereno y usando las instalaciones dentro del horario fijado en el recinto.
              </div>
            </div>
          </section>

          {/* Sección 3: Playas y Socorristas */}
          <section id="playas" className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded bg-ocean/10 text-sm font-bold text-ocean">
                3
              </span>
              <h2 className="font-display text-2xl font-bold text-ocean md:text-3xl">
                Playas de Orihuela Costa: Socorrismo y Banderas
              </h2>
            </div>
            <p className="text-sm md:text-base leading-relaxed text-ink-soft">
              Las 11 playas y calas de Orihuela Costa galardonadas con <strong>Bandera Azul</strong> (como La Zenia, Cala Capitán o Playa Flamenca) disponen de servicio profesional de salvamento y vigilancia marítima:
            </p>

            <div className="border border-line bg-cream p-5 space-y-3">
              <h3 className="font-display text-base font-bold text-ocean">
                Horarios del Servicio de Socorrismo
              </h3>
              <p className="text-xs md:text-sm text-ink-soft leading-relaxed">
                En temporada estival (del 15 de junio al 15 de septiembre), los puestos de socorro operan de forma ininterrumpida de <strong>10:00 a 19:00 o 20:00 horas</strong>. En periodos de Semana Santa y temporada media el horario se adapta a la afluencia.
              </p>
            </div>

            {/* Tabla de banderas */}
            <div className="space-y-3 pt-2">
              <h3 className="font-display text-base font-bold text-ocean">
                Significado oficial de las banderas de baño
              </h3>
              <div className="overflow-x-auto border border-line bg-cream">
                <table className="w-full text-left text-xs md:text-sm">
                  <thead className="bg-linen border-b border-line text-ocean font-semibold">
                    <tr>
                      <th className="p-3.5">Bandera</th>
                      <th className="p-3.5">Significado</th>
                      <th className="p-3.5">Condiciones y Recomendación</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line text-ink-soft">
                    <tr>
                      <td className="p-3.5 font-bold text-emerald-700">🟢 Verde</td>
                      <td className="p-3.5 font-medium text-ink">Baño permitido</td>
                      <td className="p-3.5">Mar en calma y buenas condiciones higiénico-sanitarias.</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold text-amber-700">🟡 Amarilla</td>
                      <td className="p-3.5 font-medium text-ink">Precaución</td>
                      <td className="p-3.5">Olas, resaca o corrientes. Bañarse solo donde se haga pie con la cabeza fuera del agua.</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold text-rose-700">🔴 Roja</td>
                      <td className="p-3.5 font-medium text-ink">Baño prohibido</td>
                      <td className="p-3.5">Riesgo severo para la vida. Entrar al agua con bandera roja conlleva sanciones policiales.</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold text-sky-700">🪼 Blanca (Medusas)</td>
                      <td className="p-3.5 font-medium text-ink">Fauna marina urticante</td>
                      <td className="p-3.5">Presencia de bancos de medusas. Se iza junto a la bandera verde o amarilla.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-linen p-5 border border-line space-y-2 text-xs md:text-sm text-ink-soft">
              <h4 className="font-bold text-ink">Otras normas de obligado cumplimiento en las playas:</h4>
              <ul className="list-disc list-inside space-y-1">
                <li><strong>Prohibido reservar sitio</strong> colocando sombrillas o sillas vacías a primera hora (los servicios municipales pueden retirarlas).</li>
                <li><strong>Uso responsable de duchas</strong>: Prohibido utilizar geles, jabones o champús en los lavapiés y duchas públicas.</li>
                <li><strong>Animales domésticos</strong>: No se permite el acceso con mascotas durante la temporada de baño, salvo en playas caninas expresamente señalizadas.</li>
                <li><strong>Residuos</strong>: Prohibido dejar colillas, latas o plásticos en la arena; utiliza las papeleras de reciclaje en los accesos.</li>
              </ul>
            </div>
          </section>

          {/* Sección 4: Basuras y Reciclaje */}
          <section id="residuos" className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded bg-ocean/10 text-sm font-bold text-ocean">
                4
              </span>
              <h2 className="font-display text-2xl font-bold text-ocean md:text-3xl">
                Depósito de residuos y reciclaje
              </h2>
            </div>
            <p className="text-sm md:text-base leading-relaxed text-ink-soft">
              Para evitar olores y mantener el entorno limpio, la ordenanza de limpieza de Orihuela Costa establece:
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="border border-line bg-cream p-5 space-y-2">
                <h3 className="font-display text-sm font-bold text-ocean">Horario de basura orgánica</h3>
                <p className="text-xs md:text-sm text-ink-soft">
                  Deposita las bolsas cerradas en los contenedores grises <strong>a partir de las 20:00 h</strong> en verano para evitar la fermentación por el calor diurno.
                </p>
              </div>
              <div className="border border-line bg-cream p-5 space-y-2">
                <h3 className="font-display text-sm font-bold text-ocean">Contenedores selectivos (24 h)</h3>
                <p className="text-xs md:text-sm text-ink-soft">
                  Amarillo (plásticos y envases), Azul (papel y cartón doblado) y Verde (vidrio sin tapas). Pueden utilizarse a cualquier hora respetando el descanso.
                </p>
              </div>
            </div>
          </section>

          {/* Sección 5: Teléfonos de Emergencia */}
          <section id="telefonos" className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded bg-ocean/10 text-sm font-bold text-ocean">
                5
              </span>
              <h2 className="font-display text-2xl font-bold text-ocean md:text-3xl">
                Teléfonos de Interés y Asistencia en Orihuela Costa
              </h2>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
              <div className="border border-line bg-cream p-4">
                <p className="text-xs font-semibold uppercase text-rose-700">Emergencias Generales</p>
                <p className="font-display text-2xl font-bold text-ink mt-1">112</p>
                <p className="text-[11px] text-ink-soft mt-1">Policía, Bomberos y Ambulancias (multilingüe)</p>
              </div>

              <div className="border border-line bg-cream p-4">
                <p className="text-xs font-semibold uppercase text-ocean">Policía Local Orihuela Costa</p>
                <p className="font-display text-lg font-bold text-ink mt-1">96 676 00 00</p>
                <p className="text-[11px] text-ink-soft mt-1">Ayuntamiento de Orihuela Costa</p>
              </div>

              <div className="border border-line bg-cream p-4">
                <p className="text-xs font-semibold uppercase text-ocean">Centro de Salud Aguamarina</p>
                <p className="font-display text-lg font-bold text-ink mt-1">96 674 83 43</p>
                <p className="text-[11px] text-ink-soft mt-1">Urgencias médicas en Orihuela Costa</p>
              </div>
            </div>
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

        {/* Footer simple */}
        <footer className="border-t border-line bg-cream py-8 text-center text-xs text-ink-soft">
          <div className="mx-auto max-w-4xl px-5 space-y-2">
            <p>© 2026 {APARTMENT.name} · {APARTMENT.domain}</p>
            <p>
              <Link href="/" className="text-ocean underline hover:text-ocean-light">
                ← Volver a la página principal
              </Link>
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
