import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/panel", "/panel/reset", "/api/"],
      },
    ],
    sitemap: "https://pinadasun.com/sitemap.xml",
    host: "https://pinadasun.com",
  };
}
