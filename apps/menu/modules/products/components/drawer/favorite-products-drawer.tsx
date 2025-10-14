'use client'
import { FavoriteProductsList } from '@/modules/products/components/list/favorite-products-list'
import { useFavoriteProducts } from '@/modules/products/providers/favorite-products.provider'
import { formatPrice } from '@ristokit/shared/helpers/product.helper'
import { Currency, Locale } from '@ristokit/shared/models/general.model'
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
import { HeartIcon } from 'lucide-react'

function FavoriteProductsDrawer() {
  const { favoriteProducts, hasFavoriteProducts, totalPrice } = useFavoriteProducts()

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className='fixed right-4 bottom-[4.375rem] size-20 rounded-full p-5'>
          <HeartIcon className='size-12' />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className='flex flex-col gap-y-[3.75rem] overflow-y-auto px-[0.9375rem] pb-[3.75rem]'>
          <DrawerHandle />
          <DrawerHeader className='gap-y-[1.875rem]'>
            <DrawerTitle>Mis favoritos</DrawerTitle>
            <div className='grid gap-y-2.5'>
              <DrawerDescription>
                ¿Te gustó algún plato? ¡Guardalo en tu lista de favoritos para no olvidarlo!
              </DrawerDescription>
              <DrawerDescription>
                Agregá los platos que más te interesan y mostraselos fácilmente al personal del restaurante al momento
                de hacer tu pedido.
              </DrawerDescription>
            </div>
            {hasFavoriteProducts() && (
              <div className='grid gap-y-[1.875rem]'>
                <p className='flex items-center justify-between gap-x-5 text-heading-mobile-4 text-text'>
                  Productos{' '}
                  <span>
                    Total:{' '}
                    {formatPrice({
                      currency: Currency.ARS,
                      price: totalPrice(),
                      locale: Locale.ES_AR
                    })}
                  </span>
                </p>
                <FavoriteProductsList products={favoriteProducts} />
              </div>
            )}
          </DrawerHeader>
          {!hasFavoriteProducts() && (
            <DrawerFooter>
              <DrawerDescription className='mx-auto max-w-sm text-center'>
                Aún no guardaste platos.
                <br /> Agregá a tus favoritos para tenerlos a mano cuando hagas tu pedido.
              </DrawerDescription>
              <DrawerClose className={buttonVariants({ variant: 'secondary', className: 'mx-auto' })}>
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
