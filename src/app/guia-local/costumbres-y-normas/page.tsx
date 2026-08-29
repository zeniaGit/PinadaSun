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
  title: "Costumbres Locales y Normas Prácticas en Orihuela Costa | Guía para el Viajero",
  description:
    "Guía completa sobre usos, costumbres y normas en Orihuela Costa: vestimenta en comercios, propinas y pagos en hostelería, vocabulario gastronómico (marineras, arroz del senyoret) y conducción en rotondas.",
  keywords: [
    "costumbres orihuela costa",
    "normas hosteleria alicante pagar despues",
    "que es una marinera tapa",
    "arroz del senyoret orihuela costa",
    "normas rotondas espana",
    "conducir sin camiseta dgt",
    "guia viaje orihuela costa vega baja",
  ],
  alternates: {
    canonical: "https://pinadasun.com/guia-local/costumbres-y-normas",
  },
  openGraph: {
    type: "article",
    locale: "es_ES",
    url: "https://pinadasun.com/guia-local/costumbres-y-normas",
    siteName: "Pinada Sun",
    title: "Costumbres Locales y Normas Prácticas en Orihuela Costa: Guía para el Viajero",
    description:
      "Aprende los usos y costumbres de Orihuela Costa: vestimenta, gastronomía, tapas y circulación vial.",
    images: [
      {
        url: "/images/terrace-hero.webp",
        width: 1200,
        height: 630,
        alt: "Costumbres locales y normas prácticas en Orihuela Costa",
      },
    ],
  },
};

