# Adding Components (shadcn/ui)

How to add UI components to the monorepo using shadcn/ui.

---

## What is shadcn/ui?

shadcn/ui is not a traditional component library. It copies the source code of components directly into your project, giving you full control over styling and behavior.

---

## Adding a Component

From the project root:

```bash
pnpm dlx shadcn@latest add button -c packages/ui
```

### Parameters

| Parameter | Description |
|-----------|-------------|
| `button` | Name of the component to add |
| `-c packages/ui` | Destination directory (shared UI package) |

### Examples

```bash
# Button component
pnpm dlx shadcn@latest add button -c packages/ui

# Card component
pnpm dlx shadcn@latest add card -c packages/ui

# Dialog component
pnpm dlx shadcn@latest add dialog -c packages/ui

# Input component
pnpm dlx shadcn@latest add input -c packages/ui
```

---

## Component Location

Components are saved to:

```
packages/ui/src/components/
├── button.tsx
├── card.tsx
├── dialog.tsx
├── input.tsx
└── ...
```

---

## Using Components in Apps

Import from the `@ristokit/ui` package:

```tsx
import { Button } from '@ristokit/ui/components/button'
import { Card, CardContent, CardHeader } from '@ristokit/ui/components/card'
```

---

## Customization

Since the code is in your project, you can modify:

- **Styles**: Edit CSS/Tailwind files directly
- **Behavior**: Modify component logic
- **Variants**: Add new variants as needed

---

## Tailwind Config

Your `tailwind.config.ts` and `globals.css` are already configured to use the `ui` package components.

---

## Available Components

See the full list at [shadcn/ui Components](https://ui.shadcn.com/docs/components).

Common components:

| Component | Usage |
|-----------|-------|
| `Button` | Buttons with variants (primary, secondary, ghost, etc.) |
| `Card` | Containers with header, content, footer |
| `Dialog` | Modals and overlays |
| `Input` | Form fields |
| `Select` | Dropdowns |
| `Toast` | Notifications |
| `Badge` | Labels |
| `Carousel` | Carousels |

---

**See also:** [Code Quality](code-quality.md) | [Contributing](contributing.md)
