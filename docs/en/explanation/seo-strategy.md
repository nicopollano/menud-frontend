# SEO Strategy

How Menud optimizes visibility in search engines.

---

## Overview

The `menu` app is designed to be highly visible in search engines, as it is the public face of the restaurant.

---

## Dynamic Sitemap

Automatically generated from the API:

```typescript
// apps/menu/app/sitemap.ts

export default async function sitemap() {
  const branches = await getBranchSlugs()

  return branches.map(branch => ({
    url: `https://yourdomain.com/${branch.slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1.0,
  }))
}
```

**Location**: `/sitemap.xml`

---

## robots.txt

Defines what bots can crawl:

```typescript
// apps/menu/app/robots.ts

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/'],
      },
    ],
    sitemap: 'https://yourdomain.com/sitemap.xml',
  }
}
```

---

## Dynamic Metadata per Page

Each branch page generates personalized metadata:

```typescript
// apps/menu/app/(app)/[id]/layout.tsx

export async function generateMetadata({ params }) {
  const branch = await getBranchById(params.id)

  return {
    title: `${branch.name} | Digital Menu`,
    description: `Digital menu for ${branch.name}. Explore our dishes and prices.`,
    openGraph: {
      title: `${branch.name} | Digital Menu`,
      description: `Digital menu for ${branch.name}`,
      images: [branch.coverImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${branch.name} | Digital Menu`,
      images: [branch.coverImage],
    },
  }
}
```

---

## OpenGraph

For social media sharing:

| Property | Value |
|----------|-------|
| `og:title` | `{Restaurant Name} | Digital Menu` |
| `og:description` | Restaurant description |
| `og:image` | Restaurant cover image |
| `og:url` | Page URL |
| `og:type` | `website` |
| `twitter:card` | `summary_large_image` |

---

## JSON-LD (Structured Data)

Structured data for Google:

```typescript
// apps/menu/modules/layout/structured-data/structured-data.tsx

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: branch.name,
  image: branch.coverImage,
  url: `https://yourdomain.com/${branch.slug}`,
  servesCuisine: 'Various',
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    addressLocality: branch.city,
    addressCountry: branch.country,
  },
}
```

### Structured Data Types

| Type | Usage |
|------|-------|
| `Restaurant` | Restaurant information |
| `Menu` | Menu structure |
| `MenuItem` | Each dish/product |
| `Offer` | Prices and discounts |

---

## PWA (Progressive Web App)

The menu app works as a PWA:

```html
<!-- apps/menu/app/(app)/[id]/layout.tsx -->
<link rel="manifest" href="/manifest.webmanifest" />
```

### manifest.webmanifest

```json
{
  "name": "Digital Menu",
  "short_name": "Menu",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#000000",
  "icons": [...]
}
```

---

## Google Search Console

Optional support for verification:

```env
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=abc123xyz
```

---

## Implemented Best Practices

| Practice | Status |
|----------|--------|
| XML Sitemap | ✅ Dynamic |
| robots.txt | ✅ Configured |
| OpenGraph | ✅ Per page |
| Twitter Cards | ✅ Per page |
| JSON-LD | ✅ Restaurant + Menu |
| Canonical URLs | ✅ Automatic |
| Mobile-first | ✅ Responsive |
| Fast loading | ✅ ISR + CDN |
| PWA | ✅ Manifest |

---

**See also:** [Design System](design-system.md) | [Menu App](../architecture/apps/menu.md)
