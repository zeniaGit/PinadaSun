/**
 * Analítica y Detección de Visitantes para Pinada Sun
 */

export interface ParsedUserAgent {
  device: "Móvil" | "Ordenador" | "Tablet" | "Desconocido";
  os: string;
  browser: string;
  isBot: boolean;
  botName: string | null;
}

export interface GeoLocation {
  country: string;
  countryCode: string;
  city: string;
}

const BOT_PATTERNS: Array<{ regex: RegExp; name: string }> = [
  { regex: /Googlebot/i, name: "Googlebot" },
  { regex: /Google-InspectionTool/i, name: "Google Inspection" },
  { regex: /Google-Site-Verification/i, name: "Google Verification" },
  { regex: /Mediapartners-Google/i, name: "Google AdSense" },
  { regex: /AdsBot-Google/i, name: "Google AdsBot" },
  { regex: /bingbot/i, name: "Bingbot" },
  { regex: /YandexBot/i, name: "YandexBot" },
  { regex: /DuckDuckBot/i, name: "DuckDuckBot" },
  { regex: /Baiduspider/i, name: "Baiduspider" },
  { regex: /AhrefsBot/i, name: "AhrefsBot (SEO)" },
  { regex: /SemrushBot/i, name: "SemrushBot (SEO)" },
  { regex: /MJ12bot/i, name: "MJ12bot" },
  { regex: /PetalBot/i, name: "PetalBot (Huawei)" },
  { regex: /DotBot/i, name: "DotBot" },
  { regex: /Applebot/i, name: "Applebot" },
  { regex: /facebookexternalhit/i, name: "Facebook Bot" },
  { regex: /Twitterbot/i, name: "Twitter / X Bot" },
  { regex: /LinkedInBot/i, name: "LinkedIn Bot" },
  { regex: /WhatsApp/i, name: "WhatsApp Link Preview" },
  { regex: /TelegramBot/i, name: "Telegram Bot" },
  { regex: /Discordbot/i, name: "Discord Bot" },
  { regex: /Pinterest/i, name: "Pinterest Bot" },
  { regex: /Slackbot/i, name: "Slackbot" },
  { regex: /curl/i, name: "cURL Tool" },
  { regex: /Wget/i, name: "Wget Tool" },
  { regex: /python-requests|python-urllib|aiohttp|httpx/i, name: "Python Script" },
  { regex: /Go-http-client/i, name: "Go HTTP Client" },
  { regex: /node-fetch|axios|postman/i, name: "Automated API Request" },
  { regex: /headlesschrome|puppeteer|playwright|selenium/i, name: "Headless Browser" },
  { regex: /crawler|spider|bot|crawl|slurp|archiver/i, name: "Crawler Genérico" },
];

const COUNTRY_NAMES: Record<string, string> = {
  ES: "España",
  GB: "Reino Unido",
  UK: "Reino Unido",
  DE: "Alemania",
  FR: "Francia",
  IT: "Italia",
  NL: "Países Bajos",
  BE: "Bélgica",
  SE: "Suecia",
  NO: "Noruega",
  DK: "Dinamarca",
  FI: "Finlandia",
  IE: "Irlanda",
  PT: "Portugal",
  PL: "Polonia",
  CH: "Suiza",
  AT: "Austria",
  US: "Estados Unidos",
  CA: "Canadá",
  RU: "Rusia",
  UA: "Ucrania",
  RO: "Rumanía",
  MA: "Marruecos",
  MX: "México",
  AR: "Argentina",
  CO: "Colombia",
  CL: "Chile",
  BR: "Brasil",
  CN: "China",
  JP: "Japón",
  IN: "India",
  AU: "Australia",
};

