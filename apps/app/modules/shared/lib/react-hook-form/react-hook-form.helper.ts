export function getDirtyValues<T extends Record<string, unknown>>(dirtyFields: unknown, values: T): Partial<T> {
  const modifiedValues: Partial<T> = {}
  const fields = dirtyFields as Record<keyof T, boolean>

  for (const key in fields) {
    if (fields[key]) {
      modifiedValues[key] = values[key]
    }
  }

  return modifiedValues
}
