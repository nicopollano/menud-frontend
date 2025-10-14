import type { ApiErrorDetail, ApiError as ApiErrorOptions } from './api.model.js'

export class ApiError extends Error {
  public code: string
  public details?: ApiErrorDetail[]
  public readonly isApiError = true

  constructor(options: ApiErrorOptions) {
    super(options.message)
    this.name = 'ApiError'
    this.code = options.code
    this.details = options.details

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError)
    }
  }
}
