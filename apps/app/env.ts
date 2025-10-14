import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    // * NEXT AUTH
    NEXTAUTH_SECRET: z
      .string({
        required_error: 'The NEXTAUTH_SECRET environment variable is required',
        invalid_type_error: 'The NEXTAUTH_SECRET environment must be a string'
      })
      .min(1, {
        message: 'The NEXTAUTH_SECRET environment variable is required'
      })
  },
  client: {
    // * SITE
    NEXT_PUBLIC_SITE_URL: z
      .string({
        invalid_type_error: 'The NEXT_PUBLIC_SITE_URL environment must be a string'
      })
      .optional(),
    // * VERCEL
    NEXT_PUBLIC_VERCEL_URL: z
      .string({
        invalid_type_error: 'The NEXT_PUBLIC_VERCEL_URL environment must be a string'
      })
      .optional(),
    // * API
    NEXT_PUBLIC_API_URL: z
      .string({
        required_error: 'The NEXT_PUBLIC_API_URL environment variable is required',
        invalid_type_error: 'The NEXT_PUBLIC_API_URL environment must be a string'
      })
      .min(1, {
        message: 'The NEXT_PUBLIC_API_URL environment variable is required'
      }),
    // * DOMAINS
    NEXT_PUBLIC_LINKIT_DOMAIN: z
      .string({
        invalid_type_error: 'The NEXT_PUBLIC_LINKIT_DOMAIN environment must be a string'
      })
      .min(1, {
        message: 'The NEXT_PUBLIC_LINKIT_DOMAIN environment variable is required'
      })
  },
  runtimeEnv: {
    // * NEXT AUTH
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    // * SITE
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    // * VERCEL
    NEXT_PUBLIC_VERCEL_URL: process.env.NEXT_PUBLIC_VERCEL_URL,
    // * API
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    // * DOMAINS
    NEXT_PUBLIC_LINKIT_DOMAIN: process.env.NEXT_PUBLIC_LINKIT_DOMAIN
  }
})
