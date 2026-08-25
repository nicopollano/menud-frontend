# Data Flow

How information flows from the backend API to React components in Menud.

---

## General Diagram

```
┌─────────┐    ┌──────────┐    ┌──────────┐    ┌───────────┐    ┌────────────┐
│ Backend  │───→│ Adapter  │───→│ Service  │───→│ Provider  │───→│ Component  │
│   API    │    │ Function │    │ Function │    │ (Context) │    │   React    │
└─────────┘    └──────────┘    └──────────┘    └───────────┘    └────────────┘
```

---

## Step 1: Backend API

The backend exposes a REST API with endpoints like:

```
GET /v1/public/branches/:id
```

Raw JSON response:

```json
{
  "id": "abc123",
  "name": "My Restaurant",
  "slug": "my-restaurant",
  "business_id": "xyz789",
  "cover_image_url": "https://...",
  "logo_url": "https://...",
  "created_at": "2024-01-01T00:00:00Z"
}
```

---

## Step 2: Adapter Function

Adapters transform the API response to the format expected by the frontend:

```typescript
// packages/shared/src/lib/adapters/branch.adapter.ts

export const branchAdapter = (data: any): Branch => ({
  id: data.id,
  name: data.name,
  slug: data.slug,
  businessId: data.business_id,        // snake_case → camelCase
  coverImage: data.cover_image_url,    // Rename field
  logo: data.logo_url,
  createdAt: new Date(data.created_at), // String → Date
})
```

### Benefits of the Adapter Pattern

1. **Decoupling**: Components don't depend on the exact API format
2. **Renaming**: Fields are renamed to camelCase (JS convention)
3. **Transformation**: Strings → Dates, null → defaults, etc.
4. **Testing**: Easy to test with mock data
5. **Migration**: If the API changes, only modify the adapter

---

## Step 3: Service Function

Services encapsulate data fetching logic:

```typescript
// apps/menu/modules/branches/services/branches.service.ts

export async function getBranchById(id: string): Promise<Branch> {
  const response = await fetch(API_V1.BRANCH_BY_ID(id), {
    next: { revalidate: NEXT_PUBLIC_API_REVALIDATE }
  })

  const data = await response.json()
  return branchAdapter(data)  // ← Applies the adapter
}
```

### ISR in Server Components

```typescript
// apps/menu/app/(app)/[id]/page.tsx

export async function generateStaticParams() {
  const slugs = await getBranchSlugs()
  return slugs.map((slug) => ({ id: slug }))
}

export default async function BranchPage({ params }) {
  const branch = await getBranchById(params.id)
  // branch is already adapted and typed as Branch
}
```

---

## Step 4: Provider (Context)

Providers distribute state to components:

```typescript
// apps/menu/modules/branches/providers/branch.provider.tsx

export function BranchProvider({ children, branch, categories }) {
  const [search, setSearch] = useState('')
  const [categoryId, setCategoryId] = useState<string | null>(null)

  // Filtered categories
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

## Step 5: React Component

Components consume the context:

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

## Favorites Flow

Favorites use localStorage directly:

```
User taps ❤️
    │
    ▼
FavoriteProductsProvider.toggle(productId)
    │
    ▼
localStorage.setItem(`favorites-${branchId}`, JSON.stringify(ids))
    │
    ▼
State updated → Components re-render
```

---

## Authentication Flow (Dashboard)

```
User enters credentials
    │
    ▼
NextAuth.js → POST /auth/login
    │
    ▼
Token saved in HttpOnly cookie
    │
    ▼
SessionProvider provides session to all routes
    │
    ▼
API calls include Authorization header automatically
```

---

## Summary

| Layer | Technology | Responsibility |
|-------|-----------|----------------|
| Backend | REST API | Data and business logic |
| Adapter | Pure function | Transform data format |
| Service | Async function | Fetch data (fetch + revalidation) |
| Provider | React Context | State and UI logic |
| Component | React | Visual rendering |

---

**See also:** [Design System](design-system.md) | [Shared Package](../architecture/packages/shared.md)
