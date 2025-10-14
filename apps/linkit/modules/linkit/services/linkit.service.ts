import { API_V1 } from '@/lib/api/api.config'
import { linkitAdapter } from '@/modules/linkit/adapters/linkit.adapter'
import type { BaseLinkitArgs } from '@/modules/linkit/interfaces/linkit.interface'
import type { ApiResponse } from '@ristokit/shared/lib/api/api.model'
import type { Linkit, LinkitResponse } from '@ristokit/shared/models/linkit.model'

export const linkitService = {
  async findLinkitByBusinessId(args: BaseLinkitArgs): Promise<Linkit | null> {
    const { businessId } = args

    const request = await fetch(API_V1.BUSINESSES.LINKITS.BASE(businessId), {
      method: 'GET',
      next: { tags: [`linkit-${businessId}`] }
    })

    const response: ApiResponse<LinkitResponse> = await request.json()
    if (response.error) return null

    return linkitAdapter(response.data)
  }
}
