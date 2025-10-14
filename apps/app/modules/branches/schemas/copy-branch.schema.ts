import { z } from 'zod'

export const copyBranchSchema = z
  .object({
    businessId: z
      .string({
        required_error: 'El restaurante es obligatorio',
        invalid_type_error: 'El restaurante debe ser de tipo texto'
      })
      .min(1, {
        message: 'El restaurante debe tener al menos 1 caracter'
      })
  })
  .strict()

export type CopyBranchSchema = z.infer<typeof copyBranchSchema>
