import { API_V1 } from '@/lib/api/api.config'
import { getAccessToken } from '@/modules/auth/services/auth.service'
import { membersAdapter, membersSummaryAdapter } from '@/modules/members/adapters/member.adapter'
import type { CreateMemberSchema } from '@/modules/members/schemas/create-member.schema'
import type { ApiResponse } from '@ristokit/shared/lib/api/api.model'
import type {
  Member,
  MemberResponse,
  MembersSummary,
  MembersSummaryResponse
} from '@ristokit/shared/models/member.model'

interface CreateMemberArgs extends CreateMemberSchema {
  businessId: string
  branchId: string
}

export async function createMember(args: CreateMemberArgs): Promise<ApiResponse<Member>> {
  const { businessId, branchId, name, email, password, role } = args

  const accessToken = await getAccessToken()

  const body: Record<string, unknown> = {
    name: name,
    email: email,
    password: password,
    role: role
  }

  const request = await fetch(API_V1.BUSINESSES.BRANCHES.MEMBERS.BASE(businessId, branchId), {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })

  const response: ApiResponse<Member> = await request.json()
  if (response.error) return response

  return { ...response, data: response.data }
}

interface GetMembersArgs {
  businessId: string
  branchId: string
}

export async function getMembers(args: GetMembersArgs): Promise<ApiResponse<Member[]>> {
  const { businessId, branchId } = args

  const accessToken = await getAccessToken()

  const request = await fetch(API_V1.BUSINESSES.BRANCHES.MEMBERS.BASE(businessId, branchId), {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })

  const response: ApiResponse<MemberResponse[]> = await request.json()
  if (response.error) return response

  return { ...response, data: membersAdapter(response.data) }
}

interface GetMembersSummaryArgs {
  businessId: string
  branchId: string
}

export async function getMembersSummary(args: GetMembersSummaryArgs): Promise<ApiResponse<MembersSummary>> {
  const { businessId, branchId } = args

  const accessToken = await getAccessToken()

  const request = await fetch(API_V1.BUSINESSES.BRANCHES.MEMBERS.SUMMARY(businessId, branchId), {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })

  const response: ApiResponse<MembersSummaryResponse> = await request.json()
  if (response.error) return response

  return { ...response, data: membersSummaryAdapter(response.data) }
}
