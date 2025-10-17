import { API_V1 } from '@/lib/api/api.config'
import { getAccessToken } from '@/modules/auth/services/auth.service'
import { promotionsAdapter, promotionsSummaryAdapter } from '@/modules/promotions/adapters/promotion.adapter'
import type {
  CreatePromotionArgs,
  DeletePromotionByIdArgs,
  GetAvailableDaysArgs,
  UpdatePromotionByIdArgs
} from '@/modules/promotions/interfaces/promotion.interface'
import { buildQueryString } from '@ristokit/shared/helpers/general.helper'
import { ApiError } from '@ristokit/shared/lib/api/api-error'
import type { ApiResponse } from '@ristokit/shared/lib/api/api.model'
import type { Day } from '@ristokit/shared/models/general.model'
import type {
  Promotion,
  PromotionResponse,
  PromotionsSummary,
  PromotionsSummaryResponse
} from '@ristokit/shared/models/promotion.model'

interface GetPromotionsArgs {
  businessId: string
  branchId: string
  params: Record<string, unknown>
}

export async function getPromotions(args: GetPromotionsArgs): Promise<ApiResponse<Promotion[]>> {
  const { businessId, branchId, params } = args

  const accessToken = await getAccessToken()

  const url = buildQueryString(API_V1.BUSINESSES.BRANCHES.PROMOTIONS.BASE(businessId, branchId), params)

  try {
    const r = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    const response: ApiResponse<PromotionResponse[]> = await r.json()
    if (response.error) return response

    return { ...response, data: promotionsAdapter(response.data) }
  } catch (err) {
    return { statusCode: 503, error: { code: 'FETCH_FAILED', message: String(err) }, data: null }
  }
}

interface GetPromotionsSummaryArgs {
  businessId: string
  branchId: string
  params: Record<string, unknown>
}

export async function getPromotionsSummary(args: GetPromotionsSummaryArgs): Promise<ApiResponse<PromotionsSummary>> {
  const { businessId, branchId, params } = args

  const accessToken = await getAccessToken()

  const url = buildQueryString(API_V1.BUSINESSES.BRANCHES.PROMOTIONS.SUMMARY(businessId, branchId), params)

  try {
    const r = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    const response: ApiResponse<PromotionsSummaryResponse> = await r.json()
    if (response.error) return response

    return { ...response, data: promotionsSummaryAdapter(response.data) }
  } catch (err) {
    return { statusCode: 503, error: { code: 'FETCH_FAILED', message: String(err) }, data: null }
  }
}

export const promotionService = {
  async createPromotion(args: CreatePromotionArgs): Promise<void> {
    const { businessId, branchId, menuId, data } = args

    const accessToken = await getAccessToken()

    const formData = new FormData()

    formData.append('menuId', menuId)
    formData.append('productIds', JSON.stringify(data.productIds))
    formData.append('title', data.title)
    if (data.description) formData.append('description', data.description)
    formData.append('fromTime', data.startsAt)
    formData.append('toTime', data.endsAt)
    formData.append('days', JSON.stringify(data.days))
    if (data.images?.[0]?.file) formData.append('image', data.images[0].file)

    const request = await fetch(API_V1.BUSINESSES.BRANCHES.PROMOTIONS.BASE(businessId, branchId), {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      body: formData
    })

    const response: ApiResponse<PromotionResponse> = await request.json()
    if (response.error) {
      throw new ApiError({
        code: response.error.code,
        message: response.error.message,
        details: response.error.details
      })
    }
  },

  async updatePromotionById(args: UpdatePromotionByIdArgs): Promise<void> {
    const { businessId, branchId, promotionId, data } = args

    const accessToken = await getAccessToken()

    const formData = new FormData()
    if (data.productIds !== undefined) formData.append('productIds', JSON.stringify(data.productIds))
    if (data.title !== undefined) formData.append('title', data.title)
    if (data.description !== undefined) formData.append('description', data.description ?? '')
    if (data.startsAt !== undefined) formData.append('fromTime', data.startsAt)
    if (data.endsAt !== undefined) formData.append('toTime', data.endsAt)
    if (data.days !== undefined) formData.append('days', JSON.stringify(data.days))
    if (data.images !== undefined) formData.append('image', data.images?.[0]?.file ?? '')

    const request = await fetch(
      API_V1.BUSINESSES.BRANCHES.PROMOTIONS.PROMOTION.BASE(businessId, branchId, promotionId),
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
        body: formData
      }
    )

    const response: ApiResponse<PromotionResponse> = await request.json()
    if (response.error) {
      throw new ApiError({
        code: response.error.code,
        message: response.error.message,
        details: response.error.details
      })
    }
  },

  async deletePromotionById(args: DeletePromotionByIdArgs): Promise<void> {
    const { businessId, branchId, promotionId } = args

    const accessToken = await getAccessToken()

    const request = await fetch(
      API_V1.BUSINESSES.BRANCHES.PROMOTIONS.PROMOTION.BASE(businessId, branchId, promotionId),
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    )

    const response: ApiResponse<void> = await request.json()
    if (response.error) {
      throw new ApiError({
        code: response.error.code,
        message: response.error.message,
        details: response.error.details
      })
    }
  },

  async getAvailableDays(args: GetAvailableDaysArgs): Promise<Day[]> {
    const { businessId, branchId, menuId, data } = args

    const accessToken = await getAccessToken()

    const body: Record<string, unknown> = {
      menuId,
      ...data
    }

    const request = await fetch(API_V1.BUSINESSES.BRANCHES.PROMOTIONS.AVAILABLE_DAYS(businessId, branchId), {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })

    const response: ApiResponse<Day[]> = await request.json()
    if (response.error) {
      throw new ApiError({
        code: response.error.code,
        message: response.error.message,
        details: response.error.details
      })
    }

    return response.data
  }
}
