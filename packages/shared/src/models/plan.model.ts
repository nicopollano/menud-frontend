export interface Plan {
  id: string
  name: string
  description?: string | null
  price: number

  maxUsers: number
  maxBusinesses: number
  maxMenus: number

  hasProductManagement: boolean
  hasCustomCategories: boolean
  hasQrGenerator: boolean
  hasLinkit: boolean
  hasRoleSystem: boolean
  hasAutomaticAlerts: boolean
  hasAutomaticDarkMode: boolean
  hasMultiLanguage: boolean
  hasBackendPanel: boolean
  hasPrioritySupport: boolean

  limits?: string[]
  features?: string[]

  createdAt: Date
  updatedAt: Date
}

export const PLAN_LIMITS_DESCRIPTIONS = {
  maxUsers: '1 usuario',
  maxBusinesses: '1 restaurante',
  maxMenus: '1 menú'
} as const

export const PLAN_FEATURES_DESCRIPTIONS = {
  hasProductManagement: 'Gestión de productos y categorías',
  hasQrGenerator: 'Generador de QR para menú',
  hasMultiLanguage: 'Multilenguaje (español / inglés)',
  hasLinkit: 'Linkit avanzando (redes sociales)',
  hasBackendPanel: 'Panel backend para gestionar el menú',
  hasCustomCategories: 'Categoría especial personalizada',
  hasRoleSystem: 'Sistema de roles (mesero, cajero, gestor, admin)',
  hasAutomaticAlerts: 'Alertas automáticas según comportamiento',
  hasAutomaticDarkMode: 'Modo oscuro automático',
  hasPrioritySupport: 'Soporte prioritario'
} as const

export const PLAN_BASIC: Plan = {
  id: '1',
  name: 'Básico',
  description: 'Digitalizá tu menú y compartilo en segundos. Ideal para empezar.',
  price: 0,
  maxUsers: 5,
  maxBusinesses: 1,
  maxMenus: 3,
  hasProductManagement: true,
  hasCustomCategories: false,
  hasQrGenerator: true,
  hasLinkit: true,
  hasRoleSystem: false,
  hasAutomaticAlerts: false,
  hasAutomaticDarkMode: false,
  hasMultiLanguage: true,
  hasBackendPanel: false,
  hasPrioritySupport: false,

  limits: [
    PLAN_LIMITS_DESCRIPTIONS.maxUsers,
    PLAN_LIMITS_DESCRIPTIONS.maxBusinesses,
    PLAN_LIMITS_DESCRIPTIONS.maxMenus
  ],
  features: [
    PLAN_FEATURES_DESCRIPTIONS.hasProductManagement,
    PLAN_FEATURES_DESCRIPTIONS.hasQrGenerator,
    PLAN_FEATURES_DESCRIPTIONS.hasMultiLanguage,
    PLAN_FEATURES_DESCRIPTIONS.hasLinkit,
    PLAN_FEATURES_DESCRIPTIONS.hasBackendPanel
  ],

  createdAt: new Date('2023-01-01'),
  updatedAt: new Date('2023-01-01')
}

export const PLAN_PRO: Plan = {
  id: '2',
  name: 'Pro',
  description: 'Más menús, más control y más personalización para tu restaurante.',
  price: 19.99,
  maxUsers: 10,
  maxBusinesses: 3,
  maxMenus: 5,
  hasProductManagement: true,
  hasCustomCategories: true,
  hasQrGenerator: true,
  hasLinkit: true,
  hasRoleSystem: true,
  hasAutomaticAlerts: true,
  hasAutomaticDarkMode: true,
  hasMultiLanguage: true,
  hasBackendPanel: true,
  hasPrioritySupport: true,

  limits: [
    PLAN_LIMITS_DESCRIPTIONS.maxUsers,
    PLAN_LIMITS_DESCRIPTIONS.maxBusinesses,
    PLAN_LIMITS_DESCRIPTIONS.maxMenus
  ],
  features: [
    PLAN_FEATURES_DESCRIPTIONS.hasProductManagement,
    PLAN_FEATURES_DESCRIPTIONS.hasCustomCategories,
    PLAN_FEATURES_DESCRIPTIONS.hasQrGenerator,
    PLAN_FEATURES_DESCRIPTIONS.hasRoleSystem,
    PLAN_FEATURES_DESCRIPTIONS.hasAutomaticAlerts,
    PLAN_FEATURES_DESCRIPTIONS.hasAutomaticDarkMode,
    PLAN_FEATURES_DESCRIPTIONS.hasMultiLanguage,
    PLAN_FEATURES_DESCRIPTIONS.hasLinkit,
    PLAN_FEATURES_DESCRIPTIONS.hasBackendPanel
  ],

  createdAt: new Date('2023-01-01'),
  updatedAt: new Date('2023-01-01')
}

export const PLAN_PREMIUM: Plan = {
  id: '3',
  name: 'Premium',
  description: 'Más menús, más control y más personalización para tu restaurante.',
  price: 49.99,
  maxUsers: 50,
  maxBusinesses: 10,
  maxMenus: 20,
  hasProductManagement: true,
  hasCustomCategories: true,
  hasQrGenerator: true,
  hasLinkit: true,
  hasRoleSystem: true,
  hasAutomaticAlerts: true,
  hasAutomaticDarkMode: true,
  hasMultiLanguage: true,
  hasBackendPanel: true,
  hasPrioritySupport: true,

  limits: [
    PLAN_LIMITS_DESCRIPTIONS.maxUsers,
    PLAN_LIMITS_DESCRIPTIONS.maxBusinesses,
    PLAN_LIMITS_DESCRIPTIONS.maxMenus
  ],
  features: [
    PLAN_FEATURES_DESCRIPTIONS.hasProductManagement,
    PLAN_FEATURES_DESCRIPTIONS.hasCustomCategories,
    PLAN_FEATURES_DESCRIPTIONS.hasQrGenerator,
    PLAN_FEATURES_DESCRIPTIONS.hasRoleSystem,
    PLAN_FEATURES_DESCRIPTIONS.hasAutomaticAlerts,
    PLAN_FEATURES_DESCRIPTIONS.hasAutomaticDarkMode,
    PLAN_FEATURES_DESCRIPTIONS.hasMultiLanguage,
    PLAN_FEATURES_DESCRIPTIONS.hasLinkit,
    PLAN_FEATURES_DESCRIPTIONS.hasBackendPanel,
    PLAN_FEATURES_DESCRIPTIONS.hasPrioritySupport
  ],

  createdAt: new Date('2023-01-01'),
  updatedAt: new Date('2023-01-01')
}
