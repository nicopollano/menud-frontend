'use client'
import type { PromotionAvailableDaysSchema } from '@/modules/promotions/schemas/promotion-available-days.schema'
import { promotionService } from '@/modules/promotions/services/promotion.service'
import type { ApiError } from '@ristokit/shared/lib/api/api.model'
import type { Day } from '@ristokit/shared/models/general.model'
import useSWR, { mutate } from 'swr'

interface UsePromotionAvailableDaysOptions {
  businessId: string
  branchId: string
  menuId: string
  data: PromotionAvailableDaysSchema
  canRequest?: boolean
}

function usePromotionAvailableDays(options: UsePromotionAvailableDaysOptions) {
  const { businessId, branchId, menuId, data, canRequest = true } = options

  const response = useSWR<Day[], ApiError>(
    canRequest && businessId && branchId && menuId
      ? ['promotion-available-days', businessId, branchId, menuId, data.fromTime, data.toTime]
      : null,
    () =>
      promotionService.getAvailableDays({
        businessId,
        branchId,
        menuId,
        data
      })
  )

  return response
}

async function mutatePromotionAvailableDays(filters: UsePromotionAvailableDaysOptions) {
  return await mutate(['promotion-available-days', filters.businessId, filters.branchId, filters.menuId])
}

export { usePromotionAvailableDays, mutatePromotionAvailableDays }
