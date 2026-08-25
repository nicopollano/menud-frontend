# Design System

Documentation of Menud's visual system: colors, typography, spacing, and animations.

---

## Restaurant Color Palette

Each restaurant can customize its menu with a **3-color** system:

| Color | Usage | Example |
|-------|-------|---------|
| `color1` | Main background, gradients | `#FFFFFF` (white) |
| `color2` | Text, secondary elements | `#1A1A1A` (black) |
| `color3` | Accents, buttons, links | `#E63946` (red) |

### Application

Colors are applied as CSS custom properties and used in:

- **Header**: Gradient from `color1` to transparent
- **Texts**: `color2` for main content
- **Buttons and links**: `color3` for accents
- **Badges and chips**: `color3` with reduced opacity
- **Skeleton loaders**: `color1` with reduced opacity

---

## Typography

8 Google Fonts options:

| Font | Style | Recommended Use |
|------|-------|----------------|
| Poppins | Modern, sans-serif | Modern restaurants |
| Roboto | Classic, sans-serif | General use |
| Maven Pro | Professional, sans-serif | Formal businesses |
| Lato | Readable, sans-serif | Long menus |
| Pompiere | Casual, handwriting | Cafes, bakeries |
| Silla | Decorative, display | Themed restaurants |
| Niconne | Decorative, display | Italian, pizzerias |
| Baloo Tammudu 2 | Friendly, display | Family restaurants |

### Application

Typography is selected per menu and applied dynamically:

```css
:root {
  --font-family: 'Poppins', sans-serif;
}
```

---

## Spacing

### Padding System

```
Mobile: 16px (left/right)
Desktop: 20px (left/right)
```

### Custom Breakpoints

| Breakpoint | Value | Usage |
|------------|-------|-------|
| `xs` | 360px | Small mobiles |
| `sm` | 430px | Standard mobiles |
| `md` | 768px | Tablets |
| `lg` | 1024px | Desktop |
| `xl` | 1280px | Large desktop |

---

## Animations

Defined in `animations.css`:

| Animation | CSS Property | Usage |
|-----------|--------------|-------|
| `slide-fade-up` | `animation-name` | Content entrance |
| `heart-beat` | `animation-name` | Favorite button |
| `shimmer` | `animation-name` | Skeleton loaders |
| `fade-in` | `animation-name` | Smooth appearance |
| `scale-in` | `animation-name` | Element scaling |
| `float` | `animation-name` | Decorative elements |

### prefers-reduced-motion

All animations are disabled when the user has reduced motion preference enabled:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## UI Components

### Product Card (PreviewProductCard)

- **Mobile**: Vertical format, 4:3 image
- **Desktop**: Horizontal format, 280px fixed image
- **Elements**: Image with gradient, price badge, discount badge, favorite button with heart-beat animation
- **Loading**: Shimmer skeleton

### Header

- Cover image with gradient overlay
- Circular logo
- Business name
- Menu, language, reading mode buttons

### Category Chips (Carousel)

- Horizontal pills with scroll
- States: active (color3), inactive (gray)
- Shadows and rounded borders

---

## Accessibility

| Feature | Implementation |
|---------|---------------|
| Skip navigation | `SkipLink` component |
| Tap targets | Minimum 44x44px on mobile |
| Focus visible | Custom outline with `focus-visible` |
| ARIA labels | On product cards, buttons, navigation |
| Heading hierarchy | h1 → h2 → h3 semantic |
| prefers-reduced-motion | Disables all animations |

---

**See also:** [Data Flow](data-flow.md) | [Menu App](../architecture/apps/menu.md)
