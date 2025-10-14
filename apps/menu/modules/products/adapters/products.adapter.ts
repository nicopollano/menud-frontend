import type { Product, ProductResponse } from '@ristokit/shared/models/product.model'

export function productAdapter(product: ProductResponse): Product {
  return {
    id: product.id.toString(),
    name: product.name,
    description: product.description,
    price: product.price,
    discountedPrice: product.discountedPrice,
    images: product.images,
    enabled: product.enabled,

    category: { name: product.category?.name },
    subcategory: { name: product.subcategory?.name }
  }
}

export function productsAdapter(products: ProductResponse[]): Product[] {
  return products.map(productAdapter)
}
