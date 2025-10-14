'use client'
import { MIN_PRICE } from '@/modules/products/constants/product.const'
import type { BranchById } from '@ristokit/shared/models/branch.model'
import type { Business } from '@ristokit/shared/models/business.model'
import type { Category } from '@ristokit/shared/models/category.model'
import type { Menu } from '@ristokit/shared/models/menu.model'
import type { Product } from '@ristokit/shared/models/product.model'
import { createContext, useCallback, useContext, useMemo, useState } from 'react'

interface Filters {
  search?: string
  categoryId?: string
  subcategoryId?: string
  price?: number
}

const DEFAULT_FILTERS: Filters = {
  search: undefined,
  categoryId: undefined,
  subcategoryId: undefined,
  price: undefined
}

interface BranchContextType {
  branch: BranchById
  business: Business
  menu: Menu
  categories: Category[]

  filters: Filters
  updateFilters: (newFilters: Partial<Filters>) => void
  hasActiveFilters: () => boolean
  countActiveFilters: () => number
  filteredCategories: Category[]
}

const BranchContext = createContext<BranchContextType | null>(null)

interface BranchProviderProps {
  branch: BranchById
  children: React.ReactNode
}

function BranchProvider({ branch, children }: BranchProviderProps) {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS)

  const updateFilters = useCallback((newFilters: Partial<Filters>) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters
    }))
  }, [])

  const filtersStatus = useMemo(() => {
    const hasCategory = !!filters.categoryId
    const hasSubcategory = !!filters.subcategoryId
    const hasSearch = !!filters.search?.trim()
    const hasPrice = !!(filters.price && filters.price > MIN_PRICE)

    const activeCount = [hasCategory, hasSubcategory, hasSearch, hasPrice].filter(Boolean).length

    return {
      hasActive: activeCount > 0,
      count: activeCount
    }
  }, [filters])

  const hasActiveFilters = useCallback(() => filtersStatus.hasActive, [filtersStatus.hasActive])
  const countActiveFilters = useCallback(() => filtersStatus.count, [filtersStatus.count])

  const filterProducts = useCallback(
    (products: Product[]): Product[] => {
      return products.filter((product) => {
        if (filters.search?.trim()) {
          const searchTerm = filters.search.toLowerCase().trim()
          const matchesName = product.name.toLowerCase().includes(searchTerm)
          const matchesDescription = product.description?.toLowerCase().includes(searchTerm) ?? false

          if (!matchesName && !matchesDescription) return false
        }

        if (filters.price && filters.price > MIN_PRICE) {
          const matchesPrice = product.price <= filters.price
          if (!matchesPrice) return false
        }

        return true
      })
    },
    [filters.search, filters.price]
  )

  const filteredCategories = useMemo(() => {
    const categories = branch.menu.categories ?? []

    return categories
      .filter((category) => {
        if (!filters.categoryId) return true
        return filters.categoryId === category.id
      })
      .filter((category) => {
        if (!filters.subcategoryId) return true
        return category.subcategories?.some((subcategory) => subcategory.id === filters.subcategoryId)
      })
      .map((category) => {
        const filteredCategoryProducts = filterProducts(category.products ?? [])

        const filteredSubcategories =
          category.subcategories
            ?.map((subcategory) => ({
              ...subcategory,
              products: filterProducts(subcategory.products ?? [])
            }))
            .filter((subcategory) => !filters.subcategoryId || subcategory.products.length > 0) ?? []

        return {
          ...category,
          products: filteredCategoryProducts,
          subcategories: filteredSubcategories
        }
      })
      .filter((category) => {
        const hasProducts = category.products.length > 0
        const hasSubcategoryProducts = category.subcategories?.some((sub) => sub.products.length > 0) ?? false

        return hasProducts || hasSubcategoryProducts
      })
  }, [branch.menu.categories, filters, filterProducts])

  return (
    <BranchContext.Provider
      value={{
        branch,
        business: branch.business,
        menu: branch.menu,
        categories: branch.menu.categories ?? [],
        filters,
        updateFilters,
        hasActiveFilters,
        countActiveFilters,
        filteredCategories
      }}
    >
      {children}
    </BranchContext.Provider>
  )
}

function useBranch() {
  const context = useContext(BranchContext)
  if (!context) {
    throw new Error('useBranch must be used within a BranchProvider')
  }
  return context
}

export { BranchProvider, useBranch }
