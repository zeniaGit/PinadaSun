"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/logo";

const LINKS_ES = [
  { href: "/#espacio", label: "El apartamento" },
  { href: "/#calidades", label: "Garantía & Calidades" },
  { href: "/#galeria", label: "Galería" },
  { href: "/#entorno", label: "Ubicación" },
  { href: "/#opiniones", label: "Opiniones" },
  { href: "/guia-local", label: "Guía Local" },
];

const LINKS_EN = [
  { href: "/en#space", label: "The Apartment" },
  { href: "/en#features", label: "Features & Comfort" },
  { href: "/en#gallery", label: "Gallery" },
  { href: "/en#location", label: "Location" },
  { href: "/en#reviews", label: "Reviews" },
  { href: "/guia-local", label: "Local Guide" },
];

export function Header({ lang = "es" }: { lang?: "es" | "en" }) {
  const [scrolled, setScrolled] = useState(false);
  const links = lang === "en" ? LINKS_EN : LINKS_ES;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-line bg-linen/95 backdrop-blur-md py-3.5 shadow-sm"
          : "border-b border-transparent bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-8">
        <a
          href={lang === "en" ? "/en#top" : "/#top"}
          className="transition-transform duration-300 hover:opacity-90 active:scale-98"
          aria-label="Pinada Sun - Home"
        >
          <Logo isLight={!scrolled} />
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-[13.5px] font-medium tracking-wide transition-all hover:text-sun ${
                scrolled ? "text-ink-soft" : "text-cream/90"
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Selector de idioma */}
          <div
            className={`flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold tracking-wider ${
              scrolled
                ? "border-line bg-linen text-ink-soft"
                : "border-cream/25 bg-black/20 text-cream/90"
            }`}
          >
            <a
              href="/"
              className={`px-1.5 py-0.5 rounded transition-colors ${
                lang === "es"
                  ? scrolled
                    ? "bg-ocean text-white"
                    : "bg-sun text-pine-deep font-bold"
                  : "hover:text-sun"
              }`}
            >
              ES
            </a>
            <span className="opacity-40">/</span>
            <a
              href="/en"
              className={`px-1.5 py-0.5 rounded transition-colors ${
                lang === "en"
                  ? scrolled
                    ? "bg-ocean text-white"
                    : "bg-sun text-pine-deep font-bold"
                  : "hover:text-sun"
              }`}
            >
              EN
            </a>
          </div>

          {/* CTA — oculto en móvil pequeño, visible desde sm */}
          <a
            href={lang === "en" ? "#booking" : "#reserva"}
            className={`group hidden sm:inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 text-[13px] sm:text-[13.5px] font-semibold tracking-wide transition-all duration-300 shadow-md ${
              scrolled
                ? "bg-pine text-cream hover:bg-pine-light"
                : "bg-sun text-pine-deep hover:bg-sun-light gold-glow"
            }`}
          >
            <span>{lang === "en" ? "Book Direct" : "Reservar"}</span>
            <span
              className={`inline-block h-1.5 w-1.5 rounded-full transition-transform duration-300 group-hover:translate-x-0.5 ${
                scrolled ? "bg-sun" : "bg-pine-deep"
              }`}
            />
          </a>

          {/* Hamburger — solo en móvil (<lg) */}
          <MobileMenu links={links} lang={lang} scrolled={scrolled} />
        </div>
      </div>
    </header>
  );
}

/* ─── Mobile Menu ──────────────────────────────────────────────── */
function MobileMenu({
  links,
  lang,
  scrolled,
}: {
  links: { href: string; label: string }[];
  lang: "es" | "en";
  scrolled: boolean;
}) {
  const [open, setOpen] = useState(false);

  // Cerrar al hacer scroll
  useEffect(() => {
    if (open) {
      const close = () => setOpen(false);
      window.addEventListener("scroll", close, { passive: true, once: true });
      return () => window.removeEventListener("scroll", close);
    }
  }, [open]);

  return (
    <>
      {/* Botón hamburguesa */}
      <button
        id="mobile-menu-toggle"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={`lg:hidden flex flex-col justify-center items-center w-9 h-9 gap-[5px] rounded-md transition-colors ${
          scrolled ? "text-ink" : "text-cream"
        }`}
      >
        <span
          className={`block h-[2px] w-5 rounded-full bg-current transition-all duration-300 ${
            open ? "translate-y-[7px] rotate-45" : ""
          }`}
        />
        <span
          className={`block h-[2px] w-5 rounded-full bg-current transition-all duration-300 ${
            open ? "opacity-0 scale-x-0" : ""
          }`}
        />
        <span
          className={`block h-[2px] w-5 rounded-full bg-current transition-all duration-300 ${
            open ? "-translate-y-[7px] -rotate-45" : ""
          }`}
        />
      </button>

      {/* Drawer */}
      <div
        id="mobile-menu-drawer"
        className={`lg:hidden fixed inset-x-0 z-40 transition-all duration-300 origin-top ${
          open
            ? "opacity-100 scale-y-100 pointer-events-auto"
            : "opacity-0 scale-y-95 pointer-events-none"
        }`}
        style={{ top: "calc(var(--header-h, 60px))" }}
      >
        <div
          className={`mx-4 mt-1 rounded-2xl shadow-xl overflow-hidden border ${
            scrolled
              ? "bg-linen/98 border-line backdrop-blur-md"
              : "bg-pine-deep/95 border-cream/10 backdrop-blur-md"
          }`}
        >
          <nav className="flex flex-col py-2">
            {links.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                style={{ animationDelay: `${i * 40}ms` }}
                className={`px-5 py-3.5 text-sm font-medium tracking-wide border-b last:border-b-0 transition-colors ${
                  scrolled
                    ? "text-ink-soft border-line hover:bg-ocean/5 hover:text-ocean"
                    : "text-cream/85 border-cream/10 hover:bg-white/5 hover:text-sun"
                }`}
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* CTA dentro del drawer */}
          <div className="px-4 py-4">
            <a
              href={lang === "en" ? "#booking" : "#reserva"}
              onClick={() => setOpen(false)}
              className={`flex w-full items-center justify-center gap-2 py-3 text-sm font-bold tracking-wide transition-all duration-300 rounded-xl shadow-md ${
                scrolled
                  ? "bg-pine text-cream hover:bg-pine-light"
                  : "bg-sun text-pine-deep hover:bg-sun-light gold-glow"
              }`}
            >
              {lang === "en" ? "Book Direct" : "Reservar ahora"}
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-current" />
            </a>
          </div>
        </div>
      </div>

      {/* Overlay para cerrar al tocar fuera */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 z-30"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
