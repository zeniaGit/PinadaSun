"use client";

import { useState } from "react";
import { Reveal } from "@/components/reveal";

interface MonthStat {
  name: string;
  short: string;
  /** TM: Media mensual de las temperaturas máximas diurnas (°C) - AEMET */
  max: number;
  /** Tm: Media mensual de las temperaturas mínimas nocturnas (°C) - AEMET */
  min: number;
  /** I: Horas de sol medias al mes - AEMET */
  sunHours: number;
  /** Días de sol / despejados al mes */
  sunnyDays: number;
  /** Días con lluvia apreciable (≥ 1 mm) - AEMET */
  rainDays: number;
  highlight: string;
  tag: string;
}

/**
 * Datos Oficiales de la Agencia Estatal de Meteorología (AEMET - Gobierno de España)
 * Orientados de forma clara e intuitiva para visitantes y estancias de invierno/verano
 */
const MONTHS_DATA_ES: MonthStat[] = [
  {
    name: "Enero",
    short: "Ene",
    max: 16.7,
    min: 6.5,
    sunHours: 184,
    sunnyDays: 28,
    rainDays: 3,
    highlight: "Mientras en Centroeuropa hiela, aquí disfrutas de casi 17 °C al mediodía y 28 días de sol para desayunar en la terraza sur.",
    tag: "☀️ Invierno al Sol (28 días sin lluvia)",
  },
  {
    name: "Febrero",
    short: "Feb",
    max: 17.4,
    min: 7.1,
    sunHours: 179,
    sunnyDays: 25,
    rainDays: 3,
    highlight: "Temperaturas diurnas de 17,4 °C con luz radiante. Clima saludable junto a las lagunas salinas, ideal para pasear y jugar al golf.",
    tag: "🏌️ Salud & Golf en Invierno",
  },
  {
    name: "Marzo",
    short: "Mar",
    max: 19.4,
    min: 8.7,
    sunHours: 221,
    sunnyDays: 28,
    rainDays: 3,
    highlight: "Primavera anticipada rozando los 20 °C con 221 horas de sol. Perfecto para rutas costeras, ciclismo y comidas al aire libre.",
    tag: "🚴 Primavera Cálida",
  },
  {
    name: "Abril",
    short: "Abr",
    max: 21.1,
    min: 10.7,
    sunHours: 251,
    sunnyDays: 27,
    rainDays: 3,
    highlight: "Más de 21 °C diurnos y 251 horas de sol. Ambiente tranquilo y temperaturas suaves sin el calor del pleno verano.",
    tag: "🏖️ Terrazas & Paseos junto al Mar",
  },
  {
    name: "Mayo",
    short: "May",
    max: 23.8,
    min: 13.9,
    sunHours: 291,
    sunnyDays: 28,
    rainDays: 3,
    highlight: "Uno de los mejores meses del año: 23,8 °C, piscina comunitaria lista y tardes soleadas de barbacoa en la terraza.",
    tag: "🏊 Piscina & Confort Total",
  },
  {
    name: "Junio",
    short: "Jun",
    max: 27.6,
    min: 18.0,
    sunHours: 316,
    sunnyDays: 29,
    rainDays: 1,
    highlight: "29 días de sol garantizado y 27,6 °C. El mar Mediterráneo ya está cálido y las playas lucen tranquilas.",
    tag: "🌊 Playas de Bandera Azul",
  },
  {
    name: "Julio",
    short: "Jul",
    max: 30.3,
    min: 20.8,
    sunHours: 344,
    sunnyDays: 31,
    rainDays: 0,
    highlight: "100% días de sol (344 horas) y 30,3 °C suavizados por la brisa marina. Descanso fresco garantizado con climatización Daikin.",
    tag: "☀️ Pleno Verano (0 días de lluvia)",
  },
  {
    name: "Agosto",
    short: "Ago",
    max: 30.8,
    min: 21.5,
    sunHours: 313,
    sunnyDays: 30,
    rainDays: 1,
    highlight: "El mes más cálido con 30,8 °C, noches templadas junto al mar, gastronomía mediterránea y ocio al aire libre.",
    tag: "🌴 Veraneo Mediterráneo",
  },
  {
    name: "Septiembre",
    short: "Sep",
    max: 28.5,
    min: 19.0,
    sunHours: 243,
    sunnyDays: 27,
    rainDays: 3,
    highlight: "El favorito de los séniors europeos: 28,5 °C sin aglomeraciones y el agua del mar en su temperatura más agradable del año.",
    tag: "✨ El Mes Favorito",
  },
  {
    name: "Octubre",
    short: "Oct",
    max: 24.7,
    min: 14.9,
    sunHours: 218,
    sunnyDays: 27,
    rainDays: 4,
    highlight: "Verano indio con 24,7 °C diurnos. Temporada alta de golf en Orihuela Costa y baños de sol en manga corta.",
    tag: "⛳ Temporada Reina de Golf",
  },
  {
    name: "Noviembre",
    short: "Nov",
    max: 20.3,
    min: 10.6,
    sunHours: 174,
    sunnyDays: 27,
    rainDays: 3,
    highlight: "Más de 20 °C al mediodía en pleno noviembre. Ideal para largas estancias huyendo del frío y la lluvia del norte.",
    tag: "☀️ Refugio de Otoño",
  },
  {
    name: "Diciembre",
    short: "Dic",
    max: 17.3,
    min: 7.5,
    sunHours: 165,
    sunnyDays: 28,
    rainDays: 3,
    highlight: "Navidades soleadas a 17,3 °C: gracias a la orientación sur de PinadaSun, la terraza recibe sol directo desde la mañana.",
    tag: "☀️ Navidades al Sol",
  },
];