export default function CostumbresNormasPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": "https://pinadasun.com/guia-local/costumbres-y-normas#article",
        headline: "Costumbres locales y normas prácticas en Orihuela Costa: Guía para el viajero",
        description:
          "En Orihuela Costa rigen los usos del sur de Alicante y la Vega Baja. Guía de vestimenta en comercios, pago en hostelería, tapas típicas y conducción en rotondas.",
        inLanguage: "es-ES",
        mainEntityOfPage: "https://pinadasun.com/guia-local/costumbres-y-normas",
        datePublished: "2026-02-01T09:00:00+01:00",
        dateModified: "2026-08-24T11:00:00+02:00",
        publisher: {
          "@type": "Organization",
          name: "Pinada Sun",
          url: "https://pinadasun.com",
          logo: "https://pinadasun.com/images/logopinadasun.webp",
        },
        author: {
          "@type": "Organization",
          name: "Pinada Sun Guía Local",
        },
      },
      {
        "@type": "FAQPage",
        "@id": "https://pinadasun.com/guia-local/costumbres-y-normas#faq",
        mainEntity: [
          {
            "@type": "Question",
            name: "¿Qué diferencia hay entre una marinera y un marinero?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Ambas son tapas sobre una base de rosquilla alargada con ensaladilla rusa. La marinera se corona con una anchoa en salazón, mientras que el marinero sustituye la anchoa por un boquerón en vinagre. Si no lleva pescado, se conoce como Bicicleta.",
            },
          },
          {
            "@type": "Question",
            name: "¿Es legal circular sin camiseta dentro del coche o entrar a una tienda?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "En comercios y edificios públicos está prohibido por normas de régimen interno y ordenanzas municipales. Al volante, la DGT puede sancionar la conducción sin camiseta o en chanclas si el agente considera que compromete la libertad de movimiento o la seguridad del conductor.",
            },
          },
          {
            "@type": "Question",
            name: "¿A qué hora se suele almorzar y cenar en la zona?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "El horario habitual para el almuerzo o comida principal es de 13:30 a 15:30. Las cenas se sirven habitualmente de 20:30 a 22:30, aunque la oferta internacional y de centros comerciales adapta horarios más tempranos (desde las 18:30) para turistas del norte de Europa.",
            },
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://pinadasun.com/guia-local/costumbres-y-normas#breadcrumbs",
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
            name: "Guía Local",
            item: "https://pinadasun.com/guia-local",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Costumbres y Normas Prácticas",
            item: "https://pinadasun.com/guia-local/costumbres-y-normas",
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
              <span className="text-cream">Costumbres y Normas</span>
            </nav>

            <span className="inline-flex items-center gap-2 rounded bg-sun/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-sun-light border border-sun/30">
              <IconShieldCheck className="h-4 w-4" />
              Guía Local · Orihuela Costa
            </span>

            <h1 className="mt-6 font-display text-3xl font-bold tracking-tight md:text-5xl leading-tight text-cream">
              Costumbres locales y normas prácticas en Orihuela Costa: Guía para el viajero
            </h1>

            <p className="mt-5 text-base md:text-lg leading-relaxed text-cream/80 max-w-3xl">
              Usos habituales, gastronomía típica, reglas de convivencia y claves de conducción en el sur de Alicante y la Vega Baja.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-6 border-t border-cream/15 pt-6 text-xs text-cream/60">
              <span>Actualizado: 2026</span>
              <span>•</span>
              <span>Lectura: 4 min</span>
              <span>•</span>
              <span>Ámbito: Orihuela Costa, Villamartín, La Zenia, Cabo Roig</span>
            </div>
          </div>
        </section>

        {/* ═══ CUERPO DEL ARTÍCULO ═══ */}
        <main className="mx-auto max-w-4xl px-5 py-16 md:px-8 space-y-14">
          {/* Bloque Resumen */}
          <div className="border-l-4 border-sun bg-cream p-6 shadow-xs border-y border-r border-line">
            <h2 className="font-display text-base font-bold uppercase tracking-wider text-ocean">
              En resumen
            </h2>
            <p className="mt-2 text-sm md:text-base leading-relaxed text-ink-soft">
              En Orihuela Costa rigen los usos del sur de Alicante y el entorno de la Vega Baja. Los bares y restaurantes cobran al finalizar la consumición, el código de vestimenta prohíbe el torso desnudo en comercios, y la conducción en glorietas y autovías exige el uso estricto del carril derecho salvo para adelantar.
            </p>
          </div>

          {/* Sección 1: Convivencia y Vestimenta */}
          <section id="vestimenta" className="space-y-4">
            <h2 className="font-display text-2xl font-bold text-ocean md:text-3xl">
              Normas de convivencia y vestimenta en espacios públicos
            </h2>
            <p className="text-sm md:text-base leading-relaxed text-ink-soft">
              En las urbanizaciones y playas de Orihuela Costa (como La Zenia, Cabo Roig, Playa Flamenca o Campoamor), el entorno es turístico pero mantiene normativas municipales y de cortesía comercial:
            </p>

            <div className="grid gap-4 sm:grid-cols-3 pt-2">
              <div className="border border-line bg-cream p-5">
                <h3 className="font-display text-base font-bold text-ocean">
                  Torso descubierto
                </h3>
                <p className="mt-2 text-xs md:text-sm text-ink-soft leading-relaxed">
                  No se permite acceder sin camiseta o en bañador a supermercados, farmacias, tiendas ni interiores de restaurantes. Fuera de la arena y el paseo marítimo, se exige llevar ropa de calle (camiseta o blusa y calzado).
                </p>
              </div>

              <div className="border border-line bg-cream p-5">
                <h3 className="font-display text-base font-bold text-ocean">
                  Consumo y pago
                </h3>
                <p className="mt-2 text-xs md:text-sm text-ink-soft leading-relaxed">
                  Como norma general, en bares, cafeterías y chiringuitos se paga <strong>después de haber consumido</strong>, justo antes de marcharse. Solo en terrazas masificadas o locales de autoservicio se solicita el abono inmediato al servir.
                </p>
              </div>

              <div className="border border-line bg-cream p-5">
                <h3 className="font-display text-base font-bold text-ocean">
                  Propinas
                </h3>
                <p className="mt-2 text-xs md:text-sm text-ink-soft leading-relaxed">
                  No son obligatorias ni se cargan por defecto en la cuenta. Se suele redondear el importe o dejar entre un <strong>5% y un 10%</strong> en efectivo si el servicio ha sido satisfactorio.
                </p>
              </div>
            </div>
          </section>

          {/* Sección 2: Gastronomía Local */}
          <section id="gastronomia" className="space-y-4">
            <h2 className="font-display text-2xl font-bold text-ocean md:text-3xl">
              Gastronomía local: Términos, platos típicos y pedidos
            </h2>
            <p className="text-sm md:text-base leading-relaxed text-ink-soft">
              El vocabulario gastronómico de la zona mezcla la tradición alicantina con la influencia de la huerta y el mar:
            </p>

            <div className="overflow-x-auto border border-line bg-cream shadow-xs">
              <table className="w-full text-left text-xs md:text-sm">
                <thead className="bg-linen border-b border-line text-ocean font-semibold">
                  <tr>
                    <th className="p-4 w-1/4">Concepto</th>
                    <th className="p-4 w-1/2">Qué es y composición exacta</th>
                    <th className="p-4 w-1/4">Detalle práctico</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line text-ink-soft">
                  <tr>
                    <td className="p-4 font-bold text-ink">Caña</td>
                    <td className="p-4">Copa de cerveza de barril (aprox. 200–250 ml).</td>
                    <td className="p-4">El tamaño estándar antes de pedir una «jarra» o «pinta».</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-ink">Marinera</td>
                    <td className="p-4">
                      Rosquilla crujiente con ensaladilla rusa y una <strong>anchoa</strong> encima.
                    </td>
                    <td className="p-4">
                      La tapa reina del aperitivo. Si lleva <strong>boquerón en vinagre</strong>, se llama <strong>Marinero</strong>; si no lleva pescado, <strong>Bicicleta</strong>.
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-ink">Arroz / Paella del Senyoret</td>
                    <td className="p-4">
                      Arroz con marisco y pescado limpio: <strong>gambas peladas, calamar y atún</strong> (sin cáscaras ni espinas).
                    </td>
                    <td className="p-4">Pensado para «comer como un señor», sin mancharse las manos.</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-ink">Sangría vs. Tinto de Verano</td>
                    <td className="p-4">
                      La sangría lleva vino, fruta y <strong>licores añadidos</strong> (ron, ginebra o brandy); el tinto de verano solo vino y gaseosa o refresco de limón.
                    </td>
                    <td className="p-4">La sangría tiene mayor graduación alcohólica y un precio superior por litro.</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-ink">Postres caseros</td>
                    <td className="p-4">Tartas, flanes o milhojas de obrador.</td>
                    <td className="p-4">Incrementan el ticket final entre <strong>4,50 € y 7,00 €</strong> por comensal.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Sección 3: Tráfico y Rotondas */}
          <section id="trafico" className="space-y-4">
            <h2 className="font-display text-2xl font-bold text-ocean md:text-3xl">
              Normas de tráfico y conducción en rotondas
            </h2>
            <p className="text-sm md:text-base leading-relaxed text-ink-soft">
              La red vial de Orihuela Costa cuenta con alta densidad de tráfico en la <strong>N-332</strong> y la <strong>AP-7</strong>, además de múltiples rotondas de acceso a urbanizaciones:
            </p>

            <div className="space-y-3">
              <div className="border border-line bg-cream p-5">
                <h3 className="font-display text-base font-bold text-ocean">
                  1. Uso del carril derecho
                </h3>
                <p className="mt-1 text-xs md:text-sm text-ink-soft leading-relaxed">
                  La normativa española exige circular siempre por el carril de la derecha en autovías y carreteras interurbanas, utilizando el carril izquierdo únicamente para maniobras de adelantamiento.
                </p>
              </div>

              <div className="border border-line bg-cream p-5">
                <h3 className="font-display text-base font-bold text-ocean">
                  2. Prioridad y trazado en rotondas
                </h3>
                <ul className="mt-2 space-y-1.5 text-xs md:text-sm text-ink-soft list-disc list-inside">
                  <li>Los vehículos que ya están dentro de la glorieta tienen prioridad sobre los que van a acceder.</li>
                  <li>Para tomar cualquier salida, es obligatorio situarse con antelación en el <strong>carril exterior (derecho)</strong>. El carril interior se utiliza únicamente para circular o adelantar, nunca para abandonar la rotonda cruzando carriles directamente.</li>
                </ul>
              </div>

              <div className="border border-line bg-cream p-5">
                <h3 className="font-display text-base font-bold text-ocean">
                  3. Señalización e intermitentes
                </h3>
                <p className="mt-1 text-xs md:text-sm text-ink-soft leading-relaxed">
                  El uso del intermitente es obligatorio al cambiar de carril interior y justo antes de tomar la salida elegida.
                </p>
              </div>
            </div>
          </section>

          {/* Sección 4: Mercadillos Semanales */}
          <section id="mercadillos" className="space-y-4">
            <h2 className="font-display text-2xl font-bold text-ocean md:text-3xl">
              Mercadillos semanales en Orihuela Costa: Días, ubicaciones y horarios
            </h2>
            <p className="text-sm md:text-base leading-relaxed text-ink-soft">
              Los mercadillos al aire libre son una tradición comercial clave en la costa. Operan principalmente por la mañana y ofrecen fruta y verdura de la huerta de la Vega Baja, encurtidos, quesos, ropa, calzado y menaje:
            </p>

            <div className="overflow-x-auto border border-line bg-cream shadow-xs">
              <table className="w-full text-left text-xs md:text-sm">
                <thead className="bg-linen border-b border-line text-ocean font-semibold">
                  <tr>
                    <th className="p-3.5 w-1/5">Mercadillo</th>
                    <th className="p-3.5 w-1/6">Día</th>
                    <th className="p-3.5 w-1/6">Horario</th>
                    <th className="p-3.5 w-1/4">Ubicación exacta</th>
                    <th className="p-3.5 w-1/4">Especialidad</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line text-ink-soft">
                  <tr>
                    <td className="p-3.5 font-bold text-ink">Playa Flamenca</td>
                    <td className="p-3.5 font-semibold text-ocean">Sábados</td>
                    <td className="p-3.5">08:00 – 14:00</td>
                    <td className="p-3.5">Calle Nicolás de Bussi (junto a C.C. Citrus)</td>
                    <td className="p-3.5">El más grande de la costa (+300 puestos). Textil, calzado, frutas y pollos asados.</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold text-ink">Aguamarina / Campoamor</td>
                    <td className="p-3.5 font-semibold text-ocean">Jueves</td>
                    <td className="p-3.5">08:00 – 14:00</td>
                    <td className="p-3.5">Calle Fuego (zona Aguamarina / Dehesa de Campoamor)</td>
                    <td className="p-3.5">Ambiente tranquilo frente al mar. Productos frescos, embutidos y artesanía.</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold text-ink">Paseo de Aguamarina (Estival)</td>
                    <td className="p-3.5 font-semibold text-ocean">Diario (Jun a Sep)</td>
                    <td className="p-3.5">19:00 – 00:00</td>
                    <td className="p-3.5">Paseo marítimo de Aguamarina</td>
                    <td className="p-3.5">Mercadillo nocturno de artesanía, bisutería, cuero y regalos.</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold text-ink">San Miguel de Salinas (Cercano)</td>
                    <td className="p-3.5 font-semibold text-ocean">Miércoles</td>
                    <td className="p-3.5">08:00 – 14:00</td>
                    <td className="p-3.5">Calle Juan XXIII (casco urbano)</td>
                    <td className="p-3.5">Mercado tradicional con fuerte presencia de agricultores locales.</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold text-ink">Torrevieja (Cercano)</td>
                    <td className="p-3.5 font-semibold text-ocean">Viernes</td>
                    <td className="p-3.5">08:00 – 14:00</td>
                    <td className="p-3.5">Parque Antonio Soria (Av. Delfina Viudes)</td>
                    <td className="p-3.5">Uno de los mercados más grandes de España (+700 puestos).</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-linen p-4 border border-line text-xs md:text-sm text-ink-soft">
              <strong>💡 Recomendación práctica:</strong> En los mercadillos matinales de los sábados (Playa Flamenca), el tráfico en los accesos desde la N-332 suele congestionarse entre las 10:30 y las 12:30. Es aconsejable acudir a primera hora (antes de las 09:30) para aparcar con facilidad.
            </div>
          </section>

          {/* Sección 5: Calendario y Festivos Comerciales */}
          <section id="festivos-comerciales" className="space-y-4">
            <h2 className="font-display text-2xl font-bold text-ocean md:text-3xl">
              Calendario y festivos comerciales (Libertad de apertura)
            </h2>
            <p className="text-sm md:text-base leading-relaxed text-ink-soft">
              Orihuela Costa está catalogada como <strong>Zona de Gran Afluencia Turística (ZGAT)</strong> según la normativa de la Comunidad Valenciana:
            </p>

            <div className="grid gap-4 sm:grid-cols-3 pt-2">
              <div className="border border-line bg-cream p-5">
                <h3 className="font-display text-base font-bold text-ocean">
                  Apertura dominical en temporada alta
                </h3>
                <p className="mt-2 text-xs md:text-sm text-ink-soft leading-relaxed">
                  Durante el periodo estival (desde mediados de junio hasta principios de enero) y periodos de Semana Santa/Pascua, los centros comerciales (como <strong>Zenia Boulevard</strong>) y grandes superficies de alimentación tienen autorización para <strong>abrir domingos y festivos</strong>.
                </p>
              </div>

              <div className="border border-line bg-cream p-5">
                <h3 className="font-display text-base font-bold text-ocean">
                  Temporada baja
                </h3>
                <p className="mt-2 text-xs md:text-sm text-ink-soft leading-relaxed">
                  Entre mediados de enero y principios de junio, los grandes supermercados y centros comerciales cierran habitualmente los domingos, excepto festivos específicos fijados por el calendario autonómico anual de comercio.
                </p>
              </div>

              <div className="border border-line bg-cream p-5">
                <h3 className="font-display text-base font-bold text-ocean">
                  Pequeño comercio
                </h3>
                <p className="mt-2 text-xs md:text-sm text-ink-soft leading-relaxed">
                  Los establecimientos de alimentación de conveniencia de menos de 300 m² tienen libertad horaria y abren los 365 días del año.
                </p>
              </div>
            </div>
          </section>

          {/* Sección 4: FAQs */}
          <section id="faq" className="space-y-4">
            <h2 className="font-display text-2xl font-bold text-ocean md:text-3xl">
              Preguntas frecuentes sobre usos y costumbres en Orihuela Costa
            </h2>

            <div className="space-y-4 pt-2">
              <div className="border border-line bg-cream p-5">
                <h3 className="font-display text-base font-bold text-ocean">
                  ¿Qué diferencia hay entre una marinera y un marinero?
                </h3>
                <p className="mt-2 text-xs md:text-sm text-ink-soft leading-relaxed">
                  Ambas son tapas sobre una base de rosquilla alargada con ensaladilla rusa. La marinera se corona con una anchoa en salazón, mientras que el marinero sustituye la anchoa por un boquerón en vinagre.
                </p>
              </div>

              <div className="border border-line bg-cream p-5">
                <h3 className="font-display text-base font-bold text-ocean">
                  ¿Es legal circular sin camiseta dentro del coche o entrar a una tienda?
                </h3>
                <p className="mt-2 text-xs md:text-sm text-ink-soft leading-relaxed">
                  En comercios y edificios públicos está prohibido por normas de régimen interno y ordenanzas municipales. Al volante, la DGT puede sancionar la conducción sin camiseta o en chanclas si el agente considera que compromete la libertad de movimiento o la seguridad del conductor.
                </p>
              </div>

              <div className="border border-line bg-cream p-5">
                <h3 className="font-display text-base font-bold text-ocean">
                  ¿A qué hora se suele almorzar y cenar en la zona?
                </h3>
                <p className="mt-2 text-xs md:text-sm text-ink-soft leading-relaxed">
                  El horario habitual para el almuerzo o comida principal es de <strong>13:30 a 15:30</strong>. Las cenas se sirven habitualmente de <strong>20:30 a 22:30</strong>, aunque la oferta internacional y de centros comerciales adapta horarios más tempranos (desde las 18:30) para turistas del norte de Europa.
                </p>
              </div>
            </div>
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
      </div>
    </>
  );
}
