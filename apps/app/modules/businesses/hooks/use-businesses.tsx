'use client'
import { getBusinesses } from '@/modules/businesses/services/businesses.service'
import type { ApiError } from '@ristokit/shared/lib/api/api.model'
import type { Business } from '@ristokit/shared/models/business.model'
import useSWR, { mutate } from 'swr'

interface UseBusinessesOptions {
  canRequest?: boolean
}

function useBusinesses(options: UseBusinessesOptions = {}) {
  const { canRequest = true } = options

  const response = useSWR<Business[], ApiError>(canRequest ? ['businesses'] : null, async () => {
    const { data, error } = await getBusinesses()
    if (error) return Promise.reject(error)
    return data
  })

  return response
}

async function mutateBusinesses() {
  return await mutate(['businesses'])
}

export { useBusinesses, mutateBusinesses }
