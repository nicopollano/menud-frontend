import type {
  Member,
  MemberResponse,
  MembersSummary,
  MembersSummaryResponse
} from '@ristokit/shared/models/member.model'

export function memberAdapter(member: MemberResponse): Member {
  return {
    id: member.id.toString(),
    email: member.mail,
    name: member.name,
    role: member.role,
    status: member.status,
    enabled: member.enabled
  }
}

export function membersAdapter(members: MemberResponse[]): Member[] {
  return members.map(memberAdapter)
}

export function membersSummaryAdapter(summary: MembersSummaryResponse): MembersSummary {
  return {
    totalMembers: summary.totalMembers ?? 0
  }
}
