import { CreateBranchDrawer } from '@/modules/branches/components/drawer/create-branch-drawer'
import { CreateBusinessDrawer } from '@/modules/businesses/components/drawer/create-business-drawer'
import { CreateMenuDrawer } from '@/modules/menus/components/drawer/create-menu-drawer'
import type { MoreActionsWidgetOptions } from '@/modules/shared/components/widget/more-actions-widget'

export const BUSINESS_WIDGET_ACTIONS: MoreActionsWidgetOptions[] = [
  {
    id: 'create-menu-drawer',
    component: CreateMenuDrawer
  },
  {
    id: 'create-branch-drawer',
    component: CreateBranchDrawer
  },
  {
    id: 'create-business-drawer',
    component: CreateBusinessDrawer
  }
]
