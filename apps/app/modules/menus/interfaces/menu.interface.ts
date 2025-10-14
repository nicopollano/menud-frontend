import type { CopyMenuSchema } from '@/modules/menus/schemas/copy-menu.schema'
import type { MoveMenuSchema } from '@/modules/menus/schemas/move-menu.schema'

export interface BaseMenuArgs {
  businessId: string
  branchId: string
}

export interface MoveMenuByIdArgs extends BaseMenuArgs {
  menuId: string
  data: MoveMenuSchema
}

export interface CopyMenuByIdArgs extends BaseMenuArgs {
  menuId: string
  data: CopyMenuSchema
}
