import { API_V1 } from '@/lib/api/api.config'
import { getAccessToken } from '@/modules/auth/services/auth.service'
import { categoriesAdapter, categoryAdapter } from '@/modules/categories/adapters/categories.adapter'
import type { CreateCategorySchema } from '@/modules/categories/schemas/create-category.schema'
import type { UpdateCategorySchema } from '@/modules/categories/schemas/update-category.schema'
import { buildQueryString } from '@ristokit/shared/helpers/general.helper'
import type { ApiResponse } from '@ristokit/shared/lib/api/api.model'
import type { Category, CategoryResponse } from '@ristokit/shared/models/category.model'

interface GetCategoriesArgs {
  businessId: string
  branchId: string
  params: Record<string, unknown>
}

export async function getCategories(args: GetCategoriesArgs): Promise<ApiResponse<Category[]>> {
  const { businessId, branchId, params } = args

  const accessToken = await getAccessToken()

  const url = buildQueryString(API_V1.BUSINESSES.BRANCHES.CATEGORIES.BASE(businessId, branchId), params)

  const request = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })

  const response: ApiResponse<CategoryResponse[]> = await request.json()
  if (response.error) return response

  return { ...response, data: categoriesAdapter(response.data) }
}

export interface CreateCategoryArgs extends CreateCategorySchema {
  businessId: string
  branchId: string
}

export async function createCategory(args: CreateCategoryArgs): Promise<ApiResponse<Category>> {
  const { businessId, branchId, menuId, name, description, images } = args

  const accessToken = await getAccessToken()

  const formData = new FormData()
  formData.append('menuId', menuId)
  formData.append('name', name)
  if (description) formData.append('description', description)
  if (images?.[0]?.file) formData.append('file', images[0].file)

  const request = await fetch(API_V1.BUSINESSES.BRANCHES.CATEGORIES.POST(businessId, branchId), {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    body: formData
  })

  const response: ApiResponse<CategoryResponse> = await request.json()
  if (response.error) return response

  return { ...response, data: categoryAdapter(response.data) }
}

export interface UpdateCategoryArgs extends UpdateCategorySchema {
  businessId: string
  branchId: string
  categoryId: string
}

export async function updateCategoryById(args: UpdateCategoryArgs): Promise<ApiResponse<Category>> {
  const { businessId, branchId, categoryId, menuId, name, description, images } = args

  const accessToken = await getAccessToken()

  const formData = new FormData()
  if (menuId !== undefined) formData.append('menuId', menuId)
  if (name !== undefined) formData.append('name', name)
  if (description !== undefined) formData.append('description', description ?? '')
  if (images?.[0]?.file) formData.append('file', images[0].file)

  const request = await fetch(API_V1.BUSINESSES.BRANCHES.CATEGORIES.CATEGORY.BASE(businessId, branchId, categoryId), {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    body: formData
  })

  const response: ApiResponse<CategoryResponse> = await request.json()
  if (response.error) return response

  return { ...response, data: categoryAdapter(response.data) }
}

export interface DeleteCategoryArgs {
  businessId: string
  branchId: string
  categoryId: string
}

export async function deleteCategoryById(args: DeleteCategoryArgs): Promise<ApiResponse<void>> {
  const { businessId, branchId, categoryId } = args

  const accessToken = await getAccessToken()

  const request = await fetch(API_V1.BUSINESSES.BRANCHES.CATEGORIES.CATEGORY.BASE(businessId, branchId, categoryId), {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })

  const response: ApiResponse<void> = await request.json()
  if (response.error) return response

  return { ...response, data: undefined }
}
