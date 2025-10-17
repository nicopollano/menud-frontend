import { API_V1 } from '@/lib/api/api.config'
import { getAccessToken } from '@/modules/auth/services/auth.service'
import { subcategoriesAdapter, subcategoryAdapter } from '@/modules/subcategories/adapters/subcategories.adapter'
import type { CreateSubcategorySchema } from '@/modules/subcategories/schemas/create-subcategory.schema'
import type { UpdateSubcategorySchema } from '@/modules/subcategories/schemas/update-subcategory.schema'
import { buildQueryString } from '@ristokit/shared/helpers/general.helper'
import type { ApiResponse } from '@ristokit/shared/lib/api/api.model'
import type { Subcategory, SubcategoryResponse } from '@ristokit/shared/models/subcategory.model'

interface GetSubcategoriesArgs {
  businessId: string
  branchId: string
  params: Record<string, unknown>
}

export async function getSubcategories(args: GetSubcategoriesArgs): Promise<ApiResponse<Subcategory[]>> {
  const { businessId, branchId, params } = args

  const accessToken = await getAccessToken()

  const url = buildQueryString(API_V1.BUSINESSES.BRANCHES.SUBCATEGORIES.BASE(businessId, branchId), params)
  try {
    const request = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    const response: ApiResponse<SubcategoryResponse[]> = await request.json()
    if (response.error) return response

    return { ...response, data: subcategoriesAdapter(response.data) }
  } catch (err) {
    return { statusCode: 503, error: { code: 'FETCH_FAILED', message: String(err) }, data: null }
  }
}

export interface CreateSubCategoryArgs extends CreateSubcategorySchema {
  businessId: string
  branchId: string
}

export async function createSubcategory(args: CreateSubCategoryArgs): Promise<ApiResponse<Subcategory>> {
  const { businessId, branchId, categoryId, name, description, images } = args

  const accessToken = await getAccessToken()

  const formData = new FormData()
  formData.append('categoryId', categoryId)
  formData.append('name', name)
  if (description) formData.append('description', description)
  if (images?.[0]?.file) formData.append('file', images[0].file)

  const request = await fetch(API_V1.BUSINESSES.BRANCHES.SUBCATEGORIES.POST(businessId, branchId), {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    body: formData
  })

  const response: ApiResponse<SubcategoryResponse> = await request.json()
  if (response.error) return response

  return { ...response, data: subcategoryAdapter(response.data) }
}

export interface UpdateSubcategoryArgs extends UpdateSubcategorySchema {
  businessId: string
  branchId: string
  subcategoryId: string
}

export async function updateSubcategoryById(args: UpdateSubcategoryArgs): Promise<ApiResponse<Subcategory>> {
  const { businessId, branchId, categoryId, subcategoryId, name, description, images } = args

  const accessToken = await getAccessToken()

  const formData = new FormData()
  if (categoryId !== undefined) formData.append('categoryId', categoryId)
  if (name !== undefined) formData.append('name', name)
  if (description !== undefined) formData.append('description', description ?? '')
  if (images?.[0]?.file) formData.append('file', images[0].file)

  const request = await fetch(
    API_V1.BUSINESSES.BRANCHES.SUBCATEGORIES.SUBCATEGORY.BASE(businessId, branchId, subcategoryId),
    {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      body: formData
    }
  )

  const response: ApiResponse<SubcategoryResponse> = await request.json()
  if (response.error) return response

  return { ...response, data: subcategoryAdapter(response.data) }
}

export interface DeleteSubcategoryArgs {
  businessId: string
  branchId: string
  subcategoryId: string
}

export async function deleteSubcategoryById(args: DeleteSubcategoryArgs): Promise<ApiResponse<void>> {
  const { businessId, branchId, subcategoryId } = args

  const accessToken = await getAccessToken()

  const request = await fetch(
    API_V1.BUSINESSES.BRANCHES.SUBCATEGORIES.SUBCATEGORY.BASE(businessId, branchId, subcategoryId),
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  )

  const response: ApiResponse<void> = await request.json()
  if (response.error) return response

  return { ...response, data: undefined }
}
