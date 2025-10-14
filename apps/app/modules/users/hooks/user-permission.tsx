import { getAccessToken } from '@/modules/auth/services/auth.service'
import type { BranchUser } from '@ristokit/shared/models/branch.model'
import { sync } from 'motion/react'
import type { ApiError } from 'next/dist/server/api-utils'
import useSWR, { mutate } from 'swr'
import { getUsers } from '../services/users.service'

interface UserPermissionOptions {
  businessId: string
  branchId: string
  canRequest?: boolean
}

function useUserPermissions(options: UserPermissionOptions) {
  const { businessId, branchId, canRequest = true } = options

  const response = useSWR<BranchUser[], ApiError>(
    canRequest && businessId && branchId ? ['members', businessId, branchId] : null,
    async () => {
      const { data, error } = await getUsers({ businessId, branchId })

      if (error) return Promise.reject(error)

      return data
    }
  )
  return response
}

function mutateUsersPermission(filters: UserPermissionOptions) {
  return mutate(['members', filters.businessId, filters.branchId])
}

export { useUserPermissions, mutateUsersPermission }
