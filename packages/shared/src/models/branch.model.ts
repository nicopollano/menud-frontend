import type { Business, BusinessResponse } from './business.model.js'
import type { Currency, Day } from './general.model.js'
import type { Member } from './member.model.js'
import type { Menu, MenuResponse } from './menu.model.js'

export interface Branch {
  id: string
  businessId?: string
  slug: string
  name: string
  description?: string | null
  logo?: string | null
  phone?: string | null
  address?: string | null
  currency: Currency
  enabled: boolean
  createdAt?: Date
  updatedAt?: Date

  summary?: {
    totalMenus?: number
  }

  schedules: Schedule[]
  menus?: Menu[]
  members?: Member[]
  business?: Business
}

export interface BranchesSummary {
  totalBranches: number
  totalMenus: number
}

export interface BranchById {
  id: string
  slug: string
  name: string
  description?: string | null
  logo?: string | null
  phone?: string | null
  address?: string | null
  location?: string | null
  country?: string | null
  currency: Currency
  enabled: boolean
  createdAt?: Date
  updatedAt?: Date

  schedules: Schedule[]
  business: Business
  menu: Menu
}

export interface BranchSlug {
  id: string
  slug: string
}

export interface BranchResponse {
  id: number
  name: string
  slug: string
  description: string | null
  logo: string | null
  phone: string | null
  address: string | null
  location: string | null
  country: string | null
  currency: Currency
  enabled: boolean
  createdAt: string
  updatedAt: string
  deletedAt: string | null

  schedules: Schedule[]
  summary?: {
    totalMenus?: number
  }

  business?: BusinessResponse
}

export interface BranchesSummaryResponse {
  totalBranches: number
  totalMenus: number
}

export interface BranchByIdResponse extends BranchResponse {
  business: BusinessResponse
  menu: MenuResponse
}

export interface Schedule {
  id: string
  branchId?: string
  day: Day
  openTime: string
  closeTime: string
  enabled: boolean

  branch?: Branch
}
