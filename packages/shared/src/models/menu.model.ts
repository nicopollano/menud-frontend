import type { Branch, BranchResponse } from './branch.model.js'
import type { Category, CategoryResponse } from './category.model.js'
import type { Typography } from './general.model.js'

export interface Menu {
  id: string
  branchId?: string
  name: string
  description?: string | null
  cover?: string | null
  logo?: string | null
  typography: Typography
  enabled: boolean
  createdAt: Date
  updatedAt: Date

  palette: MenuPalette | null
  palettes: MenuPalette[]
  summary?: {
    totalCategories?: number
    totalProducts?: number
  }

  categories?: Category[]
  branch?: Branch
}

export interface MenuPalette {
  id: string
  menuId?: string
  color1: string
  color2: string
  color3: string
  enabled: boolean
  createdAt: Date
  updatedAt: Date

  menus?: Menu[]
}

export interface MenusSummary {
  totalMenus: number
  totalCategories: number
  totalProducts: number
}

export interface MenuResponse {
  id: number
  name: string
  description: string | null
  cover: string | null
  logo: string | null
  typography: Typography
  enabled: boolean
  createdAt: string
  updatedAt: string

  palette?: {
    id: number
    color1: string
    color2: string
    color3: string
    enabled: true
    createdAt: string
    updatedAt: string
    deletedAt: null
  }
  menuPalettes: {
    id: number
    color1: string
    color2: string
    color3: string
    enabled: true
    createdAt: string
    updatedAt: string
    deletedAt: null
  }[]

  summary?: {
    totalCategories?: number
    totalProducts?: number
  }

  branch: BranchResponse
  categories: CategoryResponse[]
}

export interface MenusSummaryResponse {
  totalMenus: number
  totalCategories: number
  totalProducts: number
}
