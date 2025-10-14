import type { CreatePromotionSchema } from '@/modules/promotions/schemas/create-promotion.schema'
import type { PromotionAvailableDaysSchema } from '@/modules/promotions/schemas/promotion-available-days.schema'
import { formatDateTimeToSchedule } from '@/modules/schedules/helpers/schedules.helper'
import { combineDateStringAndTime } from '@/modules/shared/helpers/date.helper'

type ScheduleTimesAdapterArgs = Pick<CreatePromotionSchema, 'startsAt' | 'endsAt' | 'endTime' | 'startTime'>

export function scheduleTimesAdapter(args: ScheduleTimesAdapterArgs): PromotionAvailableDaysSchema {
  const { startsAt, endsAt, endTime, startTime } = args

  if (!startsAt || !endsAt || !startTime || !endTime) {
    return {
      fromTime: '',
      toTime: ''
    }
  }

  const combinedStartsAt = combineDateStringAndTime(startsAt, startTime)
  const combinedEndsAt = combineDateStringAndTime(endsAt, endTime)

  return {
    fromTime: formatDateTimeToSchedule(combinedStartsAt),
    toTime: formatDateTimeToSchedule(combinedEndsAt)
  }
}
