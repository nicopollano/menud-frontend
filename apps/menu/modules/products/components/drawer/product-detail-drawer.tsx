'use client'
import { useFavoriteProducts } from '@/modules/products/providers/favorite-products.provider'
import { formatPrice } from '@ristokit/shared/helpers/product.helper'
import { Currency, Locale } from '@ristokit/shared/models/general.model'
import type { Product } from '@ristokit/shared/models/product.model'
import { Button, buttonVariants } from '@ristokit/ui/components/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHandle,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@ristokit/ui/components/drawer'
import { ArrowBackIcon } from '@ristokit/ui/icons/arrow-back.icon'
import { HeartIcon } from '@ristokit/ui/icons/heart.icon'
import { cn } from '@ristokit/ui/lib/utils'
import Image from 'next/image'

interface ProductDetailDrawerProps {
  product: Product
  children: React.ReactNode
}

function ProductDetailDrawer({ product, children }: ProductDetailDrawerProps) {
  const { isFavoriteProduct, toggleFavoriteProduct } = useFavoriteProducts()

  const handleToggleFavoriteProduct = () => {
    toggleFavoriteProduct(product)
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <div className='flex flex-col gap-y-[3.75rem] overflow-y-auto px-[0.9375rem] pb-[3.75rem]'>
          <DrawerHandle />
          <DrawerHeader className='gap-y-[1.875rem]'>
            <DrawerTitle className='sr-only'>Detalles del producto</DrawerTitle>
            <DrawerDescription className='sr-only'>{product.description}</DrawerDescription>
            <div className='relative size-full min-h-[15rem] rounded-sm bg-secondary'>
              <Image src={product.images?.[0] || '#'} alt={product.name} fill className='rounded-sm object-cover' />
              <DrawerClose
                className={cn(
                  buttonVariants({ variant: 'outline', size: 'small' }),
                  'absolute top-4 left-4 size-9 border-primary stroke-text'
                )}
              >
                <ArrowBackIcon />
              </DrawerClose>
              <Button
                onClick={handleToggleFavoriteProduct}
                className='absolute top-4 right-4 size-9 border-primary'
                variant='outline'
                size='small'
              >
                <HeartIcon
                  className={cn('size-6 stroke-text', {
                    'fill-primary stroke-primary': isFavoriteProduct(product.id)
                  })}
                />
              </Button>
            </div>
            <div className='grid grid-cols-[1fr_auto]'>
              <p className='text-body-mobile-3 text-gray-dark'>{product.subcategory?.name || product.category?.name}</p>
              <p className='row-span-2 mt-auto text-heading-mobile-4 text-text'>
                {formatPrice({
                  currency: Currency.ARS,
                  locale: Locale.ES_AR,
                  price: product.discountedPrice || product.price
                })}
              </p>
              <h4 className='text-heading-mobile-4 text-text'>{product.name}</h4>
            </div>
            <div className='grid gap-y-2.5'>
              <p className='text-heading-mobile-4 text-text'>Descripción</p>
              <p className='text-body-mobile-2 text-gray-dark'>{product.description}</p>
            </div>
          </DrawerHeader>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export { ProductDetailDrawer }
