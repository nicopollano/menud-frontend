# Menu App — Customer-Facing Digital Menu

The main app of Menud. This is the **public** application that customers see when they scan a restaurant's QR code.

---

## Purpose

- Display the restaurant's menu visually and attractively
- Allow customers to search, filter, and save favorites
- Work as a PWA with basic offline support
- Be SEO-optimized (dynamic sitemap, OpenGraph, JSON-LD)

---

## App Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 15 (App Router + Turbopack) |
| Styles | Tailwind CSS 4.0 |
| State | React Context + SWR |
| Data | ISR (Incremental Static Regeneration) |
| SEO | Dynamic metadata, sitemap.ts, robots.ts |

---

## Structure

```
apps/menu/
├── app/
│   ├── (app)/
│   │   └── [id]/            # Dynamic route by branch ID
│   │       ├── layout.tsx   # Layout with nested providers
│   │       ├── page.tsx     # Main menu page
│   │       └── provider.tsx # Combines all providers
│   ├── layout.tsx           # Root layout
│   ├── sitemap.ts           # Dynamic sitemap
│   └── robots.ts            # Robots.txt
└── modules/
    ├── branches/            # Branch logic
    │   ├── providers/       # BranchProvider (central state)
    │   ├── services/        # getBranchById(), getBranchSlugs()
    │   └── models/          # Branch types
    ├── layout/              # Layout components
    │   ├── header/          # Header with logo, name, gradients
    │   ├── skip-link/       # Accessibility
    │   └── structured-data/ # JSON-LD for SEO
    ├── products/            # Product system
    │   ├── components/
    │   │   ├── card/        # PreviewProductCard, FavoriteProductCard
    │   │   ├── drawer/      # ProductDetailDrawer, FavoritesDrawer
    │   │   ├── search/      # ProductSearch, ProductFilterBar
    │   │   ├── carousel/    # CategoriesCarousel
    │   │   ├── section/     # ProductsSection
    │   │   └── list/        # ProductsList
    │   ├── providers/       # FavoriteProductsProvider
    │   └── models/          # Product types
    └── shared/              # Shared components
        ├── components/      # MenuDrawer, ReadingModeDrawer, SelectLanguageDrawer
        └── providers/       # ToastProvider
```

---

## Providers (Global State)

The app uses a nested provider system:

```
ThemeProvider
  └── ToastProvider
        └── BranchProvider
              └── FavoriteProductsProvider
```

### BranchProvider

- **State**: branch data, categories, active filters
- **Filters**: search, category, subcategory, price range
- **Computation**: filtered categories are automatically recalculated

### FavoriteProductsProvider

- **Persistence**: `localStorage` per branch
- **Functions**: toggle, check, get all, calculate total price

---

## ISR (Incremental Static Regeneration)

Pages are statically generated at build and periodically revalidated:

- **Build time**: `generateStaticParams()` pre-loads all branch slugs
- **Revalidation**: Configurable via `NEXT_PUBLIC_API_REVALIDATE`
- **Fallback**: `blocking` — new pages are generated on demand

---

## SEO

- **Dynamic sitemap**: Generated from branch slugs via API
- **robots.txt**: Allows crawlers, blocks `/api/`, `/_next/`, `/admin/`
- **OpenGraph**: Dynamic metadata per branch (title, description, image)
- **JSON-LD**: Structured data for restaurants and menus
- **PWA**: Support via `manifest.webmanifest`

---

## Accessibility

- Skip navigation link (`SkipLink`)
- `prefers-reduced-motion` — disables animations
- Custom focus-visible outlines
- Minimum 44x44px tap targets on mobile
- ARIA labels on product cards
- Semantic heading hierarchy

---

**See also:** [App Dashboard](app.md) | [Overview](../overview.md)
