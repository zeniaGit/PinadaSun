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
import { VisitCounter } from "@/components/visit-counter";

export const metadata: Metadata = {
  title: "Guide to Regulations and Rules in Orihuela Costa | Beaches, E-scooters & Rest",
  description:
    "Practical guide to municipal ordinances and living in Orihuela Costa and Villamartín: electric scooters (e-scooters), rest hours, lifeguards, beach flag meanings, and emergency numbers.",
  keywords: [
    "orihuela costa municipal regulations",
    "orihuela costa electric scooter rules",
    "orihuela costa beach lifeguard hours",
    "orihuela costa beach flag meanings",
    "orihuela costa noise and rest hours",
    "orihuela costa tourist accommodation rules",
    "villamartin holiday guide",
  ],
  alternates: {
    canonical: "https://pinadasun.com/en/guia-normativa-orihuela-costa",
  },
  openGraph: {
    type: "article",
    locale: "en_US",
    url: "https://pinadasun.com/en/guia-normativa-orihuela-costa",
    siteName: "Pinada Sun",
    title: "Guide to Regulations and Living in Orihuela Costa | Beaches, Mobility & Rest",
    description:
      "Essential information about Orihuela Costa's municipal ordinances: e-scooters, rest periods, beaches, flags, and emergencies.",
    images: [
      {
        url: "/images/terrace-hero.webp",
        width: 1200,
        height: 630,
        alt: "Guide to living and regulations in Orihuela Costa",
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
        "@id": "https://pinadasun.com/en/guia-normativa-orihuela-costa#article",
        headline: "Guide to Municipal Ordinances and Living in Orihuela Costa",
        description:
          "Basic regulations for guests and residents in Orihuela Costa: electric scooter rules, noise hours, beach lifeguarding, and waste management.",
        inLanguage: "en",
        mainEntityOfPage: "https://pinadasun.com/en/guia-normativa-orihuela-costa",
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
          name: "Pinada Sun Tourist Guide",
        },
      },
      {
        "@type": "FAQPage",
        "@id": "https://pinadasun.com/en/guia-normativa-orihuela-costa#faq",
        mainEntity: [
          {
            "@type": "Question",
            name: "Can electric scooters be ridden on pavements in Orihuela Costa?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. According to municipal mobility ordinances and the DGT, electric scooters (e-scooters) are prohibited from being ridden on pavements, promenades, and pedestrian zones. They must be ridden on cycle lanes or the road in urban areas.",
            },
          },
          {
            "@type": "Question",
            name: "What are the rest hours and noise limits in Orihuela Costa?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Night-time rest hours are from 23:00 to 08:00. During this period, it is prohibited to generate excessive noise, hold terrace parties, or play loud music that disturbs neighbours' rest.",
            },
          },
          {
            "@type": "Question",
            name: "What are the lifeguard hours on Orihuela Costa beaches?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "During the summer season (June to September), the rescue and lifeguard service typically operates from 10:00 to 19:00 or 20:00 on all Blue Flag beaches (La Zenia, Cala Capitán, Playa Flamenca, Cabo Roig).",
            },
          },
          {
            "@type": "Question",
            name: "What do the beach flag colours mean?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Green indicates swimming is permitted with good conditions; Yellow indicates caution due to waves or currents; Red prohibits swimming due to high risk; and the White flag with a jellyfish icon warns of the presence of stinging marine life.",
            },
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://pinadasun.com/en/guia-normativa-orihuela-costa#breadcrumbs",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://pinadasun.com/en",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Guide to Regulations and Rules in Orihuela Costa",
            item: "https://pinadasun.com/en/guia-normativa-orihuela-costa",
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
        <Header lang="en" />

        {/* ═══ ARTICLE HEADER ═══ */}
        <section className="relative bg-pine-deep text-cream pt-36 pb-20 px-5 md:px-8 overflow-hidden">
          <div className="mx-auto max-w-4xl">
            <nav className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sun-light/80">
              <Link href="/en" className="hover:text-cream transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-cream">Guide & Regulations</span>
            </nav>

            <span className="inline-flex items-center gap-2 rounded bg-sun/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-sun-light border border-sun/30">
              <IconShieldCheck className="h-4 w-4" />
              Guide to Living and Municipal Ordinances
            </span>

            <h1 className="mt-6 font-display text-3xl font-bold tracking-tight md:text-5xl leading-tight text-cream">
              Rules, Beaches, and Living in Orihuela Costa and Villamartín
            </h1>

            <p className="mt-5 text-base md:text-lg leading-relaxed text-cream/80 max-w-3xl">
              Essential information about municipal ordinances to enjoy a pleasant, respectful, and safe stay: electric scooter regulations, night-time rest, beach services, and useful numbers.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-6 border-t border-cream/15 pt-6 text-xs text-cream/60">
              <span>Updated: 2026</span>
              <span>•</span>
              <span>Area: Orihuela Costa (Villamartín, La Zenia, Playa Flamenca)</span>
            </div>
          </div>
        </section>

        {/* ═══ ARTICLE BODY ═══ */}
        <main className="mx-auto max-w-4xl px-5 py-16 md:px-8 space-y-14">
          {/* Executive Summary Block */}
          <div className="border-l-4 border-sun bg-cream p-6 shadow-xs border-y border-r border-line">
            <h2 className="font-display text-lg font-bold text-ocean">
              Executive summary for travellers and residents
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              The municipality of Orihuela (Orihuela Costa) has specific ordinances for civic coexistence, beaches, and mobility. The four key rules every guest must know are: <strong>prohibition of e-scooters on pavements</strong>, <strong>rest hours from 23:00 to 08:00</strong>, strict adherence to <strong>beach flags</strong>, and waste disposal <strong>from 20:00</strong>.
            </p>
          </div>

          {/* Section 1: Electric Scooters */}
          <section id="patinetes" className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded bg-ocean/10 text-sm font-bold text-ocean">
                1
              </span>
              <h2 className="font-display text-2xl font-bold text-ocean md:text-3xl">
                Use of electric scooters (e-scooters) and bicycles
              </h2>
            </div>
            <p className="text-sm md:text-base leading-relaxed text-ink-soft">
              The use of Personal Mobility Vehicles (PMVs) such as electric scooters is regulated by the DGT and local urban mobility ordinances to ensure the safety of pedestrians and drivers:
            </p>

            <div className="grid gap-4 sm:grid-cols-2 pt-2">
              <div className="border border-line bg-cream p-5">
                <h3 className="font-display text-base font-bold text-ocean">
                  Authorised routes
                </h3>
                <ul className="mt-3 space-y-2 text-xs md:text-sm text-ink-soft list-disc list-inside">
                  <li><strong>Permitted</strong>: Designated cycle lanes and urban roads limited to 30 km/h.</li>
                  <li><strong>Strictly prohibited</strong>: Pavements, pedestrian promenades, and interurban roads or crossings.</li>
                  <li>Maximum authorised speed: <strong>25 km/h</strong>.</li>
                </ul>
              </div>

              <div className="border border-line bg-cream p-5">
                <h3 className="font-display text-base font-bold text-ocean">
                  Safety requirements and fines
                </h3>
                <ul className="mt-3 space-y-2 text-xs md:text-sm text-ink-soft list-disc list-inside">
                  <li>Mandatory use of an <strong>approved protective helmet</strong>.</li>
                  <li>White front light and red rear light with mandatory reflectors at night.</li>
                  <li><strong>Prohibited</strong> use of headphones, mobile phones, or carrying two people on the same scooter.</li>
                  <li>0.0 alcohol limit for minors and subject to general limits for adults.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 2: Rest Hours */}
          <section id="descanso" className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded bg-ocean/10 text-sm font-bold text-ocean">
                2
              </span>
              <h2 className="font-display text-2xl font-bold text-ocean md:text-3xl">
                Rest hours and noise ordinance
              </h2>
            </div>
            <p className="text-sm md:text-base leading-relaxed text-ink-soft">
              In the residential estates of Villamartín and Orihuela Costa, rest and good neighbourliness are priorities to ensure everyone's comfort:
            </p>

            <div className="border border-line bg-cream p-6 space-y-4">
              <div className="flex items-center gap-3 text-ocean font-semibold text-sm">
                <IconClock className="h-5 w-5 text-sun" />
                <span>Night-time Rest Period: from 23:00 to 08:00</span>
              </div>
              <p className="text-xs md:text-sm text-ink-soft leading-relaxed">
                During these hours, activities that generate disturbing noise inside properties, communal areas, or outdoor terraces are not permitted (loud music, parties, dragging furniture, or loud conversations).
              </p>
              <div className="bg-linen p-4 border border-line text-xs text-ink-soft">
                <strong>Swimming pool and communal areas</strong>: Please respect the estate's internal rules, maintaining a serene atmosphere and using the facilities within the scheduled hours.
              </div>
            </div>
          </section>

          {/* Section 3: Beaches and Lifeguards */}
          <section id="playas" className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded bg-ocean/10 text-sm font-bold text-ocean">
                3
              </span>
              <h2 className="font-display text-2xl font-bold text-ocean md:text-3xl">
                Orihuela Costa Beaches: Lifeguards and Flags
              </h2>
            </div>
            <p className="text-sm md:text-base leading-relaxed text-ink-soft">
              The 11 beaches and coves of Orihuela Costa awarded the <strong>Blue Flag</strong> (such as La Zenia, Cala Capitán, or Playa Flamenca) have professional rescue and maritime surveillance services:
            </p>

            <div className="border border-line bg-cream p-5 space-y-3">
              <h3 className="font-display text-base font-bold text-ocean">
                Lifeguard Service Hours
              </h3>
              <p className="text-xs md:text-sm text-ink-soft leading-relaxed">
                In the summer season (15 June to 15 September), lifeguard stations operate uninterruptedly from <strong>10:00 to 19:00 or 20:00</strong>. During Easter and mid-season, hours are adapted to visitor numbers.
              </p>
            </div>

            {/* Flags Table */}
            <div className="space-y-3 pt-2">
              <h3 className="font-display text-base font-bold text-ocean">
                Official meaning of beach flags
              </h3>
              <div className="overflow-x-auto border border-line bg-cream">
                <table className="w-full text-left text-xs md:text-sm">
                  <thead className="bg-linen border-b border-line text-ocean font-semibold">
                    <tr>
                      <th className="p-3.5">Flag</th>
                      <th className="p-3.5">Meaning</th>
                      <th className="p-3.5">Conditions and Recommendation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line text-ink-soft">
                    <tr>
                      <td className="p-3.5 font-bold text-emerald-700">🟢 Green</td>
                      <td className="p-3.5 font-medium text-ink">Swimming permitted</td>
                      <td className="p-3.5">Calm sea and good hygienic-sanitary conditions.</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold text-amber-700">🟡 Yellow</td>
                      <td className="p-3.5 font-medium text-ink">Caution</td>
                      <td className="p-3.5">Waves, undertow, or currents. Only bathe where you can touch the bottom with your head above water.</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold text-rose-700">🔴 Red</td>
                      <td className="p-3.5 font-medium text-ink">Swimming prohibited</td>
                      <td className="p-3.5">Severe risk to life. Entering the water under a red flag entails police fines.</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold text-sky-700">🪼 White (Jellyfish)</td>
                      <td className="p-3.5 font-medium text-ink">Stinging marine life</td>
                      <td className="p-3.5">Presence of jellyfish swarms. Hoisted alongside the green or yellow flag.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-linen p-5 border border-line space-y-2 text-xs md:text-sm text-ink-soft">
              <h4 className="font-bold text-ink">Other mandatory rules on the beaches:</h4>
              <ul className="list-disc list-inside space-y-1">
                <li><strong>Reserving a spot is prohibited</strong> by placing empty umbrellas or chairs early in the morning (municipal services may remove them).</li>
                <li><strong>Responsible use of showers</strong>: Using gels, soaps, or shampoos in footwashes and public showers is prohibited.</li>
                <li><strong>Pets</strong>: Access with pets is not permitted during the bathing season, except on expressly signposted dog beaches.</li>
                <li><strong>Waste</strong>: Leaving cigarette butts, cans, or plastics on the sand is prohibited; use the recycling bins at the access points.</li>
              </ul>
            </div>
          </section>

          {/* Section 4: Waste and Recycling */}
          <section id="residuos" className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded bg-ocean/10 text-sm font-bold text-ocean">
                4
              </span>
              <h2 className="font-display text-2xl font-bold text-ocean md:text-3xl">
                Waste disposal and recycling
              </h2>
            </div>
            <p className="text-sm md:text-base leading-relaxed text-ink-soft">
              To prevent odours and keep the environment clean, the Orihuela Costa cleaning ordinance establishes:
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="border border-line bg-cream p-5 space-y-2">
                <h3 className="font-display text-sm font-bold text-ocean">Organic waste hours</h3>
                <p className="text-xs md:text-sm text-ink-soft">
                  Dispose of closed bags in the grey bins <strong>from 20:00</strong> in summer to prevent fermentation due to daytime heat.
                </p>
              </div>
              <div className="border border-line bg-cream p-5 space-y-2">
                <h3 className="font-display text-sm font-bold text-ocean">Recycling bins (24 h)</h3>
                <p className="text-xs md:text-sm text-ink-soft">
                  Yellow (plastics and packaging), Blue (folded paper and cardboard), and Green (glass without lids). They can be used at any time while respecting rest hours.
                </p>
              </div>
            </div>
          </section>

          {/* Section 5: Emergency Numbers */}
          <section id="telefonos" className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded bg-ocean/10 text-sm font-bold text-ocean">
                5
              </span>
              <h2 className="font-display text-2xl font-bold text-ocean md:text-3xl">
                Emergency and Assistance Numbers in Orihuela Costa
              </h2>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
              <div className="border border-line bg-cream p-4">
                <p className="text-xs font-semibold uppercase text-rose-700">General Emergencies</p>
                <p className="font-display text-2xl font-bold text-ink mt-1">112</p>
                <p className="text-[11px] text-ink-soft mt-1">Police, Fire Brigade, and Ambulances (multilingual)</p>
              </div>

              <div className="border border-line bg-cream p-4">
                <p className="text-xs font-semibold uppercase text-ocean">Orihuela Costa Local Police</p>
                <p className="font-display text-lg font-bold text-ink mt-1">96 676 00 00</p>
                <p className="text-[11px] text-ink-soft mt-1">Orihuela Costa Town Hall</p>
              </div>

              <div className="border border-line bg-cream p-4">
                <p className="text-xs font-semibold uppercase text-ocean">Aguamarina Health Centre</p>
                <p className="font-display text-lg font-bold text-ink mt-1">96 674 83 43</p>
                <p className="text-[11px] text-ink-soft mt-1">Medical emergencies in Orihuela Costa</p>
              </div>
            </div>
          </section>

          {/* Recommended Accommodation Card */}
          <div className="border border-line bg-pine-deep text-cream p-8 md:p-10 shadow-lg mt-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-sun-light text-xs font-semibold uppercase tracking-wider">
                <IconStar className="h-4 w-4 fill-sun text-sun" />
                <span>Quality Accommodation in Orihuela Costa</span>
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

        {/* Simple Footer */}
        <footer className="border-t border-line bg-cream py-8 text-center text-xs text-ink-soft">
          <div className="mx-auto max-w-4xl px-5 space-y-2">
            <p>© 2026 {APARTMENT.name} · {APARTMENT.domain}</p>
            <p>
              <Link href="/en" className="text-ocean underline hover:text-ocean-light">
                ← Back to home page
              </Link>
            </p>
          </div>
        </footer>
        <VisitCounter pagePath="/en/guia-normativa-orihuela-costa" />
      </div>
    </>
  );
}
