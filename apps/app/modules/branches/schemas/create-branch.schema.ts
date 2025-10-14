import { imagesSchema } from '@/modules/shared/schemas/images.schema'
import { CURRENCIES, Currency } from '@ristokit/shared/models/general.model'
import { z } from 'zod'

export const createBranchSchema = z
  .object({
    businessId: z
      .string({
        required_error: 'El restaurante es obligatorio',
        invalid_type_error: 'El restaurante debe ser de tipo texto'
      })
      .min(1, {
        message: 'El restaurante debe tener al menos 1 caracter'
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
    images: imagesSchema.max(1, { message: 'La sucursal no puede tener más de 1 imágenes' }),
    address: z
      .string({
        required_error: 'La dirección es obligatoria',
        invalid_type_error: 'La dirección debe ser de tipo texto'
      })
      .optional()
      .nullable(),
    phone: z
      .string({
        required_error: 'El teléfono es obligatorio',
        invalid_type_error: 'El teléfono debe ser de tipo texto'
      })
      .optional()
      .nullable(),
    currency: z
      .nativeEnum(Currency, {
        invalid_type_error: `La moneda debe ser ${CURRENCIES.map((currency) => currency).join(' o ')}`
      })
      .optional()
      .nullable(),
    enabled: z
      .boolean({
        required_error: 'El estado de la sucursal es obligatorio',
        invalid_type_error: 'El estado de la sucursal debe ser de tipo activo o inactivo'
      })
      .optional(),
    schedules: z
      .array(
        z
          .object({
            id: z.string({
              required_error: 'El id del horario es obligatorio',
              invalid_type_error: 'El id del horario debe ser de tipo texto'
            }),
            day: z.number({
              required_error: 'El día es obligatorio',
              invalid_type_error: 'El día debe ser de tipo numérico'
            }),
            openTime: z
              .string({
                invalid_type_error: 'La hora de apertura debe ser de tipo texto'
              })
              .optional(),
            closeTime: z
              .string({
                invalid_type_error: 'La hora de cierre debe ser de tipo texto'
              })
              .optional(),
            enabled: z.boolean({
              required_error: 'El estado del horario es obligatorio',
              invalid_type_error: 'El estado del horario debe ser de tipo activo o inactivo'
            })
          })
          .refine(
            (data) => {
              if (!data.enabled) return true
              return data.openTime
            },
            {
              message: 'El horario de apertura es obligatorio',
              path: ['openTime']
            }
          )
          .refine(
            (data) => {
              if (!data.enabled) return true
              return data.closeTime
            },
            {
              message: 'El horario de cierre es obligatorio',
              path: ['closeTime']
            }
          )
      )
      .optional()
      .nullable()
  })
  .strict()

export type CreateBranchSchema = z.infer<typeof createBranchSchema>
