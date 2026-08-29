# ==========================================
# 1. Base Stage: Node LTS Alpine
# ==========================================
FROM node:22-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app

# ==========================================
# 2. Dependencies Stage: Instalar dependencias
# ==========================================
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

# ==========================================
# 3. Builder Stage: Compilar Next.js Standalone
# ==========================================
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Desactivar telemetría de Next.js durante el build
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN npm run build

# ==========================================
# 4. Runner Stage: Imagen mínima de producción
# ==========================================
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Crear usuario y grupo sin privilegios por seguridad
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Instalar sharp para optimización de imágenes nativa y eficiente en Alpine
RUN npm install --no-package-lock --no-save sharp

# Copiar archivos públicos y estáticos compilados con los permisos del usuario
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Crear directorios de caché y datos, asegurando permisos para el usuario no root
RUN mkdir -p .next .data && chown -R nextjs:nodejs /app && chmod -R 755 /app

# Copiar el bundle standalone y los assets estáticos de Next.js
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
