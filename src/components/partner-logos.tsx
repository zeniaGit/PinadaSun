import type { SVGProps } from "react";

export function LogoAirbnb({ className = "h-7", ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 102 32"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Airbnb Partner"
      {...props}
    >
      {/* Airbnb Bélo Icon */}
      <path
        d="M14.28 22.8c-1.42 0-2.34-.84-2.52-1.07-2.61-3.32-3.8-6.9-3.8-11.4 0-5.63 4.2-10.33 10.33-10.33s10.33 4.7 10.33 10.33c0 4.5-1.19 8.08-3.8 11.4-.18.23-1.1 1.07-2.52 1.07-1.4 0-2.56-.81-3.69-2.02-.32-.34-.63-.7-.94-1.07-.31.37-.62.73-.94 1.07-1.14 1.21-2.3 2.02-3.7 2.02zm3.9-19.33c-4.14 0-7.23 3.32-7.23 7.23 0 3.63 1.02 6.58 3.16 9.3.3.38.64.67.92.83.67-.84 1.4-1.74 2.19-2.73.47-.59.93-1.2 1.39-1.84a12.8 12.8 0 0 0 1.23-2.1c.32-.71.55-1.42.55-2.07 0-1.89-1.22-3.35-3.08-3.35-1.57 0-2.8 1.13-2.92 2.7-.03.4-.37.7-.77.67-.4-.03-.7-.37-.67-.77.19-2.43 2.06-4.2 4.36-4.2 2.76 0 4.68 2.19 4.68 4.95 0 .97-.33 1.99-.78 2.97-.37.8-.84 1.58-1.39 2.33-.42.58-.85 1.13-1.28 1.67.86 1.07 1.66 2.04 2.38 2.91.29-.16.63-.45.92-.83 2.14-2.72 3.16-5.67 3.16-9.3 0-3.91-3.09-7.23-7.23-7.23z"
        fill="#FF5A5F"
      />
      {/* Text "airbnb" */}
      <text
        x="36"
        y="18"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="14"
        fontWeight="800"
        letterSpacing="-0.5px"
        fill="currentColor"
      >
        airbnb
      </text>
      {/* Subtext "PARTNER" */}
      <text
        x="36"
        y="27"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="7.5"
        fontWeight="700"
        letterSpacing="1.8px"
        fill="#FF5A5F"
      >
        PARTNER
      </text>
    </svg>
  );
}

export function LogoBooking({ className = "h-7", ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 120 32"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Booking.com Partner"
      {...props}
    >
      {/* Booking.com styled wordmark */}
      <text
        x="4"
        y="18"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="15"
        fontWeight="800"
        letterSpacing="-0.3px"
        fill="#003580"
      >
        Booking<tspan fill="#006CE4">.com</tspan>
      </text>
      {/* Subtext "VERIFIED PARTNER" */}
      <rect x="4" y="22" width="102" height="8" rx="2" fill="#003580" fillOpacity="0.08" />
      <text
        x="7"
        y="28.5"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="6.5"
        fontWeight="700"
        letterSpacing="1.4px"
        fill="#003580"
      >
        VERIFIED PARTNER
      </text>
    </svg>
  );
}

export function LogoVrbo({ className = "h-7", ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 95 32"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Vrbo Partner"
      {...props}
    >
      {/* Vrbo styled wordmark */}
      <text
        x="4"
        y="19"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="17"
        fontWeight="900"
        letterSpacing="0.2px"
        fill="#1c3c6b"
      >
        Vrbo
      </text>
      {/* Subtext "PARTNER" */}
      <text
        x="52"
        y="17"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="7"
        fontWeight="700"
        letterSpacing="1.2px"
        fill="#2b5999"
      >
        PARTNER
      </text>
      <path
        d="M4 25.5H88"
        stroke="#1c3c6b"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeOpacity="0.3"
      />
    </svg>
  );
}

