import { imagesSchema } from '@/modules/shared/schemas/images.schema'
import { z } from 'zod'

export const createCategorySchema = z.object({
  menuId: z
    .string({
      required_error: 'El menu es obligatorio',
      invalid_type_error: 'El menu debe ser de tipo texto'
    })
    .min(1, { message: 'El menu debe tener al menos 1 caracter' }),
  name: z
    .string({
      required_error: 'El nombre es obligatorio',
      invalid_type_error: 'El nombre debe ser de tipo texto'
    })
    .min(1, { message: 'El nombre debe tener al menos 1 caracter' }),
  description: z
    .string({
      required_error: 'La descripción es obligatoria',
      invalid_type_error: 'La descripción debe ser de tipo texto'
    })
    .transform((value) => (value === '' ? null : value))
    .optional()
    .nullable(),
  images: imagesSchema.max(1, { message: 'La categoría no puede tener más de 1 imágenes' })
})

export type CreateCategorySchema = z.infer<typeof createCategorySchema>
