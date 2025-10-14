import { formatPrice } from '@ristokit/shared/helpers/product.helper'
import { Currency, Locale } from '@ristokit/shared/models/general.model'
import type { PreviewProduct } from '@ristokit/shared/models/product.model'
import { HeartIcon } from '@ristokit/ui/icons/heart.icon'
import { cn } from '@ristokit/ui/lib/utils'
import Image from 'next/image'

interface PreviewProductCardProps {
  product: PreviewProduct
}

function PreviewProductCard({ product }: PreviewProductCardProps) {
  const hasDiscountedPrice = product.discountedPrice && product.discountedPrice > 0

  return (
    <article className='grid grid-cols-[auto_1fr] gap-x-4 rounded-sm border border-primary p-4'>
      <div className='relative h-[6.4375rem] w-[5.5rem]'>
        <Image
          className='rounded-xs bg-secondary object-cover'
          src={product.images[0] ?? '/assets/placeholder.jpeg'}
          alt={product.name}
          fill
        />
        <HeartIcon className='-left-1.5 -top-1.5 absolute size-8 fill-background stroke-primary' />
      </div>
      <header className='grid gap-y-[0.3125rem]'>
        <h4 className='line-clamp-1 text-heading-mobile-4 text-text'>{product.name}</h4>
        <p className='line-clamp-2 text-body-mobile-3 text-text'>{product.description || 'Sin descripción'}</p>
        <p
          className={cn(
            'mt-auto text-heading-mobile-4 text-text',
            hasDiscountedPrice && 'flex items-center gap-x-2.5 overflow-hidden text-gray-dark'
          )}
        >
          <span className={cn(hasDiscountedPrice && 'max-w-1/2 truncate line-through')}>
            {formatPrice({
              currency: Currency.ARS,
              price: product.price,
              locale: Locale.ES_AR
            })}
          </span>
          {hasDiscountedPrice && product.discountedPrice && (
            <span className='max-w-1/2 truncate text-text'>
              {formatPrice({
                currency: Currency.ARS,
                price: product.discountedPrice,
                locale: Locale.ES_AR
              })}
            </span>
          )}
        </p>
      </header>
    </article>
  )
}

export { PreviewProductCard }
