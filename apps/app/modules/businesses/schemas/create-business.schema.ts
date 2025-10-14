import { imagesSchema } from '@/modules/shared/schemas/images.schema'
import { z } from 'zod'

export const createBusinessSchema = z
  .object({
    name: z
      .string({
        required_error: 'El nombre es obligatorio',
        invalid_type_error: 'El nombre debe ser de tipo texto'
      })
      .min(1, {
        message: 'El nombre debe tener al menos 1 caracter'
      }),
    description: z
      .string({
        required_error: 'La descripción es obligatoria',
        invalid_type_error: 'La descripción debe ser de tipo texto'
      })
      .transform((value) => (value === '' ? null : value))
      .optional()
      .nullable(),
    images: imagesSchema.max(1, { message: 'El restaurante no puede tener más de 1 imágenes' })
  })
  .strict()

export type CreateBusinessSchema = z.infer<typeof createBusinessSchema>
