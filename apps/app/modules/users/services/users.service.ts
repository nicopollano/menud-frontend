import { API_V1 } from '@/lib/api/api.config'
import type { ApiResponse } from '@/lib/api/api.model'
import { getAccessToken } from '@/modules/auth/services/auth.service'
import { buildQueryString } from '@ristokit/shared/helpers/general.helper'
import type { BranchUser } from '@ristokit/shared/models/branch.model'

interface GetUsersArgs {
  businessId: string
  branchId: string
}

interface BranchUserResponse {
  members: BranchUser[]
  summary: {
    totalMembers: number
  }
}

export async function getUsers(args: GetUsersArgs): Promise<ApiResponse<BranchUser[]>> {
  const { businessId, branchId } = args
  const accessToken = await getAccessToken()

  const url = buildQueryString(API_V1.BUSINESSES.BRANCHES.MEMBERS.BASE(businessId, branchId), {})

  const request = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })

  const response: ApiResponse<BranchUserResponse> = await request.json()

  if (response.error) return response

  return { ...response, data: response.data.members }
}
