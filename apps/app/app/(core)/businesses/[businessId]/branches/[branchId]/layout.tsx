'use client'
import { BranchTabBar } from '@/modules/branches/components/tab/branch-tab-bar'
import { BRANCH_WIDGET_ACTIONS } from '@/modules/branches/constants/branch-widget-actions.const'
import { MoreActionsWidget } from '@/modules/shared/components/widget/more-actions-widget'
import { useNavigationParams } from '@/modules/shared/hooks/use-navigation-params'

interface BranchLayoutProps {
  children: React.ReactNode
}

function BranchLayout({ children }: BranchLayoutProps) {
  const { menuId } = useNavigationParams()

  return (
    <div className='flex flex-col gap-y-[1.875rem]'>
      {!menuId && <BranchTabBar />}
      {children}
      {!menuId && <MoreActionsWidget actions={BRANCH_WIDGET_ACTIONS} />}
    </div>
  )
}

export default BranchLayout
