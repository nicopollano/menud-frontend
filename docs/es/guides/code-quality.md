# Calidad de Código

Herramientas y configuraciones para mantener código consistente y limpio.

---

## Herramientas

| Herramienta | Propósito | Configuración |
|-------------|-----------|---------------|
| **Biome** | Linting + Formateo | `biome.json` |
| **Prettier** | Formateo adicional | `.prettierrc.json` |
| **ESLint** | Linting JavaScript/TS | `.eslintrc.js` |
| **Lefthook** | Git hooks | `lefthook.yml` |
| **TypeScript** | Type checking | `tsconfig.json` |

---

## Biome

Biome es el linter y formatter principal del proyecto.

### Comandos

```bash
# Verificar problemas
npx @biomejs/biome check .

# Corregir automáticamente
npx @biomejs/biome check --write .

# Solo formatear
npx @biomejs/biome format --write .
```

### Archivos en Blanco

```json
{
  "glob": "*.{js,ts,cjs,mjs,d.cts,d.mts,jsx,tsx,json,jsonc}"
}
```

---

## Prettier

Prettier se usa para formateo adicional, especialmente en archivos Markdown y TypeScript.

### Plugin

Usa `prettier-plugin-tailwindcss` para ordenar clases de Tailwind automáticamente:

```json
{
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

### Comando

```bash
pnpm format
```

---

## Lefthook (Git Hooks)

### Pre-commit

Se ejecuta automáticamente antes de cada commit:

```yaml
pre-commit:
  commands:
    check:
      glob: "*.{js,ts,cjs,mjs,d.cts,d.mts,jsx,tsx,json,jsonc}"
      run: npx @biomejs/biome check --write --no-errors-on-unmatched --files-ignore-unknown=true --colors=off {staged_files}
      stage_fixed: true
```

Esto significa:
1. Solo se verifican archivos staged
2. Biome corrige automáticamente los problemas
3. Los archivos corregidos se vuelven a stage

### Instalación

Lefthook se instala automáticamente al ejecutar `pnpm install` (vía el script `prepare`).

---

## TypeScript

### Verificación de Tipos

```bash
# Verificar tipos en una app específica
pnpm turbo check-types --filter=menu

# Verificar todos los paquetes
pnpm turbo check-types
```

### Configuración

Cada app y paquete tiene su propio `tsconfig.json` que extiende la configuración compartida:

```json
{
  "extends": "@ristokit/typescript-config/nextjs.json"
}
```

---

## ESLint

ESLint se usa como complemento a Biome para reglas específicas de React y Next.js.

```bash
pnpm lint
pnpm lint:fix
```

---

## Flujo Típico de Desarrollo

```
1. Escribir código
   ↓
2. Guardar archivo (pre-commit hook se ejecuta)
   ↓
3. Biome corrige automáticamente
   ↓
4. Commit con código limpio
   ↓
5. Push → GitHub Actions verifica
```

---

**Ver también:** [Contribuir](contributing.md) | [Agregar Componentes](adding-components.md)
