import type { Category, CategoryResponse } from './category.model.js'
import type { Product, ProductResponse } from './product.model.js'

export interface Subcategory {
  id: string
  categoryId?: string
  name: string
  description?: string | null
  image?: string | null
  enabled: boolean
  createdAt?: Date
  updatedAt?: Date

  summary?: {
    totalProducts?: number
  }

  products?: Product[]
  category?: Category
}

export interface SubcategoryResponse {
  id: number
  name: string
  description: string | null
  image: string | null
  enabled: boolean
  deletedAt: string | null

  summary?: {
    totalProducts?: number
  }

  category?: CategoryResponse
  products?: ProductResponse[]
}
