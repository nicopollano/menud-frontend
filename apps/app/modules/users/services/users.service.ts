import { API_V1 } from '@/lib/api/api.config'
import { getAccessToken } from '@/modules/auth/services/auth.service'
import { buildQueryString } from '@ristokit/shared/helpers/general.helper'
import type { ApiResponse } from '@ristokit/shared/lib/api/api.model'
import type { Member } from '@ristokit/shared/models/member.model'

interface GetUsersArgs {
  businessId: string
  branchId: string
}

interface BranchUserResponse {
  members: Member[]
  summary: {
    totalMembers: number
  }
}

export async function getUsers(args: GetUsersArgs): Promise<ApiResponse<Member[]>> {
  const { businessId, branchId } = args
  const accessToken = await getAccessToken()

  const url = buildQueryString(API_V1.BUSINESSES.BRANCHES.MEMBERS.BASE(businessId, branchId), {})
  try {
    const request = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    const response: ApiResponse<BranchUserResponse> = await request.json()

    if (response.error) return response

    return { ...response, data: response.data.members }
  } catch (err) {
    return { statusCode: 503, error: { code: 'FETCH_FAILED', message: String(err) }, data: null }
  }
}
