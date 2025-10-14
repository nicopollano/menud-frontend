import type { z } from 'zod'
import { createBusinessSchema } from './create-business.schema'

export const updateBusinessSchema = createBusinessSchema.partial().refine((data) => Object.keys(data).length > 0, {
  message: 'Al menos un campo es obligatorio',
  path: ['custom']
})

export type UpdateBusinessSchema = z.infer<typeof updateBusinessSchema>
