import type { Branch } from './branch.model.js'
import type { InvitationStatus, UserRole } from './general.model.js'
import type { User } from './user.model.js'

export interface Member {
  id: string
  branchId?: string
  userId?: string

  name: string
  email: string
  role: UserRole
  status: InvitationStatus
  enabled: boolean
  createdAt?: Date
  updatedAt?: Date

  branch?: Branch
  user?: User
}

export interface MembersSummary {
  totalMembers: number
}

export interface MembersSummaryResponse {
  totalMembers: number
}

export interface MemberResponse {
  id: number
  mail: string
  name: string
  role: UserRole
  status: InvitationStatus
  enabled: boolean
}
