'use client'
import { getBranchesSummary } from '@/modules/branches/services/branches.service'
import type { ApiError } from '@ristokit/shared/lib/api/api.model'
import type { BranchesSummary } from '@ristokit/shared/models/branch.model'
import useSWR, { mutate } from 'swr'

interface UseBranchesSummaryOptions {
  businessId: string
  canRequest?: boolean
}

function useBranchesSummary(options: UseBranchesSummaryOptions) {
  const { businessId, canRequest = true } = options

  const response = useSWR<BranchesSummary, ApiError>(canRequest ? ['branches-summary', businessId] : null, async () => {
    const { data, error } = await getBranchesSummary({ businessId })
    if (error) return Promise.reject(error)
    return data
  })

  return response
}

async function mutateBranchesSummary(params: UseBranchesSummaryOptions) {
  return await mutate(['branches-summary', params.businessId])
}

export { useBranchesSummary, mutateBranchesSummary }
