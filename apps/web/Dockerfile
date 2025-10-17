### Secure multi-stage Dockerfile for Next.js app (web)

# Accept APP_DIR from build-args (passed by CI/CD) but normalize it
ARG APP_DIR=apps/web

FROM node:20-alpine AS builder
ARG APP_DIR
RUN apk add --no-cache libc6-compat git
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY ${APP_DIR#./} ${APP_DIR#./}
RUN mkdir -p /app/${APP_DIR#./}/public
COPY ./packages ./packages
RUN corepack enable && corepack prepare pnpm@10.14.0 --activate

# Install workspace dependencies hoisted to node_modules so shared deps are available to Next during build.
# Skip lifecycle scripts in container builds to avoid git-related hooks (lefthook).
# Install workspace deps including devDependencies required for build-time (tailwindcss, postcss, etc.)
RUN if [ -d "/.git" ] || [ -d "/app/.git" ]; then \
      NODE_ENV=development pnpm -w install --no-frozen-lockfile --shamefully-hoist; \
    else \
      NODE_ENV=development pnpm -w install --no-frozen-lockfile --shamefully-hoist --ignore-scripts; \
    fi

RUN cp -a /app/node_modules /app/${APP_DIR#./}/node_modules || true

# Ensure package-local symlinks are set up but skip lifecycle scripts to avoid prepare failures
RUN pnpm --filter ./${APP_DIR#./}... install --no-frozen-lockfile --ignore-scripts || true
 
# Ensure packages/ui has its local dependencies available (some packages expect deps in their own node_modules)
RUN pnpm --filter ./packages/ui... install --no-frozen-lockfile --ignore-scripts || true
ARG NEXTAUTH_SECRET="default-secret"

# Expose NEXTAUTH_SECRET during build only so next build validation passes
ENV NEXTAUTH_SECRET=$NEXTAUTH_SECRET

RUN pnpm --filter ./${APP_DIR#./}... build

FROM node:20-alpine AS runner
ARG APP_DIR=apps/web
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
