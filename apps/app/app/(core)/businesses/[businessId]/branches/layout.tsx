'use client'
import { BranchBreadcrumb } from '@/modules/branches/components/breadcrumb/branch-breadcrumb'

interface BranchesLayoutProps {
  children: React.ReactNode
}

function BranchesLayout({ children }: BranchesLayoutProps) {
  return (
    <div className='flex flex-col gap-y-[1.875rem]'>
      <BranchBreadcrumb />
      {children}
    </div>
  )
}

export default BranchesLayout
