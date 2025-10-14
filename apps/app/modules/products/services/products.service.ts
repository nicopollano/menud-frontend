import { API_V1 } from '@/lib/api/api.config'
import { getAccessToken } from '@/modules/auth/services/auth.service'
import { productAdapter, productsAdapter } from '@/modules/products/adapters/products.adapter'
import type { CreateProductSchema } from '@/modules/products/schemas/create-product.schema'
import type { UpdateProductSchema } from '@/modules/products/schemas/update-product.schema'
import { buildQueryString } from '@ristokit/shared/helpers/general.helper'
import type { ApiResponse } from '@ristokit/shared/lib/api/api.model'
import type { Product, ProductResponse } from '@ristokit/shared/models/product.model'

interface GetProductsArgs {
  businessId: string
  branchId: string
  params: Record<string, unknown>
}

export async function getProducts(args: GetProductsArgs): Promise<ApiResponse<Product[]>> {
  const { businessId, branchId, params } = args

  const accessToken = await getAccessToken()

  const url = buildQueryString(API_V1.BUSINESSES.BRANCHES.PRODUCTS.BASE(businessId, branchId), params)

  const request = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })

  const response: ApiResponse<ProductResponse[]> = await request.json()
  if (response.error) return response

  return { ...response, data: productsAdapter(response.data) }
}

export interface CreateProductArgs extends CreateProductSchema {
  businessId: string
  branchId: string
}

export async function createProduct(args: CreateProductArgs): Promise<ApiResponse<Product>> {
  const { businessId, branchId, categoryId, subcategoryId, name, description, images, price, discountedPrice } = args

  const accessToken = await getAccessToken()

  const formData = new FormData()
  formData.append('categoryId', categoryId)
  if (subcategoryId) formData.append('subcategoryId', subcategoryId)
  formData.append('name', name)
  if (description) formData.append('description', description)
  if (images.length > 0) {
    for (const image of images) {
      if (!image.file) continue
      formData.append('files', image.file)
    }
  }
  formData.append('price', price)
  if (discountedPrice) formData.append('discountedPrice', discountedPrice)

  const request = await fetch(API_V1.BUSINESSES.BRANCHES.PRODUCTS.POST(businessId, branchId), {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    body: formData
  })

  const response: ApiResponse<ProductResponse> = await request.json()
  if (response.error) return response

  return { ...response, data: productAdapter(response.data) }
}

export interface UpdateProductArgs extends UpdateProductSchema {
  businessId: string
  branchId: string
  productId: string
}

export async function updateProductById(args: UpdateProductArgs): Promise<ApiResponse<Product>> {
  const {
    businessId,
    branchId,
    productId,
    categoryId,
    subcategoryId,
    name,
    description,
    images,
    price,
    discountedPrice,
    enabled
  } = args

  const accessToken = await getAccessToken()

  const formData = new FormData()

  if (categoryId !== undefined) formData.append('categoryId', categoryId)
  if (subcategoryId !== undefined) formData.append('subcategoryId', subcategoryId)
  if (name !== undefined) formData.append('name', name)
  if (description !== undefined) formData.append('description', description ?? '')
  if (images !== undefined) {
    for (const image of images) {
      formData.append('files', image.file ?? '')
    }
  }
  if (price !== undefined) formData.append('price', String(price))
  if (discountedPrice !== undefined) formData.append('discountedPrice', String(discountedPrice))
  if (enabled !== undefined) formData.append('enabled', String(enabled))

  const request = await fetch(API_V1.BUSINESSES.BRANCHES.PRODUCTS.PRODUCT.BASE(businessId, branchId, productId), {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    body: formData
  })

  const response: ApiResponse<ProductResponse> = await request.json()
  if (response.error) return response

  return { ...response, data: productAdapter(response.data) }
}

export interface DeleteProductArgs {
  businessId: string
  branchId: string
  productId: string
}

export async function deleteProductById(args: DeleteProductArgs): Promise<ApiResponse<void>> {
  const { businessId, branchId, productId } = args

  const accessToken = await getAccessToken()

  const request = await fetch(API_V1.BUSINESSES.BRANCHES.PRODUCTS.PRODUCT.BASE(businessId, branchId, productId), {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })

  const response: ApiResponse<void> = await request.json()
  if (response.error) return response

  return { ...response, data: undefined }
}
