'use client'
import { useBranch } from '@/modules/branches/providers/branch.provider'
import { ProductsList } from '@/modules/products/components/list/products-list'
import { LineIcon } from '@ristokit/ui/icons/line.icon'
import { cn } from '@ristokit/ui/lib/utils'
import Image from 'next/image'

function ProductsSection() {
  const { filteredCategories } = useBranch()

  // Empty state when no categories found (search results)
  if (filteredCategories.length === 0) {
    return (
      <section className='flex flex-col items-center justify-center min-h-[50vh] px-4 py-12'>
        <div className='max-w-md text-center space-y-6'>
          <div className='mx-auto w-32 h-32 md:w-40 md:h-40 rounded-full bg-neutral-100 flex items-center justify-center'>
            <svg className='size-16 md:size-20 text-neutral-400' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={1.5}
                d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
              />
            </svg>
          </div>
          <div className='space-y-3'>
            <h3 className='text-2xl md:text-3xl font-bold text-neutral-900'>No encontramos resultados</h3>
            <p className='text-base md:text-lg text-neutral-600'>
              Intenta buscar con otras palabras o explora nuestras categorías
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className='flex flex-col'>
      {filteredCategories.map((category) => (
        <section key={category.id} className='even:bg-secondary'>
          <div className='mx-auto flex w-full max-w-5xl md:max-w-6xl lg:max-w-7xl flex-col gap-y-[1.875rem] px-4 md:px-6 lg:px-8 py-5 md:py-8'>
            <header className='flex flex-col gap-y-[1.875rem]'>
              <div className='grid gap-y-2.5'>
                <h2 className='text-heading-mobile-2 md:text-3xl lg:text-4xl text-text font-bold'>{category.name}</h2>
                <LineIcon className='stroke-text' />
              </div>
              <div className='grid gap-y-2.5'>
                <div className='relative size-full min-h-[9.375rem] md:min-h-[12rem] lg:min-h-[15rem] bg-secondary rounded-xl overflow-hidden'>
                  <Image
                    className='rounded-xs object-cover'
                    src={category.image ?? '/assets/placeholder.jpeg'}
                    alt={category.name}
                    fill
                  />
                </div>
                <p className='text-body-mobile-3 md:text-base lg:text-lg text-gray-dark'>{category.description}</p>
              </div>
            </header>

            {/* Category Products */}
            {category.products && category.products.length > 0 ? (
              <ProductsList products={category.products} />
            ) : (
              !category.subcategories?.length && (
                <EmptyProductsState message='No hay productos disponibles en esta categoría' />
              )
            )}

            {/* Subcategories */}
            {category.subcategories &&
              category.subcategories?.length > 0 &&
              category.subcategories.map((subcategory) => (
                <section key={subcategory.id} className='flex flex-col gap-y-[1.875rem]'>
                  <header className='flex flex-col gap-y-5'>
                    <div className='grid gap-y-2.5'>
                      <h2 className='text-heading-mobile-4 md:text-2xl lg:text-3xl text-text font-semibold'>
                        {subcategory.name}
                      </h2>
                      <LineIcon className='stroke-text' />
                    </div>
                    <div className='grid gap-y-2.5'>
                      <div className='relative size-full min-h-[9.375rem] md:min-h-[12rem] lg:min-h-[15rem] bg-secondary rounded-xl overflow-hidden'>
                        <Image
                          className='rounded-xs object-cover'
                          src={subcategory.image ?? '/assets/placeholder.jpeg'}
                          alt={subcategory.name}
                          fill
                        />
                      </div>
                      <p className='text-body-mobile-3 md:text-base lg:text-lg text-gray-dark'>
                        {subcategory.description}
                      </p>
                    </div>
                  </header>

                  {/* Subcategory Products */}
                  {subcategory.products && subcategory.products.length > 0 ? (
                    <ProductsList products={subcategory.products} />
                  ) : (
                    <EmptyProductsState message='No hay productos disponibles en esta subcategoría' />
                  )}
                </section>
              ))}
          </div>
        </section>
      ))}
    </section>
  )
}

// Empty state component for when a category/subcategory has no products
function EmptyProductsState({ message }: { message: string }) {
  return (
    <div className='flex flex-col items-center justify-center py-12 px-4'>
      <div className='max-w-sm text-center space-y-4'>
        <div className='mx-auto w-20 h-20 md:w-24 md:h-24 rounded-full bg-neutral-100 flex items-center justify-center'>
          <svg className='size-10 md:size-12 text-neutral-400' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={1.5}
              d='M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4'
            />
          </svg>
        </div>
        <p className='text-base md:text-lg text-neutral-600 font-medium'>{message}</p>
      </div>
    </div>
  )
}

export { ProductsSection }
