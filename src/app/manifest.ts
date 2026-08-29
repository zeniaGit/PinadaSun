import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Pinada Sun — Exclusive Vacation Living",
    short_name: "Pinada Sun",
    description:
      "Apartamento vacacional de alta gama con gran terraza privada, piscina y barbacoa en Villamartín, Orihuela Costa.",
    start_url: "/",
    display: "standalone",
    background_color: "#fbf8f3",
    theme_color: "#0f3b5c",
    lang: "es",
    icons: [
      {
        src: "/icon.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/images/logopinadasun.webp",
        sizes: "1024x1024",
        type: "image/webp",
      },
    ],
  };
}
