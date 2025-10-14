'use client'
import { getMembers } from '@/modules/members/services/member.service'
import type { ApiError } from '@ristokit/shared/lib/api/api.model'
import type { Member } from '@ristokit/shared/models/member.model'
import useSWR, { mutate } from 'swr'

interface UseMembersOptions {
  businessId: string
  branchId: string
  canRequest?: boolean
}

function useMembers(options: UseMembersOptions) {
  const { businessId, branchId, canRequest = true } = options

  const response = useSWR<Member[], ApiError>(
    canRequest && businessId && branchId ? ['members', businessId, branchId] : null,
    async () => {
      const { data, error } = await getMembers({ businessId, branchId })
      if (error) return Promise.reject(error)
      return data
    }
  )

  return response
}

async function mutateMembers(filters: UseMembersOptions) {
  return await mutate(['members', filters.businessId, filters.branchId])
}

export { useMembers, mutateMembers }
