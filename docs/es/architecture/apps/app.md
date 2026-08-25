# App Dashboard — Panel del Restaurante

La aplicación autenticada donde los dueños y gerentes gestionan su restaurante, sucursales, menús y productos.

---

## Propósito

- Gestionar información del negocio y sucursales
- Crear y administrar menús, categorías, subcategorías y productos
- Configurar horarios, paletas de colores y tipografías
- Administrar miembros del equipo con diferentes roles
- Gestionar promociones y ofertas

---

## Stack de la App

| Capa | Tecnología |
|------|------------|
| Framework | Next.js 15 (App Router) |
| Autenticación | NextAuth.js (SessionProvider) |
| Tema | next-themes (light/dark) |
| Notificaciones | Sonner (Toaster) |
| Estado | React Context |

---

## Estructura

```
apps/app/
├── app/
│   └── (authenticated)/     # Rutas protegidas
│       ├── layout.tsx       # Layout con SessionProvider
│       └── [workspace]/     # Dashboard por workspace
└── modules/                 # 17 módulos
    ├── auth/                # NextAuth session management
    ├── branches/            # CRUD de sucursales
    ├── businesses/          # CRUD de negocios
    ├── categories/          # Gestión de categorías
    ├── linkit/              # Gestión de LinkIt
    ├── members/             # Gestión de equipo
    ├── menus/               # CRUD de menús
    ├── palettes/            # Paletas de colores (3 colores)
    ├── plans/               # Planes de suscripción
    ├── products/            # CRUD de productos
    ├── profile/             # Perfil de usuario
    ├── promotions/          # Gestión de promociones
    ├── schedules/           # Horarios de sucursales
    ├── subcategories/       # Gestión de subcategorías
    ├── users/               # Gestión de usuarios
    ├── layout/              # Componentes de layout
    └── shared/              # Componentes, hooks, lib, rutas compartidas
```

---

## Módulos Principales

### Gestión de Negocio

| Módulo | Descripción |
|--------|-------------|
| `businesses` | Crear, editar, eliminar negocios |
| `branches` | Gestionar sucursales por negocio |
| `schedules` | Configurar horarios de apertura/cierre por día |
| `members` | Agregar miembros del equipo con roles |

### Gestión de Menú

| Módulo | Descripción |
|--------|-------------|
| `menus` | Crear y personalizar menús |
| `categories` | Organizar productos en categorías |
| `subcategories` | Subcategorías dentro de categorías |
| `products` | CRUD de productos con precios, imágenes, descuentos |

### Personalización

| Módulo | Descripción |
|--------|-------------|
| `palettes` | Sistema de 3 colores (color1, color2, color3) |
| `linkit` | Configurar página de link-in-bio |
| `promotions` | Crear ofertas y promociones |

---

## Roles de Usuario

| Rol | Permisos |
|-----|----------|
| `owner` | Control total del negocio |
| `manager` | Gestión de sucursales y contenido |
| `waiter` | Solo visualización del menú |
| `cashier` | Acceso a información de precios |

---

## Autenticación

- **NextAuth.js**: Manejo de sesión con providers configurables
- **SessionProvider**: Envuelve todas las rutas autenticadas
- **Middleware**: Protege rutas `/dashboard/*`

---

**Ver también:** [Menu App](menu.md) | [Overview](../overview.md)
