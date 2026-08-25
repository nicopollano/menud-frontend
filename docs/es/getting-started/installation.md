# Instalación

Guía completa para instalar y configurar Menud en tu máquina local.

---

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

| Software | Versión Mínima | Comando de Verificación |
|----------|---------------|------------------------|
| **Node.js** | 20.0+ | `node --version` |
| **pnpm** | 10.14+ | `pnpm --version` |
| **Git** | 2.40+ | `git --version` |

### Instalar pnpm

Si aún no tienes pnpm instalado:

```bash
# Habilitar corepack (incluido en Node.js 20+)
corepack enable

# Instalar pnpm 10.14
corepack prepare pnpm@10.14.0 --activate
```

---

## Clonar el Repositorio

```bash
# Clonar el repositorio
git clone https://github.com/nicopollano/menud-frontend.git

# Entrar al directorio
cd menud-frontend
```

---

## Instalar Dependencias

```bash
# Instalar todas las dependencias del monorepo
pnpm install
```

Esto instalará las dependencias de:
- Todas las apps (`apps/menu`, `apps/app`, `apps/admin`, `apps/linkit`, `apps/web`)
- Todos los paquetes compartidos (`packages/shared`, `packages/ui`, etc.)

---

## Configurar Variables de Entorno

```bash
# Copiar el archivo de ejemplo
cp .env.example .env.local
```

Edita `.env.local` con tus valores. Las variables mínimas son:

```env
NEXT_PUBLIC_API_URL=https://tu-api.com
NEXTAUTH_SECRET=tu-secreto-aqui
```

Ver la [referencia completa de variables](../reference/environment-setup.md) para todas las opciones.

---

## Verificar la Instalación

```bash
# Ejecutar la app de menú (la más rápida de levantar)
pnpm dev:menu
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## Solución de Problemas

### Error: "Module not found"
```bash
# Limpiar caché y reinstalar
rm -rf node_modules .turbo
pnpm install
```

### Error: "pnpm: command not found"
```bash
corepack enable
corepack prepare pnpm@10.14.0 --activate
```

### Error: "Port already in use"
```bash
# Verificar qué proceso usa el puerto
lsof -i :3000

# Matar el proceso
kill -9 <PID>
```

---

**Siguiente:** [Inicio Rápido →](quick-start.md)
