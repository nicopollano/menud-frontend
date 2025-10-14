'use client'
import { ProductCard } from '@/modules/products/components/card/product-card'
import { pluralize } from '@/modules/shared/helpers/text.helper'
import { SubcategoryActionsDropdown } from '@/modules/subcategories/components/dropdown/subcategory-actions-dropdown'
import type { Subcategory } from '@ristokit/shared/models/subcategory.model'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@ristokit/ui/components/accordion'
import { ArrowDownIcon } from '@ristokit/ui/icons/arrow-down.icon'
import { LineIcon } from '@ristokit/ui/icons/line.icon'

interface SubcategoriesAccordionProps {
  subcategories: Subcategory[]
}

function SubcategoriesAccordion({ subcategories }: SubcategoriesAccordionProps) {
  return (
    <Accordion type='single' collapsible className='ml-2.5 flex flex-col gap-y-5'>
      {subcategories.map((subcategory) => (
        <AccordionItem key={subcategory.id} value={subcategory.id} className='grid border-none'>
          <div className='grid grid-cols-2 gap-y-2.5'>
            <div className='col-span-full flex items-center justify-between gap-x-2.5'>
              <AccordionTrigger className='group flex items-center justify-start gap-x-2.5 py-0 hover:no-underline'>
                <ArrowDownIcon className='shrink-0 stroke-text transition-transform duration-300 group-data-[state=open]:rotate-180' />
                <h3 className='grid grid-cols-[auto_auto] items-center gap-x-2.5 text-button-mobile-medium text-text'>
                  <span className='truncate'>{subcategory.name}</span>
                  <span className='truncate text-body-mobile-4 text-gray-dark'>
                    ({subcategory.summary?.totalProducts}){' '}
                    {pluralize({
                      count: subcategory.summary?.totalProducts || 0,
                      singular: 'producto',
                      plural: 'productos'
                    })}
                  </span>
                </h3>
              </AccordionTrigger>
              <SubcategoryActionsDropdown subcategory={subcategory} />
            </div>
            <LineIcon className='col-span-full w-full bg-text opacity-50' />
          </div>
          <AccordionContent className='mt-5 space-y-5 pb-0'>
            {subcategory.products &&
              subcategory.products?.length > 0 &&
              subcategory.products?.map((product) => (
                <ProductCard key={product.id} product={product} variant='subcategory' />
              ))}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export { SubcategoriesAccordion }
