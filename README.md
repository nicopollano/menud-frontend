## Run the apps

Can run the apps with the following commands:

```bash
pnpm dev:app
pnpm dev:menu
pnpm dev:web
pnpm dev:admin
```

Or you can run all the apps with:

```bash
pnpm dev
```

## Build the apps

Can build the apps with the following commands:

```bash
pnpm build:app
pnpm build:menu
pnpm build:web
pnpm build:admin
```

Or you can build all the apps with:

```bash
pnpm build
```

## Adding components

To add components to your app, run the following command at the root of your project:

```bash
pnpm dlx shadcn@latest add button -c packages/ui
```

This will place the ui components in the `packages/ui/src/components` directory.

## Tailwind

Your `tailwind.config.ts` and `globals.css` are already set up to use the components from the `ui` package.

## Using components

To use the components in your app, import them from the `ui` package.

```tsx
import { Button } from '@ristokit/ui/components/button'
```
