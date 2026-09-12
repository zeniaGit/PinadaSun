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
  title: "Local Customs and Practical Rules in Orihuela Costa | Traveler's Guide",
  description:
    "Complete guide on habits, customs and rules in Orihuela Costa: dress code in shops, tips and payments in restaurants, gastronomic vocabulary (marineras, arroz del senyoret) and driving in roundabouts.",
  keywords: [
    "customs orihuela costa",
    "restaurant rules alicante pay after",
    "what is a marinera tapa",
    "arroz del senyoret orihuela costa",
    "roundabout rules spain",
    "driving shirtless dgt",
    "travel guide orihuela costa vega baja",
  ],
  alternates: {
    canonical: "https://pinadasun.com/en/guia-local/costumbres-y-normas",
  },
  openGraph: {
    type: "article",
    locale: "en_US",
    url: "https://pinadasun.com/en/guia-local/costumbres-y-normas",
    siteName: "Pinada Sun",
    title: "Local Customs and Practical Rules in Orihuela Costa: Traveler's Guide",
    description:
      "Learn the habits and customs of Orihuela Costa: dress code, gastronomy, tapas and traffic rules.",
    images: [
      {
        url: "/images/terrace-hero.webp",
        width: 1200,
        height: 630,
        alt: "Local customs and practical rules in Orihuela Costa",
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
        "@id": "https://pinadasun.com/en/guia-local/costumbres-y-normas#article",
        headline: "Local customs and practical rules in Orihuela Costa: Traveler's Guide",
        description:
          "Orihuela Costa follows the customs of southern Alicante and the Vega Baja. Guide to dress codes in shops, payment in restaurants, typical tapas, and driving in roundabouts.",
        inLanguage: "en-US",
        mainEntityOfPage: "https://pinadasun.com/en/guia-local/costumbres-y-normas",
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
          name: "Pinada Sun Local Guide",
        },
      },
      {
        "@type": "FAQPage",
        "@id": "https://pinadasun.com/en/guia-local/costumbres-y-normas#faq",
        mainEntity: [
          {
            "@type": "Question",
            name: "What is the difference between a marinera and a marinero?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Both are tapas served on an elongated crunchy breadstick (rosquilla) with Russian salad. The marinera is topped with a salted anchovy, while the marinero replaces the anchovy with an anchovy in vinegar (boquerón). If it doesn't have fish, it's known as a Bicicleta.",
            },
          },
          {
            "@type": "Question",
            name: "Is it legal to drive shirtless or enter a shop without a shirt?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "In shops and public buildings, it is prohibited by internal rules and municipal ordinances. At the wheel, the DGT can fine you for driving shirtless or in flip-flops if the officer considers it compromises your freedom of movement or the driver's safety.",
            },
          },
          {
            "@type": "Question",
            name: "What time is lunch and dinner usually served in the area?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The usual time for lunch or the main meal is from 1:30 PM to 3:30 PM. Dinners are usually served from 8:30 PM to 10:30 PM, although international options and shopping centers adapt to earlier times (from 6:30 PM) for Northern European tourists.",
            },
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://pinadasun.com/en/guia-local/costumbres-y-normas#breadcrumbs",
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
            name: "Local Guide",
            item: "https://pinadasun.com/en/guia-local",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Practical Customs and Rules",
            item: "https://pinadasun.com/en/guia-local/costumbres-y-normas",
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

        {/* ═══ HEADER ═══ */}
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
              <span className="text-cream">Customs and Rules</span>
            </nav>

            <span className="inline-flex items-center gap-2 rounded bg-sun/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-sun-light border border-sun/30">
              <IconShieldCheck className="h-4 w-4" />
              Local Guide · Orihuela Costa
            </span>

            <h1 className="mt-6 font-display text-3xl font-bold tracking-tight md:text-5xl leading-tight text-cream">
              Local Customs and Practical Rules in Orihuela Costa: Traveler's Guide
            </h1>

            <p className="mt-5 text-base md:text-lg leading-relaxed text-cream/80 max-w-3xl">
              Common habits, typical gastronomy, coexistence rules, and driving tips in southern Alicante and the Vega Baja.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-6 border-t border-cream/15 pt-6 text-xs text-cream/60">
              <span>Updated: 2026</span>
              <span>•</span>
              <span>Reading time: 4 min</span>
              <span>•</span>
              <span>Area: Orihuela Costa, Villamartín, La Zenia, Cabo Roig</span>
            </div>
          </div>
        </section>

        {/* ═══ ARTICLE BODY ═══ */}
        <main className="mx-auto max-w-4xl px-5 py-16 md:px-8 space-y-14">
          {/* Summary Block */}
          <div className="border-l-4 border-sun bg-cream p-6 shadow-xs border-y border-r border-line">
            <h2 className="font-display text-base font-bold uppercase tracking-wider text-ocean">
              In short
            </h2>
            <p className="mt-2 text-sm md:text-base leading-relaxed text-ink-soft">
              Orihuela Costa follows the customs of southern Alicante and the Vega Baja surroundings. Bars and restaurants charge at the end of the meal, the dress code prohibits being shirtless in shops, and driving in roundabouts and motorways strictly requires the use of the right lane except for overtaking.
            </p>
          </div>

          {/* Section 1: Coexistence and Dress Code */}
          <section id="vestimenta" className="space-y-4">
            <h2 className="font-display text-2xl font-bold text-ocean md:text-3xl">
              Rules of coexistence and dress code in public spaces
            </h2>
            <p className="text-sm md:text-base leading-relaxed text-ink-soft">
              In the urbanizations and beaches of Orihuela Costa (such as La Zenia, Cabo Roig, Playa Flamenca, or Campoamor), the environment is touristy but maintains municipal regulations and commercial courtesy:
            </p>

            <div className="grid gap-4 sm:grid-cols-3 pt-2">
              <div className="border border-line bg-cream p-5">
                <h3 className="font-display text-base font-bold text-ocean">
                  Shirtless
                </h3>
                <p className="mt-2 text-xs md:text-sm text-ink-soft leading-relaxed">
                  It is not allowed to enter supermarkets, pharmacies, shops, or restaurant interiors without a shirt or in a swimsuit. Outside the sand and the promenade, you are required to wear street clothes (t-shirt or blouse and footwear).
                </p>
              </div>

              <div className="border border-line bg-cream p-5">
                <h3 className="font-display text-base font-bold text-ocean">
                  Consumption and payment
                </h3>
                <p className="mt-2 text-xs md:text-sm text-ink-soft leading-relaxed">
                  As a general rule, in bars, cafes, and chiringuitos (beach bars), you pay <strong>after having consumed</strong>, right before leaving. Only on crowded terraces or self-service places is immediate payment requested when serving.
                </p>
              </div>

              <div className="border border-line bg-cream p-5">
                <h3 className="font-display text-base font-bold text-ocean">
                  Tips
                </h3>
                <p className="mt-2 text-xs md:text-sm text-ink-soft leading-relaxed">
                  They are not mandatory nor are they charged by default on the bill. It is customary to round up the amount or leave between <strong>5% and 10%</strong> in cash if the service was satisfactory.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: Local Gastronomy */}
          <section id="gastronomia" className="space-y-4">
            <h2 className="font-display text-2xl font-bold text-ocean md:text-3xl">
              Local gastronomy: Terms, typical dishes, and orders
            </h2>
            <p className="text-sm md:text-base leading-relaxed text-ink-soft">
              The gastronomic vocabulary of the area mixes the tradition of Alicante with the influence of the garden and the sea:
            </p>

            <div className="overflow-x-auto border border-line bg-cream shadow-xs">
              <table className="w-full text-left text-xs md:text-sm">
                <thead className="bg-linen border-b border-line text-ocean font-semibold">
                  <tr>
                    <th className="p-4 w-1/4">Concept</th>
                    <th className="p-4 w-1/2">What it is and exact composition</th>
                    <th className="p-4 w-1/4">Practical detail</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line text-ink-soft">
                  <tr>
                    <td className="p-4 font-bold text-ink">Caña</td>
                    <td className="p-4">Glass of draft beer (approx. 200–250 ml).</td>
                    <td className="p-4">The standard size before ordering a "jarra" (jug) or "pinta" (pint).</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-ink">Marinera</td>
                    <td className="p-4">
                      Crunchy breadstick with Russian salad and an <strong>anchovy</strong> on top.
                    </td>
                    <td className="p-4">
                      The queen tapa of the appetizer. If it has an <strong>anchovy in vinegar (boquerón)</strong>, it's called <strong>Marinero</strong>; if it doesn't have fish, <strong>Bicicleta</strong>.
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-ink">Arroz / Paella del Senyoret</td>
                    <td className="p-4">
                      Rice with seafood and clean fish: <strong>peeled prawns, squid, and tuna</strong> (without shells or bones).
                    </td>
                    <td className="p-4">Designed to "eat like a lord", without getting your hands dirty.</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-ink">Sangría vs. Tinto de Verano</td>
                    <td className="p-4">
                      Sangría contains wine, fruit, and <strong>added liquors</strong> (rum, gin, or brandy); tinto de verano only contains wine and soda or lemon soda.
                    </td>
                    <td className="p-4">Sangría has a higher alcohol content and a higher price per liter.</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-ink">Homemade desserts</td>
                    <td className="p-4">Cakes, flans, or mille-feuille from the bakery.</td>
                    <td className="p-4">They increase the final ticket between <strong>€4.50 and €7.00</strong> per diner.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 3: Traffic and Roundabouts */}
          <section id="trafico" className="space-y-4">
            <h2 className="font-display text-2xl font-bold text-ocean md:text-3xl">
              Traffic rules and driving in roundabouts
            </h2>
            <p className="text-sm md:text-base leading-relaxed text-ink-soft">
              The road network of Orihuela Costa has a high density of traffic on the <strong>N-332</strong> and the <strong>AP-7</strong>, as well as multiple roundabouts accessing urbanizations:
            </p>

            <div className="space-y-3">
              <div className="border border-line bg-cream p-5">
                <h3 className="font-display text-base font-bold text-ocean">
                  1. Use of the right lane
                </h3>
                <p className="mt-1 text-xs md:text-sm text-ink-soft leading-relaxed">
                  Spanish regulations require always driving in the right lane on dual carriageways and interurban roads, using the left lane only for overtaking maneuvers.
                </p>
              </div>

              <div className="border border-line bg-cream p-5">
                <h3 className="font-display text-base font-bold text-ocean">
                  2. Priority and path in roundabouts
                </h3>
                <ul className="mt-2 space-y-1.5 text-xs md:text-sm text-ink-soft list-disc list-inside">
                  <li>Vehicles already inside the roundabout have priority over those entering.</li>
                  <li>To take any exit, it is mandatory to position yourself in advance in the <strong>outer (right) lane</strong>. The inner lane is used solely for circulating or overtaking, never for leaving the roundabout directly across lanes.</li>
                </ul>
              </div>

              <div className="border border-line bg-cream p-5">
                <h3 className="font-display text-base font-bold text-ocean">
                  3. Signaling and indicators
                </h3>
                <p className="mt-1 text-xs md:text-sm text-ink-soft leading-relaxed">
                  The use of indicators is mandatory when changing lanes within the roundabout and just before taking the chosen exit.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: Weekly Markets */}
          <section id="mercadillos" className="space-y-4">
            <h2 className="font-display text-2xl font-bold text-ocean md:text-3xl">
              Weekly markets in Orihuela Costa: Days, locations, and hours
            </h2>
            <p className="text-sm md:text-base leading-relaxed text-ink-soft">
              Open-air markets are a key commercial tradition on the coast. They operate mainly in the morning and offer fruit and vegetables from the Vega Baja garden, pickles, cheeses, clothing, footwear, and household items:
            </p>

            <div className="overflow-x-auto border border-line bg-cream shadow-xs">
              <table className="w-full text-left text-xs md:text-sm">
                <thead className="bg-linen border-b border-line text-ocean font-semibold">
                  <tr>
                    <th className="p-3.5 w-1/5">Market</th>
                    <th className="p-3.5 w-1/6">Day</th>
                    <th className="p-3.5 w-1/6">Hours</th>
                    <th className="p-3.5 w-1/4">Exact location</th>
                    <th className="p-3.5 w-1/4">Specialty</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line text-ink-soft">
                  <tr>
                    <td className="p-3.5 font-bold text-ink">Playa Flamenca</td>
                    <td className="p-3.5 font-semibold text-ocean">Saturdays</td>
                    <td className="p-3.5">08:00 – 14:00</td>
                    <td className="p-3.5">Nicolás de Bussi Street (next to C.C. Citrus)</td>
                    <td className="p-3.5">The largest on the coast (+300 stalls). Textiles, footwear, fruits, and roast chickens.</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold text-ink">Aguamarina / Campoamor</td>
                    <td className="p-3.5 font-semibold text-ocean">Thursdays</td>
                    <td className="p-3.5">08:00 – 14:00</td>
                    <td className="p-3.5">Fuego Street (Aguamarina / Dehesa de Campoamor area)</td>
                    <td className="p-3.5">Quiet atmosphere facing the sea. Fresh products, cold meats, and crafts.</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold text-ink">Aguamarina Promenade (Summer)</td>
                    <td className="p-3.5 font-semibold text-ocean">Daily (Jun to Sep)</td>
                    <td className="p-3.5">19:00 – 00:00</td>
                    <td className="p-3.5">Aguamarina promenade</td>
                    <td className="p-3.5">Night market of crafts, costume jewelry, leather, and gifts.</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold text-ink">San Miguel de Salinas (Nearby)</td>
                    <td className="p-3.5 font-semibold text-ocean">Wednesdays</td>
                    <td className="p-3.5">08:00 – 14:00</td>
                    <td className="p-3.5">Juan XXIII Street (town center)</td>
                    <td className="p-3.5">Traditional market with a strong presence of local farmers.</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold text-ink">Torrevieja (Nearby)</td>
                    <td className="p-3.5 font-semibold text-ocean">Fridays</td>
                    <td className="p-3.5">08:00 – 14:00</td>
                    <td className="p-3.5">Antonio Soria Park (Delfina Viudes Ave)</td>
                    <td className="p-3.5">One of the largest markets in Spain (+700 stalls).</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-linen p-4 border border-line text-xs md:text-sm text-ink-soft">
              <strong>💡 Practical recommendation:</strong> At the Saturday morning markets (Playa Flamenca), traffic on the access routes from the N-332 usually gets congested between 10:30 and 12:30. It is advisable to go early (before 09:30) to park easily.
            </div>
          </section>

          {/* Section 5: Calendar and Commercial Holidays */}
          <section id="festivos-comerciales" className="space-y-4">
            <h2 className="font-display text-2xl font-bold text-ocean md:text-3xl">
              Calendar and commercial holidays (Freedom of opening)
            </h2>
            <p className="text-sm md:text-base leading-relaxed text-ink-soft">
              Orihuela Costa is classified as a <strong>Zone of Great Tourist Influx (ZGAT)</strong> according to the regulations of the Valencian Community:
            </p>

            <div className="grid gap-4 sm:grid-cols-3 pt-2">
              <div className="border border-line bg-cream p-5">
                <h3 className="font-display text-base font-bold text-ocean">
                  Sunday opening in high season
                </h3>
                <p className="mt-2 text-xs md:text-sm text-ink-soft leading-relaxed">
                  During the summer period (from mid-June to early January) and Holy Week/Easter periods, shopping centers (like <strong>Zenia Boulevard</strong>) and large food stores are authorized to <strong>open on Sundays and holidays</strong>.
                </p>
              </div>

              <div className="border border-line bg-cream p-5">
                <h3 className="font-display text-base font-bold text-ocean">
                  Low season
                </h3>
                <p className="mt-2 text-xs md:text-sm text-ink-soft leading-relaxed">
                  Between mid-January and early June, large supermarkets and shopping centers usually close on Sundays, except for specific holidays set by the annual regional trade calendar.
                </p>
              </div>

              <div className="border border-line bg-cream p-5">
                <h3 className="font-display text-base font-bold text-ocean">
                  Small commerce
                </h3>
                <p className="mt-2 text-xs md:text-sm text-ink-soft leading-relaxed">
                  Convenience food stores under 300 m² have free hours and open 365 days a year.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: FAQs */}
          <section id="faq" className="space-y-4">
            <h2 className="font-display text-2xl font-bold text-ocean md:text-3xl">
              Frequently asked questions about habits and customs in Orihuela Costa
            </h2>

            <div className="space-y-4 pt-2">
              <div className="border border-line bg-cream p-5">
                <h3 className="font-display text-base font-bold text-ocean">
                  What is the difference between a marinera and a marinero?
                </h3>
                <p className="mt-2 text-xs md:text-sm text-ink-soft leading-relaxed">
                  Both are tapas served on an elongated crunchy breadstick (rosquilla) with Russian salad. The marinera is topped with a salted anchovy, while the marinero replaces the anchovy with an anchovy in vinegar.
                </p>
              </div>

              <div className="border border-line bg-cream p-5">
                <h3 className="font-display text-base font-bold text-ocean">
                  Is it legal to drive shirtless or enter a shop without a shirt?
                </h3>
                <p className="mt-2 text-xs md:text-sm text-ink-soft leading-relaxed">
                  In shops and public buildings, it is prohibited by internal rules and municipal ordinances. At the wheel, the DGT can fine you for driving shirtless or in flip-flops if the officer considers it compromises your freedom of movement or the driver's safety.
                </p>
              </div>

              <div className="border border-line bg-cream p-5">
                <h3 className="font-display text-base font-bold text-ocean">
                  What time is lunch and dinner usually served in the area?
                </h3>
                <p className="mt-2 text-xs md:text-sm text-ink-soft leading-relaxed">
                  The usual time for lunch or the main meal is from <strong>1:30 PM to 3:30 PM</strong>. Dinners are usually served from <strong>8:30 PM to 10:30 PM</strong>, although international options and shopping centers adapt to earlier times (from 6:30 PM) for Northern European tourists.
                </p>
              </div>
            </div>
          </section>

          {/* Recommended Accommodation Card */}
          <div className="border border-line bg-pine-deep text-cream p-8 md:p-10 shadow-lg mt-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-sun-light text-xs font-semibold uppercase tracking-wider">
                <IconStar className="h-4 w-4 fill-sun text-sun" />
                <span>Your Exclusive Accommodation in Orihuela Costa</span>
              </div>
              <h3 className="font-display text-2xl font-bold text-cream">
                Pinada Sun · Villamartín
              </h3>
              <p className="text-xs md:text-sm text-cream/80 max-w-xl">
                High-end holiday apartment with a large private terrace, communal pool, and barbecue. Official direct booking without intermediaries.
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
        <VisitCounter pagePath="/en/guia-local/costumbres-y-normas" />
      </div>
    </>
  );
}
