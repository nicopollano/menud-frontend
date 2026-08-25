# Stack Tecnológico

Todas las tecnologías y herramientas utilizadas en Menud.

---

## Framework y Runtime

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| [Next.js](https://nextjs.org/) | 15.2+ | Framework React con App Router |
| [React](https://react.dev/) | 19+ | Librería de UI |
| [TypeScript](https://www.typescriptlang.org/) | 5.7 | Type safety |
| [Node.js](https://nodejs.org/) | 20+ | Runtime de JavaScript |
| [Turbopack](https://turbo.build/pack) | — | Bundler (dev mode) |

---

## Monorepo y Paquetes

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| [Turborepo](https://turbo.build/) | 2.4+ | Monorepo build system |
| [pnpm](https://pnpm.io/) | 10.14+ | Package manager |

---

## Estilos y UI

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| [Tailwind CSS](https://tailwindcss.com/) | 4.0+ | Utility-first CSS |
| [shadcn/ui](https://ui.shadcn.com/) | — | Componentes UI copiables |
| [Lucide React](https://lucide.dev/) | — | Iconos |

---

## Estado y Datos

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| [SWR](https://swr.vercel.app/) | — | Data fetching y caching |
| [NextAuth.js](https://next-auth.js.org/) | — | Autenticación |
| [next-themes](https://github.com/pacocoursey/next-themes) | — | Tema light/dark |

---

## Notificaciones

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| [Sonner](https://sonner.emilkowal.ski/) | — | Toast notifications |

---

## Linting y Formateo

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| [Biome](https://biomejs.dev/) | 1.9+ | Linting + formatting |
| [ESLint](https://eslint.org/) | 9.2+ | Linting complementario |
| [Prettier](https://prettier.io/) | 3.5+ | Formateo de código |
| [prettier-plugin-tailwindcss](https://github.com/tailwindlabs/prettier-plugin-tailwindcss) | 0.6+ | Orden de clases Tailwind |
| [Lefthook](https://github.com/evilmartians/lefthook) | 1.11+ | Git hooks |

---

## Despliegue

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| [Docker](https://www.docker.com/) | — | Containerización |
| [GitHub Actions](https://github.com/features/actions) | — | CI/CD |
| [GitHub Container Registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry) | — | Almacenamiento de imágenes Docker |
| [Portainer](https://www.portainer.io/) | — | Gestión de contenedores |

---

## APIs y Formatos

| Tecnología | Propósito |
|------------|-----------|
| [REST API](https://restfulapi.net/) | Comunicación con backend |
| [JSON-LD](https://json-ld.org/) | Structured data para SEO |
| [OpenGraph](https://ogp.me/) | Metadata para redes sociales |
| [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat) | Formateo de precios |

---

## Google Fonts

8 tipografías disponibles para menús:

| Font | Uso |
|------|-----|
| Poppins | Moderna, sans-serif |
| Roboto | Clásica, sans-serif |
| Maven Pro | Profesional, sans-serif |
| Lato | Legible, sans-serif |
| Pompiere | Casual, handwriting |
| Silla | Decorativa, display |
| Niconne | Decorativa, display |
| Baloo Tammudu 2 | Amigable, display |

---

## Resumen del Stack

```
┌─────────────────────────────────────────────┐
│                  Frontend                    │
├─────────────────────────────────────────────┤
│  Next.js 15 + React 19 + TypeScript 5.7    │
│  Tailwind CSS 4.0 + shadcn/ui              │
│  SWR + NextAuth.js                          │
├─────────────────────────────────────────────┤
│                Herramientas                  │
├─────────────────────────────────────────────┤
│  Turborepo + pnpm                           │
│  Biome + ESLint + Prettier                  │
│  Lefthook (Git hooks)                       │
├─────────────────────────────────────────────┤
│                Despliegue                    │
├─────────────────────────────────────────────┤
│  Docker + GitHub Actions                    │
│  GHCR + Portainer                           │
└─────────────────────────────────────────────┘
```

---

**Ver también:** [Visión General](../architecture/overview.md) | [Comandos](commands.md)
