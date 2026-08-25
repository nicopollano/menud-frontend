# Paquete Shared — Lógica Compartida

El paquete `@ristokit/shared` contiene la lógica de negocio compartida entre todas las apps del monorepo.

---

## Propósito

- Modelos de datos TypeScript reutilizables
- Funciones adaptadoras para transformar respuestas de la API
- Configuración centralizada de endpoints
- Helpers de formato (precios, fechas, etc.)

---

## Estructura

```
packages/shared/src/
├── lib/
│   ├── api/
│   │   ├── api.config.ts    # Mapa completo de endpoints REST
│   │   └── index.ts
│   ├── adapters/             # Funciones adaptadoras
│   │   ├── branch.adapter.ts
│   │   ├── category.adapter.ts
│   │   ├── product.adapter.ts
│   │   └── ...
│   └── helpers/
│       ├── format.helper.ts  # formatPrice() con Intl.NumberFormat
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

## Configuración de API

El archivo `api.config.ts` define un mapa completo de endpoints:

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
  // (ver api.config.ts para la lista completa)
}
```

---

## Modelos Principales

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

| Enum | Valores |
|------|---------|
| `Role` | ADMIN, USER |
| `UserRole` | owner, manager, waiter, cashier |
| `Currency` | USD, ARS |
| `Day` | 1-7 (lunes-domingo) |
| `Typography` | 8 opciones (Poppins, Roboto, Maven Pro, Lato, Pompiere, Salsa, Niconne, Baloo Tammudu 2) |
| `Locale` | 10 opciones (es, en, pt, fr, de, it, ja, zh, ko, ar) |

---

## Patrón Adaptador

Los datos de la API se transforman antes de llegar a los componentes:

```
API Response → Adapter Function → Component State
```

Ejemplo:

```typescript
// branch.adapter.ts
export const branchAdapter = (data: any): Branch => ({
  id: data.id,
  name: data.name,
  slug: data.slug,
  // ... transformación de campos
})
```

Esto permite:
- Desacoplar la API del frontend
- Renombrar campos sin romper componentes
- Manejar valores por defecto
- Facilitar testing

---

## Helpers

### formatPrice()

Formatea precios usando `Intl.NumberFormat`:

```typescript
formatPrice(1200, 'USD', 'en')  // "$1,200.00"
formatPrice(1200, 'ARS', 'es')  // "$1.200,00"
```

---

**Ver también:** [Flujo de Datos](../../explanation/data-flow.md) | [API Endpoints](../../reference/api-endpoints.md)
