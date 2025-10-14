import { API_V1 } from '@/lib/api/api.config'
import { getAccessToken } from '@/modules/auth/services/auth.service'
import type { UpdatePaletteSchema } from '@/modules/palettes/schemas/update-palette.schema'
import type { ApiResponse } from '@ristokit/shared/lib/api/api.model'
import type { MenuPalette } from '@ristokit/shared/models/menu.model'

export interface UpdatePaletteArgs extends UpdatePaletteSchema {
  businessId: string
  branchId: string
  paletteId: string
}

export async function updatePaletteById(args: UpdatePaletteArgs): Promise<ApiResponse<MenuPalette>> {
  const { businessId, branchId, paletteId, color1, color2, color3, enabled } = args

  const accessToken = await getAccessToken()

  const body: Record<string, unknown> = {
    color1: color1,
    color2: color2,
    color3: color3,
    enabled: enabled
  }

  const request = await fetch(API_V1.BUSINESSES.BRANCHES.PALETTES.PALETTE.BASE(businessId, branchId, paletteId), {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })

  const response: ApiResponse<MenuPalette> = await request.json()
  if (response.error) return response

  return { ...response, data: response.data }
}
