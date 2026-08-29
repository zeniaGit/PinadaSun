import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

function base(props: P): P {
  return {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
    ...props,
  };
}

export const IconWifi = (p: P) => (
  <svg {...base(p)}>
    <path d="M4.5 11.5a11 11 0 0 1 15 0" />
    <path d="M7.6 14.8a7 7 0 0 1 8.8 0" />
    <circle cx="12" cy="18.4" r="1.1" fill="currentColor" stroke="none" />
  </svg>
);

export const IconPot = (p: P) => (
  <svg {...base(p)}>
    <path d="M4.5 10.5h15" />
    <path d="M6.5 10.5v6.5a3 3 0 0 0 3 3h5a3 3 0 0 0 3-3v-6.5" />
    <path d="M9.5 7.5c0-1 .8-1.6.8-2.7" />
    <path d="M13.7 7.5c0-1 .8-1.6.8-2.7" />
  </svg>
);

export const IconSnow = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="8.2" />
    <path d="M12 7.5v9" />
    <path d="M8.5 9.5l7 5" />
    <path d="M15.5 9.5l-7 5" />
  </svg>
);

export const IconWasher = (p: P) => (
  <svg {...base(p)}>
    <rect x="4" y="3" width="16" height="18" rx="2" />
    <circle cx="12" cy="13" r="4.6" />
    <path d="M8.6 13a4.6 4.6 0 0 0 6.8 0" />
    <path d="M7 6h3" />
  </svg>
);

export const IconTerrace = (p: P) => (
  <svg {...base(p)}>
    <path d="M3 20h18" />
    <path d="M5 20v-5.5M12 20v-5.5M19 20v-5.5" />
    <path d="M4 14.5h16" />
    <path d="M9 9a3 3 0 0 1 6 0" />
    <path d="M12 4.5V3.2M7.2 6.2 6.3 5.3M16.8 6.2l.9-.9" />
  </svg>
);

export const IconDesk = (p: P) => (
  <svg {...base(p)}>
    <rect x="4.5" y="5" width="15" height="10" rx="1.2" />
    <path d="M2.5 18.5h19" />
    <path d="M12 15v3.5" />
  </svg>
);

export const IconCrib = (p: P) => (
  <svg {...base(p)}>
    <path d="M3.5 18V7M20.5 18V7" />
    <path d="M3.5 12h17" />
    <path d="M7 12v6M10.7 12v6M14.3 12v6M17.5 12v6" />
    <path d="M3.5 18h17" />
  </svg>
);

export const IconCar = (p: P) => (
  <svg {...base(p)}>
    <path d="M5.5 16v2M18.5 16v2" />
    <path d="M4 16h16a1.5 1.5 0 0 0 1.5-1.5v-1.8l-1.9-4.6a2 2 0 0 0-1.85-1.3H6.25A2 2 0 0 0 4.4 8.1L2.5 12.7v1.8A1.5 1.5 0 0 0 4 16Z" />
    <path d="M6 16a1.3 1.3 0 1 0 0-2.6A1.3 1.3 0 0 0 6 16ZM18 16a1.3 1.3 0 1 0 0-2.6A1.3 1.3 0 0 0 18 16Z" />
  </svg>
);

export const IconStar = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M12 3.4l2.7 5.5 6 .9-4.35 4.25 1.03 6L12 17.25 6.62 20.05l1.03-6L3.3 9.8l6-.9Z" />
  </svg>
);

export const IconArrowDown = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 4v16" />
    <path d="m5.5 13.5 6.5 6.5 6.5-6.5" />
  </svg>
);

export const IconArrowRight = (p: P) => (
  <svg {...base(p)}>
    <path d="M4 12h16" />
    <path d="m13.5 5.5 6.5 6.5-6.5 6.5" />
  </svg>
);

export const IconChevronL = (p: P) => (
  <svg {...base(p)}>
    <path d="m14.5 5.5-6.5 6.5 6.5 6.5" />
  </svg>
);

export const IconChevronR = (p: P) => (
  <svg {...base(p)}>
    <path d="m9.5 5.5 6.5 6.5-6.5 6.5" />
  </svg>
);

export const IconCheck = (p: P) => (
  <svg {...base(p)}>
    <path d="m4.5 12.5 5 5 10-11" />
  </svg>
);

export const IconX = (p: P) => (
  <svg {...base(p)}>
    <path d="m6 6 12 12M18 6 6 18" />
  </svg>
);

export const IconMail = (p: P) => (
  <svg {...base(p)}>
    <rect x="3" y="5.5" width="18" height="13" rx="1.5" />
    <path d="m3.5 7 8.5 6 8.5-6" />
  </svg>
);

