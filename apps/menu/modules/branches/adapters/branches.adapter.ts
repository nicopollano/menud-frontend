import { businessAdapter } from '@/modules/businesses/adapters/businesses.adapter'
import { menuAdapter } from '@/modules/menus/adapters/menus.adapter'
import type { BranchById, BranchByIdResponse, BranchSlug } from '@ristokit/shared/models/branch.model'

export function branchAdapter(branch: BranchByIdResponse): BranchById {
  return {
    id: branch.id.toString(),
    name: branch.name,
    slug: branch.slug,
    description: branch.description,
    logo: branch.logo,
    phone: branch.phone,
    address: branch.address,
    currency: branch.currency,
    enabled: branch.enabled,
    createdAt: new Date(branch.createdAt),
    updatedAt: new Date(branch.updatedAt),

    schedules: branch.schedules.map((schedule) => ({
      id: schedule.id.toString(),
      day: schedule.day,
      openTime: schedule.openTime,
      closeTime: schedule.closeTime,
      enabled: schedule.enabled
    })),
    business: businessAdapter(branch.business),
    menu: menuAdapter(branch.menu)
  }
}

export function branchSlugAdapter(branch: BranchSlug): BranchSlug {
  return {
    id: branch.id.toString(),
    slug: branch.slug
  }
}

export function branchSlugsAdapter(branches: BranchSlug[]): BranchSlug[] {
  return branches.map(branchSlugAdapter)
}
