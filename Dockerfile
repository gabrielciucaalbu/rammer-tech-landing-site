# syntax=docker/dockerfile:1
# rammertech.ro pe Hetzner: Next.js (output: standalone) într-o imagine minimă, în spatele Caddy-ului comun (/opt/edge).
# NEXT_PUBLIC_SITE_URL se „coace" la build (variabile NEXT_PUBLIC_*), iar INDEXNOW_KEY e folosit de scripts/ensure-indexnow-key.js
# pentru a scrie public/<cheie>.txt; ambele sunt publice prin natura lor. Secretele (RESEND_API_KEY, CRON_SECRET) intră doar la rulare.
FROM node:24-alpine AS base
# pnpm fixat la versiunea din lockfile-ul repo-ului (v10): pnpm 11+ tratează scripturile de build ignorate ca eroare.
RUN corepack enable && corepack prepare pnpm@10.29.2 --activate
WORKDIR /app

FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm-store,target=/root/.local/share/pnpm/store pnpm install --frozen-lockfile

FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ARG NEXT_PUBLIC_SITE_URL
ARG INDEXNOW_KEY
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    INDEXNOW_KEY=$INDEXNOW_KEY \
    NEXT_TELEMETRY_DISABLED=1
RUN pnpm build

FROM node:24-alpine AS runtime
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0
WORKDIR /app
RUN addgroup -S app && adduser -S app -G app
COPY --from=build --chown=app:app /app/.next/standalone ./
COPY --from=build --chown=app:app /app/.next/static ./.next/static
COPY --from=build --chown=app:app /app/public ./public
# Cache-ul de imagini optimizate (next/image) stă într-un volum (vezi deploy/hetzner/docker-compose.yml), ca să supraviețuiască deploy-urilor.
RUN mkdir -p /app/.next/cache && chown -R app:app /app/.next/cache
USER app
EXPOSE 3000
HEALTHCHECK --interval=15s --timeout=4s --start-period=10s --retries=5 \
  CMD wget -q -O /dev/null http://127.0.0.1:3000/ro || exit 1
CMD ["node", "server.js"]
