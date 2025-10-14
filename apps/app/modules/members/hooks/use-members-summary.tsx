'use client'
import { getMembersSummary } from '@/modules/members/services/member.service'
import type { ApiError } from '@ristokit/shared/lib/api/api.model'
import type { MembersSummary } from '@ristokit/shared/models/member.model'
import useSWR, { mutate } from 'swr'

interface UseMembersSummaryOptions {
  businessId: string
  branchId: string
  canRequest?: boolean
}

function useMembersSummary(options: UseMembersSummaryOptions) {
  const { businessId, branchId, canRequest = true } = options

  const response = useSWR<MembersSummary, ApiError>(
    canRequest ? ['members-summary', businessId, branchId] : null,
    async () => {
      const { data, error } = await getMembersSummary({ businessId, branchId })
      if (error) return Promise.reject(error)
      return data
    }
  )

  return response
}

async function mutateMembersSummary(params: UseMembersSummaryOptions) {
  return await mutate(['members-summary', params.businessId, params.branchId])
}

export { useMembersSummary, mutateMembersSummary }
