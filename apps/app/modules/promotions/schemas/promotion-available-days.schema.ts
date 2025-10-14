import { z } from 'zod'

export const promotionAvailableDaysSchema = z
  .object({
    fromTime: z
      .string({
        invalid_type_error: 'La fecha y hora de inicio debe ser de tipo texto',
        required_error: 'La fecha y hora de inicio es obligatoria'
      })
      .regex(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/, {
        message: 'La fecha y hora de inicio debe tener el formato YYYY-MM-DD HH:MM'
      }),
    toTime: z
      .string({
        invalid_type_error: 'La fecha y hora de fin debe ser de tipo texto',
        required_error: 'La fecha y hora de fin es obligatoria'
      })
      .regex(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/, {
        message: 'La fecha y hora de fin debe tener el formato YYYY-MM-DD HH:MM'
      })
  })
  .refine(({ fromTime, toTime }) => fromTime < toTime, {
    message: 'La fecha y hora de inicio debe ser anterior a la fecha y hora de fin',
    path: ['toTime']
  })

export type PromotionAvailableDaysSchema = z.infer<typeof promotionAvailableDaysSchema>
