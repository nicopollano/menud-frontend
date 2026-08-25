# Commands Reference

All available commands in the Menud project.

---

## Main Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Run all apps in development mode |
| `pnpm build` | Build all apps for production |
| `pnpm lint` | Check lint across the monorepo |
| `pnpm lint:fix` | Fix lint issues automatically |
| `pnpm format` | Format code with Prettier |
| `pnpm prepare` | Install Git hooks (Lefthook) |

---

## Individual Development

### Menu App (Customers)

```bash
pnpm dev:menu      # Run in development
pnpm build:menu    # Build for production
```

### App Dashboard (Restaurant)

```bash
pnpm dev:app       # Run in development
pnpm build:app     # Build for production
```

### Admin Panel

```bash
pnpm dev:admin     # Run in development
pnpm build:admin   # Build for production
```

### LinkIt

```bash
pnpm dev:linkit    # Run in development
pnpm build:linkit  # Build for production
```

### Web (Marketing)

```bash
pnpm dev:web       # Run in development
pnpm build:web     # Build for production
```

---

## Turborepo Commands

```bash
# Run a task on a specific package
pnpm turbo run dev --filter=menu

# Build only dependencies
pnpm turbo build --filter=./...

# Clean Turborepo cache
pnpm turbo clean
```

---

## Biome Commands

```bash
# Check all files
npx @biomejs/biome check .

# Auto-fix
npx @biomejs/biome check --write .

# Format only
npx @biomejs/biome format --write .

# Lint only
npx @biomejs/biome lint .

# Check a specific file
npx @biomejs/biome check apps/menu/app/page.tsx
```

---

## pnpm Commands

```bash
# Install dependencies
pnpm install

# Add a dependency
pnpm add [package]

# Add dev dependency
pnpm add -D [package]

# Add to a specific package
pnpm --filter @ristokit/shared add [package]

# Update dependencies
pnpm update

# Find unused dependencies
pnpm depcheck
```

---

## Docker Commands

```bash
# Build an app
docker build --build-arg APP_DIR=./apps/menu -t menud-menu .

# Run container
docker run -p 3000:3000 menud-menu

# View logs
docker logs -f [container-id]

# Stop container
docker stop [container-id]
```

---

## Git Commands

```bash
# Create feature branch
git checkout -b feature/feature-name

# Create fix branch
git checkout -b fix/fix-name

# Push with tracking
git push -u origin feature/feature-name
```

---

## Utilities

```bash
# Generate NextAuth secret
openssl rand -base64 32

# Check Node version
node --version

# Check pnpm version
pnpm --version

# Check processes on a port
lsof -i :3000
```

---

**See also:** [Environment Variables](environment-variables.md) | [Code Quality](../guides/code-quality.md)
