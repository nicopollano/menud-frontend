'use client'
import { getPromotions } from '@/modules/promotions/services/promotion.service'
import type { ApiError } from '@ristokit/shared/lib/api/api.model'
import type { Promotion } from '@ristokit/shared/models/promotion.model'
import useSWR, { mutate } from 'swr'

interface UsePromotionsOptions {
  businessId: string
  branchId: string
  menuId: string
  canRequest?: boolean
}

function usePromotions(options: UsePromotionsOptions) {
  const { businessId, branchId, menuId, canRequest = true } = options

  const response = useSWR<Promotion[], ApiError>(
    canRequest && businessId && branchId ? ['promotions', businessId, branchId, menuId] : null,
    async () => {
      const { data, error } = await getPromotions({
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

async function mutatePromotions(filters: UsePromotionsOptions) {
  return await mutate(['promotions', filters.businessId, filters.branchId, filters.menuId])
}

export { usePromotions, mutatePromotions }
