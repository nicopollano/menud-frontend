'use client'
import { MenuCardList } from '@/modules/menus/components/list/menu-card-list'
import { MenusSummary } from '@/modules/menus/components/summary/menus-summary'

function MenusPage() {
  return (
    <section className='flex flex-col gap-y-[1.875rem]'>
      <MenusSummary />
      <MenuCardList />
    </section>
  )
}

export default MenusPage
