import type { Business, BusinessResponse } from './business.model.js'

export interface Linkit {
  id: string
  website?: string | null
  whatsapp?: string | null
  instagram?: string | null
  facebook?: string | null
  twitter?: string | null
  linkedin?: string | null
  tiktok?: string | null
  location?: string | null

  createdAt: Date
  updatedAt: Date

  business: Business
}

export interface LinkitResponse {
  id: number
  whatsapp?: string | null
  website?: string | null
  instagram?: string | null
  facebook?: string | null
  location?: string | null
  twitter?: string | null
  tiktok?: string | null
  linkedin?: string | null
  enabled: boolean
  deletedAt?: string | null
  createdAt: string
  updatedAt: string

  business: BusinessResponse
}
