# Inicio Rápido

De cero a la app corriendo en 5 minutos.

---

## 1. Instalación Rápida

```bash
git clone https://github.com/nicopollano/menud-frontend.git
cd menud-frontend
pnpm install
```

---

## 2. Configurar Entorno

```bash
cp .env.example .env.local
```

Edita `.env.local` con al menos:

```env
NEXT_PUBLIC_API_URL=https://tu-api.com
NEXTAUTH_SECRET=tu-secreto-aqui
```

---

## 3. Ejecutar una App

Puedes ejecutar cualquier app individualmente:

```bash
# App de menú para clientes (pública)
pnpm dev:menu

# Dashboard del restaurante (autenticado)
pnpm dev:app

# Panel de administración
pnpm dev:admin

# Link-in-bio
pnpm dev:linkit

# Sitio web de marketing
pnpm dev:web
```

O ejecutar todas las apps simultáneamente:

```bash
pnpm dev
```

---

## 4. Ver en el Navegador

| App | URL por Defecto |
|-----|----------------|
| Menu | [http://localhost:3000](http://localhost:3000) |
| App | [http://localhost:3001](http://localhost:3001) |
| Admin | [http://localhost:3002](http://localhost:3002) |
| LinkIt | [http://localhost:3003](http://localhost:3003) |
| Web | [http://localhost:3004](http://localhost:3004) |

---

## 5. Explorar el Código

La estructura principal del proyecto:

```
menud-frontend/
├── apps/menu/                 # Empezar aquí para la app de clientes
│   ├── app/                   # Router pages (App Router)
│   └── modules/               # Feature modules
│       ├── branches/          # Lógica de sucursales
│       ├── layout/            # Header, structured data
│       ├── products/          # Cards, drawers, filtros
│       └── shared/            # Componentes compartidos
├── packages/shared/           # Modelos y helpers
│   ├── src/lib/               # API config, adaptadores
│   └── src/models/            # TypeScript models
└── packages/ui/               # Componentes UI (shadcn/ui)
```

---

## Comandos Útiles

```bash
# Formatear todo el código
pnpm format

# Verificar lint
pnpm lint

# Build de producción
pnpm build
```

---

**Siguiente:** [Configuración del Entorno →](environment-setup.md)
