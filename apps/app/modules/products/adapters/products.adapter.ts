import type { Product, ProductResponse } from '@ristokit/shared/models/product.model'

export function productAdapter(product: ProductResponse): Product {
  return {
    id: product.id.toString(),
    // categoryId: product.category?.id.toString(),
    // subcategoryId: product.subcategory?.id.toString(),
    name: product.name,
    description: product.description,
    price: product.price,
    discountedPrice: product.discountedPrice,
    images: product.images,
    enabled: product.enabled
    // createdAt: new Date(product.createdAt),
    // updatedAt: new Date(product.updatedAt),
    // category: product.category,
    // subcategory: product.subcategory
  }
}

export function productsAdapter(products: ProductResponse[]): Product[] {
  return products.map(productAdapter)
}
