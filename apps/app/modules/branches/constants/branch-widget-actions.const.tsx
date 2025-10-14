import { CreateMemberDrawer } from '@/modules/members/components/drawer/create-member-drawer'
import { CreateMenuDrawer } from '@/modules/menus/components/drawer/create-menu-drawer'
import type { MoreActionsWidgetOptions } from '@/modules/shared/components/widget/more-actions-widget'

export const BRANCH_WIDGET_ACTIONS: MoreActionsWidgetOptions[] = [
  {
    id: 'create-menu-drawer',
    component: CreateMenuDrawer
  },
  {
    id: 'create-user-drawer',
    component: CreateMemberDrawer
  }
]
