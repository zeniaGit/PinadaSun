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
  title: "New Smoking Law in Orihuela Costa Terraces | Pinada Sun",
  description:
    "What changes with the new smoking law on the terraces of Orihuela Costa? What you need to know for your next holiday regarding the smoking and vaping ban.",
  keywords: [
    "smoking law terraces",
    "smoking terraces orihuela costa",
    "vaping bars alicante",
    "hospitality smoking regulations 2026",
    "tourism orihuela costa",
  ],
  alternates: {
    canonical: "https://pinadasun.com/en/guia-local/nueva-ley-tabaco-terrazas",
  },
  openGraph: {
    type: "article",
    locale: "en_US",
    url: "https://pinadasun.com/en/guia-local/nueva-ley-tabaco-terrazas",
    siteName: "Pinada Sun",
    title: "New Smoking Law on Orihuela Costa Terraces",
    description:
      "Discover how the new tobacco bill affects bars and restaurants in Orihuela Costa.",
    images: [
      {
        url: "/images/ley-tabaco.jpg",
        width: 1200,
        height: 630,
        alt: "Smoke-free terraces in Orihuela Costa",
      },
    ],
  },
};

export default function LeyTabacoPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "What changes with the new Smoking Law on Orihuela Costa terraces?",
    description: "What you need to know for your next holiday regarding the tobacco and vaping regulations in hospitality.",
    inLanguage: "en-US",
    mainEntityOfPage: "https://pinadasun.com/en/guia-local/nueva-ley-tabaco-terrazas",
    datePublished: "2026-09-11T12:00:00+02:00",
    publisher: {
      "@type": "Organization",
      name: "Pinada Sun",
      logo: "https://pinadasun.com/images/logopinadasun.webp",
    },
    author: {
      "@type": "Organization",
      name: "Pinada Sun Local Guide",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <div className="min-h-svh bg-linen text-ink">
        <Header lang="en" />

        {/* ═══ CABECERA ═══ */}
        <section className="relative bg-pine-deep text-cream pt-36 pb-20 px-5 md:px-8 overflow-hidden">
          <div className="mx-auto max-w-4xl">
            <nav className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sun-light/80">
              <Link href="/en" className="hover:text-cream transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/en/guia-local" className="hover:text-cream transition-colors">
                Local Guide
              </Link>
              <span>/</span>
              <span className="text-cream">News</span>
            </nav>

            <span className="inline-flex items-center gap-2 rounded bg-sun/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-sun-light border border-sun/30">
              <IconShieldCheck className="h-4 w-4" />
              News / Guest Advice
            </span>

            <h1 className="mt-6 font-display text-3xl font-bold tracking-tight md:text-5xl leading-tight text-cream">
              What changes with the new Smoking Law on Orihuela Costa terraces?
            </h1>

            <p className="mt-5 text-base md:text-lg leading-relaxed text-cream/80 max-w-3xl">
              What you need to know for your next holiday and how it will impact leisure time on our coast.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-6 border-t border-cream/15 pt-6 text-xs text-cream/60">
              <span>Published: September, 2026</span>
              <span>•</span>
              <span>Read time: 3 min</span>
              <span>•</span>
              <span>Topics: Orihuela Costa, Tourism, Hospitality, Health</span>
            </div>
          </div>
        </section>

        {/* ═══ CUERPO DEL ARTÍCULO ═══ */}
        <main className="mx-auto max-w-4xl px-5 py-16 md:px-8 space-y-14">
          <p className="text-sm md:text-base leading-relaxed text-ink-soft">
            Enjoying a morning coffee in the sun or a quiet dinner on a terrace is one of the greatest pleasures of spending a few days on holiday in Orihuela Costa. However, in recent months, the hospitality sector and tourists have been asking a very repeated question: <strong>How does the new smoking regulation affect the terraces of bars and restaurants?</strong>
          </p>

          <p className="text-sm md:text-base leading-relaxed text-ink-soft">
            If you are planning your next getaway or a mid-season stay in our apartments, we tell you the current status of the measure, what is going to change, and how it will impact leisure time on our coast.
          </p>

          <figure className="group relative overflow-hidden rounded-lg shadow-sm my-8">
            <img
              src="/images/ley-tabaco.jpg"
              alt="Smoke-free terrace on the coast"
              loading="lazy"
              className="h-[280px] w-full object-cover transition-transform duration-700 group-hover:scale-105 md:h-[400px]"
            />
            <figcaption className="absolute bottom-4 left-4 bg-pine-deep/80 px-3.5 py-1.5 text-[12px] font-medium tracking-wide text-cream backdrop-blur-xs rounded">
              Towards a smoke-free outdoor hospitality model.
            </figcaption>
          </figure>

          {/* Sección 1 */}
          <section className="space-y-4">
            <h2 className="font-display text-2xl font-bold text-ocean md:text-3xl">
              1. What exactly does the new bill propose?
            </h2>
            <p className="text-sm md:text-base leading-relaxed text-ink-soft">
              The Council of Ministers approved the preliminary draft for the reform of the Smoking Law, a legislative move that seeks to significantly expand smoke-free spaces throughout Spain. The key points that will directly affect catering establishments and leisure areas are:
            </p>

            <div className="grid gap-4 sm:grid-cols-3 pt-2">
              <div className="border border-line bg-cream p-5">
                <h3 className="font-display text-base font-bold text-ocean">
                  Goodbye to smoke on terraces
                </h3>
                <p className="mt-2 text-xs md:text-sm text-ink-soft leading-relaxed">
                  The rule contemplates the ban on smoking on <strong>any terrace of bars and restaurants</strong>, eliminating the old differences between completely open spaces or those semi-closed with awnings, screens, or pergolas.
                </p>
              </div>

              <div className="border border-line bg-cream p-5">
                <h3 className="font-display text-base font-bold text-ocean">
                  Tobacco and vapers
                </h3>
                <p className="mt-2 text-xs md:text-sm text-ink-soft leading-relaxed">
                  Electronic cigarettes, vapers (with or without nicotine), and heated tobacco devices are <strong>strictly equated</strong> to traditional tobacco. They cannot be used in terrace areas either.
                </p>
              </div>

              <div className="border border-line bg-cream p-5">
                <h3 className="font-display text-base font-bold text-ocean">
                  New environments
                </h3>
                <p className="mt-2 text-xs md:text-sm text-ink-soft leading-relaxed">
                  Restrictions are extended to highly crowded outdoor areas during the summer season, such as beaches, public swimming pools, or sports venues.
                </p>
              </div>
            </div>
          </section>

          {/* Sección 2 */}
          <section className="space-y-4">
            <h2 className="font-display text-2xl font-bold text-ocean md:text-3xl">
              2. Is this ban already in force in Orihuela Costa?
            </h2>
            <p className="text-sm md:text-base leading-relaxed text-ink-soft">
              This is the point that generates the most doubts among visitors. <strong>As of today, the ban on terraces is not yet effective immediately.</strong>
            </p>
            <div className="border border-line bg-cream p-6 space-y-4">
              <p className="text-xs md:text-sm text-ink-soft leading-relaxed">
                The measure approved by the Government is a <strong>bill</strong> that is currently being processed in the Cortes Generales (Parliament) for debate and possible modifications.
              </p>
              <ul className="list-disc list-inside space-y-2 text-xs md:text-sm text-ink-soft">
                <li>While this parliamentary process is completed and definitively published in the Official State Gazette (BOE), <strong>the previous regulations still apply</strong>.</li>
                <li>This means that, in general, smoking is still allowed on those terraces where establishments permit it, always respecting local ordinances or specific rules that each venue decides to apply on its own initiative.</li>
              </ul>
            </div>
          </section>

          {/* Sección 3 */}
          <section className="space-y-4">
            <h2 className="font-display text-2xl font-bold text-ocean md:text-3xl">
              3. A rising value: Wellness tourism and clean spaces
            </h2>
            <p className="text-sm md:text-base leading-relaxed text-ink-soft">
              Regardless of the legislative deadlines, the trend in Costa Blanca's hospitality is clearly moving towards creating healthier and more respectful spaces. For many travelers—especially families with children or people who prefer smoke-free environments—the rise of 100% clean terraces is a highly valued attraction when choosing where to eat, have a drink, or spend a holiday.
            </p>
            
            <div className="bg-linen p-5 border border-line mt-4">
              <p className="text-sm leading-relaxed text-ink-soft">
                At <strong>Pinada Sun</strong>, we are committed to quality tourism, focused on rest, tranquility, and wellness in a privileged environment of Orihuela Costa. Whether you are looking for mid-season stays or a few days to disconnect, staying informed about these changes will help you plan every detail of your trip with total comfort.
              </p>
            </div>
            
            <p className="text-sm italic text-ink-soft mt-4">
              Do you have any doubts about your next booking or need recommendations for adapted venues in the area? Write to us or leave us a comment!
            </p>
          </section>

          {/* Tarjeta de Alojamiento Recomendado */}
          <div className="border border-line bg-pine-deep text-cream p-8 md:p-10 shadow-lg mt-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-sun-light text-xs font-semibold uppercase tracking-wider">
                <IconStar className="h-4 w-4 fill-sun text-sun" />
                <span>Premium Accommodation in Orihuela Costa</span>
              </div>
              <h3 className="font-display text-2xl font-bold text-cream">
                Enjoy Pinada Sun with total peace of mind
              </h3>
              <p className="text-xs md:text-sm text-cream/80 max-w-xl">
                Exclusive apartment with a large private terrace, communal pool, and barbecue in Villamartín. Direct booking with no commission.
              </p>
            </div>

            <Link
              href="/en/#reserva"
              className="inline-flex items-center justify-center gap-2 bg-sun px-6 py-3.5 text-xs md:text-sm font-semibold text-pine-deep shadow-md hover:bg-sun-light transition-all shrink-0"
            >
              Check availability
              <IconArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-line bg-cream py-8 text-center text-xs text-ink-soft">
          <div className="mx-auto max-w-4xl px-5 space-y-2">
            <p>© 2026 {APARTMENT.name} · {APARTMENT.domain}</p>
            <div className="flex justify-center gap-4 text-ocean">
              <Link href="/en/guia-local" className="hover:underline">
                ← Back to Local Guide
              </Link>
              <span>•</span>
              <Link href="/en" className="hover:underline">
                Home
              </Link>
            </div>
          </div>
        </footer>
        <VisitCounter pagePath="/en/guia-local/nueva-ley-tabaco-terrazas" />
      </div>
    </>
  );
}
