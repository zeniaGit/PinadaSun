const pad = (n: number) => String(n).padStart(2, "0");

/** Fecha local en formato ISO (YYYY-MM-DD), sin desfase UTC. */
export function localISO(d: Date = new Date()): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function todayISO(): string {
  return localISO(new Date());
}

/** Suma días a una fecha ISO y devuelve otra fecha ISO. */
export function addDaysISO(iso: string, days: number): string {
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(y, m - 1, d + days);
  return localISO(dt);
}

export function addMonthsISO(iso: string, months: number): string {
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(y, m - 1 + months, d);
  return localISO(dt);
}

export function nightsBetween(checkIn: string, checkOut: string): number {
  return Math.round(
    (Date.parse(checkOut + "T12:00:00") - Date.parse(checkIn + "T12:00:00")) /
      86_400_000,
  );
}

export function eachNight(checkIn: string, checkOut: string): string[] {
  const nights: string[] = [];
  let cursor = checkIn;
  while (cursor < checkOut) {
    nights.push(cursor);
    cursor = addDaysISO(cursor, 1);
  }
  return nights;
}

export function fmtLong(iso: string): string {
  const s = new Date(iso + "T12:00:00").toLocaleDateString("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function fmtShort(iso: string): string {
  const s = new Date(iso + "T12:00:00").toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function fmtEuro(n: number): string {
  return `${n.toLocaleString("es-ES")} €`;
}
