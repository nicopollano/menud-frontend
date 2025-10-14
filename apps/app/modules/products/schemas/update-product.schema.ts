import type { z } from 'zod'
import { createProductSchema } from './create-product.schema'

export const updateProductSchema = createProductSchema.partial().refine((data) => Object.keys(data).length > 0, {
  message: 'Al menos un campo es obligatorio',
  path: ['custom']
})

export type UpdateProductSchema = z.infer<typeof updateProductSchema>
