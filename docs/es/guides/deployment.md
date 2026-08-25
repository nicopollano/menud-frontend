# Guía de Despliegue

Cómo desplegar Menud en producción usando Docker, GitHub Actions y Portainer.

---

## Pipeline de CI/CD

```
Push a main → GitHub Actions → Docker Build → GHCR → Portainer Webhook → Servidor
```

---

## Docker

Cada app tiene su propio `Dockerfile` en su directorio:

```
apps/
├── menu/Dockerfile
├── app/Dockerfile
├── admin/Dockerfile
├── linkit/Dockerfile
└── web/Dockerfile
```

### Build Manual

```bash
# Build de una app específica
docker build \
  --build-arg APP_DIR=./apps/menu \
  --build-arg NEXT_PUBLIC_API_URL=https://api.tudominio.com \
  -t menud-menu:latest \
  -f apps/menu/Dockerfile \
  .
```

### Variables de Build

| Variable | Descripción |
|----------|-------------|
| `APP_DIR` | Directorio de la app a buildear |
| `NEXT_PUBLIC_API_URL` | URL del backend API |
| `NEXT_PUBLIC_LINKIT_DOMAIN` | Dominio de link-in-bio |
| `NEXT_PUBLIC_APP_DOMAIN` | Dominio del dashboard |
| `NEXT_PUBLIC_API_REVALIDATE` | Intervalo de revalidación ISR |
| `NEXTAUTH_SECRET` | Secreto de NextAuth |

---

## GitHub Actions

El workflow `portainer.yml` se ejecuta en:

- **Push** a la rama `main`
- **Pull Request** a la rama `main`

### Estrategia Matrix

Builds todas las apps en paralelo:

```yaml
strategy:
  matrix:
    app: [admin, app, linkit, menu, web]
```

### Imágenes Docker

Las imágenes se pushan a GitHub Container Registry (GHCR):

```
ghcr.io/nicopollano/menud-frontend-menu:latest
ghcr.io/nicopollano/menud-frontend-menu:{commit-sha}
```

### Variables de Entorno (GitHub)

Configurar en Settings → Secrets and variables → Actions:

| Variable | Tipo | Descripción |
|----------|------|-------------|
| `NEXT_PUBLIC_API_URL` | `vars` | URL del backend |
| `NEXT_PUBLIC_LINKIT_DOMAIN` | `vars` | Dominio link-in-bio |
| `NEXT_PUBLIC_APP_DOMAIN` | `vars` | Dominio dashboard |
| `NEXT_PUBLIC_API_REVALIDATE` | `vars` | Revalidación ISR |
| `NEXTAUTH_SECRET` | `vars` | Secreto NextAuth |
| `secretPass` | `secrets` | Token de GHCR |

---

## Portainer

Portainer maneja la orquestación de contenedores en el servidor:

1. GitHub Actions buildea y pushea la imagen a GHCR
2. Se dispara un webhook a Portainer
3. Portainer extrae la nueva imagen
4. El contenedor se reinicia con la nueva versión

### Webhook

```bash
# Configurar en Portainer
PORTAINER_WEBHOOK=https://tu-portainer.com/api/endpoints/{id}/docker/webhook
```

---

## Variables por Entorno

### Desarrollo

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXTAUTH_URL=http://localhost:3000
```

### Producción

```env
NEXT_PUBLIC_API_URL=https://api.menud.com
NEXTAUTH_URL=https://app.menud.com
NEXT_PUBLIC_API_REVALIDATE=60
```

---

## Comandos Útiles

```bash
# Ver logs de un contenedor
docker logs -f menud-menu

# Reiniciar un contenedor
docker restart menud-menu

# Verificar que un contenedor está corriendo
docker ps | grep menud
```

---

**Ver también:** [Variables de Entorno](../reference/environment-setup.md) | [Comandos](../reference/commands.md)
