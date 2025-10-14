import { DAYS, DAYS_DICTIONARY, DAYS_SHORT_DICTIONARY, type Day } from '@ristokit/shared/models/general.model'

interface FormatSelectedDaysOptions {
  short?: boolean
}

export function formatSelectedDays(selectedDays: Day[], options?: FormatSelectedDaysOptions): string {
  if (selectedDays.length === 0) {
    return 'Sin días seleccionados'
  }

  if (selectedDays.length === DAYS.length && DAYS.every((day) => selectedDays.includes(day))) {
    return 'Todos los días'
  }

  const dictionary = options?.short ? DAYS_SHORT_DICTIONARY : DAYS_DICTIONARY

  return selectedDays.map((day) => dictionary[day]).join(', ')
}
