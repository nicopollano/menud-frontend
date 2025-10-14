'use client'
import { getBusinessById } from '@/modules/businesses/services/businesses.service'
import type { ApiError } from '@ristokit/shared/lib/api/api.model'
import type { Business } from '@ristokit/shared/models/business.model'
import useSWR from 'swr'

interface UseBusinessOptions {
  businessId: string
  canRequest?: boolean
}

function useBusiness(options: UseBusinessOptions) {
  const { businessId, canRequest = true } = options

  const response = useSWR<Business, ApiError>(canRequest && businessId ? ['business', businessId] : null, async () => {
    const { data, error } = await getBusinessById({ businessId })
    if (error) return Promise.reject(error)
    return data
  })

  return response
}

export { useBusiness }
