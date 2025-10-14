'use client'
import { getProducts } from '@/modules/products/services/products.service'
import type { ApiError } from '@ristokit/shared/lib/api/api.model'
import type { Product } from '@ristokit/shared/models/product.model'
import useSWR, { mutate } from 'swr'

interface UseProductsOptions {
  businessId: string
  branchId: string
  menuId: string
  canRequest?: boolean
}

function useProducts(options: UseProductsOptions) {
  const { businessId, branchId, menuId, canRequest = true } = options

  const response = useSWR<Product[], ApiError>(
    canRequest && businessId && branchId ? ['products', businessId, branchId, menuId] : null,
    async () => {
      const { data, error } = await getProducts({
        businessId,
        branchId,
        params: { menuId }
      })
      if (error) return Promise.reject(error)
      return data
    }
  )

  return response
}

async function mutateProducts(params: UseProductsOptions) {
  return await mutate(['products', params.businessId, params.branchId, params.menuId])
}

export { useProducts, mutateProducts }
