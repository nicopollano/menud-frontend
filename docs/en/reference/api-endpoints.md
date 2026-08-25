# API Endpoints

Reference of backend endpoints consumed by Menud.

---

## Base URL

All requests use the URL configured in `NEXT_PUBLIC_API_URL`.

```
{NEXT_PUBLIC_API_URL}/v1/public/...
```

---

## Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/v1/public/auth/login` | Sign in |
| `POST` | `/v1/public/auth/register` | Register user |

---

## Profile

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/v1/public/profile` | Get user profile |
| `PUT` | `/v1/public/profile` | Update profile |

---

## Businesses

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/v1/public/businesses` | List user businesses |
| `GET` | `/v1/public/businesses/:id` | Get business by ID |
| `POST` | `/v1/public/businesses` | Create business |
| `PUT` | `/v1/public/businesses/:id` | Update business |
| `DELETE` | `/v1/public/businesses/:id` | Delete business |

---

## Branches

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/v1/public/branches` | List branches |
| `GET` | `/v1/public/branches/:id` | Get branch by ID |
| `GET` | `/v1/public/branches/slugs` | Get all slugs (for ISR) |
| `POST` | `/v1/public/branches` | Create branch |
| `PUT` | `/v1/public/branches/:id` | Update branch |
| `DELETE` | `/v1/public/branches/:id` | Delete branch |

---

## Menus

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/v1/public/menus` | List menus |
| `GET` | `/v1/public/menus/:id` | Get menu by ID |
| `POST` | `/v1/public/menus` | Create menu |
| `PUT` | `/v1/public/menus/:id` | Update menu |
| `DELETE` | `/v1/public/menus/:id` | Delete menu |

---

## Color Palettes

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/v1/public/palettes` | List palettes |
| `GET` | `/v1/public/palettes/:id` | Get palette by ID |
| `POST` | `/v1/public/palettes` | Create palette |
| `PUT` | `/v1/public/palettes/:id` | Update palette |

---

## Categories

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/v1/public/categories` | List categories |
| `GET` | `/v1/public/categories/:id` | Get category by ID |
| `POST` | `/v1/public/categories` | Create category |
| `PUT` | `/v1/public/categories/:id` | Update category |
| `DELETE` | `/v1/public/categories/:id` | Delete category |

---

## Subcategories

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/v1/public/subcategories` | List subcategories |
| `GET` | `/v1/public/subcategories/:id` | Get subcategory by ID |
| `POST` | `/v1/public/subcategories` | Create subcategory |
| `PUT` | `/v1/public/subcategories/:id` | Update subcategory |
| `DELETE` | `/v1/public/subcategories/:id` | Delete subcategory |

---

## Products

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/v1/public/products` | List products |
| `GET` | `/v1/public/products/:id` | Get product by ID |
| `POST` | `/v1/public/products` | Create product |
| `PUT` | `/v1/public/products/:id` | Update product |
| `DELETE` | `/v1/public/products/:id` | Delete product |

---

## Members (Team)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/v1/public/members` | List members |
| `POST` | `/v1/public/members` | Add member |
| `PUT` | `/v1/public/members/:id` | Update role |
| `DELETE` | `/v1/public/members/:id` | Remove member |

---

## Promotions

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/v1/public/promotions` | List promotions |
| `GET` | `/v1/public/promotions/:id` | Get promotion by ID |
| `POST` | `/v1/public/promotions` | Create promotion |
| `PUT` | `/v1/public/promotions/:id` | Update promotion |
| `DELETE` | `/v1/public/promotions/:id` | Delete promotion |

---

## Schedules

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/v1/public/schedules` | List schedules |
| `POST` | `/v1/public/schedules` | Create schedule |
| `PUT` | `/v1/public/schedules/:id` | Update schedule |
| `DELETE` | `/v1/public/schedules/:id` | Delete schedule |

---

## LinkIt

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/v1/public/linkits` | List linkits |
| `GET` | `/v1/public/linkits/:id` | Get linkit by ID |
| `POST` | `/v1/public/linkits` | Create linkit |
| `PUT` | `/v1/public/linkits/:id` | Update linkit |

---

## Request Headers

All requests include:

```typescript
{
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${session.accessToken}`
}
```

---

**See also:** [Shared Package](../architecture/packages/shared.md) | [Environment Variables](environment-variables.md)
