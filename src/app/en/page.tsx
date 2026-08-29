import type { Metadata } from "next";
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
  AMENITIES_EN,
  GUARANTEES_EN,
  GALLERY_EN,
  DETAIL_PHOTOS_EN,
  IMAGES,
  PLACES_EN,
  REVIEWS_EN,
  MARQUEE_ITEMS_EN,
} from "@/lib/apartment";
import { fmtEuro } from "@/lib/dates";

export const metadata: Metadata = {
  title: "Pinada Sun — Exclusive Vacation Apartment in Orihuela Costa | Terrace & Pool",
  description:
    "High-end vacation rental with large private terrace, community pool, and BBQ in Villamartín, Orihuela Costa. 2 bedrooms, premium comfort, 5 min from Zenia Boulevard.",
  keywords: [
    "Pinada Sun",
    "holiday rental orihuela costa",
    "vacation apartment villamartin",
    "apartment with terrace and bbq alicante",
    "zenia boulevard apartment rent",
    "golf villamartin luxury accommodation",
  ],
  alternates: {
    canonical: "https://pinadasun.com/en",
    languages: {
      "es-ES": "https://pinadasun.com",
      "en-US": "https://pinadasun.com/en",
      "en-GB": "https://pinadasun.com/en",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://pinadasun.com/en",
    siteName: "Pinada Sun",
    title: "Pinada Sun — Exclusive Vacation Living in Orihuela Costa",
    description:
      "High-end holiday apartment: private sun terrace with BBQ, pool, and superior amenities 5 min from Zenia Boulevard.",
    images: [
      {
        url: "/images/terrace-hero.webp",
        width: 1200,
        height: 630,
        alt: "Pinada Sun · Private terrace with porch and barbecue",
      },
    ],
  },
};

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

export default function EnglishHomePage() {
  return (
    <div id="top" className="overflow-x-clip bg-linen">
      <Header lang="en" />

      {/* ═══ HERO ═══ */}
      <section className="relative flex min-h-svh flex-col justify-end">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={IMAGES.hero}
            alt="Large private terrace at Pinada Sun with pergola and barbecue"
            className="kb h-full w-full object-cover"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-pine-deep via-pine-deep/70 to-pine-deep/40" />
          <div className="absolute inset-0 bg-black/25" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-16 pt-40 md:px-8 md:pb-20">
          <MaskLines
            lines={["HIGH-END HOLIDAY LIVING", "VILLAMARTÍN · ORIHUELA COSTA"]}
            lineClassName="hero-badge-shadow text-[11px] font-body font-semibold uppercase tracking-[0.32em] text-sun-light"
            delay={100}
            stagger={100}
          />

          <h1 className="hero-title-shadow mt-6 font-display text-[13vw] leading-[0.95] tracking-tight text-cream sm:text-[10vw] md:text-[6.8vw]">
            <MaskLines
              lines={["Mediterranean Sunshine,", "Exclusive Comfort."]}
              lineClassName=""
              delay={350}
              stagger={160}
            />
          </h1>

          <div className="mt-10 grid gap-8 border-t border-cream/20 pt-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-[11px] uppercase tracking-widest text-sun-light">Space & Layout</p>
              <p className="mt-1 font-display text-2xl text-cream">{APARTMENT.surface} m² · 2 Bedrooms</p>
              <p className="text-[13px] text-cream/70">Up to 4 guests (4 beds)</p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-widest text-sun-light">Private Terrace</p>
              <p className="mt-1 font-display text-2xl text-cream">Porch & Barbecue</p>
              <p className="text-[13px] text-cream/70">Outdoor dining & solarium</p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-widest text-sun-light">Complex Amenities</p>
              <p className="mt-1 font-display text-2xl text-cream">Community Pool</p>
              <p className="text-[13px] text-cream/70">Landscaped gardens & quiet area</p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-widest text-sun-light">Prime Location</p>
              <p className="mt-1 font-display text-2xl text-cream">Villamartín</p>
              <p className="text-[13px] text-cream/70">5 min to Zenia Boulevard & beaches</p>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#booking"
              className="inline-flex items-center gap-3 bg-sun px-8 py-4 text-[14px] font-bold tracking-wide text-pine-deep shadow-xl transition-all hover:bg-sun-light hover:scale-102 gold-glow"
            >
              <span>Book Direct · Best Rate</span>
              <IconArrowDown className="h-4 w-4" />
            </a>
            <a
              href="#space"
              className="inline-flex items-center gap-2 border border-cream/30 bg-black/20 px-6 py-4 text-[14px] font-semibold text-cream backdrop-blur-xs transition-colors hover:bg-cream/10"
            >
              <span>Explore Apartment</span>
            </a>
          </div>
        </div>
      </section>

      {/* ═══ MARQUEE ═══ */}
      <div className="overflow-hidden border-y border-sun/20 bg-pine-deep py-3 text-cream">
        <div className="marquee-track flex w-max items-center gap-8 whitespace-nowrap">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              aria-hidden={copy === 1}
              className="flex items-center gap-8"
            >
              {MARQUEE_ITEMS_EN.map((item: string) => (
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

      {/* ═══ TRUST BAR ═══ */}
      <PartnerTrustBar lang="en" />

      {/* ═══ BRAND MANIFESTO ═══ */}
      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <SectionLabel color="gold">Pinada Sun · Exclusive Living</SectionLabel>
            <Reveal>
              <p className="font-display text-4xl leading-[1.1] tracking-tight md:text-6xl text-ink">
                A bright, sunlit private haven:{" "}
                <span className="text-pine">large terrace with BBQ</span>, swimming pool, and the tranquility of Orihuela Costa moments from{" "}
                <em className="text-clay italic">Zenia Boulevard and coves</em>.
              </p>
            </Reveal>
          </div>
          <div className="flex flex-col justify-end gap-8 md:col-span-5 md:pl-8">
            <Reveal delay={150}>
              <p className="text-[16px] leading-relaxed text-ink-soft">
                Crafted for travellers seeking a superior experience beyond ordinary rentals. At Pinada Sun, every detail matters: restful sleep on premium memory-foam beds, efficient air conditioning, fully equipped kitchen, and a private terrace where the sunshine and leisurely meals take center stage.
              </p>
            </Reveal>
            <div className="grid grid-cols-4 gap-4 border-t border-line pt-6">
              {[
                { n: `${APARTMENT.surface}`, l: "Private m²" },
                { n: `${APARTMENT.bedrooms}`, l: "Bedrooms" },
                { n: `${APARTMENT.maxGuests}`, l: "Guests" },
                { n: "5'", l: "to Zenia" },
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

      {/* ═══ GUARANTEES & EXCELLENCE ═══ */}
      <section id="features" className="border-y border-line bg-paper/60 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="max-w-2xl">
            <SectionLabel color="gold">Standard of Excellence</SectionLabel>
            <Reveal>
              <h2 className="font-display text-4xl leading-tight tracking-tight md:text-5xl text-ink">
                Quality commitment and stay guarantee
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="mt-4 text-[16px] leading-relaxed text-ink-soft">
                Direct personal relationship with hosts, rigorous hygiene verification before every arrival, and the highest standards for an unforgettable holiday.
              </p>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {GUARANTEES_EN.map((g, i) => (
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

      {/* ═══ THE APARTMENT & AMENITIES ═══ */}
      <section id="space" className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <div className="mb-14 max-w-2xl">
          <SectionLabel color="pine">The Property</SectionLabel>
          <Reveal>
            <h2 className="font-display text-4xl leading-tight tracking-tight md:text-5xl text-ink">
              A private haven designed for absolute rest
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-5 text-[16px] leading-relaxed text-ink-soft">
              Fully renovated with premium materials and designer details. Featuring a sunny terrace with private barbecue, bright living room, independent full kitchen, extra-large shower (150 cm), and high-speed Wi-Fi.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {AMENITIES_EN.map((a, i) => (
            <Reveal key={a.title} delay={i * 60}>
              <div className="flex h-full flex-col border border-line bg-cream p-6 shadow-xs transition-shadow hover:shadow-sm">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-pine-deep text-sun-light">
                  <AmenityIcon name={a.icon} className="h-5 w-5" />
                </div>
                <h3 className="font-display text-lg font-bold text-ink">{a.title}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-ink-soft">{a.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══ PHOTO GALLERY ═══ */}
      <section id="gallery" className="border-y border-line bg-paper/50 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-12 max-w-2xl">
            <SectionLabel color="gold">Interactive Gallery</SectionLabel>
            <Reveal>
              <h2 className="font-display text-4xl tracking-tight md:text-5xl text-ink">
                Take a closer look at Pinada Sun
              </h2>
            </Reveal>
          </div>
          <GallerySlider items={GALLERY_EN} />
          <div className="mt-14">
            <DetailPhotoGrid items={DETAIL_PHOTOS_EN} />
          </div>
        </div>
      </section>

      {/* ═══ LOCATION & DISTANCES ═══ */}
      <section id="location" className="bg-pine-deep text-cream py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-14 max-w-2xl">
            <SectionLabel color="gold">Orihuela Costa & Villamartín</SectionLabel>
            <Reveal>
              <h2 className="font-display text-4xl leading-tight tracking-tight md:text-5xl">
                Surroundings & Proximity
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="mt-4 text-[16px] leading-relaxed text-cream/70">
                Close to the Mediterranean coastline, championship golf courses, international gastronomy at Villamartín Plaza, and Zenia Boulevard.
              </p>
            </Reveal>
          </div>

          <div className="divide-y divide-cream/15 border-y border-cream/15">
            {PLACES_EN.map((p, i) => (
              <Reveal key={p.name} delay={i * 80}>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 py-5">
                  <div className="flex-1">
                    <p className="font-display text-2xl text-cream md:text-[26px]">{p.name}</p>
                    <p className="mt-1 text-[14px] text-cream/70">{p.desc}</p>
                  </div>
                  <div className="shrink-0 text-left sm:text-right space-y-1">
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

          {/* ── INTERACTIVE MAP WITH HOUSE PIN ── */}
          <Reveal delay={250} className="mt-14">
            <InteractiveMap lang="en" />
          </Reveal>
        </div>
      </section>

      {/* ═══ REVIEWS ═══ */}
      <section id="reviews" className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <div className="mb-12 max-w-2xl">
          <SectionLabel color="gold">Verified Guest Reviews</SectionLabel>
          <Reveal>
            <h2 className="font-display text-4xl tracking-tight md:text-5xl text-ink">
              What our guests say
            </h2>
          </Reveal>
        </div>

        <div className="grid gap-10 md:grid-cols-3 md:gap-8">
          {REVIEWS_EN.map((r, i) => (
            <Reveal key={r.author} delay={i * 120} className={i === 1 ? "md:translate-y-8" : ""}>
              <blockquote className="flex h-full flex-col border border-line bg-cream p-7 shadow-xs">
                <StarRow className="text-sun" />
                <p className="mt-5 flex-1 font-display text-[19px] leading-snug text-ink">
                  “{r.quote}”
                </p>
                <footer className="mt-6 border-t border-line pt-4">
                  <p className="text-[14px] font-semibold text-ink">{r.author}</p>
                  <p className="text-[12px] uppercase tracking-widest text-ink-soft">{r.from}</p>
                </footer>
              </blockquote>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══ DIRECT BOOKING WIDGET ═══ */}
      <section id="booking" className="border-t border-line bg-paper/60">
        <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
          <div className="mb-14 max-w-2xl">
            <SectionLabel color="gold">Official Direct Booking</SectionLabel>
            <Reveal>
              <h2 className="font-display text-4xl tracking-tight md:text-6xl text-ink">
                Select your dates
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-5 text-[16px] leading-relaxed text-ink-soft">
                Live availability. Booking directly on <strong className="text-ink">pinadasun.com</strong> guarantees the best official rate, no platform commission fees, and fast personal confirmation in under 24 hours.
              </p>
            </Reveal>
          </div>
          <Reveal delay={150}>
            <BookingWidget lang="en" />
          </Reveal>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="bg-pine-deep text-cream">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:grid-cols-3 md:px-8">
          <div>
            <Logo isLight className="mb-4" />
            <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-cream/70">
              {APARTMENT.subtitle}. Direct contact: we personally assist you before, during, and after your stay.
            </p>
            <div className="mt-6 flex items-center gap-2 text-[13px] font-medium text-sun-light">
              <IconShieldCheck className="h-4 w-4" />
              <span>Official Direct Booking Guarantee · pinadasun.com</span>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-sun-light">
              Direct Contact
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
              Stay Details
            </p>
            <p className="flex items-center gap-3 text-[15px] text-cream/90">
              <IconClock className="h-4.5 w-4.5 text-sun-light shrink-0" />
              Check-in {APARTMENT.checkIn} · Check-out {APARTMENT.checkOut}
            </p>
            <p className="text-[14px] leading-relaxed text-cream/70">
              Flexible cancellation and transparent terms. Highest hygiene and comfort guaranteed.
            </p>
          </div>
        </div>

        <div className="border-t border-cream/10 bg-black/15 py-6">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-5 md:px-8">
            <p className="text-[11.5px] uppercase tracking-widest text-cream/60">
              Official Partners & Secure Payment Methods:
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
              <p>© 2026 {APARTMENT.name} · {APARTMENT.domain} · All rights reserved.</p>
              <span className="hidden sm:inline text-cream/20">|</span>
              <a href="/guia-local" className="transition-colors hover:text-sun-light underline">
                Local Guide & Rules
              </a>
            </div>
            <a href="/panel" className="transition-colors hover:text-sun-light">
              Admin Login →
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
