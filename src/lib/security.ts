import { NextRequest } from "next/server";
import fs from "fs";
import path from "path";

// ── 1. Detección de IP Real ──────────────────────────────────────────
export function getClientIp(req: Request | NextRequest): string {
  const headers = req.headers;
  
  // Cloudflare
  const cfIp = headers.get("cf-connecting-ip");
  if (cfIp) return cfIp.trim();

  // X-Real-IP
  const realIp = headers.get("x-real-ip");
  if (realIp) return realIp.trim();

  // X-Forwarded-For (primer valor)
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    const ips = forwarded.split(",").map((ip) => ip.trim());
    if (ips[0]) return ips[0];
  }

  return "127.0.0.1";
}

// ── 2. Validación de Cabecera Host / DNS Seguro ────────────────────────
const ALLOWED_HOST_PATTERNS = [
  /^localhost(:[0-9]+)?$/,
  /^127\.0\.0\.1(:[0-9]+)?$/,
  /^192\.168\.[0-9]{1,3}\.[0-9]{1,3}(:[0-9]+)?$/,
  /^pinadasun\.com(:[0-9]+)?$/,
  /^www\.pinadasun\.com(:[0-9]+)?$/,
  /^pinada\.nas-lazenia\.synology\.me(:[0-9]+)?$/,
];

export function isHostAllowed(req: Request | NextRequest): boolean {
  const host = req.headers.get("host") || "";
  const cleanHost = host.toLowerCase().trim();
  if (!cleanHost) return false;

  return ALLOWED_HOST_PATTERNS.some((pattern) => pattern.test(cleanHost));
}

// ── 3. Rate Limiter y Bloqueo de IPs contra Fuerza Bruta ───────────────
interface IpSecurityRecord {
  failedAttempts: number;
  lastAttempt: number;
  blockedUntil: number | null;
}

const MAX_FAILED_ATTEMPTS = 5;
const BLOCK_DURATION_MS = 15 * 60 * 1000; // 15 minutos de bloqueo
const ATTEMPT_WINDOW_MS = 15 * 60 * 1000; // Ventana de 15 minutos

const DATA_DIR = path.join(process.cwd(), ".data");
const SECURITY_FILE = path.join(DATA_DIR, "security.json");

// Cache en memoria sincronizada con disco
const ipCache = new Map<string, IpSecurityRecord>();
let isLoaded = false;

function loadSecurityData() {
  if (isLoaded) return;
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (fs.existsSync(SECURITY_FILE)) {
      const raw = fs.readFileSync(SECURITY_FILE, "utf-8");
      const data: Record<string, IpSecurityRecord> = JSON.parse(raw);
      for (const [ip, rec] of Object.entries(data)) {
        // Limpiar registros antiguos
        if (rec.blockedUntil && rec.blockedUntil > Date.now()) {
          ipCache.set(ip, rec);
        } else if (Date.now() - rec.lastAttempt < ATTEMPT_WINDOW_MS) {
          ipCache.set(ip, rec);
        }
      }
    }
  } catch {}
  isLoaded = true;
}

function persistSecurityData() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    const obj: Record<string, IpSecurityRecord> = {};
    for (const [ip, rec] of ipCache.entries()) {
      obj[ip] = rec;
    }
    fs.writeFileSync(SECURITY_FILE, JSON.stringify(obj, null, 2), "utf-8");
  } catch {}
}

export function checkIpSecurity(ip: string): {
  allowed: boolean;
  blockedUntil?: number;
  minutesRemaining?: number;
} {
  loadSecurityData();
  const now = Date.now();
  const rec = ipCache.get(ip);

  if (!rec) return { allowed: true };

  // Comprobar si está bloqueada actualmente
  if (rec.blockedUntil && rec.blockedUntil > now) {
    const msLeft = rec.blockedUntil - now;
    const minutesRemaining = Math.max(1, Math.ceil(msLeft / 60000));
    return {
      allowed: false,
      blockedUntil: rec.blockedUntil,
      minutesRemaining,
    };
  }

  // Si el bloqueo expiró, limpiar
  if (rec.blockedUntil && rec.blockedUntil <= now) {
    ipCache.delete(ip);
    persistSecurityData();
    return { allowed: true };
  }

  // Si pasaron más de 15 min desde el último fallo, reiniciar contador
  if (now - rec.lastAttempt > ATTEMPT_WINDOW_MS) {
    ipCache.delete(ip);
    persistSecurityData();
    return { allowed: true };
  }

  return { allowed: true };
}

export function recordFailedLogin(ip: string): {
  blocked: boolean;
  remainingAttempts: number;
  minutesRemaining?: number;
} {
  loadSecurityData();
  const now = Date.now();
  let rec = ipCache.get(ip);

  if (!rec || now - rec.lastAttempt > ATTEMPT_WINDOW_MS) {
    rec = { failedAttempts: 1, lastAttempt: now, blockedUntil: null };
  } else {
    rec.failedAttempts += 1;
    rec.lastAttempt = now;
  }

  if (rec.failedAttempts >= MAX_FAILED_ATTEMPTS) {
    rec.blockedUntil = now + BLOCK_DURATION_MS;
    ipCache.set(ip, rec);
    persistSecurityData();
    return {
      blocked: true,
      remainingAttempts: 0,
      minutesRemaining: 15,
    };
  }

  ipCache.set(ip, rec);
  persistSecurityData();
  return {
    blocked: false,
    remainingAttempts: MAX_FAILED_ATTEMPTS - rec.failedAttempts,
  };
}

export function recordSuccessfulLogin(ip: string): void {
  loadSecurityData();
  if (ipCache.has(ip)) {
    ipCache.delete(ip);
    persistSecurityData();
  }
}
