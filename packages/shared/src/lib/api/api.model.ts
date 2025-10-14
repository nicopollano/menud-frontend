export interface ApiBase {
  statusCode: number
}

export interface ApiError {
  code: string
  message: string
  details?: ApiErrorDetail[]
}

export interface ApiErrorDetail {
  message: string
  field: string
}

export interface ApiSuccess<T> extends ApiBase {
  error: null
  data: T
}

export interface ApiFailure extends ApiBase {
  error: ApiError
  data: null
}

export type ApiResponse<T> = ApiSuccess<T> | ApiFailure
