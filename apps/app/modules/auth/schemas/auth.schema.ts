import { z } from 'zod'

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: 'El correo electrónico es obligatorio'
    })
    .email({
      message: 'El correo electrónico no es válido'
    }),
  password: z.string().min(1, {
    message: 'La contraseña es obligatoria'
  })
})

export type SignInSchema = z.infer<typeof signInSchema>

export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, {
    message: 'El token de refresco es obligatorio'
  })
})

export type RefreshTokenSchema = z.infer<typeof refreshTokenSchema>
