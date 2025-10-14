import { API_V1 } from '@/lib/api/api.config'
import { config } from '@/lib/next-auth/next-auth.config'
import type { SignInResponse } from '@/modules/auth/models/auth.model'
import type { RefreshTokenSchema, SignInSchema } from '@/modules/auth/schemas/auth.schema'
import type { ApiResponse } from '@ristokit/shared/lib/api/api.model'
import { getServerSession as getNextAuthServerSession } from 'next-auth'
import { getSession } from 'next-auth/react'

export async function getServerSession() {
  const session = await getNextAuthServerSession(config)
  return session?.user
}

export async function getClientSession() {
  const session = await getSession()
  return session?.user
}

export async function getAccessToken() {
  if (typeof window !== 'undefined') {
    const session = await getClientSession()
    return session?.accessToken
  }
  const session = await getServerSession()
  return session?.accessToken
}

export async function signInWithCredentials(args: SignInSchema): Promise<ApiResponse<SignInResponse>> {
  const { email, password } = args

  const request = await fetch(API_V1.AUTH.SIGN_IN, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  const response: ApiResponse<SignInResponse> = await request.json()

  return response
}

export async function refreshToken(args: RefreshTokenSchema): Promise<ApiResponse<SignInResponse>> {
  const { refreshToken } = args

  const request = await fetch(API_V1.AUTH.REFRESH_TOKEN, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken })
  })
  const response: ApiResponse<SignInResponse> = await request.json()

  return response
}
