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

    products: category.products
      ? productsAdapter(
          category.products.map((product) => ({
            ...product,
            category: { name: category.name }
          }))
        )
      : undefined,
    subcategories: category.subcategories ? subcategoriesAdapter(category.subcategories) : undefined
  }
}

export function categoriesAdapter(categories: CategoryResponse[]): Category[] {
  return categories.map(categoryAdapter)
}
