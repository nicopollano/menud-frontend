# Contributing Guide

How to contribute to the Menud project.

---

## Workflow

1. **Fork** the repository
2. **Clone** your fork
3. **Create** a branch for your feature
4. **Develop** your changes
5. **Test** locally
6. **Push** to your fork
7. **Open** a Pull Request

---

## Branching Strategy

```
main            ← production, always deployable
  └── feature/* ← new features
  └── fix/*     ← bug fixes
  └── docs/*    ← documentation changes
```

### Naming Convention

- `feature/add-dark-mode`
- `fix/product-card-price`
- `docs/update-deployment-guide`
- `refactor/product-components`

---

## Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): short description

[optional: commit body]

[optional: footer]
```

### Types

| Type | Description |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation changes |
| `refactor` | Refactoring without behavior change |
| `style` | Style changes (formatting, spacing) |
| `test` | Adding or modifying tests |
| `chore` | Maintenance tasks |

### Examples

```
feat(products): add favorite heart animation
fix(menu): resolve category filter not resetting
docs(readme): update deployment instructions
refactor(branches): extract BranchProvider logic
```

---

## Pull Request Template

When opening a PR, use the provided template:

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Feature
- [ ] Fix
- [ ] Refactor
- [ ] Documentation

## Screenshots (if applicable)
Screenshots of visual changes

## Testing
- [ ] Tested locally
- [ ] Tested in preview environment

## Related Issues
Fixes #123
```

---

## Code Review

Before merge, the PR must:

1. Pass linting (`pnpm lint`)
2. Pass type checking (`pnpm build`)
3. Not break existing functionality
4. Have at least 1 approval

---

## Development Setup

### Pre-commit Hooks

Lefthook automatically runs Biome check on staged files:

```yaml
pre-commit:
  commands:
    check:
      glob: "*.{js,ts,cjs,mjs,d.cts,d.mts,jsx,tsx,json,jsonc}"
      run: npx @biomejs/biome check --write {staged_files}
      stage_fixed: true
```

### Formatting

```bash
# Format all code
pnpm format

# Check lint
pnpm lint
```

---

## Module Structure

When adding a new module, follow this structure:

```
modules/[name]/
├── components/     # React components
├── services/       # Business logic and API calls
├── providers/      # Context providers
├── hooks/          # Custom hooks
├── models/         # TypeScript types
└── index.ts        # Public exports
```

---

**See also:** [Code Quality](code-quality.md) | [Adding Components](adding-components.md)
