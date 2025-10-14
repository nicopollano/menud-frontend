'use client'
import { BUSINESS_WIDGET_ACTIONS } from '@/modules/businesses/constants/business-widget-actions.const'
import { MoreActionsWidget } from '@/modules/shared/components/widget/more-actions-widget'
import { useNavigationParams } from '@/modules/shared/hooks/use-navigation-params'

interface BusinessesLayoutProps {
  children: React.ReactNode
}

function BusinessesLayout({ children }: BusinessesLayoutProps) {
  const { branchId } = useNavigationParams()

  return (
    <>
      {children}
      {!branchId && <MoreActionsWidget actions={BUSINESS_WIDGET_ACTIONS} />}
    </>
  )
}

export default BusinessesLayout
