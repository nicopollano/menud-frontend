import { format, isValid, parseISO } from 'date-fns'

export function formatTo12Hour(time: string): string {
  try {
    const dateWithTime = parseISO(`2024-01-01T${time}`)

    if (!isValid(dateWithTime)) {
      throw new Error('The time format is invalid')
    }

    return format(dateWithTime, 'hh:mm a')
  } catch (error) {
    console.warn('Error formatting time to 12-hour format:', time, error)
    return time
  }
}

export function addPeriodTo24Hour(time: string): string {
  try {
    const basicTimeFormat = time.split(':').slice(0, 2).join(':')
    const dateWithTime = parseISO(`2024-01-01T${basicTimeFormat}`)

    if (!isValid(dateWithTime)) {
      throw new Error('The time format is invalid')
    }

    const [hours] = basicTimeFormat.split(':').map(Number)

    const period = Number(hours) >= 12 ? 'PM' : 'AM'

    return `${basicTimeFormat} ${period}`
  } catch (error) {
    console.warn('Error adding period to 24-hour time:', time, error)
    return time
  }
}

export function formatTimeRange(startDate: Date, endDate: Date): string {
  try {
    if (!isValid(startDate)) {
      throw new Error('The start date is invalid')
    }

    if (!isValid(endDate)) {
      throw new Error('The end date is invalid')
    }

    const formattedStartTime = format(startDate, 'hh a').toLowerCase()
    const formattedEndTime = format(endDate, 'hh a').toLowerCase()

    return `${formattedStartTime} - ${formattedEndTime}`
  } catch (error) {
    console.warn('Error formatting time range:', { startDate, endDate, error })
    return '--:-- - --:--'
  }
}

export function extractTimeFromDate(date: Date): string {
  try {
    if (!isValid(date)) {
      throw new Error('The date is invalid')
    }

    return format(date, 'HH:mm:ss')
  } catch (error) {
    console.warn('Error extracting time from date:', date, error)
    return '00:00:00'
  }
}
