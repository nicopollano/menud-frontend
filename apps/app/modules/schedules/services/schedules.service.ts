import { API_V1 } from '@/lib/api/api.config'
import { getAccessToken } from '@/modules/auth/services/auth.service'
import type { UpdateSchedulesSchema } from '@/modules/schedules/schemas/update-schedules.schema'
import type { ApiResponse } from '@ristokit/shared/lib/api/api.model'
import type { Schedule } from '@ristokit/shared/models/branch.model'

export interface UpdateSchedulesArgs extends UpdateSchedulesSchema {
  businessId: string
  branchId: string
}

export async function updateSchedules(args: UpdateSchedulesArgs): Promise<ApiResponse<Schedule[]>> {
  const { businessId, branchId, schedules } = args

  const accessToken = await getAccessToken()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const formattedSchedules = schedules.map(({ day, ...schedule }) => ({
    ...schedule,
    id: Number(schedule.id)
  }))

  const request = await fetch(API_V1.BUSINESSES.BRANCHES.SCHEDULES.BASE(businessId, branchId), {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formattedSchedules)
  })

  const response: ApiResponse<Schedule[]> = await request.json()
  if (response.error) return response

  return { ...response, data: response.data }
}
