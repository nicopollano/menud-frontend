export const API_ERROR_MESSAGES = {
  'auth/invalid-credentials': 'El correo electrónico o la contraseña no son correctos.',
  'auth/invalidpass': 'Las credenciales no son válidas.',
  'auth/token-expired': 'Tu sesión ha expirado. Por favor, inicia sesión de nuevo.',
  'token/refreshinvalidated': 'La sesión ha expirado. Por favor, inicia sesión de nuevo.',
  'token/notprovided': 'No se ha proporcionado el token de acceso.',
  'server/unexpected-error': 'Ha ocurrido un error inesperado.',
  'user/notfound': 'El usuario no existe.',
  'zod/invalid-body': 'El formato de la petición es incorrecto.'
}

type KnownErrorKey = keyof typeof API_ERROR_MESSAGES

export function getApiErrorMessage(errorKey: KnownErrorKey): string
export function getApiErrorMessage(errorKey: string): string
export function getApiErrorMessage(errorKey: string): string {
  if (errorKey in API_ERROR_MESSAGES) {
    return API_ERROR_MESSAGES[errorKey as KnownErrorKey]
  }
  return API_ERROR_MESSAGES['server/unexpected-error']
}
