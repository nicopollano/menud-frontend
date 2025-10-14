export const generateQueryString = (params: Record<string, unknown>) => {
  const searchParams = new URLSearchParams()

  for (const [key, value] of Object.entries(params)) {
    if (value === null || value === undefined || value === '') continue

    if (Array.isArray(value)) {
      searchParams.append(key, value.join(','))
      continue
    }

    searchParams.append(key, String(value))
  }

  return searchParams.toString()
}

export function buildQueryString(url: string, params: Record<string, unknown>) {
  const queryString = generateQueryString(params)
  return queryString ? `${url}?${queryString}` : url
}
