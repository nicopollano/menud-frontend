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

    products: subcategory.products
      ? productsAdapter(
          subcategory.products.map((product) => ({
            ...product,
            subcategory: { name: subcategory.name }
          }))
        )
      : undefined
  }
}

export function subcategoriesAdapter(subcategories: SubcategoryResponse[]): Subcategory[] {
  return subcategories.map(subcategoryAdapter)
}
