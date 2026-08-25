# 🍽️ Menud — Digital Restaurant Menu Platform

> [English](docs/en/README.md) | [Español](docs/es/README.md)

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?logo=tailwindcss)
![Turborepo](https://img.shields.io/badge/Turborepo-2.4-ef4444?logo=turborepo)
![pnpm](https://img.shields.io/badge/pnpm-10.14-f69220?logo=pnpm)

A complete digital menu platform for restaurants, built as a monorepo with Next.js 15. Menud enables restaurants to create beautiful, interactive digital menus that customers can access via QR codes.

---

## ✨ Features

- 📱 **Responsive Design** — Optimized for mobile, tablet, and desktop
- 🎨 **Custom Branding** — 3-color palette system and 8 typography options per restaurant
- ❤️ **Favorites** — Customers can save and track their favorite dishes
- 🔍 **Smart Search** — Filter by category, subcategory, and price range
- 🌍 **Multi-language** — Locale support for 10+ languages
- 📊 **SEO Optimized** — Dynamic sitemaps, OpenGraph, JSON-LD structured data
- ⚡ **ISR Rendering** — Incremental Static Regeneration for optimal performance
- 🔐 **Authentication** — Secure dashboard with role-based access (owner, manager, waiter, cashier)
- 📦 **Link-in-Bio** — Dedicated landing page for each business
- 🐳 **Docker Ready** — Containerized deployment with GitHub Actions CI/CD

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/nicopollano/menud-frontend.git
cd menud-frontend

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local

# Run the customer-facing menu app
pnpm dev:menu
```

Open [http://localhost:3000](http://localhost:3000) to see the menu app.

---

## 📂 Project Structure

```
menud-frontend/
├── apps/
│   ├── menu/          # Customer-facing digital menu (public)
│   ├── app/           # Restaurant dashboard (authenticated)
│   ├── admin/         # Platform admin panel
│   ├── linkit/        # Link-in-bio landing pages
│   └── web/           # Marketing website
├── packages/
│   ├── shared/        # Shared models, adapters, API config
│   ├── ui/            # Reusable UI components (shadcn/ui)
│   ├── eslint-config/ # Shared ESLint configuration
│   └── typescript-config/ # Shared TypeScript config
├── docs/
│   ├── en/            # English documentation
│   └── es/            # Spanish documentation
└── scripts/           # Utility scripts
```

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| Framework | [Next.js 15](https://nextjs.org/) (App Router + Turbopack) |
| Language | [TypeScript 5.7](https://www.typescriptlang.org/) |
| Styling | [Tailwind CSS 4.0](https://tailwindcss.com/) |
| Monorepo | [Turborepo 2.4](https://turbo.build/) |
| Package Manager | [pnpm 10.14](https://pnpm.io/) |
| Components | [shadcn/ui](https://ui.shadcn.com/) |
| Auth | [NextAuth.js](https://next-auth.js.org/) |
| Data Fetching | [SWR](https://swr.vercel.app/) |
| Linting | [Biome](https://biomejs.dev/) + [ESLint](https://eslint.org/) |
| Git Hooks | [Lefthook](https://github.com/evilmartians/lefthook) |
| Containerization | [Docker](https://www.docker.com/) |
| CI/CD | [GitHub Actions](https://github.com/features/actions) |

---

## 📦 Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Run all apps in development mode |
| `pnpm dev:menu` | Run the menu app only |
| `pnpm dev:app` | Run the dashboard app only |
| `pnpm dev:admin` | Run the admin panel only |
| `pnpm dev:linkit` | Run the linkit app only |
| `pnpm build` | Build all apps for production |
| `pnpm lint` | Run linting across the monorepo |
| `pnpm format` | Format code with Prettier |

See the [Commands Reference](docs/en/reference/commands.md) for the full list.

---

## 📖 Documentation

- **[Getting Started](docs/en/getting-started/installation.md)** — Installation and setup guide
- **[Architecture](docs/en/architecture/overview.md)** — Monorepo structure and design decisions
- **[Deployment](docs/en/guides/deployment.md)** — Docker, CI/CD, and Portainer setup
- **[Environment Variables](docs/en/reference/environment-variables.md)** — Complete reference
- **[Roadmap](docs/en/roadmap.md)** — Planned features and improvements

---

## 🤝 Contributing

Contributions are welcome! Please read the [Contributing Guide](docs/en/guides/contributing.md) before submitting a PR.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 👨‍💻 Author

**Nicolas Pollano** — [@nicopollano](https://github.com/nicopollano)

---

## 📄 License

This project is proprietary software. All rights reserved.
