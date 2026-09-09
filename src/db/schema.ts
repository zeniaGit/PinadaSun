import {
  pgTable,
  serial,
  text,
  integer,
  date,
  timestamp,
} from "drizzle-orm/pg-core";

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  guests: integer("guests").notNull().default(2),
  checkIn: date("check_in").notNull(),
  checkOut: date("check_out").notNull(),
  nights: integer("nights").notNull(),
  totalPrice: integer("total_price").notNull(),
  notes: text("notes"),
  status: text("status", {
    enum: ["pendiente", "confirmada", "cancelada"],
  })
    .notNull()
    .default("pendiente"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const blockedDates = pgTable("blocked_dates", {
  id: serial("id").primaryKey(),
  date: date("date").notNull().unique(),
  note: text("note"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const visitorSessions = pgTable("visitor_sessions", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull(),
  ip: text("ip").notNull(),
  country: text("country"),
  countryCode: text("country_code"),
  city: text("city"),
  device: text("device").notNull().default("Desconocido"),
  os: text("os").notNull().default("Desconocido"),
  browser: text("browser").notNull().default("Desconocido"),
  isBot: text("is_bot") // Postgres/SQLite dual safe
    .notNull()
    .default("false")
    .$type<boolean>(),
  botName: text("bot_name"),
  page: text("page").notNull().default("/"),
  referrer: text("referrer"),
  durationSeconds: integer("duration_seconds").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type Booking = typeof bookings.$inferSelect;
export type BlockedDate = typeof blockedDates.$inferSelect;
export type VisitorSession = typeof visitorSessions.$inferSelect;

