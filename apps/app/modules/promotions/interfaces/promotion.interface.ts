import type { CreatePromotionSchema } from '@/modules/promotions/schemas/create-promotion.schema'
import type { PromotionAvailableDaysSchema } from '@/modules/promotions/schemas/promotion-available-days.schema'
import type { UpdatePromotionSchema } from '@/modules/promotions/schemas/update-promotion.schema'

export interface BasePromotionArgs {
  businessId: string
  branchId: string
}

export interface CreatePromotionArgs extends BasePromotionArgs {
  menuId: string
  data: CreatePromotionSchema
}

export interface UpdatePromotionByIdArgs extends BasePromotionArgs {
  promotionId: string
  data: Partial<UpdatePromotionSchema>
}

export interface DeletePromotionByIdArgs extends BasePromotionArgs {
  promotionId: string
}

export interface GetAvailableDaysArgs extends BasePromotionArgs {
  menuId: string
  data: PromotionAvailableDaysSchema
}
