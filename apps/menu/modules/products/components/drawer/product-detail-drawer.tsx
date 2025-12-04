'use client'
import { useFavoriteProducts } from '@/modules/products/providers/favorite-products.provider'
import { formatPrice } from '@ristokit/shared/helpers/product.helper'
import { Currency, Locale } from '@ristokit/shared/models/general.model'
import type { Product } from '@ristokit/shared/models/product.model'
import { Badge } from '@ristokit/ui/components/badge'
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

  const isFavorite = isFavoriteProduct(product.id)
  const discountedPrice = product.discountedPrice && product.discountedPrice > 0 ? product.discountedPrice : undefined
  const hasDiscount = !!discountedPrice
  const discountPercentage = hasDiscount ? Math.round(((product.price - discountedPrice) / product.price) * 100) : 0

  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <div className='flex flex-col gap-y-8 overflow-y-auto px-4 md:px-6 pb-8 md:pb-12'>
          <DrawerHandle />
          <DrawerHeader className='gap-y-6 md:gap-y-8 p-0'>
            <DrawerTitle className='sr-only'>Detalles del producto</DrawerTitle>
            <DrawerDescription className='sr-only'>{product.description}</DrawerDescription>

            {/* Product Image */}
            <div className='relative size-full min-h-[18rem] md:min-h-[24rem] rounded-2xl bg-neutral-100 overflow-hidden shadow-xl'>
              <Image src={product.images?.[0] || '#'} alt={product.name} fill className='rounded-2xl object-cover' />

              {/* Gradient overlay for better button contrast */}
              <div className='absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent' />

              {/* Discount Badge */}
              {hasDiscount && (
                <div className='absolute top-4 left-4 z-10'>
                  <Badge variant='warning' size='md' className='shadow-lg'>
                    -{discountPercentage}% OFF
                  </Badge>
                </div>
              )}

              {/* Back Button */}
              <DrawerClose
                className={cn(
                  buttonVariants({ variant: 'outline', size: 'small' }),
                  'absolute top-4 left-4 size-10 md:size-11 bg-white/90 backdrop-blur-sm border-white shadow-lg hover:bg-white hover:scale-105 transition-all'
                )}
              >
                <ArrowBackIcon className='stroke-neutral-900' />
              </DrawerClose>

              {/* Favorite Button */}
              <Button
                onClick={handleToggleFavoriteProduct}
                className='absolute top-4 right-4 size-10 md:size-11 bg-white/90 backdrop-blur-sm border-white shadow-lg hover:bg-white hover:scale-105 transition-all'
                variant='outline'
                size='small'
              >
                <HeartIcon
                  className={cn(
                    'size-6 transition-all duration-300',
                    isFavorite
                      ? 'fill-primary-600 stroke-primary-600 scale-110 animate-heart-beat'
                      : 'stroke-neutral-700'
                  )}
                />
              </Button>
            </div>

            {/* Product Info */}
            <div className='grid gap-4 md:gap-6'>
              {/* Header with name and price */}
              <div className='grid gap-3'>
                <div className='flex items-start justify-between gap-4'>
                  <div className='flex-1'>
                    <p className='text-sm md:text-base text-neutral-600 mb-1'>
                      {product.subcategory?.name || product.category?.name}
                    </p>
                    <h3 className='text-2xl md:text-3xl font-bold text-neutral-900'>{product.name}</h3>
                  </div>
                  <div className='text-right'>
                    <p className='text-2xl md:text-3xl font-bold text-primary-600'>
                      {formatPrice({
                        currency: Currency.ARS,
                        locale: Locale.ES_AR,
                        price: discountedPrice || product.price
                      })}
                    </p>
                    {hasDiscount && (
                      <p className='text-sm md:text-base text-neutral-500 line-through mt-1'>
                        {formatPrice({
                          currency: Currency.ARS,
                          locale: Locale.ES_AR,
                          price: product.price
                        })}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className='grid gap-3 pt-4 border-t border-neutral-200'>
                <h4 className='text-lg md:text-xl font-semibold text-neutral-900'>Descripción</h4>
                <p className='text-base md:text-lg text-neutral-600 leading-relaxed'>
                  {product.description || 'Sin descripción disponible'}
                </p>
              </div>
            </div>
          </DrawerHeader>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export { ProductDetailDrawer }
