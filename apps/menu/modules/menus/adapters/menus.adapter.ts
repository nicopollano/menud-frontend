import { categoriesAdapter } from '@/modules/categories/adapters/categories.adapter'
import type { Menu, MenuResponse } from '@ristokit/shared/models/menu.model'

export function menuAdapter(menu: MenuResponse): Menu {
  const palette = menu.menuPalettes?.find((palette) => palette.enabled) || menu.palette

  return {
    id: menu.id.toString(),
    name: menu.name,
    cover: menu.cover,
    logo: menu.logo,
    description: menu.description,
    typography: menu.typography,
    enabled: menu.enabled,
    createdAt: new Date(menu.createdAt),
    updatedAt: new Date(menu.updatedAt),

    palette: palette
      ? {
          ...palette,
          id: palette.id.toString(),
          createdAt: new Date(palette.createdAt),
          updatedAt: new Date(palette.updatedAt)
        }
      : null,
    palettes: menu.menuPalettes?.map((palette) => ({
      id: palette.id.toString(),
      color1: palette.color1,
      color2: palette.color2,
      color3: palette.color3,
      enabled: palette.enabled,
      createdAt: new Date(palette.createdAt),
      updatedAt: new Date(palette.updatedAt)
    })),

    categories: menu.categories ? categoriesAdapter(menu.categories) : undefined
  }
}
