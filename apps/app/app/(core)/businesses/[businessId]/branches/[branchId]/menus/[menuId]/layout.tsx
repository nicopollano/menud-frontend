'use client'
import { MenuTabBar } from '@/modules/menus/components/tab/menu-tab-bar'
import { MENU_WIDGET_ACTIONS } from '@/modules/menus/constants/menu-widget-actions.const'
import { MoreActionsWidget } from '@/modules/shared/components/widget/more-actions-widget'

interface MenuLayoutProps {
  children: React.ReactNode
}

function MenuLayout({ children }: MenuLayoutProps) {
  return (
    <div className='flex flex-col gap-y-[1.875rem]'>
      <MenuTabBar />
      {children}
      <MoreActionsWidget actions={MENU_WIDGET_ACTIONS} />
    </div>
  )
}

export default MenuLayout