const MONTHS_DATA_EN: MonthStat[] = [
  {
    name: "January",
    short: "Jan",
    max: 16.7,
    min: 6.5,
    sunHours: 184,
    sunnyDays: 28,
    rainDays: 3,
    highlight: "While Central Europe freezes, enjoy nearly 17 °C at midday and 28 dry, sunny days for breakfast on our south-facing terrace.",
    tag: "☀️ Winter Sun (28 dry days)",
  },
  {
    name: "February",
    short: "Feb",
    max: 17.4,
    min: 7.1,
    sunHours: 179,
    sunnyDays: 25,
    rainDays: 3,
    highlight: "17.4 °C daytime highs with bright blue skies. Healthy microclimate near the salt lagoons, ideal for coastal walks and golf.",
    tag: "🏌️ Winter Golf & Wellness",
  },
  {
    name: "March",
    short: "Mar",
    max: 19.4,
    min: 8.7,
    sunHours: 221,
    sunnyDays: 28,
    rainDays: 3,
    highlight: "Early spring reaching nearly 20 °C with 221 sunshine hours. Perfect for cycling, seaside promenades, and al fresco dining.",
    tag: "🚴 Warm Early Spring",
  },
  {
    name: "April",
    short: "Apr",
    max: 21.1,
    min: 10.7,
    sunHours: 251,
    sunnyDays: 27,
    rainDays: 3,
    highlight: "Over 21 °C daytime highs and 251 hours of sun. Peaceful atmosphere and gentle warmth without peak summer heat.",
    tag: "🏖️ Coastal Walks & Terraces",
  },
  {
    name: "May",
    short: "May",
    max: 23.8,
    min: 13.9,
    sunHours: 291,
    sunnyDays: 28,
    rainDays: 3,
    highlight: "One of the finest months of the year: 23.8 °C, swimming pool ready, and sunny barbecue evenings on the private terrace.",
    tag: "🏊 Pool & Pure Comfort",
  },
  {
    name: "June",
    short: "Jun",
    max: 27.6,
    min: 18.0,
    sunHours: 316,
    sunnyDays: 29,
    rainDays: 1,
    highlight: "29 sunny days and 27.6 °C highs. The Mediterranean Sea is warm and the Blue Flag beaches are uncrowded.",
    tag: "🌊 Blue Flag Beaches",
  },
  {
    name: "July",
    short: "Jul",
    max: 30.3,
    min: 20.8,
    sunHours: 344,
    sunnyDays: 31,
    rainDays: 0,
    highlight: "100% sunny days (344 sun hours) and 30.3 °C tempered by sea breezes. Whisper-quiet Daikin AC guarantees cool rest.",
    tag: "☀️ Peak Sun (0 rainy days)",
  },
  {
    name: "August",
    short: "Aug",
    max: 30.8,
    min: 21.5,
    sunHours: 313,
    sunnyDays: 30,
    rainDays: 1,
    highlight: "Warmest month at 30.8 °C, balmy coastal evenings, Mediterranean dining, and vibrant outdoor life.",
    tag: "🌴 Mediterranean Summer",
  },
  {
    name: "September",
    short: "Sep",
    max: 28.5,
    min: 19.0,
    sunHours: 243,
    sunnyDays: 27,
    rainDays: 3,
    highlight: "A favorite among European seniors: 28.5 °C without crowds and the sea water at its most pleasant temperature of the year.",
    tag: "✨ Guest Favorite Month",
  },
  {
    name: "October",
    short: "Oct",
    max: 24.7,
    min: 14.9,
    sunHours: 218,
    sunnyDays: 27,
    rainDays: 4,
    highlight: "Indian summer with 24.7 °C daytime highs. Prime golf season in Orihuela Costa and short-sleeve sunshine.",
    tag: "⛳ Prime Golf Season",
  },
  {
    name: "November",
    short: "Nov",
    max: 20.3,
    min: 10.6,
    sunHours: 174,
    sunnyDays: 27,
    rainDays: 3,
    highlight: "Over 20 °C at midday in November. Ideal for long winter stays escaping cold, grey northern European weather.",
    tag: "☀️ Autumn Sun Haven",
  },
  {
    name: "December",
    short: "Dec",
    max: 17.3,
    min: 7.5,
    sunHours: 165,
    sunnyDays: 28,
    rainDays: 3,
    highlight: "Sunny Christmas at 17.3 °C: thanks to PinadaSun's south orientation, the terrace enjoys direct sunshine all day.",
    tag: "☀️ Sunny Christmas",
  },
];

