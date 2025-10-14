import { env } from '@/env'

export function getBaseUrl() {
  const url = env.NEXT_PUBLIC_SITE_URL ?? env.NEXT_PUBLIC_VERCEL_URL ?? 'http://localhost:3000/'
  const formattedUrl = url.startsWith('http') ? url : `https://${url}`
  const baseUrl = formattedUrl.charAt(formattedUrl.length - 1) === '/' ? formattedUrl.slice(0, -1) : formattedUrl
  return baseUrl
}

export function getApiUrl() {
  const apiUrl = env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3333'
  const formattedUrl = apiUrl.startsWith('http') ? apiUrl : `https://${apiUrl}`
  const baseUrl = formattedUrl.charAt(formattedUrl.length - 1) === '/' ? formattedUrl.slice(0, -1) : formattedUrl
  return baseUrl
}

export const API_URL = getApiUrl()

export const API_V1 = {
  BRANCHES: {
    BRANCH: {
      BASE: (branchId: string) => `${API_URL}/v1/public/branches/${branchId}`
    },
    SLUGS: `${API_URL}/v1/public/branches/slugs`
  }
}
