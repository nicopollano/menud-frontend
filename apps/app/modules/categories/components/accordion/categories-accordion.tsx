'use client'
import { CategoryActionsDropdown } from '@/modules/categories/components/dropdown/category-actions-dropdown'
import { useMenu } from '@/modules/menus/hooks/use-menu'
import { ProductCard } from '@/modules/products/components/card/product-card'
import { AccordionOptionsSkeleton } from '@/modules/shared/components/skeleton/accordion-options-skeleton'
import { pluralize } from '@/modules/shared/helpers/text.helper'
import { useNavigationParams } from '@/modules/shared/hooks/use-navigation-params'
import { SubcategoriesAccordion } from '@/modules/subcategories/components/accordion/subcategories-accordion'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@ristokit/ui/components/accordion'
import { ArrowDownIcon } from '@ristokit/ui/icons/arrow-down.icon'
import { LineIcon } from '@ristokit/ui/icons/line.icon'

function CategoriesAccordion() {
  const { businessId, branchId, menuId } = useNavigationParams()

  const { data, isLoading } = useMenu({
    businessId,
    branchId,
    menuId
  })

  if (isLoading) return <AccordionOptionsSkeleton />

  return (
    <Accordion type='single' collapsible className='flex flex-col gap-y-[1.875rem]'>
      {data?.categories?.map((category) => (
        <AccordionItem key={category.id} value={category.id} className='grid border-none'>
          <div className='grid grid-cols-2 gap-y-2.5'>
            <div className='col-span-full flex items-center justify-between gap-x-2.5'>
              <AccordionTrigger className='group flex items-center justify-start gap-x-2.5 py-0 hover:no-underline'>
                <ArrowDownIcon className='shrink-0 stroke-text transition-transform duration-300 group-data-[state=open]:rotate-180' />
                <h3 className='grid grid-cols-[auto_auto_auto] items-center gap-x-2.5 text-heading-mobile-4 text-text'>
                  <span className='truncate'>{category.name}</span>
                  <span className='truncate text-body-mobile-4 text-gray-dark'>
                    ({category.summary?.totalProducts}){' '}
                    {pluralize({
                      count: category.summary?.totalProducts || 0,
                      singular: 'producto',
                      plural: 'productos'
                    })}
                  </span>
                  <span className='truncate text-body-mobile-4 text-gray-dark'>
                    ({category.summary?.totalSubcategories}){' '}
                    {pluralize({
                      count: category.summary?.totalSubcategories || 0,
                      singular: 'subcategoría',
                      plural: 'subcategorías'
                    })}
                  </span>
                </h3>
              </AccordionTrigger>
              <CategoryActionsDropdown category={category} />
            </div>
            <LineIcon className='col-span-full w-full bg-primary opacity-50' />
          </div>
          <AccordionContent className='mt-5 space-y-5 pb-0'>
            {category.products &&
              category.products.length > 0 &&
              category.products.map((product) => <ProductCard key={product.id} product={product} variant='category' />)}
            {category.subcategories && category.subcategories.length > 0 && (
              <SubcategoriesAccordion subcategories={category.subcategories} />
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export { CategoriesAccordion }
