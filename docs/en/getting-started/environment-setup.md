# Environment Setup

Complete reference of environment variables for Menud.

---

## Configuration File

Variables are defined in `.env.local` at the project root. Never commit this file to git.

```bash
cp .env.example .env.local
```

---

## Required Variables

| Variable | Type | Description |
|----------|------|-------------|
| `NEXT_PUBLIC_API_URL` | `string` | Backend API base URL |
| `NEXTAUTH_SECRET` | `string` | Secret for NextAuth.js (generate with `openssl rand -base64 32`) |

---

## Public Variables (Next.js)

| Variable | Type | Default | Description |
|----------|------|---------|-------------|
| `NEXT_PUBLIC_API_URL` | `string` | — | Backend API URL. Used across all apps for REST calls |
| `NEXT_PUBLIC_LINKIT_DOMAIN` | `string` | — | Domain for link-in-bio pages |
| `NEXT_PUBLIC_APP_DOMAIN` | `string` | — | Restaurant dashboard domain |
| `NEXT_PUBLIC_API_REVALIDATE` | `number` | `60` | ISR revalidation interval in seconds |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | `string` | — | Google Search Console verification code (optional) |

---

## Server Variables (NextAuth)

These variables are only available on the server.

| Variable | Type | Description |
|----------|------|-------------|
| `NEXTAUTH_SECRET` | `string` | Secret for encrypting session tokens |
| `NEXTAUTH_URL` | `string` | Application base URL (development only) |

---

## Docker/CI Variables

These are configured in GitHub Actions and Portainer:

| Variable | Type | Description |
|----------|------|-------------|
| `PORTAINER_WEBHOOK` | `string` | Portainer webhook URL for auto-deploy |

---

## Generate NextAuth Secret

```bash
# Linux/macOS
openssl rand -base64 32

# Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Python
python3 -c "import secrets; print(secrets.token_urlsafe(32))"
```

---

## Complete Example

```env
# Backend API
NEXT_PUBLIC_API_URL=https://api.yourdomain.com

# Domains
NEXT_PUBLIC_LINKIT_DOMAIN=link.yourdomain.com
NEXT_PUBLIC_APP_DOMAIN=app.yourdomain.com

# ISR Revalidation (seconds)
NEXT_PUBLIC_API_REVALIDATION=60

# Auth
NEXTAUTH_SECRET=abc123-generate-a-long-secret
NEXTAUTH_URL=http://localhost:3000

# SEO (optional)
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=abc123xyz
```

---

## Deployment Environments

| Environment | `NEXT_PUBLIC_API_URL` | `NEXTAUTH_URL` |
|-------------|----------------------|----------------|
| Development | `http://localhost:4000` | `http://localhost:3000` |
| Staging | `https://api-staging.yourdomain.com` | `https://app-staging.yourdomain.com` |
| Production | `https://api.yourdomain.com` | `https://app.yourdomain.com` |

---

**Next:** [Architecture →](../architecture/overview.md)
