import { imagesSchema } from '@/modules/shared/schemas/images.schema'
import { Day } from '@ristokit/shared/models/general.model'
import { z } from 'zod'

export const createPromotionSchema = z
  .object({
    productIds: z
      .array(
        z
          .string({
            invalid_type_error: 'El ID del producto debe ser de tipo texto',
            required_error: 'El ID del producto es obligatorio'
          })
          .min(1, { message: 'El ID del producto debe tener al menos 1 caracter' })
      )
      .min(1, { message: 'Es necesario seleccionar al menos un producto' }),
    title: z
      .string({
        required_error: 'El título es obligatorio',
        invalid_type_error: 'El título debe ser de tipo texto'
      })
      .min(1, { message: 'El título debe tener al menos 1 caracter' }),
    description: z
      .string({
        required_error: 'La descripción es obligatoria',
        invalid_type_error: 'La descripción debe ser de tipo texto'
      })
      .transform((value) => (value === '' ? null : value))
      .optional()
      .nullable(),
    images: imagesSchema.max(1, { message: 'La promoción no puede tener más de 1 imágenes' }),
    startsAt: z
      .string({
        invalid_type_error: 'La fecha y hora de inicio debe ser de tipo texto',
        required_error: 'La fecha y hora de inicio es obligatoria'
      })
      .datetime({
        message: 'La fecha y hora de inicio es inválida'
      }),
    endsAt: z
      .string({
        invalid_type_error: 'La fecha y hora de fin debe ser de tipo texto',
        required_error: 'La fecha y hora de fin es obligatoria'
      })
      .datetime({
        message: 'La fecha y hora de fin es inválida'
      }),
    startTime: z
      .string({
        invalid_type_error: 'La hora de inicio debe ser de tipo texto',
        required_error: 'La hora de inicio es obligatoria'
      })
      .time({
        message: 'La hora de inicio es inválida'
      }),
    endTime: z
      .string({
        invalid_type_error: 'La hora de fin debe ser de tipo texto',
        required_error: 'La hora de fin es obligatoria'
      })
      .time({
        message: 'La hora de fin es inválida'
      }),
    days: z
      .array(
        z.nativeEnum(Day, {
          invalid_type_error: 'Los días deben ser de tipo texto',
          required_error: 'Los días son obligatorios'
        })
      )
      .min(1, { message: 'Es necesario seleccionar al menos un día' })
  })
  .refine(({ startsAt, endsAt }) => startsAt < endsAt, {
    message: 'La fecha y hora de inicio debe ser anterior a la fecha y hora de fin',
    path: ['endsAt']
  })

export type CreatePromotionSchema = z.infer<typeof createPromotionSchema>
