import { cookies } from "next/headers";
import fs from "fs";
import path from "path";
import crypto from "crypto";

const COOKIE_NAME = "pinada_admin_session";

// ── 1. Lista de Correos Autorizados (desde variable de entorno con fallback seguro) ──
export function getAuthorizedRecoveryEmails(): string[] {
  const envEmails = process.env.AUTHORIZED_RECOVERY_EMAILS || "raqtal@hotmail.com,playalazenia@gmail.com";
  return envEmails
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export function isEmailAuthorized(email: string): boolean {
  const normalized = email.trim().toLowerCase();
  return getAuthorizedRecoveryEmails().includes(normalized);
}

// ── 2. Almacenamiento Seguro de Autenticación ────────────────────────
const DATA_DIR = path.join(process.cwd(), ".data");
const AUTH_STORE_FILE = path.join(DATA_DIR, "auth-store.json");

interface AuthStore {
  customPasswordHash?: string; // Formato: "salt:hash"
  usedResetTokens?: string[];
}

function getAuthStore(): AuthStore {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (fs.existsSync(AUTH_STORE_FILE)) {
      const content = fs.readFileSync(AUTH_STORE_FILE, "utf-8");
      return JSON.parse(content);
    }
  } catch {}
  return { usedResetTokens: [] };
}

function saveAuthStore(store: AuthStore) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(AUTH_STORE_FILE, JSON.stringify(store, null, 2), "utf-8");
  } catch {}
}

// ── 3. Clave Secreta y Criptografía Segura ────────────────────────────
function getSecretKey(): string {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      console.warn("⚠️ ADVERTENCIA: AUTH_SECRET no está configurada en .env. Se recomienda configurarla.");
    }
    return "pinada-sun-production-strong-auth-secret-key-2026";
  }
  return secret;
}

// Comparación en tiempo constante para mitigar Timing Attacks
function constantTimeCompare(a: string, b: string): boolean {
  try {
    const bufA = Buffer.from(a, "utf-8");
    const bufB = Buffer.from(b, "utf-8");
    if (bufA.length !== bufB.length) return false;
    return crypto.timingSafeEqual(bufA, bufB);
  } catch {
    return false;
  }
}

// Hashing seguro de contraseñas con Salt (PBKDF2-HMAC-SHA256)
function hashPassword(password: string, saltHex?: string): string {
  const salt = saltHex ? Buffer.from(saltHex, "hex") : crypto.randomBytes(16);
  const derivedKey = crypto.pbkdf2Sync(password, salt, 100000, 32, "sha256");
  return `${salt.toString("hex")}:${derivedKey.toString("hex")}`;
}

function verifyPassword(password: string, storedHash: string): boolean {
  if (!storedHash.includes(":")) {
    // Compatibilidad en caso de migración
    return constantTimeCompare(password, storedHash);
  }
  const [saltHex] = storedHash.split(":");
  const computedHash = hashPassword(password, saltHex);
  return constantTimeCompare(computedHash, storedHash);
}

// Firma HMAC-SHA256 para tokens de sesión y recuperación
function signMessageSync(message: string, secret: string): string {
  return crypto.createHmac("sha256", secret).update(message).digest("hex");
}

export async function createSessionToken(username: string): Promise<string> {
  const timestamp = Date.now();
  const payload = `${username}:${timestamp}`;
  const sig = signMessageSync(payload, getSecretKey());
  return `${Buffer.from(payload).toString("base64url")}.${sig}`;
}

export async function verifySessionToken(token: string): Promise<boolean> {
  try {
    const [b64Payload, sig] = token.split(".");
    if (!b64Payload || !sig) return false;
    const payload = Buffer.from(b64Payload, "base64url").toString("utf-8");
    const [username, tsStr] = payload.split(":");
    const ts = Number(tsStr);
    if (!username || isNaN(ts)) return false;

    // Caducidad de sesión: 7 días
    if (Date.now() - ts > 7 * 24 * 60 * 60 * 1000) return false;

    const expectedSig = signMessageSync(payload, getSecretKey());
    return constantTimeCompare(sig, expectedSig);
  } catch {
    return false;
  }
}

export function validateCredentials(u: string, p: string): boolean {
  const adminUser = process.env.ADMIN_USER ?? "admin@example.com";
  const defaultPass = process.env.ADMIN_PASSWORD ?? "admin";
  const store = getAuthStore();

  const userMatches = constantTimeCompare(u.trim().toLowerCase(), adminUser.trim().toLowerCase());
  if (!userMatches) return false;

  if (store.customPasswordHash) {
    return verifyPassword(p, store.customPasswordHash);
  }
  return constantTimeCompare(p, defaultPass);
}

export function updateAdminPassword(newPassword: string): void {
  const store = getAuthStore();
  store.customPasswordHash = hashPassword(newPassword);
  saveAuthStore(store);
}

// ── 4. Recuperación Segura de Contraseña ──────────────────────────────
export async function createPasswordResetToken(email: string): Promise<string> {
  const nonce = crypto.randomBytes(16).toString("hex");
  const expiresAt = Date.now() + 30 * 60 * 1000; // 30 minutos
  const payload = `${email.toLowerCase()}:${expiresAt}:${nonce}`;
  const sig = signMessageSync(payload, getSecretKey());
  return `${Buffer.from(payload).toString("base64url")}.${sig}`;
}

export async function verifyPasswordResetToken(token: string): Promise<{
  valid: boolean;
  email?: string;
  error?: string;
}> {
  try {
    const [b64Payload, sig] = token.split(".");
    if (!b64Payload || !sig) return { valid: false, error: "Token inválido." };

    const payload = Buffer.from(b64Payload, "base64url").toString("utf-8");
    const [email, expStr, nonce] = payload.split(":");
    const exp = Number(expStr);

    if (!email || isNaN(exp) || !nonce) {
      return { valid: false, error: "Token con formato inválido." };
    }

    if (!isEmailAuthorized(email)) {
      return { valid: false, error: "Correo no autorizado." };
    }

    if (Date.now() > exp) {
      return { valid: false, error: "El enlace de recuperación ha caducado (30 min)." };
    }

    const expectedSig = signMessageSync(payload, getSecretKey());
    if (!constantTimeCompare(sig, expectedSig)) {
      return { valid: false, error: "Firma de seguridad inválida." };
    }

    const store = getAuthStore();
    if (store.usedResetTokens?.includes(token)) {
      return { valid: false, error: "Este enlace de recuperación ya ha sido utilizado." };
    }

    return { valid: true, email };
  } catch {
    return { valid: false, error: "Error al validar el enlace." };
  }
}

export function markResetTokenAsUsed(token: string): void {
  const store = getAuthStore();
  if (!store.usedResetTokens) store.usedResetTokens = [];
  store.usedResetTokens.push(token);
  if (store.usedResetTokens.length > 100) {
    store.usedResetTokens = store.usedResetTokens.slice(-100);
  }
  saveAuthStore(store);
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return verifySessionToken(token);
}

export { COOKIE_NAME };
