'use client'
import { getSubcategories } from '@/modules/subcategories/services/subcategories.service'
import type { ApiError } from '@ristokit/shared/lib/api/api.model'
import type { Subcategory } from '@ristokit/shared/models/subcategory.model'
import useSWR, { mutate } from 'swr'

interface UseSubcategoriesOptions {
  businessId: string
  branchId: string
  menuId: string
  categoryId: string
  canRequest?: boolean
}

function useSubcategories(options: UseSubcategoriesOptions) {
  const { businessId, branchId, menuId, categoryId, canRequest = true } = options

  const response = useSWR<Subcategory[], ApiError>(
    canRequest && businessId && branchId ? ['subcategories', businessId, branchId, menuId, categoryId] : null,
    async () => {
      const { data, error } = await getSubcategories({
        businessId,
        branchId,
        params: { menuId, categoryId }
      })
      if (error) return Promise.reject(error)
      return data
    }
  )

  return response
}

function mutateSubcategories(filters: UseSubcategoriesOptions) {
  return mutate(['subcategories', filters.businessId, filters.branchId, filters.menuId, filters.categoryId])
}

export { useSubcategories, mutateSubcategories }
