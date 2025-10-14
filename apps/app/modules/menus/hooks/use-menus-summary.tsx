'use client'
import { getMenusSummary } from '@/modules/menus/services/menus.service'
import type { ApiError } from '@ristokit/shared/lib/api/api.model'
import type { MenusSummary } from '@ristokit/shared/models/menu.model'
import useSWR, { mutate } from 'swr'

interface UseMenusSummaryOptions {
  businessId: string
  branchId: string
  canRequest?: boolean
}

function useMenusSummary(options: UseMenusSummaryOptions) {
  const { businessId, branchId, canRequest = true } = options

  const response = useSWR<MenusSummary, ApiError>(
    canRequest ? ['menus-summary', businessId, branchId] : null,
    async () => {
      const { data, error } = await getMenusSummary({ businessId, branchId })
      if (error) return Promise.reject(error)
      return data
    }
  )

  return response
}

async function mutateMenusSummary(params: UseMenusSummaryOptions) {
  return await mutate(['menus-summary', params.businessId, params.branchId])
}

export { useMenusSummary, mutateMenusSummary }
