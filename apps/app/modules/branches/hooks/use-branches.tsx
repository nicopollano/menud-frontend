'use client'
import { getBranches } from '@/modules/branches/services/branches.service'
import type { ApiError } from '@ristokit/shared/lib/api/api.model'
import type { Branch } from '@ristokit/shared/models/branch.model'
import useSWR, { mutate } from 'swr'

interface UseBranchesOptions {
  businessId: string
  canRequest?: boolean
}

function useBranches(options: UseBranchesOptions) {
  const { businessId, canRequest = true } = options

  const response = useSWR<Branch[], ApiError>(canRequest && businessId ? ['branches', businessId] : null, async () => {
    const { data, error } = await getBranches({ businessId })
    if (error) return Promise.reject(error)
    return data
  })

  return response
}

async function mutateBranches(filters: UseBranchesOptions) {
  return await mutate(['branches', filters.businessId])
}

export { useBranches, mutateBranches }
