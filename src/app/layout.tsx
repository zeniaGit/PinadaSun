import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Fraunces, Manrope } from "next/font/google";
import Script from "next/script";
import { StructuredData } from "@/components/structured-data";
import { CookieBanner } from "@/components/cookie-banner";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["opsz", "SOFT", "WONK"],
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0f3b5c",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://pinadasun.com"),
  title: "Pinada Sun — Apartamento Exclusivo en Orihuela Costa | Terraza & Piscina",
  description:
    "Apartamento vacacional de alta gama con gran terraza privada, piscina comunitaria y barbacoa en Villamartín, Orihuela Costa. 2 dormitorios, confort premium y a 5 min de Zenia Boulevard.",
  keywords: [
    "Pinada Sun",
    "pinadasun.com",
    "apartamento turistico orihuela costa",
    "alquiler vacaciones villamartin",
    "apartamento con terraza y barbacoa alicante",
    "zenia boulevard apartamento alquiler",
    "golf villamartin alojamiento lujo",
  ],
  authors: [{ name: "Pinada Sun Exclusive Living" }],
  creator: "Pinada Sun",
  publisher: "Pinada Sun",
  alternates: {
    canonical: "https://pinadasun.com",
    languages: {
      "es-ES": "https://pinadasun.com",
      "en-US": "https://pinadasun.com/en",
      "en-GB": "https://pinadasun.com/en",
    },
  },
  icons: {
    icon: [
      { url: "/images/logopinadasun.webp", type: "image/webp" },
      { url: "/icon.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/images/logopinadasun.webp",
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://pinadasun.com",
    siteName: "Pinada Sun",
    title: "Pinada Sun — Apartamento Exclusivo en Orihuela Costa",
    description:
      "Vivienda vacacional de alta gama: gran terraza privada con barbacoa, piscina y calidades excepcionales a 5 min de Zenia Boulevard.",
    images: [
      {
        url: "/images/terrace-hero.webp",
        width: 1200,
        height: 630,
        alt: "Pinada Sun · Terraza privada con porche y barbacoa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pinada Sun — Apartamento Exclusivo en Orihuela Costa",
    description:
      "Terraza privada, piscina comunitaria, barbacoa y calidades premium en Villamartín.",
    images: ["/images/terrace-hero.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" className={`${fraunces.variable} ${manrope.variable}`}>
      <head>
        <link rel="preconnect" href="https://a0.muscache.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://a0.muscache.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <StructuredData />
        <Script id="google-consent-mode" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied',
              'analytics_storage': 'denied',
              'wait_for_update': 500
            });
          `}
        </Script>
      </head>
      <body className="font-body antialiased">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MFW4K97N"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-MFW4K97N');
          `}
        </Script>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-PTS380R98H"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-PTS380R98H');
          `}
        </Script>
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
