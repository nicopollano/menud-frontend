export interface Product {
  id: string
  categoryId?: string
  subcategoryId?: string
  name: string
  description?: string | null
  price: number
  discountedPrice?: number
  images: string[]
  enabled: boolean
  createdAt?: Date
  updatedAt?: Date

  category?: { name?: string }
  subcategory?: { name?: string }
}

export type PreviewProduct = Pick<Product, 'name' | 'description' | 'price' | 'discountedPrice' | 'images'>

export interface ProductResponse {
  id: number
  name: string
  description: string | null
  price: number
  discountedPrice: number
  images: string[]
  sell_count: number
  enabled: boolean
  deletedAt: string | null

  subcategory?: { name: string }
  category?: { name: string }
}
