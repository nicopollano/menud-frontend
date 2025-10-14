import { useFavoriteProducts } from '@/modules/products/providers/favorite-products.provider'
import { formatPrice } from '@ristokit/shared/helpers/product.helper'
import { Currency, Locale } from '@ristokit/shared/models/general.model'
import type { Product } from '@ristokit/shared/models/product.model'
import { Button } from '@ristokit/ui/components/button'
import { CloseIcon } from '@ristokit/ui/icons/close.icon'
import { HeartIcon } from '@ristokit/ui/icons/heart.icon'
import Image from 'next/image'

interface FavoriteProductCardProps {
  product: Product
}

function FavoriteProductCard({ product }: FavoriteProductCardProps) {
  const { toggleFavoriteProduct } = useFavoriteProducts()

  const handleToggleFavorite = () => {
    toggleFavoriteProduct(product)
  }

  return (
    <article className='relative grid grid-cols-[auto_1fr_auto] gap-x-4 rounded-sm border border-primary p-4'>
      <div className='relative h-[3.625rem] w-[3.6875rem]'>
        <Image
          className='rounded-xs object-cover'
          src={product.images[0] ?? '/assets/placeholder.jpeg'}
          alt={product.name}
          fill
        />
        <HeartIcon className='-left-1.5 -top-1.5 absolute size-7 fill-primary stroke-primary' />
      </div>
      <header className='grid gap-y-2.5'>
        <h4 className='truncate text-heading-mobile-4 text-text'>{product.name}</h4>
        <p className='text-heading-mobile-4 text-text'>
          {formatPrice({
            currency: Currency.ARS,
            price: product.discountedPrice || product.price,
            locale: Locale.ES_AR
          })}
        </p>
      </header>
      <Button onClick={handleToggleFavorite} className='mb-auto' size='styless' variant='styless'>
        <CloseIcon className='size-6 stroke-text' />
      </Button>
    </article>
  )
}

export { FavoriteProductCard }
