import { productsAdapter } from '@/modules/products/adapters/products.adapter'
import { subcategoriesAdapter } from '@/modules/subcategories/adapters/subcategories.adapter'
import type { Category, CategoryResponse } from '@ristokit/shared/models/category.model'

export function categoryAdapter(category: CategoryResponse): Category {
  return {
    id: category.id.toString(),
    name: category.name,
    description: category.description,
    image: category.image,
    enabled: category.enabled,
    // createdAt: new Date(category.createdAt),
    // updatedAt: new Date(category.updatedAt)

    summary: {
      totalProducts: category.summary?.totalProducts ?? 0,
      totalSubcategories: category.summary?.totalSubcategories ?? 0
    },

    // menu?: Menu
    products: category.products ? productsAdapter(category.products) : undefined,
    subcategories: category.subcategories ? subcategoriesAdapter(category.subcategories) : undefined
  }
}

export function categoriesAdapter(categories: CategoryResponse[]): Category[] {
  return categories.map(categoryAdapter)
}
