# Sistema de Diseño

Documentación del sistema visual de Menud: colores, tipografía, espaciado y animaciones.

---

## Paleta de Colores por Restaurante

Cada restaurante puede personalizar su menú con un sistema de **3 colores**:

| Color | Uso | Ejemplo |
|-------|-----|---------|
| `color1` | Fondo principal, gradientes | `#FFFFFF` (blanco) |
| `color2` | Texto, elementos secundarios | `#1A1A1A` (negro) |
| `color3` | Acentos, botones, links | `#E63946` (rojo) |

### Aplicación

Los colores se aplican como CSS custom properties y se usan en:

- **Header**: Gradiente de `color1` a transparente
- **Textos**: `color2` para contenido principal
- **Botones y links**: `color3` para acentos
- **Badges y chips**: `color3` con opacidad reducida
- **Skeleton loaders**: `color1` con opacidad reducida

---

## Tipografías

8 fuentes de Google Fonts disponibles:

| Fuente | Estilo | Uso Recomendado |
|--------|--------|----------------|
| Poppins | Moderna, sans-serif | Restaurantes modernos |
| Roboto | Clásica, sans-serif | Uso general |
| Maven Pro | Profesional, sans-serif | Negocios formales |
| Lato | Legible, sans-serif | Menús largos |
| Pompiere | Casual, handwriting | Cafeterías, bakeries |
| Silla | Decorativa, display | Restaurantes temáticos |
| Niconne | Decorativa, display | Italianos, pizzerías |
| Baloo Tammudu 2 | Amigable, display | Restaurantes familiares |

### Aplicación

La tipografía se selecciona por menú y se aplica dinámicamente:

```css
:root {
  --font-family: 'Poppins', sans-serif;
}
```

---

## Espaciado

### Sistema de Padding

```
Mobile: 16px (left/right)
Desktop: 20px (left/right)
```

### Breakpoints Personalizados

| Breakpoint | Valor | Uso |
|------------|-------|-----|
| `xs` | 360px | Móviles pequeños |
| `sm` | 430px | Móviles estándar |
| `md` | 768px | Tablets |
| `lg` | 1024px | Desktop |
| `xl` | 1280px | Desktop grande |

---

## Animaciones

Definidas en `animations.css`:

| Animación | Propiedad CSS | Uso |
|-----------|---------------|-----|
| `slide-fade-up` | `animation-name` | Entrada de contenido |
| `heart-beat` | `animation-name` | Botón de favorito |
| `shimmer` | `animation-name` | Skeleton loaders |
| `fade-in` | `animation-name` | Aparición suave |
| `scale-in` | `animation-name` | Escalado de elementos |
| `float` | `animation-name` | Elementos decorativos |

### prefers-reduced-motion

Todas las animaciones se desactivan cuando el usuario tiene habilitada la preferencia de movimiento reducido:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Componentes UI

### Product Card (PreviewProductCard)

- **Mobile**: Formato vertical, imagen 4:3
- **Desktop**: Formato horizontal, imagen 280px fijo
- **Elementos**: Imagen con gradiente, badge de precio, badge de descuento, botón de favorito con animación heart-beat
- **Loading**: Skeleton shimmer

### Header

- Imagen de portada con gradiente overlay
- Logo circular
- Nombre del negocio
- Botones de menú, idioma, modo de lectura

### Category Chips (Carousel)

- Pills horizontales con scroll
- Estados: activo (color3), inactivo (gris)
- Sombras y bordes redondeados

---

## Accesibilidad

| Característica | Implementación |
|----------------|----------------|
| Skip navigation | `SkipLink` component |
| Tap targets | Mínimo 44x44px en mobile |
| Focus visible | Outline personalizado con `focus-visible` |
| ARIA labels | En product cards, botones, navegación |
| Jerarquía de encabezados | h1 → h2 → h3 semántica |
| prefers-reduced-motion | Desactiva todas las animaciones |

---

**Ver también:** [Flujo de Datos](data-flow.md) | [Menu App](../architecture/apps/menu.md)
