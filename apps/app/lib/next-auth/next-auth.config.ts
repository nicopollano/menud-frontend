import { refreshTokenSchema, signInSchema } from '@/modules/auth/schemas/auth.schema'
import { refreshToken, signInWithCredentials } from '@/modules/auth/services/auth.service'
import { ROUTES } from '@/modules/shared/lib/routes'
import { getApiErrorMessage } from '@ristokit/shared/lib/api/api-error-messages'
import type { ISODateString, NextAuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { z } from 'zod'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      accessToken: string
      accessTokenExpiresAt: Date
      refreshToken: string
      refreshTokenExpiresAt: Date
    }
    expires: ISODateString
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    email: string
    accessToken: string
    accessTokenExpiresAt: Date
    refreshToken: string
    refreshTokenExpiresAt: Date
  }
}

export const config: NextAuthOptions = {
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Correo electrónico', type: 'email' },
        password: { label: 'Contraseña', type: 'password' }
      },
      async authorize(credentials) {
        try {
          const values = await signInSchema.parseAsync(credentials)

          const { data, error } = await signInWithCredentials({
            email: values.email,
            password: values.password
          })
          if (error) throw new Error(error.code.toLowerCase())

          return {
            id: data.id,
            email: data.email,
            accessToken: data.accessToken,
            accessTokenExpiresAt: data.accessTokenExpiresAt,
            refreshToken: data.refreshToken,
            refreshTokenExpiresAt: data.refreshTokenExpiresAt
          }
        } catch (error) {
          console.error(error)
          if (error instanceof Error) {
            throw new Error(getApiErrorMessage(error.message))
          }
          if (error instanceof z.ZodError) {
            throw new Error(getApiErrorMessage('zod/invalid-body'))
          }
          return null
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      const REFRESH_THRESHOLD = 1000 * 60 * 15
      const now = Date.now()
      const expiresAt = new Date(token.accessTokenExpiresAt).getTime()
      const isAccessTokenExpiresSoon = expiresAt - now < REFRESH_THRESHOLD

      if (isAccessTokenExpiresSoon) {
        try {
          const values = await refreshTokenSchema.parseAsync({ refreshToken: token.refreshToken })

          const { data, error } = await refreshToken({
            refreshToken: values.refreshToken
          })
          if (error) throw new Error(error.code.toLowerCase())

          return {
            id: data.id,
            email: data.email,
            accessToken: data.accessToken,
            accessTokenExpiresAt: data.accessTokenExpiresAt,
            refreshToken: data.refreshToken,
            refreshTokenExpiresAt: data.refreshTokenExpiresAt
          }
        } catch (error) {
          console.error(error)
          if (error instanceof Error) {
            throw new Error(getApiErrorMessage(error.message))
          }
          if (error instanceof z.ZodError) {
            throw new Error(getApiErrorMessage('zod/invalid-body'))
          }
          throw new Error(getApiErrorMessage('auth/token-expired'))
        }
      }

      return { ...user, ...token }
    },
    async session({ session, token }) {
      return {
        expires: session.expires,
        user: {
          id: token.id,
          email: token.email,
          accessToken: token.accessToken,
          refreshToken: token.refreshToken
        }
      }
    }
  },
  pages: {
    signIn: ROUTES.AUTH_SIGN_IN
  },
  session: {
    strategy: 'jwt'
  }
}
