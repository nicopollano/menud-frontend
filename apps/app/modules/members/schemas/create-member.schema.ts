import { UserRole } from '@ristokit/shared/models/general.model'
import { z } from 'zod'

export const createMemberSchema = z
  .object({
    name: z
      .string({
        required_error: 'El nombre es obligatorio',
        invalid_type_error: 'El nombre debe ser de tipo texto'
      })
      .min(1, {
        message: 'El nombre debe tener al menos 1 caracter'
      }),
    email: z
      .string({
        required_error: 'El correo electrónico es obligatorio',
        invalid_type_error: 'El correo electrónico debe ser de tipo texto'
      })
      .min(1, {
        message: 'El correo electrónico debe tener al menos 1 caracter'
      })
      .email({
        message: 'El correo electrónico no es válido'
      }),
    password: z
      .string({
        required_error: 'La contraseña es obligatoria',
        invalid_type_error: 'La contraseña debe ser de tipo texto'
      })
      .min(6, {
        message: 'La contraseña debe tener al menos 6 caracteres'
      }),
    role: z.nativeEnum(UserRole, {
      required_error: 'Los permisos son obligatorios'
    })
  })
  .strict()

export type CreateMemberSchema = z.infer<typeof createMemberSchema>
