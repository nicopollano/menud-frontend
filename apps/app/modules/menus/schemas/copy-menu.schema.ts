import { z } from 'zod'

export const copyMenuSchema = z
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
      })
  })
  .strict()

export type CopyMenuSchema = z.infer<typeof copyMenuSchema>
