'use client'
import { CategoriesAccordion } from '@/modules/categories/components/accordion/categories-accordion'
import { MenuSummary } from '@/modules/menus/components/summary/menu-summary'

function MenuPage() {
  return (
    <section className='flex flex-col gap-y-[1.875rem]'>
      <MenuSummary />
      <CategoriesAccordion />
    </section>
  )
}

export default MenuPage
