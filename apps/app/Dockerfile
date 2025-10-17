### Secure multi-stage Dockerfile for Next.js app (app)

# Accept APP_DIR from build-args (passed by CI/CD) but normalize it
ARG APP_DIR=apps/app

# Build stage - produces standalone Next.js server
FROM node:20-alpine AS builder
ARG APP_DIR
RUN apk add --no-cache libc6-compat git
WORKDIR /app
# Copy workspace files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
# Copy app source - normalize APP_DIR by removing leading ./
COPY ${APP_DIR#./} ${APP_DIR#./}
# Copy packages (shared libs)
COPY packages packages
# Setup corepack and pnpm
RUN corepack enable && corepack prepare pnpm@10.14.0 --activate
# Install dependencies with workspace hoisting
RUN if [ -d "/.git" ] || [ -d "/app/.git" ]; then \
			NODE_ENV=development pnpm -w install --no-frozen-lockfile --shamefully-hoist; \
		else \
			NODE_ENV=development pnpm -w install --no-frozen-lockfile --shamefully-hoist --ignore-scripts; \
		fi
# Copy node_modules into app
RUN cp -a /app/node_modules /app/${APP_DIR#./}/node_modules || true
RUN mkdir -p /app/${APP_DIR#./}/public
# Install local dependencies
RUN pnpm --filter ./packages/ui... install --no-frozen-lockfile --ignore-scripts || true
RUN pnpm --filter ./${APP_DIR#./}... install --no-frozen-lockfile --ignore-scripts || true

# Build arguments and environment for build time
ARG NEXT_PUBLIC_API_URL="https://api.placeholder.com"
ARG NEXT_PUBLIC_LINKIT_DOMAIN="placeholder.com"
ARG NEXTAUTH_SECRET="default-secret"

ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL \
	NEXT_PUBLIC_LINKIT_DOMAIN=$NEXT_PUBLIC_LINKIT_DOMAIN \
	NEXTAUTH_SECRET=$NEXTAUTH_SECRET
	
# Build the Next.js app with standalone output
RUN pnpm --filter ./${APP_DIR#./}... build
# Install production dependencies
RUN NODE_ENV=production pnpm --filter ./${APP_DIR#./}... install --prod --no-frozen-lockfile --shamefully-hoist || true

# Runtime stage - small production image
FROM node:20-alpine AS runner
ARG APP_DIR=apps/app
# Create non-root user
RUN if ! getent group appgroup >/dev/null 2>&1; then addgroup appgroup; fi && \
	if ! id -u appuser >/dev/null 2>&1; then adduser -S -G appgroup appuser; fi

# Copy the entire standalone directory as-is to preserve symlink structure
# This includes all the node_modules and symlinks that next build created
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
