'use client'
import { getBusinessesSummary } from '@/modules/businesses/services/businesses.service'
import type { ApiError } from '@ristokit/shared/lib/api/api.model'
import type { BusinessesSummary } from '@ristokit/shared/models/business.model'
import useSWR, { mutate } from 'swr'

interface UseBusinessesSummaryOptions {
  canRequest?: boolean
}

function useBusinessesSummary(options: UseBusinessesSummaryOptions = {}) {
  const { canRequest = true } = options

  const response = useSWR<BusinessesSummary, ApiError>(canRequest ? ['businesses-summary'] : null, async () => {
    const { data, error } = await getBusinessesSummary()
    if (error) return Promise.reject(error)
    return data
  })

  return response
}

async function mutateBusinessesSummary() {
  return await mutate(['businesses-summary'])
}

export { useBusinessesSummary, mutateBusinessesSummary }
