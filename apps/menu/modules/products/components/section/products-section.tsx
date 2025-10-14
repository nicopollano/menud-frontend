'use client'
import { useBranch } from '@/modules/branches/providers/branch.provider'
import { ProductsList } from '@/modules/products/components/list/products-list'
import { LineIcon } from '@ristokit/ui/icons/line.icon'
import Image from 'next/image'

function ProductsSection() {
  const { filteredCategories } = useBranch()

  return (
    <section className='flex flex-col'>
      {filteredCategories.map((category) => (
        <section key={category.id} className='even:bg-secondary'>
          <div className='mx-auto flex w-full max-w-5xl flex-col gap-y-[1.875rem] px-4 py-5'>
            <header className='flex flex-col gap-y-[1.875rem]'>
              <div className='grid gap-y-2.5'>
                <h2 className='text-heading-mobile-2 text-text'>{category.name}</h2>
                <LineIcon className='stroke-text' />
              </div>
              <div className='grid gap-y-2.5'>
                <div className='relative size-full min-h-[9.375rem] bg-secondary'>
                  <Image
                    className='rounded-xs object-cover'
                    src={category.image ?? '/assets/placeholder.jpeg'}
                    alt={category.name}
                    fill
                  />
                </div>
                <p className='text-body-mobile-3 text-gray-dark'>{category.description}</p>
              </div>
            </header>
            {category.products && category.products?.length > 0 && <ProductsList products={category.products} />}
            {category.subcategories &&
              category.subcategories?.length > 0 &&
              category.subcategories.map((subcategory) => (
                <section key={subcategory.id} className='flex flex-col gap-y-[1.875rem]'>
                  <header className='flex flex-col gap-y-5'>
                    <div className='grid gap-y-2.5'>
                      <h2 className='text-heading-mobile-4 text-text'>{subcategory.name}</h2>
                      <LineIcon className='stroke-text' />
                    </div>
                    <div className='grid gap-y-2.5'>
                      <div className='relative size-full min-h-[9.375rem] bg-secondary'>
                        <Image
                          className='rounded-xs object-cover'
                          src={subcategory.image ?? '/assets/placeholder.jpeg'}
                          alt={subcategory.name}
                          fill
                        />
                      </div>
                      <p className='text-body-mobile-3 text-gray-dark'>{subcategory.description}</p>
                    </div>
                  </header>
                  {subcategory.products && subcategory.products?.length > 0 && (
                    <ProductsList products={subcategory.products} />
                  )}
                </section>
              ))}
          </div>
        </section>
      ))}
    </section>
  )
}

export { ProductsSection }
