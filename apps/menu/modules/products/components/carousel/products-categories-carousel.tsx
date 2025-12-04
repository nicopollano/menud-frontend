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
    <Carousel
      opts={{ align: 'start', dragFree: true }}
      className='mx-auto grid w-full max-w-5xl md:max-w-6xl lg:max-w-7xl px-4 md:px-6 lg:px-8 py-3 md:py-4'
    >
      <CarouselContent className='-ml-2 md:-ml-3 items-center'>
        {categories.map((category) => {
          const isActive = filters.categoryId === category.id
          const hasSubcategories = category.subcategories && category.subcategories.length > 0

          return (
            <CarouselItem key={category.id} className='basis-auto pl-2 md:pl-3'>
              <Button
                variant='styless'
                size='styless'
                onClick={() => handleUpdateCategory(category.id)}
                className={cn(
                  // Base styles - Chip design
                  'flex items-center gap-1.5 px-4 md:px-5 py-2 md:py-2.5 rounded-full',
                  'text-sm md:text-base font-medium',
                  'transition-all duration-300 ease-out',
                  'border-2',
                  // Hover effects
                  'hover:scale-105 active:scale-95',
                  // Inactive state
                  !isActive && [
                    'bg-white border-neutral-200 text-neutral-700',
                    'hover:bg-neutral-50 hover:border-neutral-300',
                    'shadow-sm hover:shadow-md'
                  ],
                  // Active state
                  isActive && [
                    'bg-primary-600 border-primary-600 text-white',
                    'shadow-lg shadow-primary-600/30',
                    'hover:bg-primary-700 hover:border-primary-700'
                  ]
                )}
              >
                <span className='whitespace-nowrap'>{category.name}</span>
                {hasSubcategories && (
                  <ArrowDownIcon
                    className={cn(
                      'size-4 transition-all duration-300',
                      isActive ? 'stroke-white rotate-180' : 'stroke-neutral-600'
                    )}
                  />
                )}
              </Button>
            </CarouselItem>
          )
        })}
      </CarouselContent>
    </Carousel>
  )
}

export { ProductsCategoriesCarousel }
