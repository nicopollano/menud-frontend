import type { z } from 'zod'
import { createSubcategorySchema } from './create-subcategory.schema'

export const updateSubcategorySchema = createSubcategorySchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'Al menos un campo es obligatorio',
    path: ['custom']
  })

export type UpdateSubcategorySchema = z.infer<typeof updateSubcategorySchema>
