# Configuración del Entorno

Referencia completa de variables de entorno para Menud.

---

## Archivo de Configuración

Las variables se definen en `.env.local` en la raíz del proyecto. Nunca commitees este archivo a git.

```bash
cp .env.example .env.local
```

---

## Variables Requeridas

| Variable | Tipo | Descripción |
|----------|------|-------------|
| `NEXT_PUBLIC_API_URL` | `string` | URL base del backend API |
| `NEXTAUTH_SECRET` | `string` | Secreto para NextAuth.js (genera con `openssl rand -base64 32`) |

---

## Variables Públicas (Next.js)

| Variable | Tipo | Default | Descripción |
|----------|------|---------|-------------|
| `NEXT_PUBLIC_API_URL` | `string` | — | URL del backend API. Se usa en todos los apps para las llamadas REST |
| `NEXT_PUBLIC_LINKIT_DOMAIN` | `string` | — | Dominio para las páginas de link-in-bio |
| `NEXT_PUBLIC_APP_DOMAIN` | `string` | — | Dominio para el dashboard del restaurante |
| `NEXT_PUBLIC_API_REVALIDATE` | `number` | `60` | Intervalo de revalidación ISR en segundos |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | `string` | — | Código de verificación de Google Search Console (opcional) |

---

## Variables de Servidor (NextAuth)

| Variable | Tipo | Descripción |
|----------|------|-------------|
| `NEXTAUTH_SECRET` | `string` | Secreto para encriptar tokens de sesión |
| `NEXTAUTH_URL` | `string` | URL base de la aplicación (solo en desarrollo) |

---

## Variables de Docker/CI

Estas variables se configuran en GitHub Actions y Portainer:

| Variable | Tipo | Descripción |
|----------|------|-------------|
| `PORTAINER_WEBHOOK` | `string` | URL del webhook de Portainer para auto-deploy |

---

## Generar Secreto NextAuth

```bash
# Linux/macOS
openssl rand -base64 32

# Windows (PowerShell)
[System.Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes((1..32 | ForEach-Object { [char]((Get-Random -Maximum 26) + 97) } -join '')))
```

---

## Ejemplo Completo

```env
# Backend API
NEXT_PUBLIC_API_URL=https://api.tudominio.com

# Dominios
NEXT_PUBLIC_LINKIT_DOMAIN=link.tudominio.com
NEXT_PUBLIC_APP_DOMAIN=app.tudominio.com

# ISR Revalidation (segundos)
NEXT_PUBLIC_API_REVALIDATE=60

# Auth
NEXTAUTH_SECRET=abc123-genera-un-secreto-largo
NEXTAUTH_URL=http://localhost:3000

# SEO (opcional)
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=abc123xyz
```

---

## Entornos de Despliegue

| Entorno | `NEXT_PUBLIC_API_URL` | `NEXTAUTH_URL` |
|---------|----------------------|----------------|
| Desarrollo | `http://localhost:4000` | `http://localhost:3000` |
| Staging | `https://api-staging.tudominio.com` | `https://app-staging.tudominio.com` |
| Producción | `https://api.tudominio.com` | `https://app.tudominio.com` |

---

**Siguiente:** [Arquitectura →](../architecture/overview.md)
