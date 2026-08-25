# Installation

Complete guide to install and set up Menud on your local machine.

---

## Prerequisites

Before you begin, make sure you have the following installed:

| Software | Minimum Version | Verification Command |
|----------|----------------|---------------------|
| **Node.js** | 20.0+ | `node --version` |
| **pnpm** | 10.14+ | `pnpm --version` |
| **Git** | 2.40+ | `git --version` |

### Installing pnpm

If you don't have pnpm installed:

```bash
# Enable corepack (included in Node.js 20+)
corepack enable

# Install pnpm 10.14
corepack prepare pnpm@10.14.0 --activate
```

---

## Clone the Repository

```bash
# Clone the repository
git clone https://github.com/nicopollano/menud-frontend.git

# Enter the directory
cd menud-frontend
```

---

## Install Dependencies

```bash
# Install all monorepo dependencies
pnpm install
```

This will install dependencies for:
- All apps (`apps/menu`, `apps/app`, `apps/admin`, `apps/linkit`, `apps/web`)
- All shared packages (`packages/shared`, `packages/ui`, etc.)

---

## Configure Environment Variables

```bash
# Copy the example file
cp .env.example .env.local
```

Edit `.env.local` with your values. Minimum required variables:

```env
NEXT_PUBLIC_API_URL=https://your-api.com
NEXTAUTH_SECRET=your-secret-here
```

See the [complete environment reference](../reference/environment-setup.md) for all options.

---

## Verify the Installation

```bash
# Run the menu app (quickest to start)
pnpm dev:menu
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Troubleshooting

### Error: "Module not found"
```bash
# Clear cache and reinstall
rm -rf node_modules .turbo
pnpm install
```

### Error: "pnpm: command not found"
```bash
corepack enable
corepack prepare pnpm@10.14.0 --activate
```

### Error: "Port already in use"
```bash
# Check which process is using the port
lsof -i :3000

# Kill the process
kill -9 <PID>
```

---

**Next:** [Quick Start →](quick-start.md)
