import {
  INVITATION_STATUSES_DICTIONARY,
  InvitationStatus,
  USER_ROLES_DICTIONARY
} from '@ristokit/shared/models/general.model'
import type { Member } from '@ristokit/shared/models/member.model'
import { Badge } from '@ristokit/ui/components/badge'
import { DotsIcon } from '@ristokit/ui/icons/dots.icon'

interface MemberCardTableProps {
  member: Member
}

function MemberCardTable({ member }: MemberCardTableProps) {
  return (
    <article className='grid grid-cols-[2fr_2fr_1fr] items-start'>
      <div className='grid gap-y-2.5'>
        <p className='text-body-mobile-2 text-text'>{member.name}</p>
        <p className='text-body-mobile-3 text-gray-dark'>{USER_ROLES_DICTIONARY[member.role]}</p>
      </div>
      <Badge className='mx-auto' variant={member.status === InvitationStatus.APPROVED ? 'default' : 'disabled'}>
        {INVITATION_STATUSES_DICTIONARY[member.status]}
      </Badge>
      <button className='ml-auto rotate-90' type='button'>
        <DotsIcon />
      </button>
    </article>
  )
}

export { MemberCardTable }
