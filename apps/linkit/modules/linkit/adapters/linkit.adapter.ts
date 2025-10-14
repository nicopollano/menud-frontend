import { businessAdapter } from '@/modules/businesses/adapters/business.adapter'
import type { Linkit, LinkitResponse } from '@ristokit/shared/models/linkit.model'

export function linkitAdapter(linkit: LinkitResponse): Linkit {
  return {
    id: linkit.id.toString(),
    website: linkit.website,
    whatsapp: linkit.whatsapp,
    instagram: linkit.instagram,
    facebook: linkit.facebook,
    twitter: linkit.twitter,
    linkedin: linkit.linkedin,
    tiktok: linkit.tiktok,
    location: linkit.location,
    createdAt: new Date(linkit.createdAt),
    updatedAt: new Date(linkit.updatedAt),

    business: businessAdapter(linkit.business)
  }
}

export function linkitsAdapter(linkits: LinkitResponse[]): Linkit[] {
  return linkits.map(linkitAdapter)
}
