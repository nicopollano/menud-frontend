### Secure multi-stage Dockerfile for Next.js app (linkit)

# Accept APP_DIR from build-args (passed by CI/CD) but normalize it
ARG APP_DIR=apps/linkit

FROM node:20-alpine AS builder
ARG APP_DIR
RUN apk add --no-cache libc6-compat git
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY ${APP_DIR#./} ${APP_DIR#./}
COPY ./packages ./packages
RUN corepack enable && corepack prepare pnpm@10.14.0 --activate
RUN if [ -d "/.git" ] || [ -d "/app/.git" ]; then \
      NODE_ENV=development pnpm -w install --no-frozen-lockfile --shamefully-hoist; \
    else \
      NODE_ENV=development pnpm -w install --no-frozen-lockfile --shamefully-hoist --ignore-scripts; \
    fi

RUN cp -a /app/node_modules /app/${APP_DIR#./}/node_modules || true
RUN mkdir -p /app/${APP_DIR#./}/public
RUN pnpm --filter ./packages/ui... install --no-frozen-lockfile --ignore-scripts || true
RUN pnpm --filter ./${APP_DIR#./}... install --no-frozen-lockfile --ignore-scripts || true

ARG NEXT_PUBLIC_API_URL="https://api.placeholder.com"
ARG NEXT_PUBLIC_APP_DOMAIN="placeholder.com"
ARG NEXT_PUBLIC_API_REVALIDATE="60"
ARG NEXTAUTH_SECRET="default-secret"

# Expose NEXTAUTH_SECRET to builder only so build-time validation passes
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL \
  NEXT_PUBLIC_APP_DOMAIN=$NEXT_PUBLIC_APP_DOMAIN \
  NEXT_PUBLIC_API_REVALIDATE=$NEXT_PUBLIC_API_REVALIDATE \
  NEXTAUTH_SECRET=$NEXTAUTH_SECRET

RUN pnpm --filter ./${APP_DIR#./}... build

FROM node:20-alpine AS runner
ARG APP_DIR=apps/linkit
# Create non-root user
RUN if ! getent group appgroup >/dev/null 2>&1; then addgroup appgroup; fi && \
  if ! id -u appuser >/dev/null 2>&1; then adduser -S -G appgroup appuser; fi

# Copy the entire standalone directory as-is to preserve symlink structure
COPY --from=builder /app/${APP_DIR#./}/.next/standalone /app
# Copy static assets separately (standalone doesn't include these)
COPY --from=builder /app/${APP_DIR#./}/.next/static /app/${APP_DIR#./}/.next/static
# Copy public assets (standalone doesn't include these)
COPY --from=builder /app/${APP_DIR#./}/public /app/${APP_DIR#./}/public

# Set working directory to the app
WORKDIR /app/${APP_DIR#./}
ENV NODE_ENV=production
EXPOSE 3000
USER appuser
CMD ["node", "--enable-source-maps", "server.js"]
