import type {
  Business,
  BusinessResponse,
  BusinessSitemap,
  BusinessSitemapResponse
} from '@ristokit/shared/models/business.model'

export function businessAdapter(business: BusinessResponse): Business {
  return {
    id: business.id.toString(),
    name: business.name,
    description: business.description,
    logo: business.logo,
    enabled: business.enabled,
    createdAt: new Date(business.createdAt),
    updatedAt: new Date(business.updatedAt),

    summary: {
      totalBranches: business.summary?.totalBranches ?? 0
    }
  }
}

export function businessesAdapter(businesses: BusinessResponse[]): Business[] {
  return businesses.map(businessAdapter)
}

export function businessSitemapAdapter(business: BusinessSitemapResponse): BusinessSitemap {
  return {
    id: business.id.toString(),
    name: business.name
  }
}

export function businessesSitemapAdapter(businesses: BusinessSitemapResponse[]): BusinessSitemap[] {
  return businesses.map(businessSitemapAdapter)
}
