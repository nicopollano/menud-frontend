import { COLOR_REGEX } from '@/modules/shared/constants/regex.const'
import { z } from 'zod'

export const createPaletteSchema = z
  .object({
    color1: z
      .string({
        required_error: 'El color1 es obligatorio',
        invalid_type_error: 'El color1 debe ser de tipo texto'
      })
      .min(1, {
        message: 'El color1 debe tener al menos 1 caracter'
      })
      .regex(COLOR_REGEX, {
        message: 'El color1 debe ser un color válido en formato hexadecimal'
      }),
    color2: z
      .string({
        required_error: 'El color2 es obligatorio',
        invalid_type_error: 'El color2 debe ser de tipo texto'
      })
      .min(1, {
        message: 'El color2 debe tener al menos 1 caracter'
      })
      .regex(COLOR_REGEX, {
        message: 'El color2 debe ser un color válido en formato hexadecimal'
      }),
    color3: z
      .string({
        required_error: 'El color3 es obligatorio',
        invalid_type_error: 'El color3 debe ser de tipo texto'
      })
      .min(1, {
        message: 'El color3 debe tener al menos 1 caracter'
      })
      .regex(COLOR_REGEX, {
        message: 'El color3 debe ser un color válido en formato hexadecimal'
      }),
    enabled: z
      .boolean({
        required_error: 'El estado de la paleta es obligatorio',
        invalid_type_error: 'El estado de la paleta debe ser de tipo activo o inactivo'
      })
      .optional()
  })
  .strict()

export type CreatePaletteSchema = z.infer<typeof createPaletteSchema>
