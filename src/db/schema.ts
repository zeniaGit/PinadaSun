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

export type Booking = typeof bookings.$inferSelect;
export type BlockedDate = typeof blockedDates.$inferSelect;
