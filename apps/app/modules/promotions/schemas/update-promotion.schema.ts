import type { z } from 'zod'
import { createPromotionSchema } from './create-promotion.schema'

export const updatePromotionSchema = createPromotionSchema.refine((data) => Object.keys(data).length > 0, {
  message: 'Al menos un campo es obligatorio',
  path: ['custom']
})

export type UpdatePromotionSchema = z.infer<typeof updatePromotionSchema>
