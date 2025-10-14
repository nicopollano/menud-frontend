'use client'
import { MembersSummary } from '@/modules/members/components/summary/members-summary'
import { MembersTable } from '@/modules/members/components/table/members-table'

function UsersPage() {
  return (
    <section className='flex flex-col gap-y-[1.875rem]'>
      <MembersSummary />
      <MembersTable />
    </section>
  )
}

export default UsersPage