export function parseUserAgent(ua: string | null | undefined, isWebdriver = false): ParsedUserAgent {
  if (!ua) {
    return {
      device: "Desconocido",
      os: "Desconocido",
      browser: "Desconocido",
      isBot: true,
      botName: "Sin User-Agent",
    };
  }

  // 1. Detección de Bots
  for (const bot of BOT_PATTERNS) {
    if (bot.regex.test(ua)) {
      return {
        device: "Desconocido",
        os: "Bot / Crawler",
        browser: bot.name,
        isBot: true,
        botName: bot.name,
      };
    }
  }

  if (isWebdriver) {
    return {
      device: "Desconocido",
      os: "Automatización",
      browser: "Webdriver Automático",
      isBot: true,
      botName: "Selenium / Webdriver",
    };
  }

  // 2. Detección de Dispositivo
  let device: "Móvil" | "Ordenador" | "Tablet" = "Ordenador";
  if (/(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk)/i.test(ua)) {
    device = "Tablet";
  } else if (/(mobi|ipod|iphone|android|blackberry|opera mini|iemobile|mobile)/i.test(ua)) {
    device = "Móvil";
  }

  // 3. Detección de Sistema Operativo
  let os = "Otro SO";
  if (/iphone|ipad|ipod/i.test(ua)) os = "iOS";
  else if (/macintosh|mac os x/i.test(ua)) os = "macOS";
  else if (/android/i.test(ua)) os = "Android";
  else if (/windows nt 10\.0/i.test(ua)) os = "Windows 10/11";
  else if (/windows nt 6\.3/i.test(ua)) os = "Windows 8.1";
  else if (/windows nt 6\.1/i.test(ua)) os = "Windows 7";
  else if (/windows/i.test(ua)) os = "Windows";
  else if (/linux/i.test(ua)) os = "Linux";
  else if (/cros/i.test(ua)) os = "ChromeOS";

  // 4. Detección de Navegador
  let browser = "Otro";
  if (/edg\//i.test(ua)) browser = "Microsoft Edge";
  else if (/opr\/|opera/i.test(ua)) browser = "Opera";
  else if (/samsungbrowser/i.test(ua)) browser = "Samsung Internet";
  else if (/chrome|crios/i.test(ua)) browser = "Chrome";
  else if (/firefox|fxios/i.test(ua)) browser = "Firefox";
  else if (/safari/i.test(ua) && !/chrome|crios/i.test(ua)) browser = "Safari";
  else if (/msie|trident/i.test(ua)) browser = "Internet Explorer";

  return {
    device,
    os,
    browser,
    isBot: false,
    botName: null,
  };
}

export function extractClientIp(headers: Headers): string {
  // Verificamos cabeceras en orden de fiabilidad tras balanceadores/proxies
  const xForwardedFor = headers.get("x-forwarded-for");
  if (xForwardedFor) {
    const firstIp = xForwardedFor.split(",")[0]?.trim();
    if (firstIp) return sanitizeIp(firstIp);
  }

  const cfConnectingIp = headers.get("cf-connecting-ip");
  if (cfConnectingIp) return sanitizeIp(cfConnectingIp.trim());

  const xRealIp = headers.get("x-real-ip");
  if (xRealIp) return sanitizeIp(xRealIp.trim());

  const trueClientIp = headers.get("true-client-ip");
  if (trueClientIp) return sanitizeIp(trueClientIp.trim());

  return "127.0.0.1";
}

function sanitizeIp(ip: string): string {
  // Limpiar posibles prefijos de ipv6-mapped ipv4 (::ffff:192.168.1.1)
  if (ip.startsWith("::ffff:")) {
    return ip.replace("::ffff:", "");
  }
  return ip;
}

export function isLocalOrPrivateIp(ip: string): boolean {
  if (!ip || ip === "127.0.0.1" || ip === "::1" || ip === "localhost") return true;
  if (ip.startsWith("10.") || ip.startsWith("192.168.")) return true;
  if (ip.startsWith("172.")) {
    const parts = ip.split(".");
    const second = Number(parts[1]);
    if (second >= 16 && second <= 31) return true;
  }
  return false;
}

export function extractGeoLocation(headers: Headers, ip: string): GeoLocation {
  // 1. Extraer país de cabeceras de CDN/Edge (Vercel, Cloudflare, etc.)
  const headerCountry =
    headers.get("x-vercel-ip-country") ||
    headers.get("cf-ipcountry") ||
    headers.get("geoip-country-code") ||
    headers.get("x-country-code") ||
    "";

  const headerCity =
    headers.get("x-vercel-ip-city") ||
    headers.get("cf-ipcity") ||
    headers.get("geoip-city") ||
    "";

  if (headerCountry && headerCountry !== "XX" && headerCountry !== "T1") {
    const code = headerCountry.toUpperCase();
    return {
      countryCode: code,
      country: COUNTRY_NAMES[code] || code,
      city: headerCity ? decodeURIComponent(headerCity) : "",
    };
  }

  // 2. Si es IP local o de desarrollo
  if (isLocalOrPrivateIp(ip)) {
    return {
      countryCode: "ES",
      country: "España (Local)",
      city: "Alicante",
    };
  }

  // Fallback por defecto si no hay cabecera de CDN
  return {
    countryCode: "ES",
    country: "España",
    city: "",
  };
}

export function getCountryFlag(countryCode: string | null | undefined): string {
  if (!countryCode || countryCode.length !== 2) return "🌐";
  const code = countryCode.toUpperCase();
  const offset = 127397;
  try {
    return String.fromCodePoint(...[...code].map((c) => c.charCodeAt(0) + offset));
  } catch {
    return "🌐";
  }
}
