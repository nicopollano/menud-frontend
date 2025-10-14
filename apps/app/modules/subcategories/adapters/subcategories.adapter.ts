import { productsAdapter } from '@/modules/products/adapters/products.adapter'
import type { Subcategory, SubcategoryResponse } from '@ristokit/shared/models/subcategory.model'

export function subcategoryAdapter(subcategory: SubcategoryResponse): Subcategory {
  return {
    id: subcategory.id.toString(),
    categoryId: subcategory.category?.id.toString(),
    name: subcategory.name,
    description: subcategory.description,
    image: subcategory.image,
    enabled: subcategory.enabled,
    // createdAt: new Date(subcategory.createdAt),
    // updatedAt: new Date(subcategory.updatedAt)

    summary: {
      totalProducts: subcategory.summary?.totalProducts ?? 0
    },

    // category: subcategory.category ? categoryAdapter(subcategory.category) : undefined,
    products: subcategory.products ? productsAdapter(subcategory.products) : undefined
  }
}

export function subcategoriesAdapter(subcategories: SubcategoryResponse[]): Subcategory[] {
  return subcategories.map(subcategoryAdapter)
}
