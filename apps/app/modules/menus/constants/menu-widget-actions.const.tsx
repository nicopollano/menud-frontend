import { CreateCategoryDrawer } from '@/modules/categories/components/drawer/create-category-drawer'
import { CreateProductDrawer } from '@/modules/products/components/drawer/create-product-drawer'
import { CreatePromotionDrawer } from '@/modules/promotions/components/drawer/create-promotion-drawer'
import type { MoreActionsWidgetOptions } from '@/modules/shared/components/widget/more-actions-widget'
import { CreateSubcategoryDrawer } from '@/modules/subcategories/components/drawer/create-subcategory-drawer'

export const MENU_WIDGET_ACTIONS: MoreActionsWidgetOptions[] = [
  {
    id: 'create-promotion-drawer',
    component: CreatePromotionDrawer
  },
  {
    id: 'create-subcategory-drawer',
    component: CreateSubcategoryDrawer
  },
  {
    id: 'create-category-drawer',
    component: CreateCategoryDrawer
  },
  {
    id: 'create-product-drawer',
    component: CreateProductDrawer
  }
]
