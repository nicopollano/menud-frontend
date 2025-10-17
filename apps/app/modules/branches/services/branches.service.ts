import { API_V1 } from '@/lib/api/api.config'
import { getAccessToken } from '@/modules/auth/services/auth.service'
import { branchAdapter, branchesAdapter, branchesSummaryAdapter } from '@/modules/branches/adapters/branches.adapter'
import type { CopyBranchByIdArgs, MoveBranchByIdArgs } from '@/modules/branches/interfaces/branch.interface'
import type { CreateBranchSchema } from '@/modules/branches/schemas/create-branch.schema'
import type { UpdateBranchSchema } from '@/modules/branches/schemas/update-branch.schema'
import { ApiError } from '@ristokit/shared/lib/api/api-error'
import type { ApiResponse } from '@ristokit/shared/lib/api/api.model'
import type {
  Branch,
  BranchResponse,
  BranchesSummary,
  BranchesSummaryResponse
} from '@ristokit/shared/models/branch.model'

interface GetBranchesArgs {
  businessId: string
}

export async function getBranches(args: GetBranchesArgs): Promise<ApiResponse<Branch[]>> {
  const { businessId } = args

  const accessToken = await getAccessToken()

  try {
    const r = await fetch(API_V1.BUSINESSES.BRANCHES.BASE(businessId), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    const response: ApiResponse<BranchResponse[]> = await r.json()
    if (response.error) return response

    return { ...response, data: branchesAdapter(response.data) }
  } catch (err) {
    return { statusCode: 503, error: { code: 'FETCH_FAILED', message: String(err) }, data: null }
  }
}

interface GetBranchByIdArgs extends GetBranchesArgs {
  branchId: string
}

export async function getBranchById(args: GetBranchByIdArgs): Promise<ApiResponse<Branch>> {
  const { businessId, branchId } = args

  const accessToken = await getAccessToken()

  try {
    const r = await fetch(API_V1.BUSINESSES.BRANCHES.BRANCH.BASE(businessId, branchId), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    const response: ApiResponse<BranchResponse> = await r.json()
    if (response.error) return response

    return { ...response, data: branchAdapter(response.data) }
  } catch (err) {
    return { statusCode: 503, error: { code: 'FETCH_FAILED', message: String(err) }, data: null }
  }
}

interface GetBranchesSummaryArgs {
  businessId: string
}

export async function getBranchesSummary(args: GetBranchesSummaryArgs): Promise<ApiResponse<BranchesSummary>> {
  const { businessId } = args

  const accessToken = await getAccessToken()

  try {
    const r = await fetch(API_V1.BUSINESSES.BRANCHES.SUMMARY(businessId), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    const response: ApiResponse<BranchesSummaryResponse> = await r.json()
    if (response.error) return response

    return { ...response, data: branchesSummaryAdapter(response.data) }
  } catch (err) {
    return { statusCode: 503, error: { code: 'FETCH_FAILED', message: String(err) }, data: null }
  }
}

export async function createBranch(args: CreateBranchSchema): Promise<ApiResponse<Branch>> {
  const { businessId, name, description, images } = args

  const accessToken = await getAccessToken()

  const formData = new FormData()
  formData.append('name', name)
  if (description) formData.append('description', description)
  if (images?.[0]?.file) formData.append('logo', images[0].file)

  const request = await fetch(API_V1.BUSINESSES.BRANCHES.BASE(businessId), {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    body: formData
  })

  const response: ApiResponse<BranchResponse> = await request.json()
  if (response.error) return response

  return { ...response, data: branchAdapter(response.data) }
}

export interface UpdateBranchArgs extends UpdateBranchSchema {
  businessId: string
  branchId: string
}

export async function updateBranchById(args: UpdateBranchArgs): Promise<ApiResponse<Branch>> {
  const { businessId, branchId, name, description, images, address, phone, currency, enabled } = args

  const accessToken = await getAccessToken()

  const formData = new FormData()

  if (name !== undefined) formData.append('name', name)
  if (description !== undefined) formData.append('description', description ?? '')
  if (images !== undefined) formData.append('logo', images?.[0]?.file ?? '')
  if (address !== undefined) formData.append('address', address ?? '')
  if (phone !== undefined) formData.append('phone', phone ?? '')
  if (currency !== undefined) formData.append('currency', currency ?? '')
  if (enabled !== undefined) formData.append('enabled', String(enabled))

  const request = await fetch(API_V1.BUSINESSES.BRANCHES.BRANCH.BASE(businessId, branchId), {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    body: formData
  })

  const response: ApiResponse<BranchResponse> = await request.json()
  if (response.error) return response

  return { ...response, data: branchAdapter(response.data) }
}

export interface DeleteBranchArgs {
  businessId: string
  branchId: string
}

export async function deleteBranchById(args: DeleteBranchArgs): Promise<ApiResponse<void>> {
  const { businessId, branchId } = args

  const accessToken = await getAccessToken()

  const request = await fetch(API_V1.BUSINESSES.BRANCHES.BRANCH.BASE(businessId, branchId), {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })

  const response: ApiResponse<void> = await request.json()
  if (response.error) return response

  return { ...response, data: undefined }
}

export const branchService = {
  async moveBranchById(args: MoveBranchByIdArgs): Promise<void> {
    const { businessId, branchId, data } = args

    const accessToken = await getAccessToken()

    const body: Record<string, unknown> = {
      toBusinessId: data.businessId
    }

    const request = await fetch(API_V1.BUSINESSES.BRANCHES.BRANCH.MOVE(businessId, branchId), {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })

    const response: ApiResponse<void> = await request.json()
    if (response.error) {
      throw new ApiError({
        code: response.error.code,
        message: response.error.message,
        details: response.error.details
      })
    }
  },

  async copyBranchById(args: CopyBranchByIdArgs): Promise<void> {
    const { businessId, branchId, data } = args

    const accessToken = await getAccessToken()

    const body: Record<string, unknown> = {
      toBusinessId: data.businessId
    }

    const request = await fetch(API_V1.BUSINESSES.BRANCHES.BRANCH.COPY(businessId, branchId), {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })

    const response: ApiResponse<void> = await request.json()
    if (response.error) {
      throw new ApiError({
        code: response.error.code,
        message: response.error.message,
        details: response.error.details
      })
    }
  }
}
