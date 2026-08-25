# Tech Stack

All technologies and tools used in Menud.

---

## Framework and Runtime

| Technology | Version | Purpose |
|------------|---------|---------|
| [Next.js](https://nextjs.org/) | 15.2+ | React framework with App Router |
| [React](https://react.dev/) | 19+ | UI library |
| [TypeScript](https://www.typescriptlang.org/) | 5.7 | Type safety |
| [Node.js](https://nodejs.org/) | 20+ | JavaScript runtime |
| [Turbopack](https://turbo.build/pack) | — | Bundler (dev mode) |

---

## Monorepo and Packages

| Technology | Version | Purpose |
|------------|---------|---------|
| [Turborepo](https://turbo.build/) | 2.4+ | Monorepo build system |
| [pnpm](https://pnpm.io/) | 10.14+ | Package manager |

---

## Styles and UI

| Technology | Version | Purpose |
|------------|---------|---------|
| [Tailwind CSS](https://tailwindcss.com/) | 4.0+ | Utility-first CSS |
| [shadcn/ui](https://ui.shadcn.com/) | — | Copy-paste UI components |
| [Lucide React](https://lucide.dev/) | — | Icons |

---

## State and Data

| Technology | Version | Purpose |
|------------|---------|---------|
| [SWR](https://swr.vercel.app/) | — | Data fetching and caching |
| [NextAuth.js](https://next-auth.js.org/) | — | Authentication |
| [next-themes](https://github.com/pacocoursey/next-themes) | — | Light/dark theme |

---

## Notifications

| Technology | Version | Purpose |
|------------|---------|---------|
| [Sonner](https://sonner.emilkowal.ski/) | — | Toast notifications |

---

## Linting and Formatting

| Technology | Version | Purpose |
|------------|---------|---------|
| [Biome](https://biomejs.dev/) | 1.9+ | Linting + formatting |
| [ESLint](https://eslint.org/) | 9.2+ | Complementary linting |
| [Prettier](https://prettier.io/) | 3.5+ | Code formatting |
| [prettier-plugin-tailwindcss](https://github.com/tailwindlabs/prettier-plugin-tailwindcss) | 0.6+ | Tailwind class sorting |
| [Lefthook](https://github.com/evilmartians/lefthook) | 1.11+ | Git hooks |

---

## Deployment

| Technology | Version | Purpose |
|------------|---------|---------|
| [Docker](https://www.docker.com/) | — | Containerization |
| [GitHub Actions](https://github.com/features/actions) | — | CI/CD |
| [GitHub Container Registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry) | — | Docker image storage |
| [Portainer](https://www.portainer.io/) | — | Container management |

---

## APIs and Formats

| Technology | Purpose |
|------------|---------|
| [REST API](https://restfulapi.net/) | Backend communication |
| [JSON-LD](https://json-ld.org/) | Structured data for SEO |
| [OpenGraph](https://ogp.me/) | Social media metadata |
| [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat) | Price formatting |

---

## Google Fonts

8 typography options for menus:

| Font | Style |
|------|-------|
| Poppins | Modern, sans-serif |
| Roboto | Classic, sans-serif |
| Maven Pro | Professional, sans-serif |
| Lato | Readable, sans-serif |
| Pompiere | Casual, handwriting |
| Silla | Decorative, display |
| Niconne | Decorative, display |
| Baloo Tammudu 2 | Friendly, display |

---

## Stack Summary

```
┌─────────────────────────────────────────────┐
│                  Frontend                    │
├─────────────────────────────────────────────┤
│  Next.js 15 + React 19 + TypeScript 5.7    │
│  Tailwind CSS 4.0 + shadcn/ui              │
│  SWR + NextAuth.js                          │
├─────────────────────────────────────────────┤
│                Tools                        │
├─────────────────────────────────────────────┤
│  Turborepo + pnpm                           │
│  Biome + ESLint + Prettier                  │
│  Lefthook (Git hooks)                       │
├─────────────────────────────────────────────┤
│                Deployment                   │
├─────────────────────────────────────────────┤
│  Docker + GitHub Actions                    │
│  GHCR + Portainer                           │
└─────────────────────────────────────────────┘
```

---

**See also:** [Architecture Overview](../architecture/overview.md) | [Commands](commands.md)