export const IconPhone = (p: P) => (
  <svg {...base(p)}>
    <path d="M5.5 3.5h3l1.5 4-2 1.5a12 12 0 0 0 5 5l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 3.5 5.7a2 2 0 0 1 2-2.2Z" />
  </svg>
);

export const IconPin = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 21s-6.5-5.3-6.5-10.2a6.5 6.5 0 0 1 13 0C18.5 15.7 12 21 12 21Z" />
    <circle cx="12" cy="10.5" r="2.3" />
  </svg>
);

export const IconClock = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </svg>
);

export const IconCalendar = (p: P) => (
  <svg {...base(p)}>
    <rect x="3.5" y="5" width="17" height="15.5" rx="1.5" />
    <path d="M3.5 9.5h17M8 3v4M16 3v4" />
  </svg>
);

export const IconPool = (p: P) => (
  <svg {...base(p)}>
    <path d="M2 19c1.5 1 3.5 1 5 0s3.5-1 5 0 3.5 1 5 0 3.5-1 5 0" />
    <path d="M2 15c1.5 1 3.5 1 5 0s3.5-1 5 0 3.5 1 5 0 3.5-1 5 0" />
    <path d="M7 11V4a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v7" />
    <path d="M7 6h4" />
  </svg>
);

export const IconBed = (p: P) => (
  <svg {...base(p)}>
    <path d="M2 4v16M2 12h20M22 10v10M2 17h20" />
    <circle cx="6" cy="7" r="2" />
  </svg>
);

export const IconBath = (p: P) => (
  <svg {...base(p)}>
    <path d="M9 6h6a2 2 0 0 1 2 2v2H7V8a2 2 0 0 1 2-2Z" />
    <path d="M4 10h16a1 1 0 0 1 1 1v3a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-3a1 1 0 0 1 1-1Z" />
    <path d="M6 18v3M18 18v3" />
  </svg>
);

export const IconShieldCheck = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export const IconSparkles = (p: P) => (
  <svg {...base(p)}>
    <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3z" />
    <path d="M19 3v4M21 5h-4M5 17v4M7 19H3" />
  </svg>
);

export const IconKey = (p: P) => (
  <svg {...base(p)}>
    <circle cx="7.5" cy="15.5" r="4.5" />
    <path d="m10.7 12.3 8.3-8.3M15.5 7.5l2 2M17.5 5.5l2 2" />
  </svg>
);

export const IconAward = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="8" r="6" />
    <path d="M15.4 12.8 17 22l-5-3-5 3 1.6-9.2" />
  </svg>
);

export const IconWhatsApp = (p: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
    <path d="M17.47 17.47A8.46 8.46 0 0 1 12 19.5c-1.5 0-2.9-.4-4.1-1.1L3.5 19.5l1.2-4.2A8.46 8.46 0 0 1 4.5 12a8.5 8.5 0 1 1 12.97 5.47Z" />
    <path d="M9.5 9.5c.3.7.8 1.8 1.5 2.5.7.7 1.8 1.2 2.5 1.5.3.1.7 0 .9-.3l.6-.7c.3-.3.8-.4 1.1-.2l1.4.7c.4.2.6.7.4 1.1-.4 1.1-1.4 1.9-2.5 1.9-2.8 0-5.7-2.9-5.7-5.7 0-1.1.8-2.1 1.9-2.5.4-.2.9 0 1.1.4l.7 1.4c.2.3.1.8-.2 1.1l-.7.6c-.3.2-.4.6-.3.9Z" fill="currentColor" stroke="none" />
  </svg>
);

export const IconLock = (p: P) => (
  <svg {...base(p)}>
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

export const IconTrash = (p: P) => (
  <svg {...base(p)}>
    <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6" />
  </svg>
);

export const IconCopy = (p: P) => (
  <svg {...base(p)}>
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
  </svg>
);

export const IconExternalLink = (p: P) => (
  <svg {...base(p)}>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" x2="21" y1="14" y2="3" />
  </svg>
);

const AMENITY_MAP: Record<string, (p: P) => React.ReactElement> = {
  wifi: IconWifi,
  pot: IconPot,
  snow: IconSnow,
  washer: IconWasher,
  terrace: IconTerrace,
  desk: IconDesk,
  crib: IconCrib,
  car: IconCar,
  pool: IconPool,
  bed: IconBed,
  bath: IconBath,
  shield: IconShieldCheck,
  sparkles: IconSparkles,
  key: IconKey,
  award: IconAward,
  whatsapp: IconWhatsApp,
};

export function AmenityIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const C = AMENITY_MAP[name] ?? IconStar;
  return <C className={className} />;
}

