import { imageSchema, imagesSchema } from '@/modules/shared/schemas/images.schema'
import { Typography } from '@ristokit/shared/models/general.model'
import { z } from 'zod'

export const createMenuSchema = z
  .object({
    businessId: z
      .string({
        required_error: 'El restaurante es obligatorio',
        invalid_type_error: 'El restaurante debe ser de tipo texto'
      })
      .min(1, {
        message: 'El restaurante debe tener al menos 1 caracter'
      }),
    branchId: z
      .string({
        required_error: 'La sucursal es obligatoria',
        invalid_type_error: 'La sucursal debe ser de tipo texto'
      })
      .min(1, {
        message: 'La sucursal debe tener al menos 1 caracter'
      }),
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
    images: imagesSchema.max(1, { message: 'El menú no puede tener más de 1 imágenes' }),
    typography: z
      .nativeEnum(Typography, {
        required_error: 'La tipografía es obligatoria',
        invalid_type_error: 'La tipografía debe ser una de las opciones disponibles'
      })
      .optional(),
    cover: imageSchema.optional().nullable(),
    enabled: z
      .boolean({
        required_error: 'El estado del menú es obligatorio',
        invalid_type_error: 'El estado del menú debe ser de tipo activo o inactivo'
      })
      .optional()
  })
  .strict()

export type CreateMenuSchema = z.infer<typeof createMenuSchema>
