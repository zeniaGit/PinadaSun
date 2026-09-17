import { db, hasValidDb } from "@/db";
import {
  bookings,
  blockedDates,
  visitorSessions,
  type Booking,
  type BlockedDate,
  type VisitorSession,
} from "@/db/schema";
import { and, asc, desc, eq, gt, gte, inArray, lt, sql } from "drizzle-orm";
import fs from "fs";
import path from "path";

let schemaInitialized = false;

export async function ensureSchema() {
  if (!hasValidDb || schemaInitialized) return;
  try {
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS bookings (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        guests INTEGER NOT NULL DEFAULT 2,
        check_in DATE NOT NULL,
        check_out DATE NOT NULL,
        nights INTEGER NOT NULL,
        total_price INTEGER NOT NULL,
        notes TEXT,
        status TEXT NOT NULL DEFAULT 'pendiente',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
      CREATE TABLE IF NOT EXISTS blocked_dates (
        id SERIAL PRIMARY KEY,
        date DATE NOT NULL UNIQUE,
        note TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
      CREATE TABLE IF NOT EXISTS visitor_sessions (
        id SERIAL PRIMARY KEY,
        session_id TEXT NOT NULL,
        ip TEXT NOT NULL,
        country TEXT,
        country_code TEXT,
        city TEXT,
        device TEXT NOT NULL DEFAULT 'Desconocido',
        os TEXT NOT NULL DEFAULT 'Desconocido',
        browser TEXT NOT NULL DEFAULT 'Desconocido',
        is_bot BOOLEAN NOT NULL DEFAULT FALSE,
        bot_name TEXT,
        page TEXT NOT NULL DEFAULT '/',
        referrer TEXT,
        duration_seconds INTEGER NOT NULL DEFAULT 0,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
      CREATE INDEX IF NOT EXISTS idx_visitor_sessions_session_id ON visitor_sessions (session_id);
      CREATE INDEX IF NOT EXISTS idx_visitor_sessions_created_at ON visitor_sessions (created_at DESC);
    `);
    schemaInitialized = true;
  } catch (err) {
    console.error("Error auto-initializing database tables:", err);
  }
}

// ── Almacenamiento local de respaldo (para desarrollo cuando no hay PostgreSQL local) ──
interface LocalData {
  bookings: Booking[];
  blocked: BlockedDate[];
  visitorSessions: VisitorSession[];
  nextBookingId: number;
  nextBlockedId: number;
  nextSessionId: number;
}

const DATA_DIR = path.join(process.cwd(), ".data");
const DATA_FILE = path.join(DATA_DIR, "store.json");

function getLocalData(): LocalData {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (fs.existsSync(DATA_FILE)) {
      const content = fs.readFileSync(DATA_FILE, "utf-8");
      const parsed = JSON.parse(content);
      return {
        bookings: parsed.bookings || [],
        blocked: parsed.blocked || [],
        visitorSessions: parsed.visitorSessions || [],
        nextBookingId: parsed.nextBookingId || 1,
        nextBlockedId: parsed.nextBlockedId || 1,
        nextSessionId: parsed.nextSessionId || 1,
      };
    }
  } catch {}
  return {
    bookings: [],
    blocked: [],
    visitorSessions: [],
    nextBookingId: 1,
    nextBlockedId: 1,
    nextSessionId: 1,
  };
}

function saveLocalData(data: LocalData) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch {}
}

const ICAL_SOURCES = [
  { name: "Airbnb", url: "https://www.airbnb.es/calendar/ical/1729850238063591911.ics?t=165372d889384dd58e382af1fafecf26" },
  { name: "Vrbo", url: "https://www.vrbo.com/icalendar/1097c9a3ec9d4cd797d20ba08e1d1e28.ics?nonTentative" }
];

export interface UnavailableDate {
  date: string;
  source: string;
}

async function fetchExternalIcalDates(): Promise<UnavailableDate[]> {
  const dates: UnavailableDate[] = [];
  
  for (const source of ICAL_SOURCES) {
    try {
      const res = await fetch(source.url, { next: { revalidate: 900 } });
      if (!res.ok) continue;
      const text = await res.text();
      const events = text.split("BEGIN:VEVENT");
      events.shift();
      
      for (const event of events) {
        const startMatch = event.match(/DTSTART(?:;VALUE=DATE)?:(\d{4})(\d{2})(\d{2})/);
        const endMatch = event.match(/DTEND(?:;VALUE=DATE)?:(\d{4})(\d{2})(\d{2})/);
        if (startMatch && endMatch) {
          const start = `${startMatch[1]}-${startMatch[2]}-${startMatch[3]}`;
          const end = `${endMatch[1]}-${endMatch[2]}-${endMatch[3]}`;
          
          let curr = start;
          while (curr < end) {
            dates.push({ date: curr, source: source.name });
            curr = addOneDay(curr);
          }
        }
      }
    } catch (error) {
      console.error(`Error fetching iCal for ${source.name}:`, error);
    }
  }
  return dates;
}

async function fetchNasBlockedDates(): Promise<UnavailableDate[]> {
  const dates: UnavailableDate[] = [];
  const today = new Date();
  let y = today.getFullYear();
  let m = today.getMonth() + 1;
  const fetches = [];
  
  for (let i = 0; i < 13; i++) {
    const url = `https://calendario.nas-lazenia.synology.me/api/disponibilidad?year=${y}&month=${m}`;
    fetches.push(
      fetch(url, { next: { revalidate: 900 } })
        .then(res => res.json())
        .catch(() => null)
    );
    m++;
    if (m > 12) {
      m = 1;
      y++;
    }
  }
  
  try {
    const results = await Promise.all(fetches);
    for (const data of results) {
      if (data && data.blocked && Array.isArray(data.blocked)) {
        for (const b of data.blocked) {
          if (b.source === "Privado" || b.source === "Manual") {
            dates.push({ date: b.date, source: "Privado" });
          }
        }
      }
    }
  } catch (err) {
    console.error("Error fetching NAS blocked dates:", err);
  }
  return dates;
}

export async function getUnavailableDates(today: string, cap: string): Promise<UnavailableDate[]> {
  const [externalBlocked, nasBlocked] = await Promise.all([
    fetchExternalIcalDates(),
    fetchNasBlockedDates()
  ]);
  const dateMap = new Map<string, string>();
  
  for (const b of externalBlocked) {
    dateMap.set(b.date, b.source);
  }
  for (const b of nasBlocked) {
    dateMap.set(b.date, b.source);
  }

  if (hasValidDb) {
    try {
      await ensureSchema();
      const [active, blocked] = await Promise.all([
        db
          .select({ checkIn: bookings.checkIn, checkOut: bookings.checkOut })
          .from(bookings)
          .where(inArray(bookings.status, ["pendiente", "confirmada"])),
        db.select({ date: blockedDates.date }).from(blockedDates),
      ]);

      for (const b of active) {
        for (let d = b.checkIn; d < b.checkOut && d <= cap; d = addOneDay(d)) {
          if (d >= today) dateMap.set(d, "Ocupado");
        }
      }
      for (const b of blocked) {
        if (b.date >= today && b.date <= cap) dateMap.set(b.date, "Ocupado");
      }
      
      return Array.from(dateMap.entries())
        .map(([date, source]) => ({ date, source }))
        .sort((a, b) => a.date.localeCompare(b.date));
    } catch (err) {
      console.warn("DB getUnavailableDates error, using local fallback:", err);
    }
  }

  // Fallback local
  const data = getLocalData();
  const active = data.bookings.filter(
    (b) => b.status === "pendiente" || b.status === "confirmada",
  );
  
  for (const b of active) {
    for (let d = b.checkIn; d < b.checkOut && d <= cap; d = addOneDay(d)) {
      if (d >= today) dateMap.set(d, "Ocupado");
    }
  }
  for (const b of data.blocked) {
    if (b.date >= today && b.date <= cap) dateMap.set(b.date, "Ocupado");
  }
  
  return Array.from(dateMap.entries())
    .map(([date, source]) => ({ date, source }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

export async function checkBookingClash(checkIn: string, checkOut: string): Promise<boolean> {
  const [externalBlocked, nasBlocked] = await Promise.all([
    fetchExternalIcalDates(),
    fetchNasBlockedDates()
  ]);
  let curr = checkIn;
  while (curr < checkOut) {
    if (externalBlocked.some(b => b.date === curr)) return true;
    if (nasBlocked.some(b => b.date === curr)) return true;
    curr = addOneDay(curr);
  }

  if (hasValidDb) {
    try {
      const clash = await db
        .select({ id: bookings.id })
        .from(bookings)
        .where(
          and(
            inArray(bookings.status, ["pendiente", "confirmada"]),
            lt(bookings.checkIn, checkOut),
            gt(bookings.checkOut, checkIn),
          ),
        )
        .limit(1);
      if (clash.length > 0) return true;

      const blockedClash = await db
        .select({ date: blockedDates.date })
        .from(blockedDates)
        .where(and(gte(blockedDates.date, checkIn), lt(blockedDates.date, checkOut)))
        .limit(1);
      return blockedClash.length > 0;
    } catch (err) {
      console.warn("DB checkBookingClash error, using local fallback:", err);
    }
  }

  const data = getLocalData();
  const clash = data.bookings.some(
    (b) =>
      (b.status === "pendiente" || b.status === "confirmada") &&
      b.checkIn < checkOut &&
      b.checkOut > checkIn,
  );
  if (clash) return true;
  return data.blocked.some((b) => b.date >= checkIn && b.date < checkOut);
}

export async function createBooking(input: {
  name: string;
  email: string;
  phone: string | null;
  guests: number;
  checkIn: string;
  checkOut: string;
  nights: number;
  totalPrice: number;
  notes: string | null;
}): Promise<{ id: number; total: number }> {
  if (hasValidDb) {
    try {
      await ensureSchema();
      const [row] = await db
        .insert(bookings)
        .values({
          ...input,
          status: "pendiente",
        })
        .returning({ id: bookings.id });
      return { id: row.id, total: input.totalPrice };
    } catch (err) {
      console.error("DB createBooking error, falling back to local storage:", err);
    }
  }

  const data = getLocalData();
  const id = data.nextBookingId++;
  const newBooking: Booking = {
    id,
    ...input,
    status: "pendiente",
    createdAt: new Date(),
  };
  data.bookings.unshift(newBooking);
  saveLocalData(data);
  return { id, total: input.totalPrice };
}

export async function updateBookingStatus(
  id: number,
  status: "confirmada" | "cancelada",
): Promise<boolean> {
  try {
    const rows = await db
      .update(bookings)
      .set({ status })
      .where(eq(bookings.id, id))
      .returning({ id: bookings.id });
    return rows.length > 0;
  } catch {
    const data = getLocalData();
    const b = data.bookings.find((item) => item.id === id);
    if (!b) return false;
    b.status = status;
    saveLocalData(data);
    return true;
  }
}

export async function deleteBooking(id: number): Promise<boolean> {
  if (hasValidDb) {
    try {
      await ensureSchema();
      const rows = await db
        .delete(bookings)
        .where(eq(bookings.id, id))
        .returning({ id: bookings.id });
      
      try {
        await db.execute(sql`
          SELECT setval(
            pg_get_serial_sequence('bookings', 'id'),
            COALESCE((SELECT MAX(id) FROM bookings), 0) + 1,
            false
          )
        `);
      } catch (seqErr) {
        console.warn("Could not reset postgres sequence:", seqErr);
      }
      return rows.length > 0;
    } catch (err) {
      console.warn("DB deleteBooking error, fallback to local:", err);
    }
  }

  const data = getLocalData();
  const idx = data.bookings.findIndex((item) => item.id === id);
  if (idx === -1) return false;
  data.bookings.splice(idx, 1);
  if (data.bookings.length === 0) {
    data.nextBookingId = 1;
  } else {
    data.nextBookingId = Math.max(...data.bookings.map((b) => b.id)) + 1;
  }
  saveLocalData(data);
  return true;
}

export async function resetAllBookings(): Promise<boolean> {
  if (hasValidDb) {
    try {
      await ensureSchema();
      await db.delete(bookings);
      try {
        await db.execute(sql`
          SELECT setval(pg_get_serial_sequence('bookings', 'id'), 1, false)
        `);
      } catch (seqErr) {
        console.warn("Could not reset postgres sequence:", seqErr);
      }
    } catch (err) {
      console.warn("DB resetAllBookings error, fallback to local:", err);
    }
  }

  const data = getLocalData();
  data.bookings = [];
  data.nextBookingId = 1;
  saveLocalData(data);
  return true;
}

export async function blockDateEntry(
  date: string,
  note: string | null,
): Promise<{ ok: boolean; id?: number; error?: string }> {
  try {
    const [row] = await db
      .insert(blockedDates)
      .values({ date, note })
      .returning({ id: blockedDates.id });
    return { ok: true, id: row.id };
  } catch (err: any) {
    if (err?.message?.includes("duplicate") || err?.code === "23505") {
      return { ok: false, error: "Esa fecha ya está bloqueada." };
    }
    const data = getLocalData();
    if (data.blocked.some((b) => b.date === date)) {
      return { ok: false, error: "Esa fecha ya está bloqueada." };
    }
    const id = data.nextBlockedId++;
    data.blocked.push({
      id,
      date,
      note,
      createdAt: new Date(),
    });
    data.blocked.sort((a, b) => a.date.localeCompare(b.date));
    saveLocalData(data);
    return { ok: true, id };
  }
}

export async function unblockDateEntry(date: string): Promise<boolean> {
  try {
    const rows = await db
      .delete(blockedDates)
      .where(eq(blockedDates.date, date))
      .returning({ id: blockedDates.id });
    return rows.length > 0;
  } catch {
    const data = getLocalData();
    const idx = data.blocked.findIndex((b) => b.date === date);
    if (idx === -1) return false;
    data.blocked.splice(idx, 1);
    saveLocalData(data);
    return true;
  }
}

export async function getPanelData(): Promise<{
  bookings: Booking[];
  blocked: BlockedDate[];
}> {
  if (hasValidDb) {
    try {
      await ensureSchema();
      const [rows, blocked] = await Promise.all([
        db
          .select()
          .from(bookings)
          .orderBy(desc(bookings.createdAt), desc(bookings.id))
          .limit(60),
        db.select().from(blockedDates).orderBy(asc(blockedDates.date)),
      ]);
      return { bookings: rows, blocked };
    } catch (err) {
      console.warn("DB getPanelData error, using local fallback:", err);
    }
  }

  const data = getLocalData();
  return {
    bookings: data.bookings,
    blocked: data.blocked,
  };
}

// ── Registro y Analítica de Visitantes ──

export async function recordVisitorSession(input: {
  sessionId: string;
  ip: string;
  country: string;
  countryCode: string;
  city: string;
  device: string;
  os: string;
  browser: string;
  isBot: boolean;
  botName: string | null;
  page: string;
  referrer: string | null;
}): Promise<void> {
  if (hasValidDb) {
    try {
      await ensureSchema();
      // Si la sesión ya existe en los últimos 30 min, actualizamos la última página
      const existing = await db
        .select({ id: visitorSessions.id, page: visitorSessions.page })
        .from(visitorSessions)
        .where(eq(visitorSessions.sessionId, input.sessionId))
        .limit(1);

      if (existing.length > 0) {
        const prevPage = existing[0].page || "";
        const pagesArray = prevPage.split(",").map(p => p.trim());
        let newPageString = prevPage;
        if (!pagesArray.includes(input.page)) {
          newPageString = prevPage ? prevPage + "," + input.page : input.page;
        }

        await db
          .update(visitorSessions)
          .set({
            page: newPageString,
            updatedAt: new Date(),
          })
          .where(eq(visitorSessions.id, existing[0].id));
        return;
      }

      await db.insert(visitorSessions).values({
        ...input,
        durationSeconds: 0,
      });
      return;
    } catch (err) {
      console.warn("DB recordVisitorSession error, falling back to local storage:", err);
    }
  }

  // Fallback Local
  const data = getLocalData();
  const existing = data.visitorSessions.find((s) => s.sessionId === input.sessionId);
  if (existing) {
    const prevPage = existing.page || "";
    const pagesArray = prevPage.split(",").map(p => p.trim());
    if (!pagesArray.includes(input.page)) {
      existing.page = prevPage ? prevPage + "," + input.page : input.page;
    }
    existing.updatedAt = new Date();
  } else {
    const id = data.nextSessionId++;
    const now = new Date();
    data.visitorSessions.unshift({
      id,
      ...input,
      durationSeconds: 0,
      createdAt: now,
      updatedAt: now,
    });
    // Limitar historial local a 500 registros para no sobrecargar
    if (data.visitorSessions.length > 500) {
      data.visitorSessions = data.visitorSessions.slice(0, 500);
    }
  }
  saveLocalData(data);
}

export async function updateSessionDuration(
  sessionId: string,
  durationSeconds: number,
  page?: string,
): Promise<void> {
  const safeDuration = Math.max(0, Math.min(86400, Math.round(durationSeconds)));
  if (hasValidDb) {
    try {
      await ensureSchema();
      const updateData: Record<string, any> = {
        durationSeconds: safeDuration,
        updatedAt: new Date(),
      };
      if (page) updateData.page = page;

      await db
        .update(visitorSessions)
        .set(updateData)
        .where(eq(visitorSessions.sessionId, sessionId));
      return;
    } catch (err) {
      console.warn("DB updateSessionDuration error, using local fallback:", err);
    }
  }

  const data = getLocalData();
  const s = data.visitorSessions.find((item) => item.sessionId === sessionId);
  if (s) {
    s.durationSeconds = safeDuration;
    if (page) s.page = page;
    s.updatedAt = new Date();
    saveLocalData(data);
  }
}

export interface VisitorAnalyticsSummary {
  totalVisits: number;
  realVisits: number;
  botVisits: number;
  avgDurationSeconds: number;
  mobileCount: number;
  desktopCount: number;
  tabletCount: number;
  topCountries: Array<{ code: string; name: string; count: number }>;
  topPages: Array<{ page: string; count: number }>;
  recentVisitors: VisitorSession[];
}

export async function getVisitorAnalytics(limit = 150): Promise<VisitorAnalyticsSummary> {
  let sessions: VisitorSession[] = [];

  if (hasValidDb) {
    try {
      await ensureSchema();
      sessions = await db
        .select()
        .from(visitorSessions)
        .orderBy(desc(visitorSessions.createdAt))
        .limit(limit);
    } catch (err) {
      console.warn("DB getVisitorAnalytics error, using local fallback:", err);
    }
  }

  if (sessions.length === 0) {
    const data = getLocalData();
    sessions = [...data.visitorSessions]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit);
  }

  const totalVisits = sessions.length;
  const botVisits = sessions.filter((s) => s.isBot).length;
  const realVisits = totalVisits - botVisits;

  const realSessions = sessions.filter((s) => !s.isBot);
  const totalDuration = realSessions.reduce((acc, s) => acc + (s.durationSeconds || 0), 0);
  const avgDurationSeconds = realSessions.length > 0 ? Math.round(totalDuration / realSessions.length) : 0;

  let mobileCount = 0;
  let desktopCount = 0;
  let tabletCount = 0;

  const countryMap: Record<string, { code: string; name: string; count: number }> = {};
  const pageMap: Record<string, number> = {};

  for (const s of sessions) {
    if (s.device === "Móvil") mobileCount++;
    else if (s.device === "Tablet") tabletCount++;
    else desktopCount++;

    const cCode = s.countryCode || "ES";
    const cName = s.country || "España";
    if (!countryMap[cCode]) {
      countryMap[cCode] = { code: cCode, name: cName, count: 0 };
    }
    countryMap[cCode].count++;

    const p = s.page || "/";
    const pagesArray = p.split(",").map(x => x.trim());
    for (const page of pagesArray) {
      pageMap[page] = (pageMap[page] || 0) + 1;
    }
  }

  const topCountries = Object.values(countryMap)
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  const topPages = Object.entries(pageMap)
    .map(([page, count]) => ({ page, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  return {
    totalVisits,
    realVisits,
    botVisits,
    avgDurationSeconds,
    mobileCount,
    desktopCount,
    tabletCount,
    topCountries,
    topPages,
    recentVisitors: sessions,
  };
}

export async function clearVisitorAnalytics(): Promise<boolean> {
  if (hasValidDb) {
    try {
      await ensureSchema();
      await db.delete(visitorSessions);
    } catch (err) {
      console.warn("DB clearVisitorAnalytics error, fallback to local:", err);
    }
  }

  const data = getLocalData();
  data.visitorSessions = [];
  data.nextSessionId = 1;
  saveLocalData(data);
  return true;
}

function addOneDay(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const next = new Date(Date.UTC(y, m - 1, d + 1));
  return next.toISOString().slice(0, 10);
}

export async function getUniqueIpCount(): Promise<number> {
  if (hasValidDb) {
    try {
      await ensureSchema();
      const result = await db.execute(sql`SELECT COUNT(DISTINCT ip) as count FROM visitor_sessions`);
      if (result && "rows" in result && Array.isArray(result.rows) && result.rows.length > 0) {
        return parseInt(result.rows[0].count as string, 10) || 0;
      }
      if (Array.isArray(result) && result.length > 0) {
        return parseInt((result[0] as any).count as string, 10) || 0;
      }
      return 0;
    } catch (err) {
      console.warn("DB getUniqueIpCount error, fallback to local:", err);
    }
  }

  const data = getLocalData();
  const uniqueIps = new Set(data.visitorSessions.map((s) => s.ip));
  return uniqueIps.size;
}

export async function getUniqueIpCountForPage(pagePath: string): Promise<number> {
  if (hasValidDb) {
    try {
      await ensureSchema();
      const searchPattern = `%${pagePath}%`;
      const result = await db.execute(sql`SELECT COUNT(DISTINCT ip) as count FROM visitor_sessions WHERE page LIKE ${searchPattern}`);
      if (result && "rows" in result && Array.isArray(result.rows) && result.rows.length > 0) {
        return parseInt(result.rows[0].count as string, 10) || 0;
      }
      if (Array.isArray(result) && result.length > 0) {
        return parseInt((result[0] as any).count as string, 10) || 0;
      }
      return 0;
    } catch (err) {
      console.warn("DB getUniqueIpCountForPage error, fallback to local:", err);
    }
  }

  const data = getLocalData();
  const uniqueIps = new Set(
    data.visitorSessions.filter((s) => s.page.includes(pagePath)).map((s) => s.ip)
  );
  return uniqueIps.size;
}
