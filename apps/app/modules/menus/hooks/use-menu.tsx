'use client'
import { getMenuById } from '@/modules/menus/services/menus.service'
import type { ApiError } from '@ristokit/shared/lib/api/api.model'
import type { Menu } from '@ristokit/shared/models/menu.model'
import useSWR, { mutate } from 'swr'

interface UseMenusOptions {
  businessId: string
  branchId: string
  menuId: string
  canRequest?: boolean
}

function useMenu(options: UseMenusOptions) {
  const { businessId, branchId, menuId, canRequest = true } = options

  const response = useSWR<Menu, ApiError>(
    canRequest && businessId && branchId && menuId ? ['menu', businessId, branchId, menuId] : null,
    async () => {
      const { data, error } = await getMenuById({ businessId, branchId, menuId })
      if (error) return Promise.reject(error)
      return data
    }
  )

  return response
}

function mutateMenu(filters: UseMenusOptions) {
  return mutate(['menu', filters.businessId, filters.branchId, filters.menuId])
}

export { useMenu, mutateMenu }
