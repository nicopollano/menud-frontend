'use client'
import { LinkitCard } from '@/modules/linkit/components/card/linkit-card'
import type { Linkit } from '@ristokit/shared/models/linkit.model'
import { Button } from '@ristokit/ui/components/button'
import { Carousel, type CarouselApi, CarouselContent, CarouselItem } from '@ristokit/ui/components/carousel'
import { useEffect, useState } from 'react'

interface LinkitCardCarouselProps {
  linkits: Linkit[]
}

function LinkitCardCarousel({ linkits }: LinkitCardCarouselProps) {
  const [linkitCarouselApi, setLinkitCarouselApi] = useState<CarouselApi>()
  const [currentLinkitCarousel, setCurrentLinkitCarousel] = useState(0)

  useEffect(() => {
    if (!linkitCarouselApi) return

    setCurrentLinkitCarousel(linkitCarouselApi.selectedScrollSnap())

    linkitCarouselApi.on('select', () => {
      setCurrentLinkitCarousel(linkitCarouselApi.selectedScrollSnap())
    })
  }, [linkitCarouselApi])

  return (
    <Carousel setApi={setLinkitCarouselApi} className='grid gap-y-[3.125rem]'>
      <CarouselContent className='max-w-md'>
        {linkits.map((linkit) => (
          <CarouselItem key={linkit.id}>
            <LinkitCard linkit={linkit} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className='flex items-center justify-center gap-x-5'>
        {linkits.map((linkit, index) => (
          <Button
            key={linkit.id}
            onClick={() => linkitCarouselApi?.scrollTo(index)}
            variant={currentLinkitCarousel === index ? 'primary' : 'secondary'}
            size='small'
          >
            {index + 1}
          </Button>
        ))}
      </div>
    </Carousel>
  )
}

export { LinkitCardCarousel }
