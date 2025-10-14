import type { Day } from './general.model.js'
import type { Product, ProductResponse } from './product.model.js'

export interface Promotion {
  id: string
  title: string
  description?: string | null
  image?: string | null
  days: Day[]
  enabled: boolean

  startsAt: Date
  endsAt: Date

  products: Product[]
}

export interface PromotionsSummary {
  totalPromotions: number
}

export interface PromotionsSummaryResponse {
  totalPromotions: number
}

export interface PromotionResponse {
  id: number
  title: string
  description?: string | null
  image?: string | null
  enabled: boolean

  schedule: {
    id: number
    openTime: string
    closeTime: string
    days: Day[]
    enabled: boolean
  }

  products: ProductResponse[]
}
