'use client'
import { useBranch } from '@/modules/branches/providers/branch.provider'
import { Button } from '@ristokit/ui/components/button'
import { Carousel, CarouselContent, CarouselItem } from '@ristokit/ui/components/carousel'
import { ArrowDownIcon } from '@ristokit/ui/icons/arrow-down.icon'
import { cn } from '@ristokit/ui/lib/utils'

function ProductsCategoriesCarousel() {
  const { categories, filters, updateFilters } = useBranch()

  const handleUpdateCategory = (categoryId: string) => {
    const newCategoryId = filters.categoryId === categoryId ? undefined : categoryId
    updateFilters({ categoryId: newCategoryId, subcategoryId: undefined })
  }

  return (
    <Carousel opts={{ align: 'start' }} className='mx-auto grid w-full max-w-5xl px-4 py-5'>
      <CarouselContent className='-ml-4 items-center'>
        {categories.map((category) => (
          <CarouselItem key={category.id} className='basis-auto pl-4'>
            <Button
              variant='styless'
              size='styless'
              onClick={() => handleUpdateCategory(category.id)}
              className={cn(
                'flex basis-auto items-center border-transparent border-b-2 stroke-gray-dark text-body-mobile-2 text-gray-dark',
                filters.categoryId === category.id && 'border-primary stroke-primary text-heading-mobile-4 text-primary'
              )}
            >
              {category.name}
              {category.subcategories && category.subcategories.length > 0 && (
                <ArrowDownIcon className='stroke-inherit' />
              )}
            </Button>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}

export { ProductsCategoriesCarousel }
