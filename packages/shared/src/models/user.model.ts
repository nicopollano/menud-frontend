import type { Role } from './general.model.js'
import type { Member } from './member.model.js'
import type { Plan } from './plan.model.js'

export interface User {
  id: string
  name?: string
  email: string
  password: string
  role: Role
  createdAt: Date
  updatedAt: Date

  branches?: Member[]
}

export interface UserPlan {
  id: string
  planId: string

  billingCycle: 'monthly' | 'yearly'
  status: 'active' | 'inactive' | 'cancelled'

  expiresAt: Date
  createdAt: Date
  updatedAt: Date

  plan: Plan
}
