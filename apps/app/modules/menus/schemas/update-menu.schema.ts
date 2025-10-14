import type { z } from 'zod'
import { createMenuSchema } from './create-menu.schema'

export const updateMenuSchema = createMenuSchema.partial().refine((data) => Object.keys(data).length > 0, {
  message: 'Al menos un campo es obligatorio',
  path: ['custom']
})

export type UpdateMenuSchema = z.infer<typeof updateMenuSchema>
