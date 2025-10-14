import type { z } from 'zod'
import { createBranchSchema } from './create-branch.schema'

export const updateBranchSchema = createBranchSchema.partial().refine((data) => Object.keys(data).length > 0, {
  message: 'Al menos un campo es obligatorio',
  path: ['custom']
})

export type UpdateBranchSchema = z.infer<typeof updateBranchSchema>
