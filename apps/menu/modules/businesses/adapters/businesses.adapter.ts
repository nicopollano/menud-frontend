import type { Business, BusinessResponse } from '@ristokit/shared/models/business.model'

export function businessAdapter(business: BusinessResponse): Business {
  return {
    id: business.id.toString(),
    name: business.name,
    description: business.description,
    logo: business.logo,
    enabled: business.enabled,
    createdAt: new Date(business.createdAt),
    updatedAt: new Date(business.updatedAt)
  }
}
