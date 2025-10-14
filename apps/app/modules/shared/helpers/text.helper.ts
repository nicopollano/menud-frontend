interface PluralizeOptions {
  count: number
  singular: string
  plural: string
}

export function pluralize(options: PluralizeOptions): string {
  const { count, singular, plural } = options
  return count === 1 ? singular : plural
}

export function generateRandomPassword(): string {
  const lowercase = 'abcdefghijklmnopqrstuvwxyz'
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const numbers = '0123456789'
  const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?'

  const allCharacters = lowercase + uppercase + numbers + symbols

  let password = ''

  for (let i = 0; i < 12; i++) {
    const randomIndex = Math.floor(Math.random() * allCharacters.length)
    password += allCharacters[randomIndex]
  }

  return password
}
