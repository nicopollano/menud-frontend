import { z } from 'zod'

export const updateSchedulesSchema = z.object({
  schedules: z.array(
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
      .strict()
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
})

export type UpdateSchedulesSchema = z.infer<typeof updateSchedulesSchema>
