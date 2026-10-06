import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Reveal, MaskLines } from "@/components/reveal";
import { IconWhatsApp, IconMail, IconArrowRight, AmenityIcon } from "@/components/icons";
import { APARTMENT, IMAGES } from "@/lib/apartment";
import { Logo } from "@/components/logo";

export const metadata: Metadata = {
  title: "Long Term Rentals & Winter Sun in Orihuela Costa | Pinada Sun",
  description:
    "Escape the winter and work remotely from Orihuela Costa. Special monthly rates for medium and long-term stays. High-speed Wi-Fi and a sunny terrace.",
  alternates: {
    canonical: "https://pinadasun.com/en/long-stays",
  },
};

function SectionLabel({
  children,
  color = "gold",
}: {
  children: React.ReactNode;
  color?: "gold" | "pine" | "clay" | "ocean";
}) {
  const colorClass = color === "gold" ? "text-sun" : color === "pine" ? "text-ocean-light" : "text-clay";
  const lineClass = color === "gold" ? "bg-sun" : color === "pine" ? "bg-ocean-light" : "bg-clay";

  return (
    <p className={`mb-4 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] ${colorClass}`}>
      <span className={`h-px w-8 ${lineClass}`} />
      {children}
    </p>
  );
}

const BENEFITS_EN = [
  {
    icon: "wifi",
    title: "High-Speed Fibre Optic",
    desc: "Fast and stable connection, perfect for uninterrupted video calls and remote work.",
  },
  {
    icon: "ac",
    title: "Efficient Climate Control",
    desc: "Daikin ducted air conditioning (hot/cold) in all rooms for an ideal thermal comfort.",
  },
  {
    icon: "kitchen",
    title: "Fully Equipped Kitchen",
    desc: "Complete appliances, dishwasher, oven, and kitchenware designed for comfortable daily living.",
  },
  {
    icon: "terrace",
    title: "Guaranteed Winter Sun",
    desc: "South-facing orientation guaranteeing sun on the terrace and inside the apartment throughout winter. Ideal for breakfast in the sun.",
  },
];

export default function LongStaysPage() {
  const whatsappMsg = encodeURIComponent(
    "Hi Raquel and Jose Miguel, I am interested in getting a quote and information for renting Pinada Sun for a few months. My approximate dates are..."
  );

  return (
    <div className="overflow-x-clip bg-linen">
      <Header lang="en" />

      {/* HERO SECTION */}
      <section className="relative flex min-h-[70vh] flex-col justify-end pt-32">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={IMAGES.hero}
            alt="Sunny terrace ideal for winter stays"
            className="kb h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-pine-deep via-pine-deep/80 to-pine-deep/40" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-16 md:px-8 md:pb-24">
          <MaskLines
            lines={["REMOTE WORK & WINTER SUN", "MEDIUM-TERM RENTALS"]}
            lineClassName="text-[11px] font-body font-semibold uppercase tracking-[0.32em] text-sun-light"
            delay={100}
            stagger={100}
          />
          <h1 className="mt-6 font-display text-[11vw] leading-[0.95] tracking-tight text-cream sm:text-[8vw] md:text-[5.5vw]">
            <MaskLines
              lines={["Your sunny home,", "for months."]}
              lineClassName=""
              delay={350}
              stagger={160}
            />
          </h1>
          <Reveal delay={700}>
            <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-cream/90">
              Escape the European winter, work remotely by the Mediterranean, or simply take a long break. We offer <strong>special monthly rates</strong> for medium-term stays in our apartment in Orihuela Costa.
            </p>
          </Reveal>
        </div>
      </section>

      {/* CONDICIONES & BENEFICIOS */}
      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionLabel color="pine">Why choose us</SectionLabel>
            <Reveal>
              <h2 className="font-display text-4xl leading-tight tracking-tight text-ink md:text-5xl">
                Ready for real living
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-6 text-[16px] leading-relaxed text-ink-soft">
                Unlike purely holiday-focused rentals, Pinada Sun is equipped as a primary residence. You have plenty of storage space, a kitchen where you can truly cook every day, and a peaceful residential environment year-round.
              </p>
            </Reveal>
            
            <div className="mt-12 space-y-8">
              {BENEFITS_EN.map((b, i) => (
                <Reveal key={b.title} delay={150 + i * 100}>
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-pine/10 text-pine">
                      <AmenityIcon name={b.icon as any} className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-[16px] font-bold text-ink">{b.title}</h3>
                      <p className="mt-1 text-[14.5px] leading-relaxed text-ink-soft">{b.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* CAJA DE PRECIOS/CONTACTO */}
          <div className="lg:mt-8">
            <Reveal delay={300}>
              <div className="rounded-2xl border border-line bg-white p-8 shadow-sm md:p-10">
                <h3 className="font-display text-3xl text-ink">Request a Quote</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                  Rates for long stays vary depending on the selected months and the total duration. Contact us directly to receive a personalized offer.
                </p>
                
                <div className="mt-8 space-y-4">
                  <p className="text-[13px] font-semibold uppercase tracking-widest text-pine">
                    What we need to know:
                  </p>
                  <ul className="space-y-2 text-[14.5px] text-ink-soft">
                    <li className="flex items-center gap-2">
                      <span className="text-sun">✔</span> Approximate dates (Arrival and departure)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-sun">✔</span> Number of guests
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-sun">✔</span> If you need any special setup for remote work
                    </li>
                  </ul>
                </div>

                <div className="mt-10 flex flex-col gap-4">
                  <a
                    href={`https://wa.me/${APARTMENT.whatsapp.replace(/\D/g, "")}?text=${whatsappMsg}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#25D366] px-6 py-4 text-[15px] font-bold text-white transition-all hover:bg-[#20ba5a] hover:scale-[1.02] shadow-md"
                  >
                    <IconWhatsApp className="h-5 w-5" />
                    Contact via WhatsApp
                  </a>
                  
                  <a
                    href={`mailto:${APARTMENT.email}?subject=Long Stay Request`}
                    className="flex w-full items-center justify-center gap-3 rounded-xl border border-line bg-linen px-6 py-4 text-[15px] font-bold text-ink transition-colors hover:bg-line/50"
                  >
                    <IconMail className="h-5 w-5 text-pine" />
                    Send an Email
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FOOTER SIMPLIFICADO */}
      <footer className="bg-pine-deep text-cream py-12 border-t border-cream/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-5 text-center">
          <Logo isLight />
          <p className="text-[14px] text-cream/70 max-w-md">
            Medium-term rentals in Orihuela Costa. Direct contact, no middleman fees.
          </p>
          <div className="flex items-center gap-6 text-[13px] text-sun-light mt-4">
            <a href="/en" className="hover:text-cream transition-colors">← Back to main website</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
