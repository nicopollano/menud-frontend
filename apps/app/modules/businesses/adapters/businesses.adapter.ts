import type {
  Business,
  BusinessResponse,
  BusinessesSummary,
  BusinessesSummaryResponse
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

export function businessesSummaryAdapter(businesses: BusinessesSummaryResponse): BusinessesSummary {
  return {
    totalBusinesses: businesses.totalBusinesses ?? 0,
    totalBranches: businesses.totalBranches ?? 0
  }
}
