import type { UpdateLinkitSchema } from '@/modules/linkit/schemas/update-linkit.schema'

export interface BaseLinkitArgs {
  businessId: string
}

export interface UpdateLinkitByIdArgs extends BaseLinkitArgs {
  linkitId: string
  data: UpdateLinkitSchema
}
