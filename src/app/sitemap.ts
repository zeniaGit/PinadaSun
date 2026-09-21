import type { MetadataRoute } from "next";

const BASE_URL = "https://pinadasun.com";

// Fecha de última actualización real del contenido principal
const LAST_MODIFIED_HOME = new Date("2026-09-21");
const LAST_MODIFIED_GUIDE = new Date("2026-09-15");
const LAST_MODIFIED_ARTICLE = new Date("2026-09-01");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // ── Página de inicio ──────────────────────────────────────────────
    {
      url: `${BASE_URL}/`,
      lastModified: LAST_MODIFIED_HOME,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    // ── Versión EN ────────────────────────────────────────────────────
    {
      url: `${BASE_URL}/en`,
      lastModified: LAST_MODIFIED_HOME,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    // ── Guía local ES ─────────────────────────────────────────────────
    {
      url: `${BASE_URL}/guia-local`,
      lastModified: LAST_MODIFIED_GUIDE,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/guia-local/costumbres-y-normas`,
      lastModified: LAST_MODIFIED_ARTICLE,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/guia-local/normas-rotondas-espana`,
      lastModified: LAST_MODIFIED_ARTICLE,
      changeFrequency: "yearly",
      priority: 0.65,
    },
    {
      url: `${BASE_URL}/guia-local/nueva-ley-tabaco-terrazas`,
      lastModified: LAST_MODIFIED_ARTICLE,
      changeFrequency: "yearly",
      priority: 0.65,
    },
    // ── Guía normativa ES ─────────────────────────────────────────────
    {
      url: `${BASE_URL}/guia-normativa-orihuela-costa`,
      lastModified: LAST_MODIFIED_GUIDE,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    // ── Guía local EN ─────────────────────────────────────────────────
    {
      url: `${BASE_URL}/en/guia-local`,
      lastModified: LAST_MODIFIED_GUIDE,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/en/guia-local/costumbres-y-normas`,
      lastModified: LAST_MODIFIED_ARTICLE,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/en/guia-local/nueva-ley-tabaco-terrazas`,
      lastModified: LAST_MODIFIED_ARTICLE,
      changeFrequency: "yearly",
      priority: 0.65,
    },
    // ── Guía normativa EN ─────────────────────────────────────────────
    {
      url: `${BASE_URL}/en/guia-normativa-orihuela-costa`,
      lastModified: LAST_MODIFIED_GUIDE,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
