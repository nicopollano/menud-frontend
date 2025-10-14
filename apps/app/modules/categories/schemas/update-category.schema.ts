import type { z } from 'zod'
import { createCategorySchema } from './create-category.schema'

export const updateCategorySchema = createCategorySchema.partial().refine((data) => Object.keys(data).length > 0, {
  message: 'Al menos un campo es obligatorio',
  path: ['custom']
})

export type UpdateCategorySchema = z.infer<typeof updateCategorySchema>
