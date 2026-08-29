interface LogoProps {
  variant?: "full" | "icon" | "stacked";
  isLight?: boolean;
  className?: string;
}

export function Logo({
  variant = "full",
  isLight = false,
  className = "",
}: LogoProps) {
  if (variant === "icon") {
    return (
      <div className={`relative flex items-center justify-center overflow-hidden rounded-xl bg-white p-1 shadow-sm ring-1 ring-black/5 ${className || "h-11 w-11"}`}>
        <img
          src="/images/logopinadasun.webp"
          alt="PinadaSun Logo"
          className="h-full w-full object-contain"
        />
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-3.5 ${className}`}>
      <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-1 shadow-md ring-1 ring-black/5 transition-transform duration-300 group-hover:scale-105 md:h-12 md:w-12">
        <img
          src="/images/logopinadasun.webp"
          alt="PinadaSun Logo"
          className="h-full w-full object-contain"
        />
      </div>
      <div className="flex flex-col justify-center">
        <span
          className={`font-display text-xl tracking-tight leading-none md:text-2xl font-bold ${
            isLight ? "text-cream" : "text-ocean"
          }`}
        >
          Pinada<span className={isLight ? "text-sun-light font-normal" : "text-ocean-light font-normal"}>Sun</span>
        </span>
        <span
          className={`text-[9.5px] uppercase font-body tracking-[0.24em] mt-1 font-medium ${
            isLight ? "text-cream/75" : "text-ink-soft"
          }`}
        >
          Golf & Beach Living · Orihuela Costa
        </span>
      </div>
    </div>
  );
}
