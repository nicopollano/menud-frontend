'use client'
import { getBranchById } from '@/modules/branches/services/branches.service'
import type { ApiError } from '@ristokit/shared/lib/api/api.model'
import type { Branch } from '@ristokit/shared/models/branch.model'
import useSWR, { mutate } from 'swr'

interface UseBranchOptions {
  businessId: string
  branchId: string
  canRequest?: boolean
}

function useBranch(options: UseBranchOptions) {
  const { businessId, branchId, canRequest = true } = options

  const response = useSWR<Branch, ApiError>(
    canRequest && businessId && branchId ? ['branch', businessId, branchId] : null,
    async () => {
      const { data, error } = await getBranchById({ businessId, branchId })
      if (error) return Promise.reject(error)
      return data
    }
  )

  return response
}

async function mutateBranch(filters: UseBranchOptions) {
  return await mutate(['branch', filters.businessId, filters.branchId])
}

export { useBranch, mutateBranch }
