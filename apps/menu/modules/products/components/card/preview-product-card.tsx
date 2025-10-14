import { useFavoriteProducts } from '@/modules/products/providers/favorite-products.provider'
import { formatPrice } from '@ristokit/shared/helpers/product.helper'
import { Currency, Locale } from '@ristokit/shared/models/general.model'
import type { Product } from '@ristokit/shared/models/product.model'
import { Skeleton } from '@ristokit/ui/components/skeleton'
import { HeartIcon } from '@ristokit/ui/icons/heart.icon'
import { cn } from '@ristokit/ui/lib/utils'
import Image from 'next/image'

interface PreviewProductCardProps {
  product: Product
}

function PreviewProductCard({ product }: PreviewProductCardProps) {
  const { isFavoriteProduct } = useFavoriteProducts()

  const discountedPrice = product.discountedPrice && product.discountedPrice > 0 ? product.discountedPrice : undefined

  return (
    <article className='grid grid-cols-[auto_1fr] gap-x-4 rounded-sm border border-primary p-4'>
      <div className='relative h-[6.4375rem] w-[5.5rem]'>
        <Image
          className='rounded-xs bg-secondary object-cover'
          src={product.images[0] ?? '/assets/placeholder.jpeg'}
          alt={product.name}
          fill
          sizes='30vw'
        />
        <HeartIcon
          className={cn('-left-1.5 -top-1.5 absolute size-8 fill-background stroke-primary', {
            'fill-primary stroke-primary': isFavoriteProduct(product.id)
          })}
        />
      </div>
      <header className='grid gap-y-[0.3125rem]'>
        <h4 className='line-clamp-1 text-heading-mobile-4 text-text'>{product.name}</h4>
        <p className='line-clamp-2 text-body-mobile-3 text-text'>{product.description || 'Sin descripción'}</p>
        <p
          className={cn(
            'mt-auto text-heading-mobile-4 text-text',
            product.discountedPrice && 'flex items-center gap-x-2.5 overflow-hidden text-gray-dark'
          )}
        >
          <span className={cn(discountedPrice && 'max-w-1/2 truncate line-through')}>
            {formatPrice({
              currency: Currency.ARS,
              currencyDisplay: 'symbol',
              price: product.price,
              locale: Locale.ES_AR
            })}
          </span>
          {discountedPrice && (
            <span className='max-w-1/2 truncate text-text'>
              {formatPrice({
                currency: Currency.ARS,
                currencyDisplay: 'symbol',
                price: discountedPrice,
                locale: Locale.ES_AR
              })}
            </span>
          )}
        </p>
      </header>
    </article>
  )
}

function PreviewProductCardSkeleton() {
  return <Skeleton className='min-h-[8.5625rem] rounded-sm' />
}

export { PreviewProductCard, PreviewProductCardSkeleton }