export function LogoPayPal({ className = "h-7", ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 110 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="PayPal"
      {...props}
    >
      {/* Double P monogram */}
      <g transform="translate(4, 3)">
        <path
          d="M13.6 2.4C12.8 1.4 11.4 0.9 9.5 0.9H3.2C2.7 0.9 2.3 1.3 2.2 1.8L0 15.8C0 16.1 0.3 16.4 0.6 16.4H4.3L5.4 9.6C5.5 9.1 5.9 8.7 6.4 8.7H8.3C12.3 8.7 14.8 6.7 15.4 3.9C15.6 3.1 15.1 2.2 13.6 2.4Z"
          fill="#003087"
        />
        <path
          d="M16.4 6.9C15.8 9.7 13.3 11.7 9.3 11.7H7.4C6.9 11.7 6.5 12.1 6.4 12.6L4.7 23.3C4.6 23.6 4.9 23.9 5.2 23.9H8.9C9.4 23.9 9.8 23.5 9.9 23L11 16.2C11.1 15.7 11.5 15.3 12 15.3H12.9C16.5 15.3 18.8 13.5 19.3 10.7C19.7 8.5 18.2 6.9 16.4 6.9Z"
          fill="#0079C1"
        />
        <path
          d="M13.6 6.9C13.2 7.1 12.7 7.2 12.2 7.2H9.3C8.8 7.2 8.4 7.6 8.3 8.1L7.4 13.8L6.4 12.6C6.5 12.1 6.9 11.7 7.4 11.7H9.3C13.3 11.7 15.8 9.7 16.4 6.9H13.6Z"
          fill="#002069"
        />
      </g>
      {/* PayPal text */}
      <text
        x="28"
        y="18"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="15"
        fontWeight="800"
        letterSpacing="-0.3px"
        fill="#003087"
      >
        Pay<tspan fill="#0079C1">Pal</tspan>
      </text>
      {/* Subtext "PAGO SEGURO" */}
      <text
        x="28.5"
        y="26.5"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="6.5"
        fontWeight="700"
        letterSpacing="1.2px"
        fill="#003087"
        opacity="0.8"
      >
        PAGO SEGURO
      </text>
    </svg>
  );
}

export function LogoBankTransfer({ className = "h-7", ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 150 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Transferencia Bancaria"
      {...props}
    >
      {/* Bank columns icon */}
      <g transform="translate(3, 4)" stroke="#0f3b5c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 8L11 2L21 8H1Z" fill="#0f3b5c" fillOpacity="0.15" />
        <path d="M4 11V18M9 11V18M13 11V18M18 11V18" />
        <path d="M1 19H21M0 22H22" />
      </g>
      {/* Text "Transferencia" */}
      <text
        x="30"
        y="14.5"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="10"
        fontWeight="800"
        letterSpacing="-0.2px"
        fill="#0f3b5c"
      >
        Transferencia Bancaria
      </text>
      {/* Subtext "SEPA Instant & IBAN" */}
      <text
        x="30.5"
        y="24"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="7"
        fontWeight="700"
        letterSpacing="1.2px"
        fill="#c99a4e"
      >
        SEPA DIRECTA & IBAN
      </text>
    </svg>
  );
}

export function PartnerTrustBar({
  className = "",
  lang = "es",
}: {
  className?: string;
  lang?: "es" | "en";
}) {
  return (
    <div className={`border-y border-line bg-cream/70 py-6 ${className}`}>
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-5 md:px-8">
        <div className="flex items-center gap-2.5">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-ink-soft">
            {lang === "en" ? "Trusted Partners & Secure Payment Methods" : "Garantía de Confianza & Métodos de Pago"}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 md:gap-8">
          <div className="flex items-center gap-2 opacity-90 transition-opacity hover:opacity-100">
            <LogoAirbnb className="h-6 md:h-7" />
          </div>
          <div className="h-5 w-px bg-line hidden sm:block" />
          <div className="flex items-center gap-2 opacity-90 transition-opacity hover:opacity-100">
            <LogoBooking className="h-6 md:h-7" />
          </div>
          <div className="h-5 w-px bg-line hidden sm:block" />
          <div className="flex items-center gap-2 opacity-90 transition-opacity hover:opacity-100">
            <LogoVrbo className="h-6 md:h-7" />
          </div>
          <div className="h-5 w-px bg-line hidden md:block" />
          <div className="flex items-center gap-2 opacity-90 transition-opacity hover:opacity-100">
            <LogoPayPal className="h-6 md:h-7" />
          </div>
          <div className="h-5 w-px bg-line hidden md:block" />
          <div className="flex items-center gap-2 opacity-90 transition-opacity hover:opacity-100">
            <LogoBankTransfer className="h-6 md:h-7" />
          </div>
        </div>
      </div>
    </div>
  );
}
