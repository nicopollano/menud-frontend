import type { z } from 'zod'
import { createPaletteSchema } from './create-palette.schema'

export const updatePaletteSchema = createPaletteSchema.partial().refine((data) => Object.keys(data).length > 0, {
  message: 'Al menos un campo es obligatorio',
  path: ['custom']
})

export type UpdatePaletteSchema = z.infer<typeof updatePaletteSchema>
