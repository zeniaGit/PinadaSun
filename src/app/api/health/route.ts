import { db, hasValidDb } from "@/db";
import { ensureSchema } from "@/lib/store";
import { sql } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
  const isProd = process.env.NODE_ENV === "production";

  const diagnostics: Record<string, unknown> = {
    status: "ok",
    timestamp: new Date().toISOString(),
    service: "Pinada Sun Web",
  };

  if (hasValidDb) {
    try {
      await db.execute(sql`SELECT 1`);
      await ensureSchema();
      diagnostics.database = "connected";
    } catch (err: any) {
      diagnostics.database = "degraded";
      // En producción no exponer detalles internos del error de base de datos
      if (!isProd) {
        diagnostics.dbError = err?.message ?? "Error conectando a la base de datos";
      }
    }
  } else {
    diagnostics.database = "local-store";
  }

  return Response.json(diagnostics);
}
