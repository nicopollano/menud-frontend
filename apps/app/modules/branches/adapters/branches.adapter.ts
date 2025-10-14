import type {
  Branch,
  BranchResponse,
  BranchesSummary,
  BranchesSummaryResponse
} from '@ristokit/shared/models/branch.model'

export function branchAdapter(branch: BranchResponse): Branch {
  return {
    id: branch.id.toString(),
    businessId: branch.business?.id.toString(),
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

    summary: {
      totalMenus: branch.summary?.totalMenus ?? 0
    },

    schedules: branch.schedules.map((schedule) => ({
      id: schedule.id.toString(),
      day: schedule.day,
      openTime: schedule.openTime,
      closeTime: schedule.closeTime,
      enabled: schedule.enabled
    }))
  }
}

export function branchesAdapter(branches: BranchResponse[]): Branch[] {
  return branches.map(branchAdapter)
}

export function branchesSummaryAdapter(summary: BranchesSummaryResponse): BranchesSummary {
  return {
    totalBranches: summary.totalBranches ?? 0,
    totalMenus: summary.totalMenus ?? 0
  }
}
