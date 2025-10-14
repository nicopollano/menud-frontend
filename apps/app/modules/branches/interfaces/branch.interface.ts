import type { CopyBranchSchema } from '@/modules/branches/schemas/copy-branch.schema'
import type { MoveBranchSchema } from '@/modules/branches/schemas/move-branch.schema'

export interface BaseBranchArgs {
  businessId: string
}

export interface MoveBranchByIdArgs extends BaseBranchArgs {
  branchId: string
  data: MoveBranchSchema
}

export interface CopyBranchByIdArgs extends BaseBranchArgs {
  branchId: string
  data: CopyBranchSchema
}
