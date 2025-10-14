export const ROUTES = {
  HOME: '/',
  AUTH_SIGN_IN: '/auth/sign-in',
  PROFILE: '/profile',
  LINKIT: '/linkit',
  BUSINESSES: '/businesses',
  BUSINESS: (businessId: string) => `/businesses/${businessId}`,
  BUSINESS_BRANCHES: (businessId: string) => `/businesses/${businessId}/branches`,
  BRANCH: (businessId: string, branchId: string) => `/businesses/${businessId}/branches/${branchId}`,
  BRANCH_MENUS: (businessId: string, branchId: string) => `/businesses/${businessId}/branches/${branchId}/menus`,
  BRANCH_USERS: (businessId: string, branchId: string) => `/businesses/${businessId}/branches/${branchId}/users`,
  BRANCH_SETTINGS: (businessId: string, branchId: string) => `/businesses/${businessId}/branches/${branchId}/settings`,
  BRANCH_MENU: (businessId: string, branchId: string, menuId: string) =>
    `/businesses/${businessId}/branches/${branchId}/menus/${menuId}`,
  BRANCH_MENU_CUSTOMIZE: (businessId: string, branchId: string, menuId: string) =>
    `/businesses/${businessId}/branches/${branchId}/menus/${menuId}/customize`,
  BRANCH_MENU_PROMOTIONS: (businessId: string, branchId: string, menuId: string) =>
    `/businesses/${businessId}/branches/${branchId}/menus/${menuId}/promotions`,
  BRANCH_MENU_STATISTICS: (businessId: string, branchId: string, menuId: string) =>
    `/businesses/${businessId}/branches/${branchId}/menus/${menuId}/statistics`
}
