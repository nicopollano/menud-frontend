import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {},
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
    NEXT_PUBLIC_APP_DOMAIN: z
      .string({
        invalid_type_error: 'The NEXT_PUBLIC_APP_DOMAIN environment must be a string'
      })
      .min(1, {
        message: 'The NEXT_PUBLIC_APP_DOMAIN environment variable is required'
      }),
    // * API
    NEXT_PUBLIC_API_REVALIDATE: z.coerce
      .number({
        invalid_type_error: 'The NEXT_PUBLIC_API_REVALIDATE environment must be a number'
      })
      .positive({
        message: 'The NEXT_PUBLIC_API_REVALIDATE environment must be a positive number'
      })
  },
  runtimeEnv: {
    // * SITE
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    // * VERCEL
    NEXT_PUBLIC_VERCEL_URL: process.env.NEXT_PUBLIC_VERCEL_URL,
    // * API
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    // * DOMAINS
    NEXT_PUBLIC_APP_DOMAIN: process.env.NEXT_PUBLIC_APP_DOMAIN,
    // * API
    NEXT_PUBLIC_API_REVALIDATE: process.env.NEXT_PUBLIC_API_REVALIDATE
  }
})
