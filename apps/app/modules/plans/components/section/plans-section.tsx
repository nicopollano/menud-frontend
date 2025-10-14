import { PlanCardCarousel } from '@/modules/plans/components/carousel/plan-card-carousel'
import { LineIcon } from '@ristokit/ui/icons/line.icon'

function PlansSection() {
  return (
    <section className='grid gap-y-[1.875rem]'>
      <header className='grid gap-y-2.5'>
        <h2 className='text-heading-mobile-3 text-text'>Planes</h2>
        <LineIcon className='h-px bg-text' />
      </header>
      <PlanCardCarousel />
    </section>
  )
}

export { PlansSection }
