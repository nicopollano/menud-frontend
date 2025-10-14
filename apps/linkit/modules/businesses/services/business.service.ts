import { env } from '@/env'
import { API_V1 } from '@/lib/api/api.config'
import { businessesSitemapAdapter } from '@/modules/businesses/adapters/business.adapter'
import { ApiError } from '@ristokit/shared/lib/api/api-error'
import type { ApiResponse } from '@ristokit/shared/lib/api/api.model'
import type { BusinessSitemap, BusinessSitemapResponse } from '@ristokit/shared/models/business.model'

export const businessService = {
  async getBusinessesForSitemap(): Promise<BusinessSitemap[]> {
    const request = await fetch(API_V1.BUSINESSES.SITEMAP, {
      method: 'GET',
      next: { revalidate: env.NEXT_PUBLIC_API_REVALIDATE }
    })

    const response: ApiResponse<BusinessSitemapResponse[]> = await request.json()
    if (response.error) {
      throw new ApiError({
        code: response.error.code,
        message: response.error.message,
        details: response.error.details
      })
    }

    return businessesSitemapAdapter(response.data)
  }
}
