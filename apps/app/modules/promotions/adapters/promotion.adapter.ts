import { productsAdapter } from '@/modules/products/adapters/products.adapter'
import { convertDateTimeToDate } from '@/modules/schedules/helpers/schedules.helper'
import type {
  Promotion,
  PromotionResponse,
  PromotionsSummary,
  PromotionsSummaryResponse
} from '@ristokit/shared/models/promotion.model'

export function promotionAdapter(promotion: PromotionResponse): Promotion {
  return {
    id: promotion.id.toString(),
    title: promotion.title,
    description: promotion.description,
    image: promotion.image,
    days: promotion.schedule.days,
    enabled: promotion.enabled,

    endsAt: convertDateTimeToDate(promotion.schedule.closeTime),
    startsAt: convertDateTimeToDate(promotion.schedule.openTime),

    products: productsAdapter(promotion.products)
  }
}

export function promotionsAdapter(members: PromotionResponse[]): Promotion[] {
  return members.map(promotionAdapter)
}

export function promotionsSummaryAdapter(summary: PromotionsSummaryResponse): PromotionsSummary {
  return {
    totalPromotions: summary.totalPromotions ?? 0
  }
}
