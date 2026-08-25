# Shared Package — Shared Logic

The `@ristokit/shared` package contains shared business logic used across all monorepo apps.

---

## Purpose

- Reusable TypeScript data models
- Adapter functions to transform API responses
- Centralized endpoint configuration
- Format helpers (prices, dates, etc.)

---

## Structure

```
packages/shared/src/
├── lib/
│   ├── api/
│   │   ├── api.config.ts    # Complete REST endpoint map
│   │   └── index.ts
│   ├── adapters/             # Adapter functions
│   │   ├── branch.adapter.ts
│   │   ├── category.adapter.ts
│   │   ├── product.adapter.ts
│   │   └── ...
│   └── helpers/
│       ├── format.helper.ts  # formatPrice() with Intl.NumberFormat
│       └── general.helper.ts
└── models/
    ├── branch.model.ts       # Branch, BranchSlugs, BranchResponse
    ├── business.model.ts     # Business, BusinessResponse
    ├── category.model.ts     # Category, CategoryResponse
    ├── general.model.ts      # Enums: Role, Currency, Locale, Day, etc.
    ├── member.model.ts       # BranchMember, MemberRole
    ├── menu.model.ts         # Menu, MenuPalette, MenusSummary
    ├── plan.model.ts         # SubscriptionPlan
    ├── product.model.ts      # Product, PreviewProduct, ProductResponse
    ├── profile.model.ts      # UserProfile
    ├── promotion.model.ts    # Promotion
    ├── subcategory.model.ts  # Subcategory
    ├── linkit.model.ts       # LinkIt data
    └── user.model.ts         # User
```

---

## API Configuration

The `api.config.ts` file defines a complete endpoint map:

```typescript
export const API_V1 = {
  // Auth
  AUTH_LOGIN: `${API_URL}/v1/public/auth/login`,
  AUTH_REGISTER: `${API_URL}/v1/public/auth/register`,

  // Profile
  PROFILE: `${API_URL}/v1/public/profile`,

  // Businesses
  BUSINESSES: `${API_URL}/v1/public/businesses`,
  BUSINESS_BY_ID: (id: string) => `${API_URL}/v1/public/businesses/${id}`,

  // Branches
  BRANCHES: `${API_URL}/v1/public/branches`,
  BRANCH_BY_ID: (id: string) => `${API_URL}/v1/public/branches/${id}`,

  // Menus, Categories, Products...
  // (see api.config.ts for the full list)
}
```

---

## Key Models

### Branch

- `id`, `name`, `slug`, `businessId`
- `logo`, `coverImage`
- `address`, `phone`

### Product

- `id`, `name`, `description`
- `price`, `discountedPrice`
- `images[]`
- `sell_count`
- `categoryId`, `subcategoryId`

### Menu

- `id`, `name`, `branchId`
- `MenuPalette`: `color1`, `color2`, `color3`

### General Enums

| Enum | Values |
|------|--------|
| `Role` | ADMIN, USER |
| `UserRole` | owner, manager, waiter, cashier |
| `Currency` | USD, ARS |
| `Day` | 1-7 (Monday-Sunday) |
| `Typography` | 8 options (Poppins, Roboto, Maven Pro, Lato, Pompiere, Salsa, Niconne, Baloo Tammudu 2) |
| `Locale` | 10 options (es, en, pt, fr, de, it, ja, zh, ko, ar) |

---

## Adapter Pattern

API data is transformed before reaching components:

```
API Response → Adapter Function → Component State
```

Example:

```typescript
// branch.adapter.ts
export const branchAdapter = (data: any): Branch => ({
  id: data.id,
  name: data.name,
  slug: data.slug,
  // ... field transformation
})
```

This allows:
- Decoupling the API from the frontend
- Renaming fields without breaking components
- Handling default values
- Easier testing

---

## Helpers

### formatPrice()

Formats prices using `Intl.NumberFormat`:

```typescript
formatPrice(1200, 'USD', 'en')  // "$1,200.00"
formatPrice(1200, 'ARS', 'es')  // "$1.200,00"
```

---

**See also:** [Data Flow](../../explanation/data-flow.md) | [API Endpoints](../../reference/api-endpoints.md)
