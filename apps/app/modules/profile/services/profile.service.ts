import { API_V1 } from '@/lib/api/api.config'
import { getAccessToken } from '@/modules/auth/services/auth.service'
import { ApiError } from '@ristokit/shared/lib/api/api-error'
import type { ApiResponse } from '@ristokit/shared/lib/api/api.model'
import type { ProfileSummary, ProfileSummaryResponse } from '@ristokit/shared/models/profile.model'

export const profileService = {
  async getSummary(): Promise<ProfileSummary> {
    const accessToken = await getAccessToken()

    const request = await fetch(API_V1.PROFILE.SUMMARY, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    const response: ApiResponse<ProfileSummaryResponse> = await request.json()
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
