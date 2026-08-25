# LinkIt — Páginas de Link-in-Bio

Aplicación que genera páginas estilo "link in bio" para cada negocio, similar a Linktree.

---

## Propósito

- Proporcionar una página pública con todos los enlaces del negocio
- Mostrar logo, descripción y redes sociales
- Servir como punto de acceso central para clientes

---

## Estructura

```
apps/linkit/
├── app/
│   └── [id]/                # Ruta dinámica por ID de negocio
│       └── page.tsx         # Página del link-in-bio
└── modules/
    ├── businesses/
    │   └── services/        # Fetch de datos del negocio
    └── linkit/
        └── services/        # Fetch de datos del linkit
```

---

## Componentes

| Componente | Descripción |
|------------|-------------|
| `LinkitPage` | Página principal con logo, heading, descripción |
| Social Links | Botones para: Sitio web, WhatsApp, Instagram, Facebook, Twitter/X, LinkedIn, TikTok, Ubicación |
| Background | Círculos decorativos con gradientes |

---

## Generación Estática

- `generateStaticParams()` pre-renderiza páginas para todos los negocios en build time
- Esto permite que las páginas se sirvan desde CDN sin llamadas al servidor

---

## Redes Sociales Soportadas

- 🌐 Sitio web
- 💬 WhatsApp
- 📸 Instagram
- 👥 Facebook
- 🐦 Twitter/X
- 💼 LinkedIn
- 🎵 TikTok
- 📍 Ubicación (Google Maps)

---

**Ver también:** [Menu App](menu.md) | [Overview](../overview.md)
