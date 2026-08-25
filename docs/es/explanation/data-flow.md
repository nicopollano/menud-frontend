# Flujo de Datos

Cómo fluye la información desde la API backend hasta los componentes React en Menud.

---

## Diagrama General

```
┌─────────┐    ┌──────────┐    ┌──────────┐    ┌───────────┐    ┌────────────┐
│ Backend  │───→│ Adapter  │───→│ Service  │───→│ Provider  │───→│ Componente │
│   API    │    │ Function │    │ Function │    │ (Context) │    │   React    │
└─────────┘    └──────────┘    └──────────┘    └───────────┘    └────────────┘
```

---

## Paso 1: Backend API

El backend expone una API REST con endpoints como:

```
GET /v1/public/branches/:id
```

Respuesta JSON cruda:

```json
{
  "id": "abc123",
  "name": "Mi Restaurante",
  "slug": "mi-restaurante",
  "business_id": "xyz789",
  "cover_image_url": "https://...",
  "logo_url": "https://...",
  "created_at": "2024-01-01T00:00:00Z"
}
```

---

## Paso 2: Adapter Function

Los adaptadores transforman la respuesta de la API al formato que espera el frontend:

```typescript
// packages/shared/src/lib/adapters/branch.adapter.ts

export const branchAdapter = (data: any): Branch => ({
  id: data.id,
  name: data.name,
  slug: data.slug,
  businessId: data.business_id,        // snake_case → camelCase
  coverImage: data.cover_image_url,    // Renombrar campo
  logo: data.logo_url,
  createdAt: new Date(data.created_at), // String → Date
})
```

### Beneficios del Patrón Adaptador

1. **Desacoplamiento**: Los componentes no dependen del formato exacto de la API
2. **Renombrado**: Los campos se renombran a camelCase (convención JS)
3. **Transformación**: Strings → Dates, null → defaults, etc.
4. **Testing**: Fácil de testear con datos mock
5. **Migración**: Si la API cambia, solo se modifica el adaptador

---

## Paso 3: Service Function

Los servicios encapsulan la lógica de obtención de datos:

```typescript
// apps/menu/modules/branches/services/branches.service.ts

export async function getBranchById(id: string): Promise<Branch> {
  const response = await fetch(API_V1.BRANCH_BY_ID(id), {
    next: { revalidate: NEXT_PUBLIC_API_REVALIDATE }
  })

  const data = await response.json()
  return branchAdapter(data)  // ← Aplica el adaptador
}
```

### ISR en Server Components

```typescript
// apps/menu/app/(app)/[id]/page.tsx

export async function generateStaticParams() {
  const slugs = await getBranchSlugs()
  return slugs.map((slug) => ({ id: slug }))
}

export default async function BranchPage({ params }) {
  const branch = await getBranchById(params.id)
  // branch ya está adaptado y tipado como Branch
}
```

---

## Paso 4: Provider (Context)

Los providers distribuyen el estado a los componentes:

```typescript
// apps/menu/modules/branches/providers/branch.provider.tsx

export function BranchProvider({ children, branch, categories }) {
  const [search, setSearch] = useState('')
  const [categoryId, setCategoryId] = useState<string | null>(null)

  // Categorías filtradas
  const filteredCategories = useMemo(() => {
    return categories.filter(cat => {
      const matchesSearch = cat.name.includes(search)
      const matchesCategory = !categoryId || cat.id === categoryId
      return matchesSearch && matchesCategory
    })
  }, [categories, search, categoryId])

  return (
    <BranchContext.Provider value={{
      branch,
      categories: filteredCategories,
      search,
      setSearch,
      // ...
    }}>
      {children}
    </BranchContext.Provider>
  )
}
```

---

## Paso 5: Componente React

Los componentes consumen el contexto:

```typescript
// apps/menu/modules/products/components/section/products-section.tsx

export function ProductsSection() {
  const { categories } = useContext(BranchContext)

  return (
    <div>
      {categories.map(category => (
        <CategorySection key={category.id} category={category} />
      ))}
    </div>
  )
}
```

---

## Flujo de Favoritos

Los favoritos usan localStorage directamente:

```
Usuario toca ❤️
    │
    ▼
FavoriteProductsProvider.toggle(productId)
    │
    ▼
localStorage.setItem(`favorites-${branchId}`, JSON.stringify(ids))
    │
    ▼
Estado actualizado → Componentes se re-renderizan
```

---

## Flujo de Autenticación (Dashboard)

```
Usuario ingresa credenciales
    │
    ▼
NextAuth.js → POST /auth/login
    │
    ▼
Token guardado en cookie HttpOnly
    │
    ▼
SessionProvider provee sesión a todas las rutas
    │
    ▼
API calls incluyen Authorization header automáticamente
```

---

## Resumen

| Capa | Tecnología | Responsabilidad |
|------|-----------|-----------------|
| Backend | REST API | Datos y lógica de negocio |
| Adapter | Función pura | Transformar formato de datos |
| Service | Async function | Obtener datos (fetch + revalidación) |
| Provider | React Context | Estado y lógica de UI |
| Componente | React | Renderizado visual |

---

**Ver también:** [Sistema de Diseño](design-system.md) | [Paquete Shared](../architecture/packages/shared.md)
