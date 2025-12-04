'use client'
import { ProductCard } from '@/modules/products/components/card/product-card'
import { pluralize } from '@/modules/shared/helpers/text.helper'
import { SubcategoryActionsDropdown } from '@/modules/subcategories/components/dropdown/subcategory-actions-dropdown'
import type { Subcategory } from '@ristokit/shared/models/subcategory.model'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@ristokit/ui/components/accordion'
import { ArrowDownIcon } from '@ristokit/ui/icons/arrow-down.icon'

interface SubcategoriesAccordionProps {
  subcategories: Subcategory[]
}

function SubcategoriesAccordion({ subcategories }: SubcategoriesAccordionProps) {
  return (
    <Accordion type='single' collapsible className='flex flex-col gap-y-3'>
      {subcategories.map((subcategory, index) => (
        <AccordionItem
          key={subcategory.id}
          value={subcategory.id}
          className='group/subcategory border-none mb-3 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 animate-fade-in'
          style={{
            animationDelay: `${index * 30}ms`,
            background: '#ffffff',
            boxShadow: '0 12px 20px -5px rgba(0, 0, 0, 0.12), 0 6px 8px -4px rgba(0, 0, 0, 0.08)',
            borderRadius: '24px',
            border: '1px solid rgba(250, 82, 82, 0.1)'
          }}
        >
          <div className='p-4'>
            <div className='flex items-center justify-between gap-3'>
              <AccordionTrigger className='group/trigger flex flex-1 items-center justify-start gap-x-3 py-0 hover:no-underline'>
                <div
                  className='flex size-9 items-center justify-center rounded-full shadow-md group-hover/trigger:scale-110 transition-all duration-300'
                  style={{
                    backgroundColor: '#ffffff',
                    color: '#fa5252',
                    boxShadow: '0 4px 6px -1px rgba(250, 82, 82, 0.2)'
                  }}
                >
                  <ArrowDownIcon
                    className='size-4 shrink-0 transition-transform duration-300 group-data-[state=open]:rotate-180'
                    strokeWidth={2.5}
                  />
                </div>
                <div className='flex flex-col items-start gap-0.5 flex-1 min-w-0'>
                  <span className='text-[9px] font-semibold uppercase tracking-wider' style={{ color: '#fa5252' }}>
                    Subcategoría
                  </span>
                  <h4 className='text-sm md:text-base font-bold text-neutral-900 group-hover/trigger:text-primary-600 transition-colors duration-300 truncate'>
                    {subcategory.name}
                  </h4>
                  <div
                    className='flex items-center gap-1.5 px-2.5 py-0.5 rounded-full'
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
                  >
                    <span className='text-xs font-bold' style={{ color: '#fa5252' }}>
                      {subcategory.products?.length || 0}
                    </span>
                    <span className='text-xs font-medium text-neutral-600'>
                      {pluralize({
                        count: subcategory.products?.length || 0,
                        singular: 'producto',
                        plural: 'productos'
                      })}
                    </span>
                  </div>
                </div>
              </AccordionTrigger>
              <SubcategoryActionsDropdown subcategory={subcategory} />
            </div>
          </div>

          <AccordionContent className='px-0 pb-0 pt-0'>
            <div className='p-4 rounded-b-3xl' style={{ backgroundColor: '#fef5f5' }}>
              <div className='flex flex-col gap-2.5'>
                {subcategory.products &&
                  subcategory.products?.length > 0 &&
                  subcategory.products?.map((product) => (
                    <ProductCard key={product.id} product={product} variant='subcategory' />
                  ))}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export { SubcategoriesAccordion }
