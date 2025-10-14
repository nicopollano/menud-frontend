'use client'
import { getPromotionsSummary } from '@/modules/promotions/services/promotion.service'
import type { ApiError } from '@ristokit/shared/lib/api/api.model'
import type { PromotionsSummary } from '@ristokit/shared/models/promotion.model'
import useSWR, { mutate } from 'swr'

interface UsePromotionsSummaryOptions {
  businessId: string
  branchId: string
  menuId: string
  canRequest?: boolean
}

function usePromotionsSummary(options: UsePromotionsSummaryOptions) {
  const { businessId, branchId, menuId, canRequest = true } = options

  const response = useSWR<PromotionsSummary, ApiError>(
    canRequest ? ['promotions-summary', businessId, branchId, menuId] : null,
    async () => {
      const { data, error } = await getPromotionsSummary({
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

async function mutatePromotionsSummary(params: UsePromotionsSummaryOptions) {
  return await mutate(['promotions-summary', params.businessId, params.branchId, params.menuId])
}

export { usePromotionsSummary, mutatePromotionsSummary }
