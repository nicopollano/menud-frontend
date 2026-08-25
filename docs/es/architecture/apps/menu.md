# Menu App — Menú Digital para Clientes

La app principal de Menud. Es la aplicación **pública** que los clientes ven al escanear el código QR del restaurante.

---

## Propósito

- Mostrar el menú del restaurante de forma visual y atractiva
- Permitir a los clientes buscar, filtrar y guardar favoritos
- Funcionar como PWA con soporte offline básico
- Estar optimizada para SEO (sitemap dinámico, OpenGraph, JSON-LD)

---

## Stack de la App

| Capa | Tecnología |
|------|------------|
| Framework | Next.js 15 (App Router + Turbopack) |
| Estilos | Tailwind CSS 4.0 |
| Estado | React Context + SWR |
| Datos | ISR (Incremental Static Regeneration) |
| SEO | Dynamic metadata, sitemap.ts, robots.ts |

---

## Estructura

```
apps/menu/
├── app/
│   ├── (app)/
│   │   └── [id]/            # Ruta dinámica por ID de sucursal
│   │       ├── layout.tsx   # Layout con providers anidados
│   │       ├── page.tsx     # Página principal del menú
│   │       └── provider.tsx # Combina todos los providers
│   ├── layout.tsx           # Root layout
│   ├── sitemap.ts           # Sitemap dinámico
│   └── robots.ts            # Robots.txt
└── modules/
    ├── branches/            # Lógica de sucursales
    │   ├── providers/       # BranchProvider (estado central)
    │   ├── services/        # getBranchById(), getBranchSlugs()
    │   └── models/          # Tipos de Branch
    ├── layout/              # Componentes de layout
    │   ├── header/          # Header con logo, nombre, gradientes
    │   ├── skip-link/       # Accesibilidad
    │   └── structured-data/ # JSON-LD para SEO
    ├── products/            # Sistema de productos
    │   ├── components/
    │   │   ├── card/        # PreviewProductCard, FavoriteProductCard
    │   │   ├── drawer/      # ProductDetailDrawer, FavoritesDrawer
    │   │   ├── search/      # ProductSearch, ProductFilterBar
    │   │   ├── carousel/    # CategoriesCarousel
    │   │   ├── section/     # ProductsSection
    │   │   └── list/        # ProductsList
    │   ├── providers/       # FavoriteProductsProvider
    │   └── models/          # Tipos de Product
    └── shared/              # Componentes compartidos
        ├── components/      # MenuDrawer, ReadingModeDrawer, SelectLanguageDrawer
        └── providers/       # ToastProvider
```

---

## Providers (Estado Global)

La app usa un sistema de providers anidados:

```
ThemeProvider
  └── ToastProvider
        └── BranchProvider
              └── FavoriteProductsProvider
```

### BranchProvider

- **Estado**: datos de la sucursal, categorías, filtros activos
- **Filtros**: búsqueda, categoría, subcategoría, rango de precios
- **Cómputo**: categorías filtradas se recalculan automáticamente

### FavoriteProductsProvider

- **Persistencia**: `localStorage` por sucursal
- **Funciones**: toggle, check, obtener todos, calcular precio total

---

## ISR (Incremental Static Regeneration)

Las páginas se generan estáticamente en build y se revalidan periódicamente:

- **Build time**: `generateStaticParams()` pre-carga todos los slugs de sucursales
- **Revalidación**: Configurable vía `NEXT_PUBLIC_API_REVALIDATE`
- **Fallback**: `blocking` — las páginas nuevas se generan bajo demanda

---

## SEO

- **Sitemap dinámico**: Generado desde los slugs de sucursales via API
- **robots.txt**: Permite crawlers, bloquea `/api/`, `/_next/`, `/admin/`
- **OpenGraph**: Metadata dinámica por sucursal (título, descripción, imagen)
- **JSON-LD**: Structured data para restaurantes y menús
- **PWA**: Soporte via `manifest.webmanifest`

---

## Accesibilidad

- Skip navigation link (`SkipLink`)
- `prefers-reduced-motion` — desactiva animaciones
- Focus-visible outlines personalizados
- Tap targets mínimos de 44x44px en mobile
- ARIA labels en product cards
- Jerarquía de encabezados semántica

---

**Ver también:** [App Dashboard](app.md) | [Overview](../overview.md)
