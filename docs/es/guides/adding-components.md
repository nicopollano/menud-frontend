# Agregar Componentes (shadcn/ui)

Cómo agregar componentes UI al monorepo usando shadcn/ui.

---

## ¿Qué es shadcn/ui?

shadcn/ui no es una librería de componentes tradicional. Copia el código fuente de los componentes directamente en tu proyecto, lo que te da control total sobre el estilo y comportamiento.

---

## Agregar un Componente

Desde la raíz del proyecto:

```bash
pnpm dlx shadcn@latest add button -c packages/ui
```

### Parámetros

| Parámetro | Descripción |
|-----------|-------------|
| `button` | Nombre del componente a agregar |
| `-c packages/ui` | Directorio destino (paquete UI compartido) |

### Ejemplos

```bash
# Componente Button
pnpm dlx shadcn@latest add button -c packages/ui

# Componente Card
pnpm dlx shadcn@latest add card -c packages/ui

# Componente Dialog
pnpm dlx shadcn@latest add dialog -c packages/ui

# Componente Input
pnpm dlx shadcn@latest add input -c packages/ui
```

---

## Ubicación de Componentes

Los componentes se guardan en:

```
packages/ui/src/components/
├── button.tsx
├── card.tsx
├── dialog.tsx
├── input.tsx
└── ...
```

---

## Usar Componentes en las Apps

Importar desde el paquete `@ristokit/ui`:

```tsx
import { Button } from '@ristokit/ui/components/button'
import { Card, CardContent, CardHeader } from '@ristokit/ui/components/card'
```

---

## Personalización

Al estar el código en tu proyecto, puedes modificar:

- **Estilos**: Edita los archivos CSS/Tailwind directamente
- **Comportamiento**: Modifica la lógica de los componentes
- **Variantes**: Agrega nuevas variantes según necesites

---

## Tailwind Config

Tu `tailwind.config.ts` y `globals.css` ya están configurados para usar los componentes del paquete `ui`.

---

## Componentes Disponibles

Ver la lista completa en [shadcn/ui Components](https://ui.shadcn.com/docs/components).

Algunos componentes comunes:

| Componente | Uso |
|------------|-----|
| `Button` | Botones con variantes (primary, secondary, ghost, etc.) |
| `Card` | Contenedores con header, content, footer |
| `Dialog` | Modales y overlays |
| `Input` | Campos de formulario |
| `Select` | Dropdowns |
| `Toast` | Notificaciones |
| `Badge` | Etiquetas |
| `Carousel` | Carruseles |

---

**Ver también:** [Calidad de Código](code-quality.md) | [Contribuir](contributing.md)
