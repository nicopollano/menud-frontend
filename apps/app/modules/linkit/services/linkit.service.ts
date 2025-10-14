import { env } from '@/env'
import { API_V1 } from '@/lib/api/api.config'
import { getAccessToken } from '@/modules/auth/services/auth.service'
import { linkitsAdapter } from '@/modules/linkit/adapters/linkit.adapter'
import type { BaseLinkitArgs, UpdateLinkitByIdArgs } from '@/modules/linkit/interfaces/linkit.interface'
import { ApiError } from '@ristokit/shared/lib/api/api-error'
import type { ApiResponse } from '@ristokit/shared/lib/api/api.model'
import type { Linkit, LinkitResponse } from '@ristokit/shared/models/linkit.model'

export const linkitService = {
  async getLinkits(): Promise<Linkit[]> {
    const accessToken = await getAccessToken()

    const request = await fetch(API_V1.LINKITS, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    const response: ApiResponse<LinkitResponse[]> = await request.json()
    if (response.error) {
      throw new ApiError({
        code: response.error.code,
        message: response.error.message,
        details: response.error.details
      })
    }

    return linkitsAdapter(response.data)
  },

  async updateLinkitById(args: UpdateLinkitByIdArgs): Promise<void> {
    const { businessId, linkitId, data } = args

    const accessToken = await getAccessToken()

    const request = await fetch(API_V1.BUSINESSES.BUSINESS.LINKITS.LINKIT(businessId, linkitId), {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    const response: ApiResponse<LinkitResponse> = await request.json()
    if (response.error) {
      throw new ApiError({
        code: response.error.code,
        message: response.error.message,
        details: response.error.details
      })
    }
  },

  async revalidateLinkitByBusinessId(args: BaseLinkitArgs): Promise<void> {
    const { businessId } = args

    const request = await fetch(`${env.NEXT_PUBLIC_LINKIT_DOMAIN}/api/webhooks/revalidate?tag=linkit-${businessId}`, {
      method: 'GET'
    })

    const response: { revalidated: boolean; now: number; message: string } = await request.json()
    if (!response.revalidated) {
      throw new ApiError({
        code: 'linkit/revalidate',
        message: response.message
      })
    }
  }
}
