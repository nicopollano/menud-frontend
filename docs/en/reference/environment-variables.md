# Environment Variables

Complete reference of all environment variables in the project.

---

## Configuration File

Variables are defined in `.env.local` (never committed to git).

```bash
cp .env.example .env.local
```

---

## Public Variables (NEXT_PUBLIC_*)

These variables are available on both client and server.

| Variable | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| `NEXT_PUBLIC_API_URL` | `string` | ✅ | — | Backend API base URL |
| `NEXT_PUBLIC_LINKIT_DOMAIN` | `string` | No | — | Domain for link-in-bio pages |
| `NEXT_PUBLIC_APP_DOMAIN` | `string` | No | — | Restaurant dashboard domain |
| `NEXT_PUBLIC_API_REVALIDATE` | `number` | No | `60` | ISR revalidation interval (seconds) |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | `string` | No | — | Google Search Console verification code |

---

## Server Variables (NextAuth)

These variables are only available on the server.

| Variable | Type | Required | Description |
|----------|------|----------|-------------|
| `NEXTAUTH_SECRET` | `string` | ✅ | Secret for encrypting session tokens |
| `NEXTAUTH_URL` | `string` | No | Base URL (development only) |

---

## CI/CD Variables (GitHub Actions)

Configure in GitHub → Settings → Secrets and variables → Actions.

| Variable | Type | Description |
|----------|------|-------------|
| `NEXT_PUBLIC_API_URL` | `vars` | Backend API URL |
| `NEXT_PUBLIC_LINKIT_DOMAIN` | `vars` | Link-in-bio domain |
| `NEXT_PUBLIC_APP_DOMAIN` | `vars` | Dashboard domain |
| `NEXT_PUBLIC_API_REVALIDATE` | `vars` | ISR revalidation |
| `NEXTAUTH_SECRET` | `vars` | NextAuth secret |
| `secretPass` | `secrets` | GitHub Container Registry token |

---

## Docker Variables

Passed as `--build-arg` when building the image:

```bash
docker build \
  --build-arg APP_DIR=./apps/menu \
  --build-arg NEXT_PUBLIC_API_URL=https://api.yourdomain.com \
  --build-arg NEXTAUTH_SECRET=your-secret \
  -t menud-menu .
```

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

## Complete Example (.env.local)

```env
# Backend API
NEXT_PUBLIC_API_URL=https://api.menud.com

# Domains
NEXT_PUBLIC_LINKIT_DOMAIN=link.menud.com
NEXT_PUBLIC_APP_DOMAIN=app.menud.com

# ISR Revalidation (seconds)
NEXT_PUBLIC_API_REVALIDATION=60

# Auth
NEXTAUTH_SECRET=abc123-generate-a-long-secret-here
NEXTAUTH_URL=http://localhost:3000

# SEO (optional)
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=abc123xyz
```

---

## Deployment Environments

| Environment | `NEXT_PUBLIC_API_URL` | `NEXTAUTH_URL` | `NEXT_PUBLIC_API_REVALIDATE` |
|-------------|----------------------|----------------|------------------------------|
| Development | `http://localhost:4000` | `http://localhost:3000` | `0` (no cache) |
| Staging | `https://api-staging.menud.com` | `https://app-staging.menud.com` | `30` |
| Production | `https://api.menud.com` | `https://app.menud.com` | `60` |

---

**See also:** [Commands](commands.md) | [Deployment Guide](../guides/deployment.md)
