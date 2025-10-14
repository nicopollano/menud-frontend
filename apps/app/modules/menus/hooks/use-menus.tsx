'use client'
import { getMenus } from '@/modules/menus/services/menus.service'
import type { ApiError } from '@ristokit/shared/lib/api/api.model'
import type { Menu } from '@ristokit/shared/models/menu.model'
import useSWR, { mutate } from 'swr'

interface UseMenusOptions {
  businessId: string
  branchId: string
  canRequest?: boolean
}

function useMenus(options: UseMenusOptions) {
  const { businessId, branchId, canRequest = true } = options

  const response = useSWR<Menu[], ApiError>(
    canRequest && businessId && branchId ? ['menus', businessId, branchId] : null,
    async () => {
      const { data, error } = await getMenus({ businessId, branchId })
      if (error) return Promise.reject(error)
      return data
    }
  )

  return response
}

async function mutateMenus(filters: UseMenusOptions) {
  return await mutate(['menus', filters.businessId, filters.branchId])
}

export { useMenus, mutateMenus }
