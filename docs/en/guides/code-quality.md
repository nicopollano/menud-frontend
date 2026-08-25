# Code Quality

Tools and configurations to maintain consistent, clean code.

---

## Tools

| Tool | Purpose | Configuration |
|------|---------|---------------|
| **Biome** | Linting + Formatting | `biome.json` |
| **Prettier** | Additional formatting | `.prettierrc.json` |
| **ESLint** | JS/TS linting | `.eslintrc.js` |
| **Lefthook** | Git hooks | `lefthook.yml` |
| **TypeScript** | Type checking | `tsconfig.json` |

---

## Biome

Biome is the primary linter and formatter.

### Commands

```bash
# Check for issues
npx @biomejs/biome check .

# Auto-fix
npx @biomejs/biome check --write .

# Format only
npx @biomejs/biome format --write .
```

### Glob Pattern

```json
{
  "glob": "*.{js,ts,cjs,mjs,d.cts,d.mts,jsx,tsx,json,jsonc}"
}
```

---

## Prettier

Prettier is used for additional formatting, especially for Markdown and TypeScript files.

### Plugin

Uses `prettier-plugin-tailwindcss` to automatically sort Tailwind classes:

```json
{
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

### Command

```bash
pnpm format
```

---

## Lefthook (Git Hooks)

### Pre-commit

Runs automatically before each commit:

```yaml
pre-commit:
  commands:
    check:
      glob: "*.{js,ts,cjs,mjs,d.cts,d.mts,jsx,tsx,json,jsonc}"
      run: npx @biomejs/biome check --write --no-errors-on-unmatched --files-ignore-unknown=true --colors=off {staged_files}
      stage_fixed: true
```

This means:
1. Only staged files are checked
2. Biome automatically fixes issues
3. Fixed files are re-staged

### Installation

Lefthook is installed automatically when running `pnpm install` (via the `prepare` script).

---

## TypeScript

### Type Checking

```bash
# Check types in a specific app
pnpm turbo check-types --filter=menu

# Check all packages
pnpm turbo check-types
```

### Configuration

Each app and package has its own `tsconfig.json` extending the shared configuration:

```json
{
  "extends": "@ristokit/typescript-config/nextjs.json"
}
```

---

## ESLint

ESLint is used as a complement to Biome for specific React and Next.js rules.

```bash
pnpm lint
pnpm lint:fix
```

---

## Typical Development Flow

```
1. Write code
   ↓
2. Save file (pre-commit hook runs)
   ↓
3. Biome auto-fixes
   ↓
4. Commit with clean code
   ↓
5. Push → GitHub Actions verifies
```

---

**See also:** [Contributing](contributing.md) | [Adding Components](adding-components.md)
