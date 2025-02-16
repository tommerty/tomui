FROM node:20-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json pnpm-lock.yaml registry.json ./
COPY registry/ ./registry/
RUN echo "Starting dependency installation" && \
    set -x && \
    time (npm install -g pnpm && \
    pnpm i --frozen-lockfile && \
    pnpm shadcn build && \
    echo "Dependency installation complete")

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN echo "Starting build process" && \
    set -x && \
    time (npm install -g pnpm && \
    NEXT_TELEMETRY_DISABLED=1 pnpm run build && \
    echo "Build process complete")

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
