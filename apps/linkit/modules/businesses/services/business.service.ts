import { env } from '@/env'
import { API_V1 } from '@/lib/api/api.config'
import { businessesSitemapAdapter } from '@/modules/businesses/adapters/business.adapter'
import { ApiError } from '@ristokit/shared/lib/api/api-error'
import type { ApiResponse } from '@ristokit/shared/lib/api/api.model'
import type { BusinessSitemap, BusinessSitemapResponse } from '@ristokit/shared/models/business.model'

export const businessService = {
  async getBusinessesForSitemap(): Promise<BusinessSitemap[]> {
    try {
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
    } catch (err) {
      // If fetch or DNS fails during SSG (CI or offline), return empty sitemap to avoid build failure
      // Log to console for diagnostics in CI
      // eslint-disable-next-line no-console
      console.warn('getBusinessesForSitemap failed:', err)
      return []
    }
  }
}
