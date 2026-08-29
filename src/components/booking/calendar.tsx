"use client";

import { useState } from "react";
import { addMonthsISO, localISO } from "@/lib/dates";
import { IconChevronL, IconChevronR } from "@/components/icons";

const WEEKDAYS_ES = ["L", "M", "X", "J", "V", "S", "D"];
const WEEKDAYS_EN = ["M", "T", "W", "T", "F", "S", "S"];
const MAX_MONTHS_AHEAD = 12;

const MONTHS_ES = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const MONTHS_EN = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function Calendar({
  unavailable,
  value,
  onChange,
  lang = "es",
}: {
  unavailable: Set<string>;
  value: [string, string] | null;
  onChange: (v: [string, string] | null) => void;
  lang?: "es" | "en";
}) {
  const weekdays = lang === "en" ? WEEKDAYS_EN : WEEKDAYS_ES;
  const months = lang === "en" ? MONTHS_EN : MONTHS_ES;
  const today = localISO();
  const now = new Date();
  const [view, setView] = useState({ y: now.getFullYear(), m: now.getMonth() });

  const cap = addMonthsISO(today, MAX_MONTHS_AHEAD);

  const canPrev =
    `${view.y}-${String(view.m + 1).padStart(2, "0")}` > today.slice(0, 7);
  const canNext = `${view.y}-${String(view.m + 1).padStart(2, "0")}` < cap.slice(0, 7);

  const first = new Date(view.y, view.m, 1);
  const offset = (first.getDay() + 6) % 7;
  const daysIn = new Date(view.y, view.m + 1, 0).getDate();
  const cells: (string | null)[] = [
    ...Array.from({ length: offset }, () => null),
    ...Array.from({ length: daysIn }, (_, i) =>
      `${view.y}-${String(view.m + 1).padStart(2, "0")}-${String(i + 1).padStart(2, "0")}`,
    ),
  ];

  const isPast = (iso: string) => iso < today;
  const isUnavail = (iso: string) => unavailable.has(iso);

  function handlePick(iso: string) {
    if (isPast(iso) || isUnavail(iso)) return;
    if (!value) {
      onChange([iso, iso]);
      return;
    }
    if (value[0] === value[1]) {
      if (iso < value[0]) {
        onChange([iso, iso]);
        return;
      }
      // Comprobar que todo el tramo está libre (incluido el día de salida).
      if (rangeFree(value[0], iso)) {
        onChange([value[0], iso]);
      } else {
        onChange([iso, iso]);
      }
    } else {
      onChange([iso, iso]);
    }
  }

  function nextDay(iso: string, stop: string): string {
    const [y, m, dd] = iso.split("-").map(Number);
    const n = new Date(y, m - 1, dd + 1);
    const out = localISO(n);
    return out > stop ? stop : out;
  }

  function rangeFree(from: string, to: string): boolean {
    let d = nextDay(from, to);
    while (d <= to) {
      if (isUnavail(d)) return false;
      if (d === to) break;
      d = nextDay(d, to);
    }
    return true;
  }

  function cellClass(iso: string): string {
    const past = isPast(iso);
    const un = isUnavail(iso);
    const base =
      "relative flex h-10 items-center justify-center text-[13px] transition-colors duration-150 sm:h-11";
    if (past) return `${base} text-ink/25`;
    if (un) return `${base} text-ink/30`;

    if (value && (iso === value[0] || iso === value[1])) {
      return `${base} bg-ink font-semibold text-cream`;
    }
    if (
      value &&
      value[0] !== value[1] &&
      iso > value[0] &&
      iso < value[1]
    ) {
      return `${base} bg-clay/15 font-medium text-ink hover:bg-clay/25 cursor-pointer`;
    }
    return `${base} text-ink hover:bg-ink/[0.06] cursor-pointer`;
  }

  return (
    <div>
      {/* Cabecera del mes */}
      <div className="mb-4 flex items-center justify-between">
        <p className="font-display text-xl">
          {months[view.m]}{" "}
          <span className="text-ink-soft">{view.y}</span>
        </p>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() =>
              setView((v) =>
                v.m === 0
                  ? { y: v.y - 1, m: 11 }
                  : { y: v.y, m: v.m - 1 },
              )
            }
            disabled={!canPrev}
            aria-label={lang === "en" ? "Previous month" : "Mes anterior"}
            className="flex h-9 w-9 items-center justify-center border border-line text-ink transition-colors hover:border-ink disabled:cursor-not-allowed disabled:opacity-30"
          >
            <IconChevronL className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() =>
              setView((v) =>
                v.m === 11 ? { y: v.y + 1, m: 0 } : { y: v.y, m: v.m + 1 },
              )
            }
            disabled={!canNext}
            aria-label={lang === "en" ? "Next month" : "Mes siguiente"}
            className="flex h-9 w-9 items-center justify-center border border-line text-ink transition-colors hover:border-ink disabled:cursor-not-allowed disabled:opacity-30"
          >
            <IconChevronR className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Cuadrícula */}
      <div className="grid grid-cols-7 gap-1">
        {weekdays.map((d, i) => (
          <div
            key={`${d}-${i}`}
            className="pb-1 text-center text-[11px] font-semibold uppercase tracking-widest text-ink-soft"
          >
            {d}
          </div>
        ))}
        {cells.map((iso, i) =>
          iso === null ? (
            <div key={`e${i}`} />
          ) : (
            <button
              key={iso}
              type="button"
              onClick={() => handlePick(iso)}
              disabled={isPast(iso) || isUnavail(iso)}
              aria-label={iso}
              className={cellClass(iso)}
            >
              {Number(iso.slice(8))}
              {isUnavail(iso) && !isPast(iso) && (
                <span className="absolute bottom-1 h-1 w-1 rounded-full bg-clay/70" />
              )}
            </button>
          ),
        )}
      </div>

      {/* Leyenda */}
      <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-4 text-[11px] text-ink-soft">
        <span className="inline-flex items-center gap-2">
          <i className="h-3 w-3 border border-line bg-cream" /> Libre
        </span>
        <span className="inline-flex items-center gap-2">
          <i className="h-3 w-3 border border-clay/50 bg-clay/25" /> Tu estancia
        </span>
        <span className="inline-flex items-center gap-2">
          <i className="h-3 w-3 bg-ink" /> Selección
        </span>
        <span className="inline-flex items-center gap-2">
          <i className="relative h-3 w-3 border border-line bg-cream">
            <i className="absolute bottom-[2px] left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-clay/70" />
          </i>
          Ocupado
        </span>
      </div>
    </div>
  );
}
