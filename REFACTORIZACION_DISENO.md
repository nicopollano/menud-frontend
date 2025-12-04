# 🎨 PLAN DE REFACTORIZACIÓN DE DISEÑO - MENUD (RISTOKIT)

## 📋 ÍNDICE
1. [Análisis del Estado Actual](#análisis-del-estado-actual)
2. [Modelo de Diseño de Referencia](#modelo-de-diseño-de-referencia)
3. [Propuesta de Diseño Visual](#propuesta-de-diseño-visual)
4. [Planificación Completa de Implementación](#planificación-completa-de-implementación)
5. [Cronograma y Fases](#cronograma-y-fases)

---

## 1. ANÁLISIS DEL ESTADO ACTUAL

### ✅ Fortalezas Identificadas
- Arquitectura modular sólida (monorepo Turborepo)
- Sistema de componentes reutilizables bien estructurado
- Funcionalidades completas (auth, CRUD, filtros, favoritos)
- Performance optimizada (SSG, SWR caching)
- Responsive design implementado

### ⚠️ Áreas de Mejora Visual
1. **Jerarquía Visual Débil**: Los elementos no guían suficientemente la atención del usuario
2. **Tipografía Inconsistente**: Falta de escala tipográfica clara
3. **Espaciado Irregular**: Márgenes y padding sin sistema consistente
4. **Imágenes de Productos**: Necesitan mayor protagonismo
5. **Animaciones Limitadas**: Pocas micro-interacciones que den feedback
6. **Paleta de Colores**: Sistema actual muy básico (3 colores)
7. **Cards y Componentes**: Diseño plano, falta de profundidad
8. **Navegación**: Puede ser más intuitiva y visual
9. **Estados Vacíos**: No hay ilustraciones o mensajes atractivos
10. **Categorías**: Diseño simple, pueden ser más visuales y atractivas

---

## 2. MODELO DE DISEÑO DE REFERENCIA

### 🎯 APPS DE REFERENCIA EXITOSAS

Basándome en las mejores prácticas de la industria, estas son las referencias de diseño que mejor funcionan para menús digitales:

#### **1. UBER EATS (Modelo Principal Recomendado)**
**¿Por qué es exitosa?**
- **Hero Images**: Imágenes grandes de productos que ocupan 60-70% del card
- **Categorías Visuales**: Cada categoría tiene icono + imagen de fondo
- **Scroll Horizontal**: Para categorías y productos destacados
- **Micro-animaciones**: Al agregar a favoritos, filtrar, etc.
- **Información Jerárquica**: Precio destacado, nombre bold, descripción sutil

**Elementos a adoptar:**
- Grid de productos con imágenes prominentes
- Badges visuales (Nuevo, Popular, Descuento)
- Categorías con scroll horizontal e imágenes
- Bottom sheet para detalles de producto
- Animaciones suaves en transiciones

#### **2. GLOVO / RAPPI**
**Elementos destacados:**
- **Search Bar Sticky**: Siempre visible en la parte superior
- **Chips de Filtro**: Filtros visuales con pills/chips en horizontal
- **Skeleton Loaders**: Placeholders visuales mientras carga
- **Gradientes Suaves**: En backgrounds y overlays de imágenes
- **Iconografía Consistente**: Sistema de iconos coherente

**Elementos a adoptar:**
- Sistema de filtros con chips
- Gradientes en hero sections
- Iconos custom para categorías
- Loading states visuales

#### **3. AIRBNB (UX Excellence)**
**Elementos destacados:**
- **Espaciado Generoso**: Breathing room entre elementos
- **Tipografía Clara**: Jerarquía de 5-6 niveles bien definida
- **Imágenes de Alta Calidad**: Optimizadas pero impactantes
- **Micro-interacciones**: Feedback visual en cada acción
- **Vacío States**: Ilustraciones custom cuando no hay contenido

**Elementos a adoptar:**
- Sistema de espaciado consistente (4, 8, 16, 24, 32, 48, 64px)
- Estados vacíos con ilustraciones
- Tipografía con contraste claro
- Animaciones de feedback

---

## 3. PROPUESTA DE DISEÑO VISUAL

### 🎨 SISTEMA DE DISEÑO COMPLETO

#### **A. PALETA DE COLORES EXTENDIDA**

**Sistema Actual (Limitado):**
```css
color1: #FFFFFF (fondo)
color2: #000000 (texto)
color3: #FF6B6B (primario)
```

**Sistema Propuesto (10 colores + variantes):**
```css
/* Colores Principales */
--primary-50: #FFF5F5
--primary-100: #FFE3E3
--primary-500: #FF6B6B (actual color3)
--primary-600: #FF5252
--primary-700: #D63636

/* Neutros (reemplazan color1 y color2) */
--gray-50: #FAFAFA (backgrounds sutiles)
--gray-100: #F5F5F5 (cards background)
--gray-200: #E5E5E5 (borders)
--gray-400: #A3A3A3 (texto secundario)
--gray-700: #404040 (texto principal)
--gray-900: #171717 (headers)

/* Semánticos */
--success: #10B981 (disponible)
--warning: #F59E0B (pocas unidades)
--error: #EF4444 (agotado)
--info: #3B82F6 (nuevo producto)

/* Overlays */
--overlay-dark: rgba(0, 0, 0, 0.6)
--overlay-light: rgba(255, 255, 255, 0.9)
```

#### **B. TIPOGRAFÍA MEJORADA**

**Sistema Actual:** Solo opciones de font-family (8 fuentes)

**Sistema Propuesto:** Escala tipográfica completa

```css
/* Display (Títulos grandes) */
--text-display-2xl: 72px / 1.1 / -0.02em / 700
--text-display-xl: 60px / 1.1 / -0.02em / 700
--text-display-lg: 48px / 1.2 / -0.01em / 700

/* Headings */
--text-h1: 36px / 1.2 / -0.01em / 700
--text-h2: 30px / 1.3 / -0.01em / 600
--text-h3: 24px / 1.4 / 0 / 600
--text-h4: 20px / 1.4 / 0 / 600

/* Body */
--text-lg: 18px / 1.6 / 0 / 400
--text-base: 16px / 1.6 / 0 / 400
--text-sm: 14px / 1.5 / 0 / 400
--text-xs: 12px / 1.4 / 0 / 400

/* Labels */
--text-label-lg: 16px / 1.4 / 0.01em / 600
--text-label: 14px / 1.4 / 0.01em / 600
--text-label-sm: 12px / 1.4 / 0.01em / 600
```

**Recomendación de Fuentes:**
- **Primary**: Inter (reemplaza Poppins) - Más legible en pantallas
- **Secondary**: Playfair Display (para nombres de restaurantes) - Elegante
- **Monospace**: JetBrains Mono (para códigos, precios)

#### **C. ESPACIADO SISTEMÁTICO**

```css
/* Sistema de 8px base */
--space-1: 4px
--space-2: 8px
--space-3: 12px
--space-4: 16px
--space-5: 20px
--space-6: 24px
--space-8: 32px
--space-10: 40px
--space-12: 48px
--space-16: 64px
--space-20: 80px
--space-24: 96px

/* Aplicación consistente */
Cards: padding de --space-6 (24px)
Secciones: gap de --space-8 (32px)
Páginas: padding de --space-4 mobile, --space-8 desktop
Entre elementos: --space-4 (16px)
```

#### **D. SOMBRAS Y ELEVACIÓN**

```css
/* Sistema de elevación (8 niveles) */
--shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.05)
--shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)
--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04)
--shadow-2xl: 0 25px 50px rgba(0, 0, 0, 0.25)
--shadow-inner: inset 0 2px 4px rgba(0, 0, 0, 0.06)

/* Coloreadas para primarios */
--shadow-primary: 0 10px 20px rgba(255, 107, 107, 0.3)
```

#### **E. BORDER RADIUS**

```css
--radius-sm: 6px (chips, badges)
--radius-md: 12px (buttons, inputs)
--radius-lg: 16px (cards pequeños)
--radius-xl: 20px (cards grandes)
--radius-2xl: 24px (modals, drawers)
--radius-full: 9999px (avatares, pills)
```

#### **F. ANIMACIONES Y TRANSICIONES**

```css
/* Duraciones */
--duration-fast: 150ms
--duration-base: 250ms
--duration-slow: 350ms
--duration-slower: 500ms

/* Easing curves */
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1)
--ease-out: cubic-bezier(0, 0, 0.2, 1)
--ease-in: cubic-bezier(0.4, 0, 1, 1)
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55)

/* Animaciones predefinidas */
@keyframes slideUp {
  from { transform: translateY(10px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes scaleIn {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
```

---

### 📱 COMPONENTES REDISEÑADOS

#### **1. PRODUCT CARD (Componente Principal)**

**Antes:**
```tsx
// Simple card con imagen pequeña, texto básico
<Card className="p-4">
  <img className="w-full h-32" />
  <h3>{name}</h3>
  <p className="text-sm">{price}</p>
</Card>
```

**Después:**
```tsx
// Card con imagen hero, badges, hover effects, favorito animado
<Card className="group overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all">
  {/* Imagen Hero (70% del card) */}
  <div className="relative aspect-[4/3] overflow-hidden">
    <img
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      src={image}
    />

    {/* Overlay gradiente sutil */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

    {/* Badges flotantes */}
    <div className="absolute top-3 left-3 flex gap-2">
      {isNew && <Badge variant="info">Nuevo</Badge>}
      {discount && <Badge variant="warning">-{discount}%</Badge>}
    </div>

    {/* Botón favorito (top right) */}
    <button className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:scale-110 transition-transform">
      <HeartIcon className={isFavorite ? "fill-red-500" : ""} />
    </button>

    {/* Precio destacado (bottom left) */}
    <div className="absolute bottom-3 left-3">
      <span className="text-white text-2xl font-bold drop-shadow-lg">
        ${price}
      </span>
      {discountedPrice && (
        <span className="text-white/80 text-sm line-through ml-2">
          ${discountedPrice}
        </span>
      )}
    </div>
  </div>

  {/* Contenido (30% del card) */}
  <div className="p-4 space-y-2">
    <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
      {name}
    </h3>
    <p className="text-sm text-gray-600 line-clamp-2">
      {description}
    </p>

    {/* Tags de categoría */}
    <div className="flex gap-1 flex-wrap">
      <Chip size="sm">{category}</Chip>
      {subcategory && <Chip size="sm">{subcategory}</Chip>}
    </div>
  </div>
</Card>
```

**Features Nuevas:**
- Imagen ocupa 70% del espacio (antes ~40%)
- Hover effect con zoom en imagen
- Gradiente overlay para legibilidad
- Badges flotantes (Nuevo, Descuento, Popular)
- Botón favorito animado
- Precio destacado sobre la imagen
- Chips de categoría
- Line-clamp para truncar texto largo
- Sombras elevadas en hover

---

#### **2. CATEGORY SECTION**

**Antes:**
```tsx
// Acordeón simple con lista de categorías
<Accordion>
  {categories.map(cat => (
    <AccordionItem>
      <AccordionTrigger>{cat.name}</AccordionTrigger>
      <AccordionContent>...</AccordionContent>
    </AccordionItem>
  ))}
</Accordion>
```

**Después:**
```tsx
// Scroll horizontal con cards visuales
<section>
  <h2 className="text-2xl font-bold mb-6">Categorías</h2>

  {/* Scroll horizontal con snap */}
  <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4">
    {categories.map(category => (
      <CategoryCard
        key={category.id}
        className="snap-start shrink-0 w-[140px] cursor-pointer"
        onClick={() => handleFilter(category.id)}
      >
        {/* Imagen circular con gradiente */}
        <div className="relative w-20 h-20 mx-auto mb-3">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-500/20 to-primary-700/20" />
          <img
            src={category.image}
            className="relative w-full h-full rounded-full object-cover ring-2 ring-white shadow-lg"
          />
          {/* Badge contador */}
          <div className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-md">
            {category.summary.totalProducts}
          </div>
        </div>

        {/* Nombre */}
        <p className="text-center text-sm font-semibold text-gray-900">
          {category.name}
        </p>
      </CategoryCard>
    ))}
  </div>
</section>
```

**Features Nuevas:**
- Scroll horizontal (mejor para móviles)
- Imágenes circulares con gradiente
- Badge contador de productos
- Snap scroll para alineación perfecta
- Ring border para destacar
- Sombras suaves

---

#### **3. SEARCH BAR + FILTERS**

**Antes:**
```tsx
// Input simple con filtros básicos
<div>
  <Input placeholder="Buscar..." />
  <Select>...</Select>
</div>
```

**Después:**
```tsx
// Search bar sticky con chips de filtros
<div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
  <div className="container py-4 space-y-3">
    {/* Search input con icono */}
    <div className="relative">
      <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
      <Input
        className="pl-12 pr-12 h-12 rounded-full border-2 border-gray-200 focus:border-primary-500 transition-colors"
        placeholder="Buscar platos, bebidas..."
        value={search}
        onChange={handleSearch}
      />
      {search && (
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2"
          onClick={clearSearch}
        >
          <XIcon className="text-gray-400 hover:text-gray-600" />
        </button>
      )}
    </div>

    {/* Filtros con chips */}
    <div className="flex gap-2 overflow-x-auto scrollbar-hide">
      <FilterChip
        active={!filters.category}
        onClick={() => setFilter('category', null)}
      >
        <AllIcon /> Todos
      </FilterChip>

      {categories.map(cat => (
        <FilterChip
          key={cat.id}
          active={filters.category === cat.id}
          onClick={() => setFilter('category', cat.id)}
        >
          <img src={cat.icon} className="w-4 h-4" />
          {cat.name}
        </FilterChip>
      ))}

      {/* Filtro de precio */}
      <FilterChip
        active={filters.priceRange}
        onClick={() => openPriceFilter()}
      >
        <CurrencyIcon /> Precio
      </FilterChip>

      {/* Más filtros */}
      <FilterChip onClick={() => openFiltersDrawer()}>
        <FilterIcon /> Más filtros
        {activeFiltersCount > 0 && (
          <Badge className="ml-1">{activeFiltersCount}</Badge>
        )}
      </FilterChip>
    </div>

    {/* Contador de resultados */}
    {search && (
      <p className="text-sm text-gray-600">
        {filteredProducts.length} resultados para "{search}"
      </p>
    )}
  </div>
</div>
```

**Features Nuevas:**
- Sticky header con blur backdrop
- Input redondeado con iconos
- Chips de filtro con scroll horizontal
- Iconos en cada chip
- Badge contador de filtros activos
- Clear button en search
- Contador de resultados
- Animaciones suaves

---

#### **4. PRODUCT DETAIL DRAWER (Bottom Sheet)**

**Nuevo Componente (no existe actualmente):**
```tsx
<Drawer open={isOpen} onOpenChange={setIsOpen}>
  <DrawerContent className="max-h-[90vh]">
    {/* Hero Image con carrusel */}
    <div className="relative h-[300px]">
      <Carousel>
        {product.images.map(img => (
          <img src={img} className="w-full h-full object-cover" />
        ))}
      </Carousel>

      {/* Botón cerrar */}
      <button className="absolute top-4 right-4 bg-white/90 backdrop-blur p-2 rounded-full shadow-lg">
        <XIcon />
      </button>

      {/* Indicador de carrusel */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1">
        {product.images.map((_, i) => (
          <div className={cn(
            "w-2 h-2 rounded-full transition-all",
            i === currentImage ? "bg-white w-6" : "bg-white/50"
          )} />
        ))}
      </div>
    </div>

    {/* Contenido */}
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {product.name}
          </h2>
          <div className="flex items-center gap-2">
            <Chip>{product.category}</Chip>
            {product.subcategory && <Chip>{product.subcategory}</Chip>}
          </div>
        </div>

        <button
          className="p-3 hover:bg-gray-100 rounded-full transition-colors"
          onClick={toggleFavorite}
        >
          <HeartIcon className={isFavorite ? "fill-red-500" : ""} />
        </button>
      </div>

      {/* Descripción */}
      <p className="text-gray-600 leading-relaxed">
        {product.description}
      </p>

      {/* Información adicional */}
      <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl">
        <div>
          <p className="text-sm text-gray-500 mb-1">Categoría</p>
          <p className="font-medium">{product.category}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-1">Disponibilidad</p>
          <p className="font-medium text-green-600">Disponible</p>
        </div>
      </div>

      {/* Precio y acción */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl">
        <div>
          <p className="text-sm text-gray-600 mb-1">Precio</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-primary-600">
              ${product.price}
            </span>
            {product.discountedPrice && (
              <span className="text-lg text-gray-500 line-through">
                ${product.discountedPrice}
              </span>
            )}
          </div>
        </div>

        {/* Botón de acción (compartir, ordenar, etc) */}
        <Button size="lg" className="shadow-lg shadow-primary-500/30">
          <ShareIcon className="mr-2" />
          Compartir
        </Button>
      </div>
    </div>
  </DrawerContent>
</Drawer>
```

**Features Nuevas:**
- Drawer bottom sheet (mejor UX en móviles)
- Carrusel de imágenes
- Información organizada en secciones
- Background con gradiente sutil
- Botones de acción destacados
- Información adicional en cards
- Animación de entrada suave

---

#### **5. HEADER / NAVIGATION**

**Antes:**
```tsx
// Header simple con logo y menú
<header className="border-b">
  <div className="flex items-center justify-between p-4">
    <Logo />
    <nav>...</nav>
  </div>
</header>
```

**Después:**
```tsx
// Header con blur, shadow, animación scroll
<header
  className={cn(
    "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
    isScrolled
      ? "bg-white/80 backdrop-blur-lg shadow-md"
      : "bg-transparent"
  )}
>
  <div className="container mx-auto px-4 py-3">
    <div className="flex items-center justify-between">
      {/* Logo con animación */}
      <button
        onClick={scrollToTop}
        className="flex items-center gap-3 group"
      >
        <div className="relative w-10 h-10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl rotate-6 group-hover:rotate-12 transition-transform" />
          <img
            src={logo}
            className="relative w-full h-full rounded-xl shadow-lg"
          />
        </div>
        <div>
          <h1 className="text-lg font-bold text-gray-900">
            {restaurantName}
          </h1>
          <p className="text-xs text-gray-500">Menú Digital</p>
        </div>
      </button>

      {/* Acciones */}
      <div className="flex items-center gap-2">
        {/* Favoritos con badge */}
        <button
          className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
          onClick={openFavoritesDrawer}
        >
          <HeartIcon className="text-gray-600" />
          {favoritesCount > 0 && (
            <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
              {favoritesCount}
            </div>
          )}
        </button>

        {/* Menú */}
        <button
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          onClick={openMenu}
        >
          <MenuIcon className="text-gray-600" />
        </button>
      </div>
    </div>
  </div>
</header>
```

**Features Nuevas:**
- Fixed header con backdrop blur cuando hace scroll
- Logo con efecto de rotación en hover
- Badge animado en favoritos
- Sombra condicional según scroll
- Transiciones suaves
- Información del restaurante visible

---

#### **6. FAVORITES DRAWER**

**Nuevo Componente Mejorado:**
```tsx
<Drawer open={isOpen} onOpenChange={setIsOpen}>
  <DrawerContent>
    <DrawerHeader>
      <div className="flex items-center justify-between">
        <div>
          <DrawerTitle>Mis Favoritos</DrawerTitle>
          <DrawerDescription>
            {favorites.length} platos guardados
          </DrawerDescription>
        </div>
        {favorites.length > 0 && (
          <Button variant="ghost" size="sm" onClick={clearAll}>
            Limpiar todo
          </Button>
        )}
      </div>
    </DrawerHeader>

    <div className="px-6 pb-6 space-y-4">
      {favorites.length === 0 ? (
        /* Estado vacío con ilustración */
        <div className="py-12 text-center space-y-4">
          <div className="w-32 h-32 mx-auto">
            <EmptyFavoritesIllustration />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            No hay favoritos aún
          </h3>
          <p className="text-sm text-gray-600 max-w-xs mx-auto">
            Toca el ícono de corazón en tus platos favoritos para guardarlos aquí
          </p>
        </div>
      ) : (
        <>
          {/* Lista de favoritos */}
          <div className="space-y-3">
            {favorites.map(product => (
              <div
                key={product.id}
                className="flex gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={() => openProductDetail(product)}
              >
                {/* Thumbnail */}
                <img
                  src={product.images[0]}
                  className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                />

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 truncate">
                    {product.name}
                  </h4>
                  <p className="text-sm text-gray-600 line-clamp-1">
                    {product.description}
                  </p>
                  <p className="text-lg font-bold text-primary-600 mt-1">
                    ${product.price}
                  </p>
                </div>

                {/* Botón remover */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFavorite(product.id);
                  }}
                  className="p-2 hover:bg-gray-200 rounded-full h-fit transition-colors"
                >
                  <TrashIcon className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="sticky bottom-0 p-4 bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl mt-6">
            <div className="flex justify-between items-center">
              <span className="text-gray-700 font-medium">Total estimado:</span>
              <span className="text-2xl font-bold text-primary-600">
                ${totalPrice}
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  </DrawerContent>
</Drawer>
```

**Features Nuevas:**
- Estado vacío con ilustración custom
- Cards horizontales compactos
- Botón eliminar individual
- Total con gradiente destacado
- Animación al remover items
- Sticky footer con total

---

#### **7. LOADING STATES (Skeletons)**

**Antes:** Spinners o texto "Loading..."

**Después:** Skeleton screens con shimmer
```tsx
// ProductCardSkeleton
<div className="rounded-xl overflow-hidden animate-pulse">
  {/* Imagen skeleton */}
  <div className="w-full aspect-[4/3] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer" />

  {/* Contenido skeleton */}
  <div className="p-4 space-y-3">
    <div className="h-5 bg-gray-200 rounded w-3/4" />
    <div className="h-4 bg-gray-200 rounded w-full" />
    <div className="h-4 bg-gray-200 rounded w-5/6" />
    <div className="flex gap-2">
      <div className="h-6 bg-gray-200 rounded-full w-16" />
      <div className="h-6 bg-gray-200 rounded-full w-20" />
    </div>
  </div>
</div>

// Animation
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
```

---

#### **8. EMPTY STATES**

**Nuevo Sistema de Estados Vacíos:**
```tsx
<EmptyState
  illustration={<NoResultsIllustration />}
  title="No encontramos resultados"
  description="Intenta buscar con otras palabras o explora nuestras categorías"
  action={
    <Button onClick={clearFilters}>
      Limpiar filtros
    </Button>
  }
/>

<EmptyState
  illustration={<NoProductsIllustration />}
  title="Esta categoría está vacía"
  description="Pronto agregaremos más productos deliciosos"
/>
```

**Ilustraciones a crear:**
- NoResults (lupa con X)
- NoFavorites (corazón vacío)
- NoProducts (plato vacío)
- Error (triángulo de advertencia)

---

### 🎭 MICRO-ANIMACIONES

**Lista de animaciones a implementar:**

1. **Add to Favorites**
   - Escala del botón: scale(1) → scale(1.2) → scale(1)
   - Fill animation del corazón
   - Confetti particles (opcional)

2. **Filter Chips**
   - Background change con transition
   - Scale en tap: scale(1) → scale(0.95) → scale(1)

3. **Product Cards**
   - Hover: lift effect (translateY(-4px) + shadow)
   - Image zoom on hover (scale(1.05))

4. **Scroll Reveal**
   - Fade in + slide up al aparecer en viewport
   - Stagger delay entre cards (50ms cada uno)

5. **Drawer Open**
   - Slide up from bottom
   - Backdrop fade in
   - Spring animation (bounce)

6. **Search Input**
   - Border pulse en focus
   - Clear button fade in

7. **Category Selection**
   - Ring pulse animation
   - Background color transition

8. **Loading States**
   - Shimmer effect
   - Pulse animation

---

## 4. PLANIFICACIÓN COMPLETA DE IMPLEMENTACIÓN

### 📦 FASE 1: FUNDAMENTOS DEL SISTEMA DE DISEÑO (Semana 1-2)

#### **1.1 Setup del Design System**
**Archivos a crear:**
```
/packages/ui/src/styles/
├── design-tokens.css          # Variables CSS completas
├── animations.css             # Keyframes y transiciones
├── utilities.css              # Clases utility custom
└── themes/
    ├── default-theme.css      # Tema por defecto
    └── dark-theme.css         # Dark mode (futuro)
```

**Tareas:**
- [ ] Crear archivo `design-tokens.css` con todas las variables CSS
  - Colores extendidos (10 niveles de grises, primary, semantic)
  - Espaciado sistemático (8px base)
  - Tipografía con escala completa
  - Sombras (8 niveles)
  - Border radius (6 niveles)
- [ ] Crear archivo `animations.css` con keyframes y transiciones
  - slideUp, fadeIn, scaleIn, shimmer
  - Bounce, pulse animations
  - Duraciones y easing curves
- [ ] Actualizar `tailwind.config.ts` para usar tokens
  - Extender theme con variables custom
  - Agregar plugins (line-clamp, scrollbar-hide)
  - Configurar colores semánticos
- [ ] Crear componente `ThemeProvider` mejorado
  - Aplicar variables CSS dinámicamente
  - Support para paletas custom de restaurantes
  - Tipografía dinámica
- [ ] Testing de tokens en diferentes pantallas
  - Mobile (360px, 375px, 414px)
  - Tablet (768px, 1024px)
  - Desktop (1280px, 1920px)

**Resultado esperado:**
- Sistema de tokens CSS completamente funcional
- Documentación de uso de cada token
- Storybook con showcase de colores, tipografía, espaciado

---

#### **1.2 Actualización de Componentes Base de UI**
**Componentes a refactorizar (en `/packages/ui/src/components/`):**

**Badge:**
```tsx
// Agregar nuevas variantes
variants: {
  variant: {
    default: "bg-primary-100 text-primary-700",
    info: "bg-blue-100 text-blue-700",
    success: "bg-green-100 text-green-700",
    warning: "bg-yellow-100 text-yellow-700",
    error: "bg-red-100 text-red-700",
  },
  size: {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-3 py-1",
    lg: "text-base px-4 py-1.5",
  }
}
```

**Button:**
```tsx
// Mejorar variantes existentes
variants: {
  variant: {
    default: "bg-primary-600 hover:bg-primary-700 shadow-md hover:shadow-lg",
    outline: "border-2 border-primary-600 hover:bg-primary-50",
    ghost: "hover:bg-gray-100",
    gradient: "bg-gradient-to-r from-primary-500 to-primary-700",
  },
  size: {
    sm: "h-9 px-3 text-sm",
    md: "h-11 px-6 text-base",
    lg: "h-14 px-8 text-lg",
    icon: "h-10 w-10",
  }
}
// Agregar loading state, icon support, animaciones
```

**Card:**
```tsx
// Agregar elevaciones y variantes
variants: {
  variant: {
    default: "bg-white border border-gray-200",
    elevated: "bg-white shadow-lg",
    glass: "bg-white/80 backdrop-blur-md",
    gradient: "bg-gradient-to-br from-primary-50 to-white",
  },
  padding: {
    none: "p-0",
    sm: "p-3",
    md: "p-6",
    lg: "p-8",
  }
}
// Agregar hover effects opcionales
```

**Input:**
```tsx
// Mejorar estilos y estados
className: cn(
  "h-11 px-4 rounded-xl",
  "border-2 border-gray-200",
  "focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10",
  "transition-all duration-200",
  "placeholder:text-gray-400"
)
// Agregar iconos left/right, clear button, loading state
```

**Drawer:**
```tsx
// Mejorar animaciones
<DrawerPrimitive.Content
  className={cn(
    "fixed inset-x-0 bottom-0 z-50",
    "bg-white rounded-t-3xl",
    "shadow-2xl",
    "animate-slideUp"  // Nueva animación
  )}
>
  {/* Drag handle mejorado */}
  <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mt-3" />
  {children}
</DrawerPrimitive.Content>
```

**Tareas:**
- [ ] Badge: agregar variantes semánticas, tamaños, with-icon
- [ ] Button: mejorar hover/active states, loading spinner, icon support
- [ ] Card: agregar variantes de elevación, padding options, hover effects
- [ ] Input: agregar iconos, clear button, estados de error/success
- [ ] Drawer: mejorar animaciones, agregar spring effect, backdrop blur
- [ ] Chip (nuevo): crear componente para filtros
- [ ] EmptyState (nuevo): componente para estados vacíos
- [ ] Skeleton (nuevo): componentes skeleton con shimmer

**Resultado esperado:**
- 30+ componentes base actualizados
- Storybook con todos los estados y variantes
- Tests unitarios pasando
- Documentación de uso

---

### 📱 FASE 2: APP MENU (Cliente - Menú Digital) (Semana 3-5)

#### **2.1 Rediseño de Product Card**

**Archivo:** `/apps/menu/modules/products/components/card/product-card.tsx`

**Tareas:**
- [ ] Implementar nuevo layout (imagen 70%, contenido 30%)
- [ ] Agregar sistema de badges (nuevo, descuento, popular)
- [ ] Implementar overlay de gradiente en imagen
- [ ] Agregar botón de favorito flotante con animación
- [ ] Precio destacado sobre la imagen
- [ ] Hover effect con zoom en imagen
- [ ] Line-clamp para nombre y descripción
- [ ] Chips de categoría/subcategoría
- [ ] Sombra elevada con hover
- [ ] Animación de entrada (fadeIn + slideUp)
- [ ] Testing responsive (mobile, tablet, desktop)
- [ ] Performance: lazy loading de imágenes
- [ ] Accesibilidad: ARIA labels, keyboard navigation

**Componentes nuevos a crear:**
```tsx
// ProductCardBadge.tsx
<Badge variant="info" className="absolute top-3 left-3">
  Nuevo
</Badge>

// ProductCardImage.tsx
<div className="relative aspect-[4/3] overflow-hidden group">
  <Image
    src={image}
    alt={name}
    fill
    className="object-cover group-hover:scale-105 transition-transform duration-500"
  />
  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
</div>

// ProductCardFavoriteButton.tsx
<button
  onClick={handleToggleFavorite}
  className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:scale-110 transition-transform"
>
  <HeartIcon className={isFavorite ? "fill-red-500 scale-110" : ""} />
</button>
```

**Testing checklist:**
- [ ] Render correcto en mobile (360px)
- [ ] Hover effects funcionan en desktop
- [ ] Animación de favorito es suave
- [ ] Imágenes cargan con lazy loading
- [ ] Fallback cuando no hay imagen
- [ ] Line-clamp funciona correctamente
- [ ] Badges se posicionan correctamente
- [ ] Accesibilidad: tab navigation, screen readers

---

#### **2.2 Rediseño de Categories Section**

**Archivos:**
- `/apps/menu/modules/categories/components/categories-section.tsx` (nuevo)
- `/apps/menu/modules/categories/components/category-card.tsx` (nuevo)

**Tareas:**
- [ ] Reemplazar acordeón por scroll horizontal
- [ ] Crear CategoryCard con imagen circular
- [ ] Agregar gradiente de fondo en imagen
- [ ] Badge contador de productos
- [ ] Ring border en categoría activa
- [ ] Snap scroll para alineación perfecta
- [ ] Scroll indicators (sombras en los bordes)
- [ ] Animación de selección
- [ ] Estado activo con background highlight
- [ ] Testing de scroll en diferentes dispositivos
- [ ] Accesibilidad: keyboard navigation horizontal

**Nuevo componente:**
```tsx
// CategoryCard.tsx
export function CategoryCard({ category, isActive, onClick }: Props) {
  return (
    <div
      className={cn(
        "snap-start shrink-0 w-[140px] p-4 rounded-2xl cursor-pointer transition-all",
        isActive
          ? "bg-primary-50 ring-2 ring-primary-500"
          : "bg-white hover:bg-gray-50"
      )}
      onClick={onClick}
    >
      {/* Imagen circular con gradiente */}
      <div className="relative w-20 h-20 mx-auto mb-3">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-500/20 to-primary-700/20" />
        <img
          src={category.image}
          alt={category.name}
          className="relative w-full h-full rounded-full object-cover ring-2 ring-white shadow-lg"
        />
        {/* Badge contador */}
        <div className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-md">
          {category.summary.totalProducts}
        </div>
      </div>

      {/* Nombre */}
      <p className={cn(
        "text-center text-sm font-semibold transition-colors",
        isActive ? "text-primary-700" : "text-gray-900"
      )}>
        {category.name}
      </p>
    </div>
  );
}
```

---

#### **2.3 Header con Blur y Animación de Scroll**

**Archivo:** `/apps/menu/modules/layout/header/header.tsx`

**Tareas:**
- [ ] Hacer header fixed con sticky positioning
- [ ] Agregar backdrop blur cuando hace scroll
- [ ] Sombra condicional según scroll position
- [ ] Logo con efecto de rotación en hover
- [ ] Badge animado en botón de favoritos
- [ ] Información del restaurante visible
- [ ] useScroll hook para detectar scroll position
- [ ] Animación suave de transición
- [ ] Testing en scroll rápido/lento
- [ ] Performance: debounce del scroll listener

**Código:**
```tsx
// useScrollPosition hook
function useScrollPosition() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return isScrolled;
}

// Header component
export function Header({ restaurant, favoritesCount }: Props) {
  const isScrolled = useScrollPosition();

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/80 backdrop-blur-lg shadow-md py-3"
          : "bg-transparent py-4"
      )}
    >
      {/* ... contenido ... */}
    </header>
  );
}
```

---

#### **2.4 Search Bar + Filter Chips**

**Archivos:**
- `/apps/menu/modules/products/components/search/product-search-bar.tsx` (refactor)
- `/apps/menu/modules/products/components/filters/filter-chips.tsx` (nuevo)
- `/apps/menu/modules/products/components/filters/filter-chip.tsx` (nuevo)

**Tareas:**
- [ ] Refactorizar search bar con nuevo diseño
- [ ] Input redondeado con iconos left/right
- [ ] Clear button con animación
- [ ] Debounce en la búsqueda (300ms)
- [ ] Crear FilterChip component
- [ ] Scroll horizontal con chips de categorías
- [ ] Chip de precio con modal/drawer de rango
- [ ] Chip "Más filtros" con contador de filtros activos
- [ ] Animación de selección de chip
- [ ] Contador de resultados
- [ ] Sticky positioning del search bar
- [ ] Testing de performance con muchos filtros

**Nuevos componentes:**
```tsx
// FilterChip.tsx
export function FilterChip({
  children,
  active,
  icon: Icon,
  badge,
  onClick
}: Props) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "shrink-0 flex items-center gap-2 px-4 py-2 rounded-full",
        "font-medium text-sm transition-all",
        "active:scale-95",
        active
          ? "bg-primary-600 text-white shadow-md shadow-primary-500/30"
          : "bg-white text-gray-700 border-2 border-gray-200 hover:border-primary-300"
      )}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {children}
      {badge && (
        <Badge size="sm" className="ml-1">
          {badge}
        </Badge>
      )}
    </button>
  );
}

// PriceFilterDrawer.tsx (nuevo)
export function PriceFilterDrawer({ open, onOpenChange }: Props) {
  const [range, setRange] = useState([0, 100]);

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Filtrar por precio</DrawerTitle>
        </DrawerHeader>
        <div className="px-6 pb-6 space-y-6">
          <Slider
            value={range}
            onValueChange={setRange}
            min={0}
            max={200}
            step={5}
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>${range[0]}</span>
            <span>${range[1]}</span>
          </div>
          <Button onClick={applyFilter} className="w-full">
            Aplicar filtro
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
```

---

#### **2.5 Product Detail Drawer (Bottom Sheet)**

**Archivo:** `/apps/menu/modules/products/components/detail/product-detail-drawer.tsx` (nuevo)

**Tareas:**
- [ ] Crear drawer de detalles de producto
- [ ] Carrusel de imágenes con indicadores
- [ ] Hero image a pantalla completa
- [ ] Información organizada en secciones
- [ ] Botón de favorito con animación
- [ ] Chips de categoría/subcategoría
- [ ] Card de información adicional
- [ ] Precio destacado con gradiente
- [ ] Botón de compartir
- [ ] Animación spring al abrir
- [ ] Drag to close functionality
- [ ] Testing de gestures en móvil

**Implementación:**
```tsx
// ProductDetailDrawer.tsx
export function ProductDetailDrawer({ product, open, onOpenChange }: Props) {
  const [currentImage, setCurrentImage] = useState(0);
  const { isFavorite, toggleFavorite } = useFavoriteProducts();

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[90vh]">
        {/* Hero con carrusel */}
        <div className="relative h-[300px]">
          <Carousel
            selectedIndex={currentImage}
            onSelect={setCurrentImage}
          >
            {product.images.map((img, i) => (
              <CarouselSlide key={i}>
                <img
                  src={img}
                  alt={`${product.name} - Imagen ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </CarouselSlide>
            ))}
          </Carousel>

          {/* Botón cerrar */}
          <button
            className="absolute top-4 right-4 bg-white/90 backdrop-blur p-2 rounded-full shadow-lg"
            onClick={() => onOpenChange(false)}
          >
            <XIcon className="w-6 h-6" />
          </button>

          {/* Indicadores */}
          {product.images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1">
              {product.images.map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "h-2 rounded-full transition-all",
                    i === currentImage
                      ? "bg-white w-6"
                      : "bg-white/50 w-2"
                  )}
                />
              ))}
            </div>
          )}
        </div>

        {/* Contenido */}
        <div className="p-6 space-y-6">
          {/* Header con favorito */}
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {product.name}
              </h2>
              <div className="flex items-center gap-2">
                <Chip>{product.category}</Chip>
                {product.subcategory && (
                  <Chip>{product.subcategory}</Chip>
                )}
              </div>
            </div>

            <button
              className="p-3 hover:bg-gray-100 rounded-full transition-colors"
              onClick={() => toggleFavorite(product.id)}
            >
              <HeartIcon
                className={cn(
                  "w-6 h-6 transition-all",
                  isFavorite(product.id)
                    ? "fill-red-500 text-red-500 scale-110"
                    : "text-gray-400"
                )}
              />
            </button>
          </div>

          {/* Descripción */}
          <p className="text-gray-600 leading-relaxed">
            {product.description}
          </p>

          {/* Información adicional */}
          <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl">
            <div>
              <p className="text-sm text-gray-500 mb-1">Categoría</p>
              <p className="font-medium">{product.category}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Disponibilidad</p>
              <p className="font-medium text-green-600">
                {product.enabled ? 'Disponible' : 'No disponible'}
              </p>
            </div>
          </div>

          {/* Precio y acción */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl">
            <div>
              <p className="text-sm text-gray-600 mb-1">Precio</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-primary-600">
                  ${product.price}
                </span>
                {product.discountedPrice && (
                  <span className="text-lg text-gray-500 line-through">
                    ${product.discountedPrice}
                  </span>
                )}
              </div>
            </div>

            <Button
              size="lg"
              className="shadow-lg shadow-primary-500/30"
              onClick={handleShare}
            >
              <ShareIcon className="mr-2 w-5 h-5" />
              Compartir
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
```

---

#### **2.6 Favorites Drawer Mejorado**

**Archivo:** `/apps/menu/modules/products/components/favorites/favorites-drawer.tsx` (refactor)

**Tareas:**
- [ ] Mejorar diseño del drawer de favoritos
- [ ] Estado vacío con ilustración custom
- [ ] Cards horizontales compactos para cada favorito
- [ ] Thumbnail de imagen
- [ ] Botón de eliminar individual
- [ ] Total con gradiente destacado
- [ ] Animación al eliminar items
- [ ] Botón "Limpiar todo" con confirmación
- [ ] Testing de performance con muchos favoritos

---

#### **2.7 Loading States y Empty States**

**Archivos a crear:**
```
/apps/menu/modules/shared/components/
├── skeletons/
│   ├── product-card-skeleton.tsx
│   ├── category-skeleton.tsx
│   └── header-skeleton.tsx
├── empty-states/
│   ├── empty-state.tsx
│   ├── no-results-empty-state.tsx
│   ├── no-favorites-empty-state.tsx
│   └── no-products-empty-state.tsx
└── illustrations/
    ├── no-results-illustration.tsx
    ├── no-favorites-illustration.tsx
    ├── no-products-illustration.tsx
    └── error-illustration.tsx
```

**Tareas:**
- [ ] Crear skeleton components con shimmer effect
- [ ] Implementar EmptyState component genérico
- [ ] Crear ilustraciones SVG custom para cada estado
- [ ] Testing de loading states en conexiones lentas
- [ ] Testing de empty states en diferentes escenarios

---

#### **2.8 Animaciones y Micro-interacciones**

**Archivos:**
- `/apps/menu/lib/animations/` (nuevo directorio)
  - `favorite-animation.ts`
  - `scroll-reveal.ts`
  - `hover-effects.ts`
  - `confetti.ts` (opcional)

**Tareas:**
- [ ] Implementar animación de favorito (scale + fill)
- [ ] Scroll reveal para product cards (intersection observer)
- [ ] Stagger animation para lista de productos
- [ ] Hover effects en cards
- [ ] Animación de carga (shimmer)
- [ ] Spring animation en drawers
- [ ] Testing de performance (60fps)
- [ ] Reducción de movimiento (prefers-reduced-motion)

**Implementación scroll reveal:**
```tsx
// useScrollReveal.ts
export function useScrollReveal() {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

// Uso en ProductCard
export function ProductCard({ product, index }: Props) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <div
      ref={ref}
      className={cn(
        "opacity-0 translate-y-4 transition-all duration-500",
        isVisible && "opacity-100 translate-y-0"
      )}
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      {/* Contenido del card */}
    </div>
  );
}
```

---

#### **2.9 Performance y Optimización**

**Tareas:**
- [ ] Implementar lazy loading de imágenes (next/image)
- [ ] Virtualización de lista de productos (react-window)
- [ ] Code splitting por ruta
- [ ] Preload de imágenes críticas
- [ ] Optimización de bundle size
- [ ] Service worker para caching (opcional)
- [ ] Lighthouse audit (objetivo: >90 en todas las métricas)
- [ ] Testing de performance en dispositivos low-end

---

### 💼 FASE 3: APP DASHBOARD (Admin Panel) (Semana 6-8)

#### **3.1 Rediseño de Business Cards**

**Archivo:** `/apps/app/modules/businesses/components/card/business-card.tsx`

**Tareas:**
- [ ] Rediseñar card con imagen hero más grande
- [ ] Agregar gradiente overlay
- [ ] Badges de estado (activo, inactivo)
- [ ] Hover effects mejorados
- [ ] Información resumida visible
- [ ] Quick actions en hover
- [ ] Animación de entrada
- [ ] Testing responsive

---

#### **3.2 Menu Customization Panel**

**Archivo:** `/apps/app/modules/menus/components/customize/` (refactor completo)

**Tareas:**
- [ ] Rediseñar panel de personalización
- [ ] Color picker mejorado (con presets)
- [ ] Tipografía con preview en tiempo real
- [ ] Upload de imágenes con crop
- [ ] Preview del menú en tiempo real
- [ ] Tabs para organizar opciones
- [ ] Guardar presets de personalización
- [ ] Testing de cambios en tiempo real

---

#### **3.3 Categories & Products Management**

**Archivos:**
- `/apps/app/modules/categories/components/` (refactor)
- `/apps/app/modules/products/components/` (refactor)

**Tareas:**
- [ ] Rediseñar acordeón de categorías
- [ ] Drag & drop para reordenar
- [ ] Inline editing de nombres
- [ ] Mejores estados de carga
- [ ] Confirmaciones visuales
- [ ] Toast notifications mejorados
- [ ] Testing de UX

---

#### **3.4 Branch QR Code Generator**

**Archivo:** `/apps/app/modules/branches/components/card/branch-preview-card.tsx`

**Tareas:**
- [ ] Rediseñar card de branch preview
- [ ] QR code más grande y destacado
- [ ] Opciones de descarga (PNG, SVG, PDF)
- [ ] Personalización de QR (logo en centro, colores)
- [ ] Preview del menú público
- [ ] Compartir link directo
- [ ] Testing de QR codes generados

---

### 🎨 FASE 4: POLISH Y REFINAMIENTO (Semana 9-10)

#### **4.1 Dark Mode (Opcional)**

**Tareas:**
- [ ] Crear paleta de colores para dark mode
- [ ] Implementar toggle de tema
- [ ] Actualizar todos los componentes
- [ ] Testing de contraste
- [ ] Persistencia de preferencia

---

#### **4.2 Ilustraciones Custom**

**Tareas:**
- [ ] Crear ilustraciones SVG para empty states
- [ ] Ilustraciones para onboarding
- [ ] Iconos custom adicionales
- [ ] Animación de ilustraciones

---

#### **4.3 Accesibilidad**

**Tareas:**
- [ ] Audit completo de accesibilidad (WAVE, axe)
- [ ] Navegación por teclado en todos los componentes
- [ ] ARIA labels y roles
- [ ] Testing con screen readers
- [ ] Contraste de colores (WCAG AA)
- [ ] Focus indicators visibles
- [ ] Skip links

---

#### **4.4 Testing Completo**

**Tareas:**
- [ ] Unit tests para componentes nuevos
- [ ] Integration tests para flujos principales
- [ ] E2E tests con Playwright
- [ ] Visual regression tests
- [ ] Performance testing
- [ ] Mobile testing en dispositivos reales
- [ ] Cross-browser testing

---

#### **4.5 Documentación**

**Tareas:**
- [ ] Documentar sistema de diseño completo
- [ ] Storybook con todos los componentes
- [ ] Guidelines de uso de componentes
- [ ] Patterns y best practices
- [ ] Changelog detallado

---

## 5. CRONOGRAMA Y FASES

### 📅 TIMELINE DETALLADO

#### **SEMANA 1-2: Fundamentos**
- Días 1-3: Setup de design tokens y variables CSS
- Días 4-7: Actualización de componentes base (Badge, Button, Card, Input)
- Días 8-10: Drawer, Chip, EmptyState, Skeleton
- Días 11-14: Testing y documentación de componentes base

#### **SEMANA 3-5: App Menu (Cliente)**
- Días 15-17: Product Card rediseñado + testing
- Días 18-20: Categories Section con scroll horizontal
- Días 21-23: Header con blur + Search Bar + Filter Chips
- Días 24-26: Product Detail Drawer
- Días 27-29: Favorites Drawer mejorado
- Días 30-32: Loading states, empty states, ilustraciones
- Días 33-35: Animaciones y micro-interacciones

#### **SEMANA 6-8: App Dashboard (Admin)**
- Días 36-39: Business Cards rediseñadas
- Días 40-43: Menu Customization Panel
- Días 44-47: Categories & Products Management
- Días 48-50: Branch QR Generator
- Días 51-56: Testing y ajustes

#### **SEMANA 9-10: Polish**
- Días 57-60: Dark mode (opcional)
- Días 61-64: Ilustraciones custom
- Días 65-67: Accesibilidad audit y fixes
- Días 68-70: Testing completo (E2E, performance, cross-browser)

---

## 📊 MÉTRICAS DE ÉXITO

### **Antes vs Después**

| Métrica | Antes | Objetivo |
|---------|-------|----------|
| **Lighthouse Performance** | ~75 | >90 |
| **First Contentful Paint** | ~2.5s | <1.5s |
| **Time to Interactive** | ~4s | <2.5s |
| **Cumulative Layout Shift** | 0.15 | <0.1 |
| **Accesibilidad Score** | ~80 | >95 |
| **Componentes documentados** | 30% | 100% |
| **Test Coverage** | ~40% | >80% |
| **Bundle Size (Menu App)** | ~450KB | <350KB |

---

## 🔧 HERRAMIENTAS Y RECURSOS

### **Desarrollo**
- **Figma**: Para mockups y prototipos
- **Storybook**: Documentación de componentes
- **Playwright**: E2E testing
- **Lighthouse**: Performance audits
- **axe DevTools**: Accesibilidad

### **Diseño**
- **Coolors.co**: Generación de paletas
- **Google Fonts**: Tipografías
- **Undraw / Storyset**: Ilustraciones base
- **Heroicons**: Iconos adicionales

### **Referencias**
- **Dribbble**: Inspiración visual
- **Mobbin**: Patrones de UI mobile
- **Laws of UX**: Principios de diseño
- **Material Design**: Guidelines

---

## ✅ CHECKLIST FINAL

### **Funcionalidades Mantenidas (Sin Pérdida)**
- [x] Autenticación con NextAuth
- [x] CRUD de businesses, branches, menus
- [x] CRUD de categories, subcategories, products
- [x] Sistema de favoritos
- [x] Filtros y búsqueda
- [x] Generación de QR codes
- [x] Personalización de menús (tipografía, colores)
- [x] Sistema de promociones
- [x] Gestión de miembros
- [x] Schedules de horarios
- [x] LinkIt functionality
- [x] SSG de páginas de menú
- [x] Responsive design
- [x] Dark mode support (next-themes)

### **Mejoras Visuales Implementadas**
- [ ] Sistema de diseño completo con tokens
- [ ] Paleta de colores extendida (10+ colores)
- [ ] Tipografía con escala jerárquica
- [ ] Espaciado sistemático (8px base)
- [ ] Sombras y elevación (8 niveles)
- [ ] Animaciones y transiciones suaves
- [ ] Product cards con imágenes hero
- [ ] Categories con scroll horizontal
- [ ] Header con blur backdrop
- [ ] Search bar con filter chips
- [ ] Product detail drawer
- [ ] Favorites drawer mejorado
- [ ] Loading states con shimmer
- [ ] Empty states con ilustraciones
- [ ] Micro-interacciones
- [ ] Hover effects
- [ ] Scroll reveal animations

### **Calidad y Performance**
- [ ] Tests unitarios >80% coverage
- [ ] E2E tests para flujos principales
- [ ] Lighthouse score >90
- [ ] Accesibilidad WCAG AA
- [ ] Cross-browser testing
- [ ] Mobile testing en dispositivos reales
- [ ] Performance optimizado
- [ ] Bundle size reducido

### **Documentación**
- [ ] Storybook completo
- [ ] Design system documentado
- [ ] Component guidelines
- [ ] Changelog detallado
- [ ] README actualizado

---

## 🎯 PRÓXIMOS PASOS INMEDIATOS

1. **Revisar y aprobar este plan**
2. **Crear branch de desarrollo**: `git checkout -b refactor/design-system`
3. **Comenzar con Fase 1**: Setup de design tokens
4. **Daily progress**: Actualizar todo list y documentar cambios
5. **Weekly reviews**: Revisar progreso y ajustar plan si es necesario

---

**¿Estás listo para comenzar? ¿Hay algo que quieras ajustar en este plan?**
