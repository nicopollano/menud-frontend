'use client'
import { PlanCard } from '@/modules/plans/components/card/plan-card'
import { PLAN_BASIC, PLAN_PREMIUM, PLAN_PRO } from '@ristokit/shared/models/plan.model'
import { Carousel, type CarouselApi, CarouselContent, CarouselItem } from '@ristokit/ui/components/carousel'
import { cn } from '@ristokit/ui/lib/utils'
import { CheckCircleIcon } from 'lucide-react'
import { motion } from 'motion/react'
import { useEffect, useState } from 'react'

function PlanCardCarousel() {
  const [planCarouselApi, setPlanCarouselApi] = useState<CarouselApi>()
  const [currenPlanSlide, setCurrenPlanSlide] = useState(0)

  useEffect(() => {
    if (!planCarouselApi) return

    setCurrenPlanSlide(planCarouselApi.selectedScrollSnap())

    planCarouselApi.on('select', () => {
      setCurrenPlanSlide(planCarouselApi.selectedScrollSnap())
    })
  }, [planCarouselApi])

  return (
    <Carousel
      className='relative grid'
      opts={{
        loop: true
      }}
      setApi={setPlanCarouselApi}
    >
      <CarouselContent>
        <CarouselItem className='my-auto basis-[86%]'>
          <motion.div
            layout
            className={cn('h-[32.25rem] overflow-hidden rounded-sm', {
              'h-auto': currenPlanSlide === 0
            })}
          >
            <PlanCard.Root>
              <PlanCard.Header>
                <PlanCard.Title>
                  <PlanCard.Name>
                    {PLAN_BASIC.name} <PlanCard.Badge>Mi plan</PlanCard.Badge>
                  </PlanCard.Name>
                </PlanCard.Title>
                <PlanCard.Description>{PLAN_BASIC.description}</PlanCard.Description>
                <PlanCard.Price>
                  <PlanCard.Currency>$</PlanCard.Currency>
                  {PLAN_BASIC.price}
                </PlanCard.Price>
                <PlanCard.Action>Mejorar plan</PlanCard.Action>
              </PlanCard.Header>
              <PlanCard.Features>
                {PLAN_BASIC.limits?.map((limit) => (
                  <PlanCard.Feature key={limit}>
                    <CheckCircleIcon className='size-6' />
                    {limit}
                  </PlanCard.Feature>
                ))}
                {PLAN_BASIC.features?.map((feature) => (
                  <PlanCard.Feature key={feature}>
                    <CheckCircleIcon className='size-6' />
                    {feature}
                  </PlanCard.Feature>
                ))}
              </PlanCard.Features>
            </PlanCard.Root>
          </motion.div>
        </CarouselItem>
        <CarouselItem className='my-auto basis-[86%]'>
          <motion.div
            layout
            className={cn('h-[32.25rem] overflow-hidden rounded-sm', {
              'h-auto': currenPlanSlide === 1
            })}
          >
            <PlanCard.Root>
              <PlanCard.Header>
                <PlanCard.Title>
                  <PlanCard.Name className='text-primary'>{PLAN_PRO.name}</PlanCard.Name>
                </PlanCard.Title>
                <PlanCard.Description>{PLAN_PRO.description}</PlanCard.Description>
                <PlanCard.Price>
                  <PlanCard.Currency>$</PlanCard.Currency>
                  {PLAN_PRO.price}
                </PlanCard.Price>
                <PlanCard.Action className='bg-primary hover:bg-text'>Obtener plan</PlanCard.Action>
              </PlanCard.Header>
              <PlanCard.Features>
                {PLAN_PRO.limits?.map((limit) => (
                  <PlanCard.Feature key={limit}>
                    <CheckCircleIcon className='size-6' />
                    {limit}
                  </PlanCard.Feature>
                ))}
                {PLAN_PRO.features?.map((feature) => (
                  <PlanCard.Feature key={feature}>
                    <CheckCircleIcon className='size-6' />
                    {feature}
                  </PlanCard.Feature>
                ))}
              </PlanCard.Features>
            </PlanCard.Root>
          </motion.div>
        </CarouselItem>
        <CarouselItem className='my-auto basis-[86%]'>
          <motion.div
            layout
            className={cn('h-[32.25rem] overflow-hidden rounded-sm', {
              'h-auto': currenPlanSlide === 2
            })}
          >
            <PlanCard.Root
              className={cn({
                'bg-primary': currenPlanSlide === 2
              })}
            >
              <PlanCard.Header>
                <PlanCard.Title>
                  <PlanCard.Name className='text-background'>{PLAN_PREMIUM.name}</PlanCard.Name>
                </PlanCard.Title>
                <PlanCard.Description className='text-background'>{PLAN_PREMIUM.description}</PlanCard.Description>
                <PlanCard.Price className='text-background'>
                  <PlanCard.Currency>$</PlanCard.Currency>
                  {PLAN_PREMIUM.price}
                </PlanCard.Price>
                <PlanCard.Action className='bg-background text-primary hover:bg-text'>Mejorar plan</PlanCard.Action>
              </PlanCard.Header>
              <PlanCard.Features>
                {PLAN_PREMIUM.limits?.map((limit) => (
                  <PlanCard.Feature key={limit} className='text-background'>
                    <CheckCircleIcon className='size-6' />
                    {limit}
                  </PlanCard.Feature>
                ))}
                {PLAN_PREMIUM.features?.map((feature) => (
                  <PlanCard.Feature key={feature} className='text-background'>
                    <CheckCircleIcon className='size-6' />
                    {feature}
                  </PlanCard.Feature>
                ))}
              </PlanCard.Features>
            </PlanCard.Root>
          </motion.div>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  )
}

export { PlanCardCarousel }
