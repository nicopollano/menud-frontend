const HEXADECIMAL_REGEX = /^[0-9A-Fa-f]{6}$/

export function generateRgba(hex: string, opacity = 1): string {
  const cleanHex = hex.replace('#', '')

  const fullHex =
    cleanHex.length === 3
      ? cleanHex
          .split('')
          .map((char) => char + char)
          .join('')
      : cleanHex

  if (!HEXADECIMAL_REGEX.test(fullHex)) {
    console.warn(`Color hexadecimal inválido: ${hex}`)
    return `rgba(0, 0, 0, ${opacity})`
  }

  const r = Number.parseInt(fullHex.slice(0, 2), 16)
  const g = Number.parseInt(fullHex.slice(2, 4), 16)
  const b = Number.parseInt(fullHex.slice(4, 6), 16)

  const validOpacity = Math.max(0, Math.min(1, opacity))

  return `rgba(${r}, ${g}, ${b}, ${validOpacity})`
}
