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
  AUTH: {
    SIGN_IN: `${API_URL}/v1/public/auth/sign-in`,
    REFRESH_TOKEN: `${API_URL}/v1/public/auth/refresh`
  },
  PROFILE: {
    SUMMARY: `${API_URL}/v1/public/profile/summary`
  },
  LINKITS: `${API_URL}/v1/public/linkits`,
  BUSINESSES: {
    BASE: `${API_URL}/v1/public/businesses`,
    SUMMARY: `${API_URL}/v1/public/businesses/summary`,
    BUSINESS: {
      BASE: (businessId: string) => `${API_URL}/v1/public/businesses/${businessId}`,
      LINKITS: {
        BASE: (businessId: string) => `${API_URL}/v1/public/businesses/${businessId}/linkits`,
        LINKIT: (businessId: string, linkitId: string) =>
          `${API_URL}/v1/public/businesses/${businessId}/linkits/${linkitId}`
      }
    },
    BRANCHES: {
      BASE: (businessId: string) => `${API_URL}/v1/public/businesses/${businessId}/branches`,
      SUMMARY: (businessId: string) => `${API_URL}/v1/public/businesses/${businessId}/branches/summary`,
      BRANCH: {
        BASE: (businessId: string, branchId: string) =>
          `${API_URL}/v1/public/businesses/${businessId}/branches/${branchId}`
      },
      SCHEDULES: {
        BASE: (businessId: string, branchId: string) =>
          `${API_URL}/v1/public/businesses/${businessId}/branches/${branchId}/schedules`
      },
      MENUS: {
        BASE: (businessId: string, branchId: string) =>
          `${API_URL}/v1/public/businesses/${businessId}/branches/${branchId}/menus`,
        SUMMARY: (businessId: string, branchId: string) =>
          `${API_URL}/v1/public/businesses/${businessId}/branches/${branchId}/menus/summary`,
        MENU: {
          BASE: (businessId: string, branchId: string, menuId: string) =>
            `${API_URL}/v1/public/businesses/${businessId}/branches/${branchId}/menus/${menuId}`,
          VISIBILITY: (businessId: string, branchId: string, menuId: string) =>
            `${API_URL}/v1/public/businesses/${businessId}/branches/${branchId}/menus/${menuId}/visibility`
        }
      },
      PALETTES: {
        BASE: (businessId: string, branchId: string) =>
          `${API_URL}/v1/public/businesses/${businessId}/branches/${branchId}/palettes`,
        POST: (businessId: string, branchId: string) =>
          `${API_URL}/v1/public/businesses/${businessId}/branches/${branchId}/palettes`,
        PALETTE: {
          BASE: (businessId: string, branchId: string, paletteId: string) =>
            `${API_URL}/v1/public/businesses/${businessId}/branches/${branchId}/palettes/${paletteId}`
        }
      },
      CATEGORIES: {
        BASE: (businessId: string, branchId: string) =>
          `${API_URL}/v1/public/businesses/${businessId}/branches/${branchId}/categories`,
        POST: (businessId: string, branchId: string) =>
          `${API_URL}/v1/public/businesses/${businessId}/branches/${branchId}/categories`,
        CATEGORY: {
          BASE: (businessId: string, branchId: string, categoryId: string) =>
            `${API_URL}/v1/public/businesses/${businessId}/branches/${branchId}/categories/${categoryId}`,
          UPDATE: (businessId: string, branchId: string, categoryId: string) =>
            `${API_URL}/v1/public/businesses/${businessId}/branches/${branchId}/categories/${categoryId}`,
          DELETE: (businessId: string, branchId: string, categoryId: string) =>
            `${API_URL}/v1/public/businesses/${businessId}/branches/${branchId}/categories/${categoryId}`
        }
      },
      SUBCATEGORIES: {
        BASE: (businessId: string, branchId: string) =>
          `${API_URL}/v1/public/businesses/${businessId}/branches/${branchId}/subcategories`,
        POST: (businessId: string, branchId: string) =>
          `${API_URL}/v1/public/businesses/${businessId}/branches/${branchId}/subcategories`,
        SUBCATEGORY: {
          BASE: (businessId: string, branchId: string, subcategoryId: string) =>
            `${API_URL}/v1/public/businesses/${businessId}/branches/${branchId}/subcategories/${subcategoryId}`,
          UPDATE: (businessId: string, branchId: string, subcategoryId: string) =>
            `${API_URL}/v1/public/businesses/${businessId}/branches/${branchId}/subcategories/${subcategoryId}`,
          DELETE: (businessId: string, branchId: string, subcategoryId: string) =>
            `${API_URL}/v1/public/businesses/${businessId}/branches/${branchId}/subcategories/${subcategoryId}`
        }
      },
      PRODUCTS: {
        BASE: (businessId: string, branchId: string) =>
          `${API_URL}/v1/public/businesses/${businessId}/branches/${branchId}/products`,
        POST: (businessId: string, branchId: string) =>
          `${API_URL}/v1/public/businesses/${businessId}/branches/${branchId}/products`,
        PRODUCT: {
          BASE: (businessId: string, branchId: string, productId: string) =>
            `${API_URL}/v1/public/businesses/${businessId}/branches/${branchId}/products/${productId}`,
          UPDATE: (businessId: string, branchId: string, productId: string) =>
            `${API_URL}/v1/public/businesses/${businessId}/branches/${branchId}/products/${productId}`,
          DELETE: (businessId: string, branchId: string, productId: string) =>
            `${API_URL}/v1/public/businesses/${businessId}/branches/${branchId}/products/${productId}`
        }
      },
      MEMBERS: {
        BASE: (businessId: string, branchId: string) =>
          `${API_URL}/v1/public/businesses/${businessId}/branches/${branchId}/members`,
        SUMMARY: (businessId: string, branchId: string) =>
          `${API_URL}/v1/public/businesses/${businessId}/branches/${branchId}/members/summary`
      },
      PROMOTIONS: {
        BASE: (businessId: string, branchId: string) =>
          `${API_URL}/v1/public/businesses/${businessId}/branches/${branchId}/promotions`,
        SUMMARY: (businessId: string, branchId: string) =>
          `${API_URL}/v1/public/businesses/${businessId}/branches/${branchId}/promotions/summary`,
        AVAILABLE_DAYS: (businessId: string, branchId: string) =>
          `${API_URL}/v1/public/businesses/${businessId}/branches/${branchId}/promotions/available-days`,
        PROMOTION: {
          BASE: (businessId: string, branchId: string, promotionId: string) =>
            `${API_URL}/v1/public/businesses/${businessId}/branches/${branchId}/promotions/${promotionId}`
        }
      }
    }
  }
}
