import { db, hasValidDb } from "@/db";
import { bookings, blockedDates, type Booking, type BlockedDate } from "@/db/schema";
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
  nextBookingId: number;
  nextBlockedId: number;
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
      return JSON.parse(content);
    }
  } catch {}
  return {
    bookings: [],
    blocked: [],
    nextBookingId: 1,
    nextBlockedId: 1,
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

export async function getUnavailableDates(today: string, cap: string): Promise<string[]> {
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

      const set = new Set<string>();
      for (const b of active) {
        for (let d = b.checkIn; d < b.checkOut && d <= cap; d = addOneDay(d)) {
          if (d >= today) set.add(d);
        }
      }
      for (const b of blocked) {
        if (b.date >= today && b.date <= cap) set.add(b.date);
      }
      return [...set].sort();
    } catch (err) {
      console.warn("DB getUnavailableDates error, using local fallback:", err);
    }
  }

  // Fallback local
  const data = getLocalData();
  const active = data.bookings.filter(
    (b) => b.status === "pendiente" || b.status === "confirmada",
  );
  const set = new Set<string>();
  for (const b of active) {
    for (let d = b.checkIn; d < b.checkOut && d <= cap; d = addOneDay(d)) {
      if (d >= today) set.add(d);
    }
  }
  for (const b of data.blocked) {
    if (b.date >= today && b.date <= cap) set.add(b.date);
  }
  return [...set].sort();
}

export async function checkBookingClash(checkIn: string, checkOut: string): Promise<boolean> {
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

function addOneDay(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const next = new Date(Date.UTC(y, m - 1, d + 1));
  return next.toISOString().slice(0, 10);
}
