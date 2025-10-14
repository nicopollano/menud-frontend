'use client'
import { profileService } from '@/modules/profile/services/profile.service'
import type { ApiError } from '@ristokit/shared/lib/api/api.model'
import type { ProfileSummary } from '@ristokit/shared/models/profile.model'
import useSWR, { mutate } from 'swr'

interface UseProfileSummaryOptions {
  canRequest?: boolean
}

function useProfileSummary(options: UseProfileSummaryOptions = {}) {
  const { canRequest = true } = options

  const response = useSWR<ProfileSummary, ApiError>(canRequest ? ['profile-summary'] : null, profileService.getSummary)

  return response
}

async function mutateProfileSummary() {
  return await mutate(['profile-summary'])
}

export { useProfileSummary, mutateProfileSummary }
