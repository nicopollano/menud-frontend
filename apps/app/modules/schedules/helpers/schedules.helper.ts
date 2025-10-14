import type { Schedule } from '@ristokit/shared/models/branch.model'
import { DAYS_DICTIONARY } from '@ristokit/shared/models/general.model'
import { format, isValid, parseISO } from 'date-fns'

export function getOpenDaysText(schedules: Schedule[]): string {
  const availableDays = schedules.filter((schedule) => schedule.enabled)
  return availableDays.map((schedule) => DAYS_DICTIONARY[schedule.day]).join(', ')
}

export function convertDateTimeToDate(dateTimeString: string): Date {
  try {
    const isoString = `${dateTimeString.replace(' ', 'T')}:00.000`
    const parsedDate = parseISO(isoString)

    if (!isValid(parsedDate)) {
      throw new Error(`Invalid datetime format: ${dateTimeString}`)
    }

    return parsedDate
  } catch (error) {
    console.error('Error converting datetime to date:', error)
    return new Date(0)
  }
}

/**
 * Convierte un string de fecha/hora del frontend al formato de schedule del backend
 * @param dateTimeString - String de fecha (ej: "2025-08-22T08:00:00.000Z" o "2025-08-22T08:00")
 * @returns String en formato "2025-08-22 08:00"
 */
export function formatDateTimeToSchedule(dateTimeString: string): string {
  try {
    const isoString = dateTimeString.replace('Z', '')
    const parsedDate = parseISO(isoString)

    if (!isValid(parsedDate)) {
      throw new Error(`Invalid datetime format: ${dateTimeString}`)
    }

    return format(parsedDate, 'yyyy-MM-dd HH:mm')
  } catch (error) {
    console.error('Error formatting datetime to schedule format:', error)
    return ''
  }
}
