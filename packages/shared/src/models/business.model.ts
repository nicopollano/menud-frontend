import type { Branch } from './branch.model.js'

export interface Business {
  id: string
  name: string
  description?: string | null
  logo?: string | null
  enabled: boolean
  createdAt: Date
  updatedAt: Date

  summary?: {
    totalBranches?: number
  }

  branches?: Branch[]
}

export interface BusinessesSummary {
  totalBusinesses: number
  totalBranches: number
}

export interface BusinessResponse {
  id: number
  name: string
  description: string | null
  logo: string | null
  phone: string | null
  address: string | null
  location: string | null
  country: string | null
  enabled: boolean
  deletedAt: string | null
  createdAt: string
  updatedAt: string

  summary?: {
    totalBranches: number
  }
}

export interface BusinessesSummaryResponse {
  totalBusinesses: number
  totalBranches: number
}

export type BusinessSitemap = Pick<Business, 'id' | 'name'>

export interface BusinessSitemapResponse {
  id: number
  name: string
}
