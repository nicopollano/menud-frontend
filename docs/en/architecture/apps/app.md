# App Dashboard — Restaurant Panel

The authenticated application where restaurant owners and managers manage their restaurant, branches, menus, and products.

---

## Purpose

- Manage business and branch information
- Create and manage menus, categories, subcategories, and products
- Configure schedules, color palettes, and typography
- Manage team members with different roles
- Manage promotions and offers

---

## App Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 15 (App Router) |
| Authentication | NextAuth.js (SessionProvider) |
| Theme | next-themes (light/dark) |
| Notifications | Sonner (Toaster) |
| State | React Context |

---

## Structure

```
apps/app/
├── app/
│   └── (authenticated)/     # Protected routes
│       ├── layout.tsx       # Layout with SessionProvider
│       └── [workspace]/     # Dashboard per workspace
└── modules/                 # 17 modules
    ├── auth/                # NextAuth session management
    ├── branches/            # Branch CRUD
    ├── businesses/          # Business CRUD
    ├── categories/          # Category management
    ├── linkit/              # LinkIt management
    ├── members/             # Team management
    ├── menus/               # Menu CRUD
    ├── palettes/            # Color palettes (3 colors)
    ├── plans/               # Subscription plans
    ├── products/            # Product CRUD
    ├── profile/             # User profile
    ├── promotions/          # Promotional offers
    ├── schedules/           # Branch schedules
    ├── subcategories/       # Subcategory management
    ├── users/               # User management
    ├── layout/              # Layout components
    └── shared/              # Shared components, hooks, lib, routes
```

---

## Main Modules

### Business Management

| Module | Description |
|--------|-------------|
| `businesses` | Create, edit, delete businesses |
| `branches` | Manage branches per business |
| `schedules` | Configure opening/closing hours per day |
| `members` | Add team members with roles |

### Menu Management

| Module | Description |
|--------|-------------|
| `menus` | Create and customize menus |
| `categories` | Organize products into categories |
| `subcategories` | Subcategories within categories |
| `products` | Product CRUD with prices, images, discounts |

### Customization

| Module | Description |
|--------|-------------|
| `palettes` | 3-color system (color1, color2, color3) |
| `linkit` | Configure link-in-bio page |
| `promotions` | Create offers and promotions |

---

## User Roles

| Role | Permissions |
|------|-------------|
| `owner` | Full business control |
| `manager` | Branch and content management |
| `waiter` | Menu viewing only |
| `cashier` | Price information access |

---

## Authentication

- **NextAuth.js**: Session handling with configurable providers
- **SessionProvider**: Wraps all authenticated routes
- **Middleware**: Protects `/dashboard/*` routes

---

**See also:** [Menu App](menu.md) | [Overview](../overview.md)
