'use client'

import type { MenuPalette } from '@ristokit/shared/models/menu-palette.model'
import { useEffect } from 'react'

/**
 * MENU THEME PROVIDER
 * Provider para aplicar temas dinámicos de menú (paletas de colores personalizadas)
 * Aplica las variables CSS del sistema de diseño con los colores del restaurante
 */

interface MenuThemeProviderProps {
  children: React.ReactNode
  palette?: MenuPalette | null
}

/**
 * Genera variantes de color a partir de un color base
 * Usado para crear escalas de colores desde los 3 colores base de la paleta
 */
function generateColorVariants(baseColor: string, type: 'lighter' | 'darker' = 'lighter') {
  // Esta función podría expandirse para generar variantes reales
  // Por ahora retorna el color base
  return baseColor
}

/**
 * Genera un color rgba a partir de un hex con opacidad
 */
function generateRgba(hex: string, opacity: number): string {
  // Remove # if present
  const cleanHex = hex.replace('#', '')

  // Convert to RGB
  const r = Number.parseInt(cleanHex.substring(0, 2), 16)
  const g = Number.parseInt(cleanHex.substring(2, 4), 16)
  const b = Number.parseInt(cleanHex.substring(4, 6), 16)

  return `rgba(${r}, ${g}, ${b}, ${opacity})`
}

/**
 * MenuThemeProvider Component
 * Aplica las variables CSS de la paleta del menú al DOM
 */
export function MenuThemeProvider({ children, palette }: MenuThemeProviderProps) {
  useEffect(() => {
    if (!palette) return

    const root = document.documentElement

    // Aplicar colores base (backward compatibility)
    root.style.setProperty('--color-background', palette.color1)
    root.style.setProperty('--color-text', palette.color2)
    root.style.setProperty('--color-primary', palette.color3)
    root.style.setProperty('--color-secondary', generateRgba(palette.color3, 0.2))

    // Aplicar escala de colores primarios (nuevos tokens)
    // Si la paleta tiene solo 3 colores, generamos variantes
    root.style.setProperty('--color-primary-50', generateRgba(palette.color3, 0.05))
    root.style.setProperty('--color-primary-100', generateRgba(palette.color3, 0.1))
    root.style.setProperty('--color-primary-200', generateRgba(palette.color3, 0.2))
    root.style.setProperty('--color-primary-300', generateRgba(palette.color3, 0.4))
    root.style.setProperty('--color-primary-400', generateRgba(palette.color3, 0.6))
    root.style.setProperty('--color-primary-500', generateRgba(palette.color3, 0.8))
    root.style.setProperty('--color-primary-600', palette.color3)
    root.style.setProperty('--color-primary-700', generateColorVariants(palette.color3, 'darker'))

    // Cleanup function
    return () => {
      root.style.removeProperty('--color-background')
      root.style.removeProperty('--color-text')
      root.style.removeProperty('--color-primary')
      root.style.removeProperty('--color-secondary')
      root.style.removeProperty('--color-primary-50')
      root.style.removeProperty('--color-primary-100')
      root.style.removeProperty('--color-primary-200')
      root.style.removeProperty('--color-primary-300')
      root.style.removeProperty('--color-primary-400')
      root.style.removeProperty('--color-primary-500')
      root.style.removeProperty('--color-primary-600')
      root.style.removeProperty('--color-primary-700')
    }
  }, [palette])

  return <>{children}</>
}

/**
 * Hook para obtener CSS variables de la paleta actual
 * Útil para usar en componentes que necesitan acceso a los colores
 */
export function useMenuTheme() {
  const getColor = (variable: string) => {
    if (typeof window === 'undefined') return ''
    return getComputedStyle(document.documentElement).getPropertyValue(variable).trim()
  }

  return {
    backgroundColor: getColor('--color-background'),
    textColor: getColor('--color-text'),
    primaryColor: getColor('--color-primary'),
    secondaryColor: getColor('--color-secondary'),
    getColor
  }
}
