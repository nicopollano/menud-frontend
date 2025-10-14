'use client'
import { PromotionCardList } from '@/modules/promotions/components/list/promotion-card-list'
import { PromotionsSummary } from '@/modules/promotions/components/summary/promotions-summary'

function PromotionsPage() {
  return (
    <section className='flex flex-col gap-y-[1.875rem]'>
      <PromotionsSummary />
      <PromotionCardList />
    </section>
  )
}

export default PromotionsPage
