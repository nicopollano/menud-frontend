'use client'
import { FavoriteProductsList } from '@/modules/products/components/list/favorite-products-list'
import { useFavoriteProducts } from '@/modules/products/providers/favorite-products.provider'
import { formatPrice } from '@ristokit/shared/helpers/product.helper'
import { Currency, Locale } from '@ristokit/shared/models/general.model'
import { Badge } from '@ristokit/ui/components/badge'
import { Button, buttonVariants } from '@ristokit/ui/components/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHandle,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@ristokit/ui/components/drawer'
import { cn } from '@ristokit/ui/lib/utils'
import { HeartIcon } from 'lucide-react'

function FavoriteProductsDrawer() {
  const { favoriteProducts, hasFavoriteProducts, totalPrice } = useFavoriteProducts()
  const favoritesCount = favoriteProducts.length

  return (
    <Drawer>
      <DrawerTrigger asChild>
        {/* Floating Action Button (FAB) */}
        <Button
          className={cn(
            'fixed right-4 md:right-6 bottom-[4.375rem] md:bottom-24 z-50',
            'size-16 md:size-20 rounded-full p-0',
            'bg-primary-600 hover:bg-primary-700 shadow-2xl shadow-primary-600/40',
            'transition-all duration-300 hover:scale-110 active:scale-95',
            'border-4 border-white',
            // Pulse animation when there are favorites
            favoritesCount > 0 && 'animate-pulse'
          )}
        >
          <div className='relative'>
            <HeartIcon className='size-8 md:size-10 fill-white text-white' />
            {/* Badge counter */}
            {favoritesCount > 0 && (
              <Badge
                variant='warning'
                size='sm'
                className='absolute -top-2 -right-2 size-6 rounded-full p-0 flex items-center justify-center text-xs font-bold shadow-lg animate-scale-in'
              >
                {favoritesCount}
              </Badge>
            )}
          </div>
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <div className='flex flex-col gap-y-8 overflow-y-auto px-4 md:px-6 pb-8 md:pb-12'>
          <DrawerHandle />

          <DrawerHeader className='gap-y-6 p-0'>
            {/* Title with count */}
            <div className='flex items-center justify-between'>
              <DrawerTitle className='text-2xl md:text-3xl font-bold text-neutral-900 flex items-center gap-3'>
                <HeartIcon className='size-7 md:size-8 fill-primary-600 text-primary-600' />
                Mis Favoritos
              </DrawerTitle>
              {favoritesCount > 0 && (
                <Badge variant='primary' size='md' className='text-base md:text-lg'>
                  {favoritesCount} {favoritesCount === 1 ? 'plato' : 'platos'}
                </Badge>
              )}
            </div>

            {/* Description */}
            <div className='grid gap-3'>
              <DrawerDescription className='text-base md:text-lg text-neutral-600'>
                ¿Te gustó algún plato? ¡Guardalo en tu lista de favoritos para no olvidarlo!
              </DrawerDescription>
              <DrawerDescription className='text-sm md:text-base text-neutral-500'>
                Agregá los platos que más te interesan y mostraselos fácilmente al personal del restaurante al momento
                de hacer tu pedido.
              </DrawerDescription>
            </div>

            {/* Products list with total */}
            {hasFavoriteProducts() && (
              <div className='grid gap-6 mt-4'>
                {/* Total price banner */}
                <div className='flex items-center justify-between gap-4 p-4 bg-primary-50 rounded-xl border-2 border-primary-200'>
                  <span className='text-lg md:text-xl font-semibold text-neutral-900'>Total</span>
                  <span className='text-2xl md:text-3xl font-bold text-primary-600'>
                    {formatPrice({
                      currency: Currency.ARS,
                      price: totalPrice(),
                      locale: Locale.ES_AR
                    })}
                  </span>
                </div>

                {/* Products list */}
                <FavoriteProductsList products={favoriteProducts} />
              </div>
            )}
          </DrawerHeader>

          {/* Empty state */}
          {!hasFavoriteProducts() && (
            <DrawerFooter className='gap-6 mt-8'>
              <div className='mx-auto max-w-sm text-center space-y-4'>
                {/* Empty heart icon */}
                <div className='mx-auto w-24 h-24 md:w-32 md:h-32 rounded-full bg-neutral-100 flex items-center justify-center'>
                  <HeartIcon className='size-12 md:size-16 text-neutral-400' />
                </div>
                <DrawerDescription className='text-lg md:text-xl text-neutral-600 font-medium'>
                  Aún no guardaste platos
                </DrawerDescription>
                <DrawerDescription className='text-base md:text-lg text-neutral-500'>
                  Agregá a tus favoritos para tenerlos a mano cuando hagas tu pedido.
                </DrawerDescription>
              </div>
              <DrawerClose
                className={buttonVariants({
                  variant: 'secondary',
                  className: 'mx-auto w-full max-w-xs py-3 text-base md:text-lg'
                })}
              >
                Seguir navegando
              </DrawerClose>
            </DrawerFooter>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export { FavoriteProductsDrawer }
