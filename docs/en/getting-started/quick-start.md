# Quick Start

From zero to running app in 5 minutes.

---

## 1. Quick Installation

```bash
git clone https://github.com/nicopollano/menud-frontend.git
cd menud-frontend
pnpm install
```

---

## 2. Set Up Environment

```bash
cp .env.example .env.local
```

Edit `.env.local` with at least:

```env
NEXT_PUBLIC_API_URL=https://your-api.com
NEXTAUTH_SECRET=your-secret-here
```

---

## 3. Run an App

You can run any individual app:

```bash
# Customer-facing menu app (public)
pnpm dev:menu

# Restaurant dashboard (authenticated)
pnpm dev:app

# Admin panel
pnpm dev:admin

# Link-in-bio
pnpm dev:linkit

# Marketing website
pnpm dev:web
```

Or run all apps simultaneously:

```bash
pnpm dev
```

---

## 4. View in Browser

| App | Default URL |
|-----|-------------|
| Menu | [http://localhost:3000](http://localhost:3000) |
| App | [http://localhost:3001](http://localhost:3001) |
| Admin | [http://localhost:3002](http://localhost:3002) |
| LinkIt | [http://localhost:3003](http://localhost:3003) |
| Web | [http://localhost:3004](http://localhost:3004) |

---

## 5. Explore the Code

Main project structure:

```
menud-frontend/
├── apps/menu/                 # Start here for the customer app
│   ├── app/                   # Router pages (App Router)
│   └── modules/               # Feature modules
│       ├── branches/          # Branch logic
│       ├── layout/            # Header, structured data
│       ├── products/          # Cards, drawers, filters
│       └── shared/            # Shared components
├── packages/shared/           # Models and helpers
│   ├── src/lib/               # API config, adapters
│   └── src/models/            # TypeScript models
└── packages/ui/               # UI components (shadcn/ui)
```

---

## Useful Commands

```bash
# Format all code
pnpm format

# Check lint
pnpm lint

# Production build
pnpm build
```

---

**Next:** [Environment Setup →](environment-setup.md)
