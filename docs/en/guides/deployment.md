# Deployment Guide

How to deploy Menud to production using Docker, GitHub Actions, and Portainer.

---

## CI/CD Pipeline

```
Push to main → GitHub Actions → Docker Build → GHCR → Portainer Webhook → Server
```

---

## Docker

Each app has its own `Dockerfile` in its directory:

```
apps/
├── menu/Dockerfile
├── app/Dockerfile
├── admin/Dockerfile
├── linkit/Dockerfile
└── web/Dockerfile
```

### Manual Build

```bash
# Build a specific app
docker build \
  --build-arg APP_DIR=./apps/menu \
  --build-arg NEXT_PUBLIC_API_URL=https://api.yourdomain.com \
  -t menud-menu:latest \
  -f apps/menu/Dockerfile \
  .
```

### Build Variables

| Variable | Description |
|----------|-------------|
| `APP_DIR` | Directory of the app to build |
| `NEXT_PUBLIC_API_URL` | Backend API URL |
| `NEXT_PUBLIC_LINKIT_DOMAIN` | Link-in-bio domain |
| `NEXT_PUBLIC_APP_DOMAIN` | Dashboard domain |
| `NEXT_PUBLIC_API_REVALIDATE` | ISR revalidation interval |
| `NEXTAUTH_SECRET` | NextAuth secret |

---

## GitHub Actions

The `portainer.yml` workflow runs on:

- **Push** to `main` branch
- **Pull Request** to `main` branch

### Matrix Strategy

Builds all apps in parallel:

```yaml
strategy:
  matrix:
    app: [admin, app, linkit, menu, web]
```

### Docker Images

Images are pushed to GitHub Container Registry (GHCR):

```
ghcr.io/nicopollano/menud-frontend-menu:latest
ghcr.io/nicopollano/menud-frontend-menu:{commit-sha}
```

### Environment Variables (GitHub)

Configure in Settings → Secrets and variables → Actions:

| Variable | Type | Description |
|----------|------|-------------|
| `NEXT_PUBLIC_API_URL` | `vars` | Backend URL |
| `NEXT_PUBLIC_LINKIT_DOMAIN` | `vars` | Link-in-bio domain |
| `NEXT_PUBLIC_APP_DOMAIN` | `vars` | Dashboard domain |
| `NEXT_PUBLIC_API_REVALIDATE` | `vars` | ISR revalidation |
| `NEXTAUTH_SECRET` | `vars` | NextAuth secret |
| `secretPass` | `secrets` | GHCR token |

---

## Portainer

Portainer manages container orchestration on the server:

1. GitHub Actions builds and pushes the image to GHCR
2. A webhook is triggered to Portainer
3. Portainer pulls the new image
4. The container restarts with the new version

### Webhook

```bash
# Configure in Portainer
PORTAINER_WEBHOOK=https://your-portainer.com/api/endpoints/{id}/docker/webhook
```

---

## Environment Variables by Environment

### Development

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXTAUTH_URL=http://localhost:3000
```

### Production

```env
NEXT_PUBLIC_API_URL=https://api.menud.com
NEXTAUTH_URL=https://app.menud.com
NEXT_PUBLIC_API_REVALIDATION=60
```

---

## Useful Commands

```bash
# View container logs
docker logs -f menud-menu

# Restart a container
docker restart menud-menu

# Check if a container is running
docker ps | grep menud
```

---

**See also:** [Environment Variables](../reference/environment-setup.md) | [Commands](../reference/commands.md)
