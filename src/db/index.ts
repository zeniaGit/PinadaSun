import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const databaseUrl = (
  process.env.DATABASE_URL ||
  process.env.POSTGRES_URL ||
  process.env.POSTGRES_PRISMA_URL ||
  process.env.POSTGRES_URL_NON_POOLING ||
  process.env.PINADA_DATABASE_DATABASE_URL_UNPOOLED ||
  ""
).trim().replace(/^["']|["']$/g, "");

const isPlaceholder =
  !databaseUrl ||
  databaseUrl.includes("usuario:contraseña") ||
  databaseUrl.includes("127.0.0.1") ||
  databaseUrl.includes("localhost");

const globalForDb = globalThis as typeof globalThis & {
  __arenaNextJsPostgresqlPool?: Pool;
};

const needsSsl =
  databaseUrl.includes("sslmode=require") ||
  databaseUrl.includes("neon.tech") ||
  databaseUrl.includes("supabase.co") ||
  databaseUrl.includes("amazonaws.com") ||
  databaseUrl.includes("pooler");

export const pool =
  globalForDb.__arenaNextJsPostgresqlPool ??
  new Pool({
    connectionString: databaseUrl || undefined,
    connectionTimeoutMillis: 3500, // Evita que la función serverless se quede colgada
    max: 5,
    ssl: needsSsl ? { rejectUnauthorized: false } : undefined,
  });

if (process.env.NODE_ENV !== "production") {
  globalForDb.__arenaNextJsPostgresqlPool = pool;
}

export const db = drizzle(pool);
export const hasValidDb = !isPlaceholder;
