'use client'
import { BranchCardList } from '@/modules/branches/components/list/branch-card-list'
import { BranchSummary } from '@/modules/branches/components/summary/branch-summary'

function BranchesPage() {
  return (
    <section className='flex flex-col gap-y-[1.875rem]'>
      <BranchSummary />
      <BranchCardList />
    </section>
  )
}

export default BranchesPage
