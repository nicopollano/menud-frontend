import { format, isValid, parseISO, setHours, setMinutes } from 'date-fns'

export function formatDateObjectToDDMMYYYY(date: Date): string {
  try {
    if (!isValid(date)) {
      throw new Error('The date is invalid')
    }

    return format(date, 'dd/MM/yyyy')
  } catch (error) {
    console.warn('Error formatting date object:', date, error)
    return date.toString()
  }
}

export function formatDateStringToDDMMYYYY(date: string): string {
  try {
    const parsedDate = parseISO(date)
    if (!isValid(parsedDate)) {
      throw new Error('The date is invalid')
    }

    return format(parsedDate, 'dd/MM/yyyy')
  } catch (error) {
    console.warn('Error formatting date string:', date, error)
    return date
  }
}

export function combineDateStringAndTime(date: string, time: string): string {
  try {
    const parsedDate = parseISO(date)
    if (!isValid(parsedDate)) {
      throw new Error('The date is invalid')
    }

    const [hours, minutes] = time.split(':').map(Number)

    if (hours === undefined || minutes === undefined) {
      throw new Error('The time format is invalid')
    }

    const combinedDate = setMinutes(setHours(parsedDate, hours), minutes)

    return format(combinedDate, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
  } catch (error) {
    console.warn('Error combining date and time:', error)
    return ''
  }
}

export function formatDateRange(startDate: Date, endDate: Date): string {
  try {
    if (!isValid(startDate)) {
      throw new Error('The start date is invalid')
    }

    if (!isValid(endDate)) {
      throw new Error('The end date is invalid')
    }

    const formattedStartDate = format(startDate, 'dd/MM')
    const formattedEndDate = format(endDate, 'dd/MM')

    return `${formattedStartDate} - ${formattedEndDate}`
  } catch (error) {
    console.warn('Error formatting date range:', { startDate, endDate, error })
    return '--/-- - --/--'
  }
}
