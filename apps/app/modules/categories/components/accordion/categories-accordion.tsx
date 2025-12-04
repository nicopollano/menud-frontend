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
import { cn } from '@ristokit/ui/lib/utils'

function CategoriesAccordion() {
  const { businessId, branchId, menuId } = useNavigationParams()

  const { data, isLoading } = useMenu({
    businessId,
    branchId,
    menuId
  })

  if (isLoading) return <AccordionOptionsSkeleton />

  return (
    <Accordion type='single' collapsible className='flex flex-col gap-y-4'>
      {data?.categories?.map((category, index) => (
        <AccordionItem
          key={category.id}
          value={category.id}
          className='group/item border-none rounded-[32px] shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden mb-6 animate-fade-in'
          style={{
            animationDelay: `${index * 50}ms`,
            background: '#ffffff',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(0, 0, 0, 0.05)'
          }}
        >
          <div className='flex flex-col'>
            <div className='flex items-center justify-between p-4 md:p-5'>
              <AccordionTrigger className='group flex flex-1 items-center justify-start gap-x-4 py-0 hover:no-underline'>
                <div
                  className='flex size-11 items-center justify-center rounded-full shadow-lg group-hover:scale-110 transition-all duration-300'
                  style={{
                    background: 'linear-gradient(135deg, #fff5f5 0%, #ffe3e3 100%)',
                    color: '#fa5252'
                  }}
                >
                  <ArrowDownIcon
                    className='size-5 shrink-0 transition-transform duration-300 group-data-[state=open]:rotate-180'
                    strokeWidth={2.5}
                  />
                </div>
                <div className='flex flex-col items-start gap-0.5'>
                  <span className='text-[10px] font-semibold uppercase tracking-wider text-neutral-400'>Categoría</span>
                  <h3 className='text-lg md:text-xl font-bold text-neutral-900 group-hover:text-primary-600 transition-colors duration-300'>
                    {category.name}
                  </h3>
                  <div className='flex items-center gap-2.5 text-sm font-medium text-neutral-500'>
                    <div
                      className='flex items-center gap-1.5 px-3 py-1 rounded-full'
                      style={{ backgroundColor: '#fafafa' }}
                    >
                      <span className='font-bold text-neutral-800'>{category.summary?.totalProducts || 0}</span>
                      <span className='text-neutral-600'>
                        {pluralize({
                          count: category.summary?.totalProducts || 0,
                          singular: 'producto',
                          plural: 'productos'
                        })}
                      </span>
                    </div>
                    {(category.summary?.totalSubcategories || 0) > 0 && (
                      <div
                        className='flex items-center gap-1.5 px-3 py-1 rounded-full'
                        style={{ backgroundColor: '#fff5f5' }}
                      >
                        <span className='font-bold' style={{ color: '#fa5252' }}>
                          {category.summary?.totalSubcategories || 0}
                        </span>
                        <span className='text-neutral-600'>
                          {pluralize({
                            count: category.summary?.totalSubcategories || 0,
                            singular: 'subcategoría',
                            plural: 'subcategorías'
                          })}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </AccordionTrigger>
              <CategoryActionsDropdown category={category} />
            </div>
          </div>
          <AccordionContent className='px-0 pb-0 pt-0'>
            <div className='p-4 md:p-5 rounded-b-[32px]' style={{ backgroundColor: '#f8f8f8' }}>
              {/* Productos directos de la categoría */}
              {category.products && category.products.length > 0 && (
                <div className='flex flex-col gap-3'>
                  {category.products.map((product) => (
                    <ProductCard key={product.id} product={product} variant='category' />
                  ))}
                </div>
              )}

              {/* Subcategorías */}
              {category.subcategories && category.subcategories.length > 0 && (
                <div className={cn(category.products && category.products.length > 0 && 'mt-6')}>
                  <SubcategoriesAccordion subcategories={category.subcategories} />
                </div>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export { CategoriesAccordion }
