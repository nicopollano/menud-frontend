import { API_V1 } from '@/lib/api/api.config'
import { getAccessToken } from '@/modules/auth/services/auth.service'
import {
  businessAdapter,
  businessesAdapter,
  businessesSummaryAdapter
} from '@/modules/businesses/adapters/businesses.adapter'
import type { CreateBusinessSchema } from '@/modules/businesses/schemas/create-business.schema'
import type { UpdateBusinessSchema } from '@/modules/businesses/schemas/update-business.schema'
import type { ApiResponse } from '@ristokit/shared/lib/api/api.model'
import type {
  Business,
  BusinessResponse,
  BusinessesSummary,
  BusinessesSummaryResponse
} from '@ristokit/shared/models/business.model'

async function safeFetchJson<T>(input: RequestInfo, init?: RequestInit) {
  try {
    const res = await fetch(input, init)
    return (await res.json()) as T
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn('safeFetchJson failed for', input, err)
    throw err
  }
}

export async function getBusinesses(): Promise<ApiResponse<Business[]>> {
  const accessToken = await getAccessToken()

  try {
    const response: ApiResponse<BusinessResponse[]> = await safeFetchJson(API_V1.BUSINESSES.BASE, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    if (response.error) return response

    return { ...response, data: businessesAdapter(response.data) }
  } catch (err) {
    return { statusCode: 503, error: { code: 'FETCH_FAILED', message: String(err) }, data: null }
  }
}

interface GetBusinessByIdArgs {
  businessId: string
}

export async function getBusinessById(args: GetBusinessByIdArgs): Promise<ApiResponse<Business>> {
  const { businessId } = args

  const accessToken = await getAccessToken()

  try {
    const response: ApiResponse<BusinessResponse> = await safeFetchJson(API_V1.BUSINESSES.BUSINESS.BASE(businessId), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    if (response.error) return response

    return { ...response, data: businessAdapter(response.data) }
  } catch (err) {
    return { statusCode: 503, error: { code: 'FETCH_FAILED', message: String(err) }, data: null }
  }
}

export async function getBusinessesSummary(): Promise<ApiResponse<BusinessesSummary>> {
  const accessToken = await getAccessToken()

  try {
    const response: ApiResponse<BusinessesSummaryResponse> = await safeFetchJson(API_V1.BUSINESSES.SUMMARY, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    if (response.error) return response

    return { ...response, data: businessesSummaryAdapter(response.data) }
  } catch (err) {
    return { statusCode: 503, error: { code: 'FETCH_FAILED', message: String(err) }, data: null }
  }
}

export async function createBusiness(args: CreateBusinessSchema): Promise<ApiResponse<Business>> {
  const { name, description, images } = args

  const accessToken = await getAccessToken()

  const formData = new FormData()
  formData.append('name', name)
  if (description) formData.append('description', description)
  if (images?.[0]?.file) formData.append('logo', images[0].file)

  const request = await fetch(API_V1.BUSINESSES.BASE, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    body: formData
  })

  const response: ApiResponse<BusinessResponse> = await request.json()
  if (response.error) return response

  return { ...response, data: businessAdapter(response.data) }
}

export interface UpdateBusinessArgs extends UpdateBusinessSchema {
  businessId: string
}

export async function updateBusinessById(args: UpdateBusinessArgs): Promise<ApiResponse<Business>> {
  const { businessId, name, description, images } = args

  const accessToken = await getAccessToken()

  const formData = new FormData()
  if (name !== undefined) formData.append('name', name)
  if (description !== undefined) formData.append('description', description ?? '')
  if (images !== undefined) formData.append('logo', images?.[0]?.file ?? '')

  const request = await fetch(API_V1.BUSINESSES.BUSINESS.BASE(businessId), {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    body: formData
  })

  const response: ApiResponse<BusinessResponse> = await request.json()
  if (response.error) return response

  return { ...response, data: businessAdapter(response.data) }
}

export interface DeleteBusinessArgs {
  businessId: string
}

export async function deleteBusinessById(args: DeleteBusinessArgs): Promise<ApiResponse<void>> {
  const { businessId } = args

  const accessToken = await getAccessToken()

  const request = await fetch(API_V1.BUSINESSES.BUSINESS.BASE(businessId), {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })

  const response: ApiResponse<void> = await request.json()
  if (response.error) return response

  return { ...response, data: undefined }
}
