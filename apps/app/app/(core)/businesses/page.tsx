'use client'
import { BusinessCardList } from '@/modules/businesses/components/list/business-card-list'
import { BusinessSummary } from '@/modules/businesses/components/summary/business-summary'

function BusinessesPage() {
  return (
    <section className='flex flex-col gap-y-[1.875rem]'>
      <BusinessSummary />
      <BusinessCardList />
    </section>
  )
}

export default BusinessesPage
