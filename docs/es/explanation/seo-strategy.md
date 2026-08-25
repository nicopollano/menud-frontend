# Estrategia SEO

Cómo Menud optimiza la visibilidad en motores de búsqueda.

---

## Visión General

La app `menu` está diseñada para ser altamente visible en buscadores, ya que es la cara pública del restaurante.

---

## Sitemap Dinámico

Generado automáticamente desde la API:

```typescript
// apps/menu/app/sitemap.ts

export default async function sitemap() {
  const branches = await getBranchSlugs()

  return branches.map(branch => ({
    url: `https://tudominio.com/${branch.slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1.0,
  }))
}
```

**Ubicación**: `/sitemap.xml`

---

## robots.txt

Define qué pueden rastrear los bots:

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
    sitemap: 'https://tudominio.com/sitemap.xml',
  }
}
```

---

## Metadata Dinámica por Página

Cada página de sucursal genera metadata personalizada:

```typescript
// apps/menu/app/(app)/[id]/layout.tsx

export async function generateMetadata({ params }) {
  const branch = await getBranchById(params.id)

  return {
    title: `${branch.name} | Menú Digital`,
    description: `Menú digital de ${branch.name}. Explora nuestros platos y precios.`,
    openGraph: {
      title: `${branch.name} | Menú Digital`,
      description: `Menú digital de ${branch.name}`,
      images: [branch.coverImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${branch.name} | Menú Digital`,
      images: [branch.coverImage],
    },
  }
}
```

---

## OpenGraph

Para compartir en redes sociales:

| Propiedad | Valor |
|-----------|-------|
| `og:title` | `{Nombre Restaurante} | Menú Digital` |
| `og:description` | Descripción del restaurante |
| `og:image` | Imagen de portada del restaurante |
| `og:url` | URL de la página |
| `og:type` | `website` |
| `twitter:card` | `summary_large_image` |

---

## JSON-LD (Structured Data)

Datos estructurados para Google:

```typescript
// apps/menu/modules/layout/structured-data/structured-data.tsx

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: branch.name,
  image: branch.coverImage,
  url: `https://tudominio.com/${branch.slug}`,
  servesCuisine: 'Various',
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    addressLocality: branch.city,
    addressCountry: branch.country,
  },
}
```

### Tipos de Structured Data

| Tipo | Uso |
|------|-----|
| `Restaurant` | Información del restaurante |
| `Menu` | Estructura del menú |
| `MenuItem` | Cada plato/producto |
| `Offer` | Precios y descuentos |

---

## PWA (Progressive Web App)

La app menu funciona como PWA:

```html
<!-- apps/menu/app/(app)/[id]/layout.tsx -->
<link rel="manifest" href="/manifest.webmanifest" />
```

### manifest.webmanifest

```json
{
  "name": "Menú Digital",
  "short_name": "Menú",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#000000",
  "icons": [...]
}
```

---

## Google Search Console

Soporte opcional para verificación:

```env
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=abc123xyz
```

---

## Mejores Prácticas Implementadas

| Práctica | Estado |
|----------|--------|
| Sitemap XML | ✅ Dinámico |
| robots.txt | ✅ Configurado |
| OpenGraph | ✅ Por página |
| Twitter Cards | ✅ Por página |
| JSON-LD | ✅ Restaurant + Menu |
| Canonical URLs | ✅ Automático |
| Mobile-first | ✅ Responsive |
| Fast loading | ✅ ISR + CDN |
| PWA | ✅ Manifest |

---

**Ver también:** [Sistema de Diseño](design-system.md) | [Menu App](../architecture/apps/menu.md)
