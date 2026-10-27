import type { MetadataRoute } from "next";

const BASE_URL = "https://pinadasun.com";

// Fecha de última actualización real del contenido principal
const LAST_MODIFIED_HOME = new Date("2026-09-21");
const LAST_MODIFIED_GUIDE = new Date("2026-09-15");
const LAST_MODIFIED_ARTICLE = new Date("2026-09-01");
const LAST_MODIFIED_LONG_STAYS = new Date("2026-10-06");
const LAST_MODIFIED_SAFETY_ARTICLE = new Date("2026-10-06");

function localizedAlternates(esPath: string, enPath: string) {
  return {
    languages: {
      "es-ES": `${BASE_URL}${esPath}`,
      "en-GB": `${BASE_URL}${enPath}`,
      "x-default": `${BASE_URL}${esPath}`,
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // ── Página de inicio ──────────────────────────────────────────────
    {
      url: `${BASE_URL}/`,
      alternates: localizedAlternates("/", "/en"),
      lastModified: LAST_MODIFIED_HOME,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    // ── Versión EN ────────────────────────────────────────────────────
    {
      url: `${BASE_URL}/en`,
      alternates: localizedAlternates("/", "/en"),
      lastModified: LAST_MODIFIED_HOME,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/larga-estancia`,
      alternates: localizedAlternates("/larga-estancia", "/en/long-stays"),
      lastModified: LAST_MODIFIED_LONG_STAYS,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${BASE_URL}/en/long-stays`,
      alternates: localizedAlternates("/larga-estancia", "/en/long-stays"),
      lastModified: LAST_MODIFIED_LONG_STAYS,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    // ── Guía local ES ─────────────────────────────────────────────────
    {
      url: `${BASE_URL}/guia-local`,
      alternates: localizedAlternates("/guia-local", "/en/guia-local"),
      lastModified: LAST_MODIFIED_GUIDE,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/guia-local/costumbres-y-normas`,
      alternates: localizedAlternates(
        "/guia-local/costumbres-y-normas",
        "/en/guia-local/costumbres-y-normas",
      ),
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
      alternates: localizedAlternates(
        "/guia-local/nueva-ley-tabaco-terrazas",
        "/en/guia-local/nueva-ley-tabaco-terrazas",
      ),
      lastModified: LAST_MODIFIED_ARTICLE,
      changeFrequency: "yearly",
      priority: 0.65,
    },
    {
      url: `${BASE_URL}/guia-local/consejos-seguridad-orihuela-costa`,
      lastModified: LAST_MODIFIED_SAFETY_ARTICLE,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    // ── Guía normativa ES ─────────────────────────────────────────────
    {
      url: `${BASE_URL}/guia-normativa-orihuela-costa`,
      alternates: localizedAlternates(
        "/guia-normativa-orihuela-costa",
        "/en/guia-normativa-orihuela-costa",
      ),
      lastModified: LAST_MODIFIED_GUIDE,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    // ── Guía local EN ─────────────────────────────────────────────────
    {
      url: `${BASE_URL}/en/guia-local`,
      alternates: localizedAlternates("/guia-local", "/en/guia-local"),
      lastModified: LAST_MODIFIED_GUIDE,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/en/guia-local/costumbres-y-normas`,
      alternates: localizedAlternates(
        "/guia-local/costumbres-y-normas",
        "/en/guia-local/costumbres-y-normas",
      ),
      lastModified: LAST_MODIFIED_ARTICLE,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/en/guia-local/nueva-ley-tabaco-terrazas`,
      alternates: localizedAlternates(
        "/guia-local/nueva-ley-tabaco-terrazas",
        "/en/guia-local/nueva-ley-tabaco-terrazas",
      ),
      lastModified: LAST_MODIFIED_ARTICLE,
      changeFrequency: "yearly",
      priority: 0.65,
    },
    // ── Guía normativa EN ─────────────────────────────────────────────
    {
      url: `${BASE_URL}/en/guia-normativa-orihuela-costa`,
      alternates: localizedAlternates(
        "/guia-normativa-orihuela-costa",
        "/en/guia-normativa-orihuela-costa",
      ),
      lastModified: LAST_MODIFIED_GUIDE,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
