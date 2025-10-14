'use client'
import { getCategories } from '@/modules/categories/services/categories.service'
import type { ApiError } from '@ristokit/shared/lib/api/api.model'
import type { Category } from '@ristokit/shared/models/category.model'
import useSWR, { mutate } from 'swr'

interface UseCategoriesOptions {
  businessId: string
  branchId: string
  menuId: string
  canRequest?: boolean
}

function useCategories(options: UseCategoriesOptions) {
  const { businessId, branchId, menuId, canRequest = true } = options

  const response = useSWR<Category[], ApiError>(
    canRequest && businessId && branchId && menuId ? ['categories', businessId, branchId, menuId] : null,
    async () => {
      const { data, error } = await getCategories({
        businessId,
        branchId,
        params: { menuId }
      })
      if (error) return Promise.reject(error)
      return data
    }
  )

  return response
}

function mutateCategories(filters: UseCategoriesOptions) {
  return mutate(['categories', filters.businessId, filters.branchId, filters.menuId])
}

export { useCategories, mutateCategories }
