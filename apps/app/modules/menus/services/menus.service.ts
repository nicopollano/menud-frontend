import { API_V1 } from '@/lib/api/api.config'
import { getAccessToken } from '@/modules/auth/services/auth.service'
import { menuAdapter, menusAdapter, menusSummaryAdapter } from '@/modules/menus/adapters/menus.adapter'
import type { CopyMenuByIdArgs, MoveMenuByIdArgs } from '@/modules/menus/interfaces/menu.interface'
import type { CreateMenuSchema } from '@/modules/menus/schemas/create-menu.schema'
import type { UpdateMenuSchema } from '@/modules/menus/schemas/update-menu.schema'
import { ApiError } from '@ristokit/shared/lib/api/api-error'
import type { ApiResponse } from '@ristokit/shared/lib/api/api.model'
import type { Menu, MenuResponse, MenusSummary, MenusSummaryResponse } from '@ristokit/shared/models/menu.model'

interface GetMenusArgs {
  businessId: string
  branchId: string
}

export async function getMenus(args: GetMenusArgs): Promise<ApiResponse<Menu[]>> {
  const { businessId, branchId } = args

  const accessToken = await getAccessToken()

  try {
    const res: ApiResponse<MenuResponse[]> = await (async () => {
      const r = await fetch(API_V1.BUSINESSES.BRANCHES.MENUS.BASE(businessId, branchId), {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      return r.json()
    })()

    if (res.error) return res

    return { ...res, data: menusAdapter(res.data) }
  } catch (err) {
    return { statusCode: 503, error: { code: 'FETCH_FAILED', message: String(err) }, data: null }
  }
}

interface GetMenuByIdArgs extends GetMenusArgs {
  menuId: string
}

export async function getMenuById(args: GetMenuByIdArgs): Promise<ApiResponse<Menu>> {
  const { businessId, branchId, menuId } = args

  const accessToken = await getAccessToken()

  try {
    const res = await (async () => {
      const r = await fetch(API_V1.BUSINESSES.BRANCHES.MENUS.MENU.BASE(businessId, branchId, menuId), {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      return r.json()
    })()

    if (res.error) return res

    return { ...res, data: menuAdapter(res.data) }
  } catch (err) {
    return { statusCode: 503, error: { code: 'FETCH_FAILED', message: String(err) }, data: null }
  }
}

interface GetMenusSummaryArgs {
  businessId: string
  branchId: string
}

export async function getMenusSummary(args: GetMenusSummaryArgs): Promise<ApiResponse<MenusSummary>> {
  const { businessId, branchId } = args

  const accessToken = await getAccessToken()

  try {
    const res = await (async () => {
      const r = await fetch(API_V1.BUSINESSES.BRANCHES.MENUS.SUMMARY(businessId, branchId), {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      return r.json()
    })()

    if (res.error) return res

    return { ...res, data: menusSummaryAdapter(res.data) }
  } catch (err) {
    return { statusCode: 503, error: { code: 'FETCH_FAILED', message: String(err) }, data: null }
  }
}

export async function createMenu(args: CreateMenuSchema): Promise<ApiResponse<Menu>> {
  const { businessId, branchId, name, description, images } = args

  const accessToken = await getAccessToken()

  const formData = new FormData()
  formData.append('name', name)
  if (description) formData.append('description', description)
  if (images?.[0]?.file) formData.append('logo', images[0].file)

  const request = await fetch(API_V1.BUSINESSES.BRANCHES.MENUS.BASE(businessId, branchId), {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    body: formData
  })

  const response: ApiResponse<MenuResponse> = await request.json()
  if (response.error) return response

  return { ...response, data: menuAdapter(response.data) }
}

export interface UpdateMenuArgs extends UpdateMenuSchema {
  businessId: string
  branchId: string
  menuId: string
}

export async function updateMenuById(args: UpdateMenuArgs): Promise<ApiResponse<Menu>> {
  const { businessId, branchId, menuId, name, description, images, typography, cover } = args

  const accessToken = await getAccessToken()

  const formData = new FormData()
  if (name !== undefined) formData.append('name', name)
  if (description !== undefined) formData.append('description', description ?? '')
  if (images !== undefined) formData.append('logo', images?.[0]?.file ?? '')
  if (typography !== undefined) formData.append('typography', typography)
  if (cover !== undefined) formData.append('cover', cover?.file ?? '')

  const request = await fetch(API_V1.BUSINESSES.BRANCHES.MENUS.MENU.BASE(businessId, branchId, menuId), {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    body: formData
  })

  const response: ApiResponse<MenuResponse> = await request.json()
  if (response.error) return response

  return { ...response, data: menuAdapter(response.data) }
}

export interface UpdateVisibilityMenuArgs {
  businessId: string
  branchId: string
  menuId: string
  enabled: boolean
}

export async function updateVisibilityMenuById(args: UpdateVisibilityMenuArgs): Promise<ApiResponse<Menu>> {
  const { businessId, branchId, menuId, enabled } = args

  const accessToken = await getAccessToken()

  const body: Record<string, unknown> = {
    visibility: enabled
  }

  const request = await fetch(API_V1.BUSINESSES.BRANCHES.MENUS.MENU.VISIBILITY(businessId, branchId, menuId), {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })

  const response: ApiResponse<MenuResponse> = await request.json()
  if (response.error) return response

  return { ...response, data: menuAdapter(response.data) }
}

export interface DeleteMenuArgs {
  businessId: string
  branchId: string
  menuId: string
}

export async function deleteMenuById(args: DeleteMenuArgs): Promise<ApiResponse<void>> {
  const { businessId, branchId, menuId } = args

  const accessToken = await getAccessToken()

  const request = await fetch(API_V1.BUSINESSES.BRANCHES.MENUS.MENU.BASE(businessId, branchId, menuId), {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })

  const response: ApiResponse<void> = await request.json()
  if (response.error) return response

  return { ...response, data: undefined }
}

export const menuService = {
  async moveMenuById(args: MoveMenuByIdArgs): Promise<void> {
    const { businessId, branchId, menuId, data } = args

    const accessToken = await getAccessToken()

    const body: Record<string, unknown> = {
      toBranchId: data.branchId
    }

    const request = await fetch(API_V1.BUSINESSES.BRANCHES.MENUS.MENU.MOVE(businessId, branchId, menuId), {
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

  async copyMenuById(args: CopyMenuByIdArgs): Promise<void> {
    const { businessId, branchId, menuId, data } = args

    const accessToken = await getAccessToken()

    const body: Record<string, unknown> = {
      toBranchId: data.branchId
    }

    const request = await fetch(API_V1.BUSINESSES.BRANCHES.MENUS.MENU.COPY(businessId, branchId, menuId), {
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
