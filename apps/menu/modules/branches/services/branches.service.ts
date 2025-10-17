import { env } from '@/env'
import { API_V1 } from '@/lib/api/api.config'
import { branchAdapter, branchSlugsAdapter } from '@/modules/branches/adapters/branches.adapter'
import type { ApiResponse } from '@ristokit/shared/lib/api/api.model'
import type { BranchById, BranchByIdResponse, BranchSlug } from '@ristokit/shared/models/branch.model'

interface GetBranchByIdArgs {
  id: string
}

export async function getBranchById(args: GetBranchByIdArgs): Promise<ApiResponse<BranchById>> {
  const { id } = args

  const request = await fetch(API_V1.BRANCHES.BRANCH.BASE(id), {
    method: 'GET',
    next: { revalidate: env.NEXT_PUBLIC_API_REVALIDATE }
  })

  const response: ApiResponse<BranchByIdResponse> = await request.json()
  if (response.error) return response

  return { ...response, data: branchAdapter(response.data) }
}

export async function getBranchSlugs(): Promise<ApiResponse<BranchSlug[]>> {
  try {
    const request = await fetch(API_V1.BRANCHES.SLUGS, {
      method: 'GET',
      next: { revalidate: env.NEXT_PUBLIC_API_REVALIDATE }
    })

    const response: ApiResponse<BranchSlug[]> = await request.json()
    if (response.error) return response

    return { ...response, data: branchSlugsAdapter(response.data) }
  } catch (err) {
    // If fetch fails in CI/SSG environment, return empty list so generation doesn't fail
    // eslint-disable-next-line no-console
    console.warn('getBranchSlugs failed:', err)
    return { statusCode: 200, error: null, data: [] }
  }
}
