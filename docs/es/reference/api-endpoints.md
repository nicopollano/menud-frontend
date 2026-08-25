# Endpoints API

Referencia de los endpoints del backend consumidos por Menud.

---

## URL Base

Todas las peticiones usan la URL configurada en `NEXT_PUBLIC_API_URL`.

```
{NEXT_PUBLIC_API_URL}/v1/public/...
```

---

## Autenticación

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `POST` | `/v1/public/auth/login` | Iniciar sesión |
| `POST` | `/v1/public/auth/register` | Registrar usuario |

---

## Perfil

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/v1/public/profile` | Obtener perfil del usuario |
| `PUT` | `/v1/public/profile` | Actualizar perfil |

---

## Negocios (Businesses)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/v1/public/businesses` | Listar negocios del usuario |
| `GET` | `/v1/public/businesses/:id` | Obtener negocio por ID |
| `POST` | `/v1/public/businesses` | Crear negocio |
| `PUT` | `/v1/public/businesses/:id` | Actualizar negocio |
| `DELETE` | `/v1/public/businesses/:id` | Eliminar negocio |

---

## Sucursales (Branches)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/v1/public/branches` | Listar sucursales |
| `GET` | `/v1/public/branches/:id` | Obtener sucursal por ID |
| `GET` | `/v1/public/branches/slugs` | Obtener todos los slugs (para ISR) |
| `POST` | `/v1/public/branches` | Crear sucursal |
| `PUT` | `/v1/public/branches/:id` | Actualizar sucursal |
| `DELETE` | `/v1/public/branches/:id` | Eliminar sucursal |

---

## Menús

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/v1/public/menus` | Listar menús |
| `GET` | `/v1/public/menus/:id` | Obtener menú por ID |
| `POST` | `/v1/public/menus` | Crear menú |
| `PUT` | `/v1/public/menus/:id` | Actualizar menú |
| `DELETE` | `/v1/public/menus/:id` | Eliminar menú |

---

## Paletas de Colores

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/v1/public/palettes` | Listar paletas |
| `GET` | `/v1/public/palettes/:id` | Obtener paleta por ID |
| `POST` | `/v1/public/palettes` | Crear paleta |
| `PUT` | `/v1/public/palettes/:id` | Actualizar paleta |

---

## Categorías

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/v1/public/categories` | Listar categorías |
| `GET` | `/v1/public/categories/:id` | Obtener categoría por ID |
| `POST` | `/v1/public/categories` | Crear categoría |
| `PUT` | `/v1/public/categories/:id` | Actualizar categoría |
| `DELETE` | `/v1/public/categories/:id` | Eliminar categoría |

---

## Subcategorías

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/v1/public/subcategories` | Listar subcategorías |
| `GET` | `/v1/public/subcategories/:id` | Obtener subcategoría por ID |
| `POST` | `/v1/public/subcategories` | Crear subcategoría |
| `PUT` | `/v1/public/subcategories/:id` | Actualizar subcategoría |
| `DELETE` | `/v1/public/subcategories/:id` | Eliminar subcategoría |

---

## Productos

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/v1/public/products` | Listar productos |
| `GET` | `/v1/public/products/:id` | Obtener producto por ID |
| `POST` | `/v1/public/products` | Crear producto |
| `PUT` | `/v1/public/products/:id` | Actualizar producto |
| `DELETE` | `/v1/public/products/:id` | Eliminar producto |

---

## Miembros (Team)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/v1/public/members` | Listar miembros |
| `POST` | `/v1/public/members` | Agregar miembro |
| `PUT` | `/v1/public/members/:id` | Actualizar rol |
| `DELETE` | `/v1/public/members/:id` | Eliminar miembro |

---

## Promociones

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/v1/public/promotions` | Listar promociones |
| `GET` | `/v1/public/promotions/:id` | Obtener promoción por ID |
| `POST` | `/v1/public/promotions` | Crear promoción |
| `PUT` | `/v1/public/promotions/:id` | Actualizar promoción |
| `DELETE` | `/v1/public/promotions/:id` | Eliminar promoción |

---

## Horarios

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/v1/public/schedules` | Listar horarios |
| `POST` | `/v1/public/schedules` | Crear horario |
| `PUT` | `/v1/public/schedules/:id` | Actualizar horario |
| `DELETE` | `/v1/public/schedules/:id` | Eliminar horario |

---

## LinkIt

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/v1/public/linkits` | Listar linkits |
| `GET` | `/v1/public/linkits/:id` | Obtener linkit por ID |
| `POST` | `/v1/public/linkits` | Crear linkit |
| `PUT` | `/v1/public/linkits/:id` | Actualizar linkit |

---

## Configuración de Headers

Todas las peticiones incluyen:

```typescript
{
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${session.accessToken}`
}
```

---

**Ver también:** [Paquete Shared](../architecture/packages/shared.md) | [Variables de Entorno](environment-variables.md)