interface ClimogramaSectionProps {
  lang?: "es" | "en";
}

export function ClimogramaSection({ lang = "es" }: ClimogramaSectionProps) {
  const isEn = lang === "en";
  const monthsData = isEn ? MONTHS_DATA_EN : MONTHS_DATA_ES;
  const [selectedIdx, setSelectedIdx] = useState(0); // Enero por defecto para destacar el valor del Sol de Invierno para jubilados/turistas
  const current = monthsData[selectedIdx];

  return (
    <section
      id="clima"
      className="relative overflow-hidden border-b border-line bg-gradient-to-b from-[#fbf8f1] via-[#fffdfa] to-linen py-24 md:py-32"
    >
      {/* Resplandor decorativo cálido */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-radial from-amber-300/25 via-amber-200/10 to-transparent blur-2xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 bottom-0 h-80 w-80 rounded-full bg-radial from-sky-200/20 via-sky-100/5 to-transparent blur-2xl"
      />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        
        {/* Cabecera pensada para el turista / jubilado centroeuropeo */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="mb-4 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-sun">
              <span className="h-px w-8 bg-sun" />
              {isEn ? "Healthy Microclimate · Official AEMET Data" : "Microclima Saludable · Datos Oficiales AEMET"}
            </p>
            <Reveal>
              <h2 className="font-display text-4xl leading-tight tracking-tight text-ink md:text-5xl">
                {isEn
                  ? "Warm winters & 320+ sunny days in Orihuela Costa"
                  : "Inviernos cálidos y más de 320 días de sol en Orihuela Costa"}
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="mt-4 text-[16px] leading-relaxed text-ink-soft">
                {isEn
                  ? "Forget the cold, damp winters of Central Europe. Protected by the natural salt lagoons and the Mediterranean breeze, Orihuela Costa enjoys 17 °C to 20 °C daytime winter sunshine and 30 °C summers — recognized as one of Europe's healthiest climates."
                  : "Olvídate del frío y la humedad del invierno centroeuropeo. Protegida por las lagunas salinas y la brisa mediterránea, Orihuela Costa disfruta de mediodías de 17 °C a 20 °C en pleno invierno y 30 °C en verano, considerado uno de los climas más saludables de Europa."}
              </p>
            </Reveal>
          </div>

          {/* Tarjetas clave muy visuales */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 shrink-0">
            <div className="rounded-xl border border-sun/40 bg-cream p-4 shadow-2xs text-center min-w-[125px]">
              <span className="text-[11px] font-bold uppercase tracking-wider text-ink-soft block">
                {isEn ? "Winter Daytime" : "Invierno al Sol"}
              </span>
              <span className="font-display text-2xl font-bold text-sun">17 °C – 20 °C</span>
            </div>
            <div className="rounded-xl border border-line bg-cream p-4 shadow-2xs text-center min-w-[125px]">
              <span className="text-[11px] font-bold uppercase tracking-wider text-ink-soft block">
                {isEn ? "Summer Daytime" : "Verano Diurno"}
              </span>
              <span className="font-display text-2xl font-bold text-ocean">28 °C – 31 °C</span>
            </div>
            <div className="rounded-xl border border-line bg-cream p-4 shadow-2xs text-center min-w-[125px]">
              <span className="text-[11px] font-bold uppercase tracking-wider text-ink-soft block">
                {isEn ? "Sun Hours / Year" : "Sol Oficial / Año"}
              </span>
              <span className="font-display text-2xl font-bold text-ocean-light">
                {isEn ? "2,953 h" : "2.953 h"}
              </span>
            </div>
            <div className="rounded-xl border border-line bg-cream p-4 shadow-2xs text-center min-w-[125px]">
              <span className="text-[11px] font-bold uppercase tracking-wider text-ink-soft block">
                {isEn ? "Dry Days / Year" : "Días Sin Lluvia"}
              </span>
              <span className="font-display text-2xl font-bold text-ink">
                {isEn ? "330+ days" : "330+ días"}
              </span>
            </div>
          </div>
        </div>

        {/* Gráfico directo e intuitivo: Barras = Temperatura Diurna (°C) */}
        <div className="mt-12 rounded-2xl border border-line bg-cream p-6 shadow-sm md:p-8">
          
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line/60 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-sun" />
                <h3 className="font-display text-lg font-semibold text-ink">
                  {isEn
                    ? "Month-by-Month Daytime Temperature (°C) & Sunny Days"
                    : "Temperatura Diurna Mes a Mes (°C) y Días de Sol"}
                </h3>
              </div>
              <p className="text-xs text-ink-soft mt-0.5">
                {isEn
                  ? "Official data from AEMET (Spanish State Meteorological Agency). Click any month to see details."
                  : "Datos oficiales de AEMET (Agencia Estatal de Meteorología). Pulsa en cualquier mes para ver el detalle."}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-5 text-xs font-medium">
              <span className="inline-flex items-center gap-2 text-ink">
                <span className="h-3.5 w-3.5 rounded-xs bg-gradient-to-t from-[#c99a4e] to-[#dfaf63]" />
                {isEn ? "Daytime Temperature (°C)" : "Temperatura media diurna (°C)"}
              </span>
              <span className="inline-flex items-center gap-2 text-ink-soft">
                <span>☀️</span>
                {isEn ? "Sunny / dry days per month" : "Días despejados / sin lluvia al mes"}
              </span>
            </div>
          </div>

          {/* Gráfico de Barras de Temperatura (100% intuitivo: barra más alta = más calor) */}
          <div className="relative mt-6 h-72 w-full md:h-80">
            <svg
              viewBox="0 0 760 295"
              className="h-full w-full select-none overflow-visible"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="tempBarGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#dfaf63" />
                  <stop offset="100%" stopColor="#c99a4e" />
                </linearGradient>
                <linearGradient id="tempBarActiveGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1b6ca8" />
                  <stop offset="100%" stopColor="#0f3b5c" />
                </linearGradient>
              </defs>

              {/* Único eje vertical: Temperatura (°C) */}
              {[
                { y: 35, label: "35 °C" },
                { y: 75, label: "30 °C" },
                { y: 115, label: "25 °C" },
                { y: 155, label: "20 °C" },
                { y: 195, label: "15 °C" },
                { y: 235, label: "10 °C", isBase: true },
              ].map((grid) => (
                <g key={grid.y}>
                  <line
                    x1="58"
                    y1={grid.y}
                    x2="740"
                    y2={grid.y}
                    stroke={grid.isBase ? "#cbd5e1" : "#e2e8f0"}
                    strokeWidth={grid.isBase ? 1.5 : 1}
                    strokeDasharray={grid.isBase ? undefined : "3,3"}
                  />
                  <text
                    x="48"
                    y={grid.y + 4}
                    fontSize="11"
                    fontWeight="600"
                    fill="#64748b"
                    textAnchor="end"
                  >
                    {grid.label}
                  </text>
                </g>
              ))}

              {/* Línea de referencia confort invernal (20 °C) */}
              <line
                x1="58"
                y1="155"
                x2="740"
                y2="155"
                stroke="#c99a4e"
                strokeWidth="1"
                strokeDasharray="6,4"
                opacity="0.55"
              />

              {/* Barras de Temperatura por mes */}
              {monthsData.map((m, i) => {
                const colWidth = 682 / 12;
                const cx = 58 + (i + 0.5) * colWidth;
                const barWidth = 34;
                const x = cx - barWidth / 2;

                // Escala: base en y=235 (10 °C), 8px por cada 1 °C por encima de 10 °C
                const barHeight = Math.max(20, (m.max - 10) * 8);
                const y = 235 - barHeight;
                const isSelected = i === selectedIdx;

                return (
                  <g
                    key={m.name}
                    className="cursor-pointer"
                    onClick={() => setSelectedIdx(i)}
                    onMouseEnter={() => setSelectedIdx(i)}
                  >
                    {/* Barra de Temperatura */}
                    <rect
                      x={x}
                      y={y}
                      width={barWidth}
                      height={barHeight}
                      rx={6}
                      fill={isSelected ? "url(#tempBarActiveGrad)" : "url(#tempBarGrad)"}
                      opacity={isSelected ? 1 : 0.82}
                      className="transition-all duration-200 hover:opacity-100"
                    />

                    {/* Temperatura exacta encima de cada barra */}
                    <text
                      x={cx}
                      y={y - 8}
                      fontSize="11"
                      fontWeight="700"
                      fill={isSelected ? "#0f3b5c" : "#8c6220"}
                      textAnchor="middle"
                    >
                      {m.max.toFixed(1)}°C
                    </text>

                    {/* Nombre del mes */}
                    <text
                      x={cx}
                      y="256"
                      fontSize="12"
                      fontWeight={isSelected ? "700" : "600"}
                      fill={isSelected ? "#0f3b5c" : "#334155"}
                      textAnchor="middle"
                    >
                      {m.short}
                    </text>

                    {/* Días de sol debajo del mes */}
                    <text
                      x={cx}
                      y="274"
                      fontSize="10"
                      fontWeight="600"
                      fill="#b48232"
                      textAnchor="middle"
                    >
                      ☀️ {m.sunnyDays}d
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Tarjeta inferior explicativa para el huésped */}
          <div className="mt-6 rounded-xl bg-gradient-to-r from-ocean to-ocean-deep p-6 text-cream shadow-md transition-all duration-300 lg:flex lg:items-center lg:justify-between lg:gap-8">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-sun/20 px-3 py-1 text-xs font-semibold text-sun-light border border-sun/30">
                  {current.tag}
                </span>
                <span className="text-xs uppercase tracking-widest text-cream/70 font-semibold">
                  Orihuela Costa · AEMET
                </span>
              </div>
              <h4 className="font-display text-2xl font-bold tracking-tight text-cream">
                {isEn ? `${current.name} at PinadaSun` : `${current.name} en PinadaSun`}
              </h4>
              <p className="max-w-xl text-[14px] leading-relaxed text-cream/90">
                {current.highlight}
              </p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 border-t border-cream/15 pt-4 sm:grid-cols-4 lg:mt-0 lg:flex lg:shrink-0 lg:items-center lg:gap-6 lg:border-t-0 lg:pt-0">
              <div className="text-center">
                <span className="block text-[11px] uppercase tracking-wider text-cream/70">
                  {isEn ? "Daytime Temp" : "Temp. Diurna"}
                </span>
                <span className="font-display text-xl font-bold text-sun-light">
                  {current.max.toFixed(1)} °C
                </span>
              </div>
              <div className="text-center sm:border-l sm:border-cream/15 sm:pl-4">
                <span className="block text-[11px] uppercase tracking-wider text-cream/70">
                  {isEn ? "Sunny Days" : "Días de Sol"}
                </span>
                <span className="font-display text-xl font-bold text-amber-300">
                  {current.sunnyDays} {isEn ? "days" : "días"}
                </span>
              </div>
              <div className="text-center sm:border-l sm:border-cream/15 sm:pl-4">
                <span className="block text-[11px] uppercase tracking-wider text-cream/70">
                  {isEn ? "Sun Hours" : "Horas de Sol"}
                </span>
                <span className="font-display text-xl font-bold text-cream">
                  {current.sunHours} h
                </span>
              </div>
              <div className="text-center sm:border-l sm:border-cream/15 sm:pl-4">
                <span className="block text-[11px] uppercase tracking-wider text-cream/70">
                  {isEn ? "Rainy Days" : "Días con Lluvia"}
                </span>
                <span className="font-display text-xl font-bold text-sky-300">
                  {current.rainDays} {isEn ? "days" : "días"}
                </span>
              </div>
            </div>
          </div>

          {/* Botones de selección rápida */}
          <div className="mt-5 flex flex-wrap justify-center gap-1.5 pt-2">
            {monthsData.map((m, i) => {
              const isSelected = i === selectedIdx;
              return (
                <button
                  key={m.name}
                  type="button"
                  onClick={() => setSelectedIdx(i)}
                  className={`rounded-lg px-3 py-1 text-xs font-medium transition-colors ${
                    isSelected
                      ? "bg-ocean text-cream shadow-xs font-semibold"
                      : "border border-line bg-cream text-ink hover:border-sun hover:text-sun-deep"
                  }`}
                >
                  {m.short}
                </button>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
