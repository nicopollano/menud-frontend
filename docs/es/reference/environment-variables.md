# Variables de Entorno

Referencia completa de todas las variables de entorno del proyecto.

---

## Archivo de Configuración

Las variables se definen en `.env.local` (nunca commiteado a git).

```bash
cp .env.example .env.local
```

---

## Variables Públicas (NEXT_PUBLIC_*)

Estas variables están disponibles en el cliente y el servidor.

| Variable | Tipo | Requerida | Default | Descripción |
|----------|------|-----------|---------|-------------|
| `NEXT_PUBLIC_API_URL` | `string` | ✅ | — | URL base del backend API |
| `NEXT_PUBLIC_LINKIT_DOMAIN` | `string` | No | — | Dominio para páginas de link-in-bio |
| `NEXT_PUBLIC_APP_DOMAIN` | `string` | No | — | Dominio del dashboard de restaurante |
| `NEXT_PUBLIC_API_REVALIDATE` | `number` | No | `60` | Intervalo de revalidación ISR (segundos) |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | `string` | No | — | Código de verificación de Google Search Console |

---

## Variables de Servidor (NextAuth)

Estas variables solo están disponibles en el servidor.

| Variable | Tipo | Requerida | Descripción |
|----------|------|-----------|-------------|
| `NEXTAUTH_SECRET` | `string` | ✅ | Secreto para encriptar tokens de sesión |
| `NEXTAUTH_URL` | `string` | No | URL base (solo necesario en desarrollo) |

---

## Variables de CI/CD (GitHub Actions)

Configurar en GitHub → Settings → Secrets and variables → Actions.

| Variable | Tipo | Descripción |
|----------|------|-------------|
| `NEXT_PUBLIC_API_URL` | `vars` | URL del backend API |
| `NEXT_PUBLIC_LINKIT_DOMAIN` | `vars` | Dominio de link-in-bio |
| `NEXT_PUBLIC_APP_DOMAIN` | `vars` | Dominio del dashboard |
| `NEXT_PUBLIC_API_REVALIDATE` | `vars` | Revalidación ISR |
| `NEXTAUTH_SECRET` | `vars` | Secreto de NextAuth |
| `secretPass` | `secrets` | Token de GitHub Container Registry |

---

## Variables de Docker

Se pasan como `--build-arg` al construir la imagen:

```bash
docker build \
  --build-arg APP_DIR=./apps/menu \
  --build-arg NEXT_PUBLIC_API_URL=https://api.tudominio.com \
  --build-arg NEXTAUTH_SECRET=tu-secreto \
  -t menud-menu .
```

---

## Generar Secreto NextAuth

```bash
# Linux/macOS
openssl rand -base64 32

# Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Python
python3 -c "import secrets; print(secrets.token_urlsafe(32))"
```

---

## Ejemplo Completo (.env.local)

```env
# Backend API
NEXT_PUBLIC_API_URL=https://api.menud.com

# Dominios
NEXT_PUBLIC_LINKIT_DOMAIN=link.menud.com
NEXT_PUBLIC_APP_DOMAIN=app.menud.com

# ISR Revalidation (segundos)
NEXT_PUBLIC_API_REVALIDATE=60

# Auth
NEXTAUTH_SECRET=abc123-genera-un-secreto-largo-aqui
NEXTAUTH_URL=http://localhost:3000

# SEO (opcional)
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=abc123xyz
```

---

## Entornos de Despliegue

| Entorno | `NEXT_PUBLIC_API_URL` | `NEXTAUTH_URL` | `NEXT_PUBLIC_API_REVALIDATE` |
|---------|----------------------|----------------|------------------------------|
| Desarrollo | `http://localhost:4000` | `http://localhost:3000` | `0` (sin cache) |
| Staging | `https://api-staging.menud.com` | `https://app-staging.menud.com` | `30` |
| Producción | `https://api.menud.com` | `https://app.menud.com` | `60` |

---

**Ver también:** [Comandos](commands.md) | [Guía de Despliegue](../guides/deployment.md)
