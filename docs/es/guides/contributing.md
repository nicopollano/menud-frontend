# Cómo Contribuir

Guía para contribuir al proyecto Menud.

---

## Flujo de Trabajo

1. **Fork** el repositorio
2. **Clonar** tu fork
3. **Crear** una rama para tu feature
4. **Desarrollar** tus cambios
5. **Testing** local
6. **Push** a tu fork
7. **Abrir** un Pull Request

---

## Branching Strategy

```
main            ← producción, siempre deployable
  └── feature/* ← nuevas features
  └── fix/*     ← corrección de bugs
  └── docs/*    ← cambios de documentación
```

### Convención de Nombres

- `feature/add-dark-mode`
- `fix/product-card-price`
- `docs/update-deployment-guide`
- `refactor/product-components`

---

## Convención de Commits

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

```
tipo(alcance): descripción corta

[opcional: cuerpo del commit]

[opcional: footer]
```

### Tipos

| Tipo | Descripción |
|------|-------------|
| `feat` | Nueva feature |
| `fix` | Corrección de bug |
| `docs` | Cambios de documentación |
| `refactor` | Refactorización sin cambio de comportamiento |
| `style` | Cambios de estilo (formato, espaciado) |
| `test` | Agregar o modificar tests |
| `chore` | Tareas de mantenimiento |

### Ejemplos

```
feat(products): add favorite heart animation
fix(menu): resolve category filter not resetting
docs(readme): update deployment instructions
refactor(branches): extract BranchProvider logic
```

---

## Pull Request Template

Al abrir un PR, usa la plantilla proporcionada:

```markdown
## Descripción
Breve descripción de los cambios

## Tipo de Cambio
- [ ] Feature
- [ ] Fix
- [ ] Refactor
- [ ] Documentación

## Screenshots (si aplica)
Capturas de cambios visuales

## Testing
- [ ] Probado en entorno local
- [ ] Probado en entorno de preview

## Issues Relacionadas
Fixes #123
```

---

## Code Review

Antes de merge, el PR debe:

1. Pass linting (`pnpm lint`)
2. Pass type checking (`pnpm build`)
3. No romper funcionalidad existente
4. Tener al menos 1 aprobación

---

## Configuración de Desarrollo

### Hooks Pre-commit

Lefthook ejecuta automáticamente Biome check en archivos staged:

```yaml
pre-commit:
  commands:
    check:
      glob: "*.{js,ts,cjs,mjs,d.cts,d.mts,jsx,tsx,json,jsonc}"
      run: npx @biomejs/biome check --write {staged_files}
      stage_fixed: true
```

### Formateo

```bash
# Formatear todo el código
pnpm format

# Verificar lint
pnpm lint
```

---

## Estructura de un Módulo

Al agregar un nuevo módulo, sigue esta estructura:

```
modules/[nombre]/
├── components/     # Componentes React
├── services/       # Lógica de negocio y llamadas a API
├── providers/      # Context providers
├── hooks/          # Custom hooks
├── models/         # Tipos TypeScript
└── index.ts        # Exportaciones públicas
```

---

**Ver también:** [Calidad de Código](code-quality.md) | [Agregar Componentes](adding-components.md)
