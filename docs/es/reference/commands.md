# Referencia de Comandos

Todos los comandos disponibles en el proyecto Menud.

---

## Scripts Principales

| Comando | Descripción |
|---------|-------------|
| `pnpm dev` | Ejecutar todas las apps en modo desarrollo |
| `pnpm build` | Compilar todas las apps para producción |
| `pnpm lint` | Verificar lint en todo el monorepo |
| `pnpm lint:fix` | Corregir problemas de lint automáticamente |
| `pnpm format` | Formatear código con Prettier |
| `pnpm prepare` | Instalar hooks de Git (Lefthook) |

---

## Desarrollo Individual

### Menu App (Clientes)

```bash
pnpm dev:menu      # Ejecutar en desarrollo
pnpm build:menu    # Compilar para producción
```

### App Dashboard (Restaurante)

```bash
pnpm dev:app       # Ejecutar en desarrollo
pnpm build:app     # Compilar para producción
```

### Admin Panel

```bash
pnpm dev:admin     # Ejecutar en desarrollo
pnpm build:admin   # Compilar para producción
```

### LinkIt

```bash
pnpm dev:linkit    # Ejecutar en desarrollo
pnpm build:linkit  # Compilar para producción
```

### Web (Marketing)

```bash
pnpm dev:web       # Ejecutar en desarrollo
pnpm build:web     # Compilar para producción
```

---

## Comandos de Turborepo

```bash
# Ejecutar una tarea en un paquete específico
pnpm turbo run dev --filter=menu

# Ejecutar build solo en dependencias
pnpm turbo build --filter=./...

# Limpiar caché de Turborepo
pnpm turbo clean
```

---

## Comandos de Biome

```bash
# Verificar todos los archivos
npx @biomejs/biome check .

# Corregir automáticamente
npx @biomejs/biome check --write .

# Solo formatear
npx @biomejs/biome format --write .

# Solo linting
npx @biomejs/biome lint .

# Verificar un archivo específico
npx @biomejs/biome check apps/menu/app/page.tsx
```

---

## Comandos de pnpm

```bash
# Instalar dependencias
pnpm install

# Agregar una dependencia
pnpm add [paquete]

# Agregar dependencia de desarrollo
pnpm add -D [paquete]

# Agregar a un paquete específico
pnpm --filter @ristokit/shared add [paquete]

# Actualizar dependencias
pnpm update

# Buscar dependencias no usadas
pnpm depcheck
```

---

## Comandos de Docker

```bash
# Build de una app
docker build --build-arg APP_DIR=./apps/menu -t menud-menu .

# Ejecutar contenedor
docker run -p 3000:3000 menud-menu

# Ver logs
docker logs -f [container-id]

# Detener contenedor
docker stop [container-id]
```

---

## Comandos de Git

```bash
# Crear rama de feature
git checkout -b feature/nombre-feature

# Crear rama de fix
git checkout -b fix/nombre-fix

# Push con rastreo
git push -u origin feature/nombre-feature
```

---

## Utilidades

```bash
# Generar secreto de NextAuth
openssl rand -base64 32

# Verificar versión de Node
node --version

# Verificar versión de pnpm
pnpm --version

# Verificar procesos en un puerto
lsof -i :3000
```

---

**Ver también:** [Variables de Entorno](environment-variables.md) | [Calidad de Código](../guides/code-quality.md)
