import type { Menu } from './menu.model.js'
import type { Product, ProductResponse } from './product.model.js'
import type { Subcategory, SubcategoryResponse } from './subcategory.model.js'

export interface Category {
  id: string
  name: string
  description?: string | null
  image?: string | null
  enabled: boolean
  createdAt?: Date
  updatedAt?: Date

  summary?: {
    totalProducts?: number
    totalSubcategories?: number
  }

  menu?: Menu
  products?: Product[]
  subcategories?: Subcategory[]
}

export interface CategoryResponse {
  id: number
  name: string
  image: string | null
  description: string | null
  enabled: boolean
  deletedAt: string | null

  summary?: {
    totalProducts?: number
    totalSubcategories?: number
  }

  products?: ProductResponse[]
  subcategories?: SubcategoryResponse[]
}
