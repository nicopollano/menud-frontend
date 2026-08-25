'use client'
import { mutateMenu } from '@/modules/menus/hooks/use-menu'
import { UpdateProductDrawer } from '@/modules/products/components/drawer/update-product-drawer'
import { deleteProductById, updateProductById } from '@/modules/products/services/products.service'
import { useNavigationParams } from '@/modules/shared/hooks/use-navigation-params'
import { useToggle } from '@/modules/shared/hooks/use-toggle'
import { formatPrice } from '@ristokit/shared/helpers/product.helper'
import { Currency, Locale } from '@ristokit/shared/models/general.model'
import type { Product } from '@ristokit/shared/models/product.model'
import { AlertError, AlertSuccess } from '@ristokit/ui/components/alert'
import { Badge } from '@ristokit/ui/components/badge'
import { Button } from '@ristokit/ui/components/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@ristokit/ui/components/dropdown-menu'
import { toast } from '@ristokit/ui/components/sonner'
import { Switch } from '@ristokit/ui/components/switch'
import { DotsIcon } from '@ristokit/ui/icons/dots.icon'
import { EditIcon } from '@ristokit/ui/icons/edit.icon'
import { RemoveIcon } from '@ristokit/ui/icons/remove.icon'
import { cn } from '@ristokit/ui/lib/utils'
import Image from 'next/image'

interface ProductCardProps {
  product: Product
  variant?: 'category' | 'subcategory'
}

function ProductCard({ product, variant = 'category' }: ProductCardProps) {
  const { businessId, branchId, menuId } = useNavigationParams()

  const { isOn: isOpenDropdown, update: setIsOpenDropdown } = useToggle()
  const { isOn: isClickingAction, update: setIsClickingAction } = useToggle()

  const handleSwitchVisibilityProduct = async (visibility: boolean) => {
    try {
      setIsClickingAction(true)

      const { error } = await updateProductById({
        businessId,
        branchId,
        productId: product.id,
        enabled: visibility
      })
      if (error) {
        return toast.custom(() => (
          <AlertError
            title='¡Error al cambiar la visibilidad del producto!'
            description={`No se pudo cambiar la visibilidad del producto ${product.name}.`}
            details={[error.message]}
          />
        ))
      }

      await mutateMenu({ businessId, branchId, menuId })

      toast.custom(() => (
        <AlertSuccess
          title='¡Visibilidad cambiada!'
          description={`El producto ${product.name} ha sido actualizado correctamente.`}
        />
      ))

      setIsOpenDropdown(false)
    } catch (error) {
      toast.custom(() => (
        <AlertError
          title='¡Error al cambiar la visibilidad del producto!'
          description={`Ocurrió un error al intentar cambiar la visibilidad del producto ${product.name}.`}
          details={error instanceof Error ? [error.message] : undefined}
        />
      ))
    } finally {
      setIsClickingAction(false)
    }
  }

  const handleDeleteProduct = async () => {
    try {
      setIsClickingAction(true)

      const { error } = await deleteProductById({
        businessId,
        branchId,
        productId: product.id
      })
      if (error) {
        return toast.custom(() => (
          <AlertError
            title='¡Error al eliminar el producto!'
            description={`No se pudo eliminar el producto ${product.name}.`}
            details={[error.message]}
          />
        ))
      }

      await mutateMenu({ businessId, branchId, menuId })

      setIsOpenDropdown(false)
    } catch (error) {
      toast.custom(() => (
        <AlertError
          title='¡Error al eliminar el producto!'
          description={`Ocurrió un error al intentar eliminar el producto ${product.name}.`}
          details={error instanceof Error ? [error.message] : undefined}
        />
      ))
    } finally {
      setIsClickingAction(false)
    }
  }

  return (
    <article
      className={cn(
        'group relative grid grid-cols-[auto_1fr_auto_auto] items-center gap-x-4',
        'transition-all duration-300 ease-out',
        'px-4 py-3.5',
        'hover:shadow-md',
        {
          'opacity-60 grayscale-[0.5]': !product.enabled
        }
      )}
      style={{
        backgroundColor: '#ffffff',
        border: '1px solid rgba(0, 0, 0, 0.08)',
        boxShadow: '0 2px 8px -2px rgba(0, 0, 0, 0.06)',
        borderRadius: '20px'
      }}
    >
      {/* Product Image */}
      <div
        className='relative shrink-0 overflow-hidden bg-neutral-50 size-14 ring-1 ring-black/5'
        style={{ borderRadius: '16px' }}
      >
        <Image
          className='object-cover'
          src={product.images[0] ?? '/assets/placeholder.jpeg'}
          alt={product.name}
          fill
          sizes='56px'
        />
      </div>

      {/* Product Info */}
      <header className='grid gap-y-0.5 overflow-hidden min-w-0'>
        <h4 className='truncate font-semibold text-sm text-neutral-900'>
          {product.name}
        </h4>
        <div className='flex items-center gap-2'>
          <p className='truncate font-medium text-sm text-neutral-600'>
            {formatPrice({
              currency: Currency.ARS,
              currencyDisplay: 'symbol',
              locale: Locale.ES_AR,
              price: product.price
            })}
          </p>
          {product.discountedPrice && (
            <span className='text-xs text-neutral-400 line-through'>
              {formatPrice({
                currency: Currency.ARS,
                currencyDisplay: 'symbol',
                locale: Locale.ES_AR,
                price: product.discountedPrice
              })}
            </span>
          )}
        </div>
      </header>

      {/* Visibility Switch */}
      <div className='flex items-center gap-2'>
        <Switch
          size='small'
          checked={product.enabled}
          onCheckedChange={handleSwitchVisibilityProduct}
          disabled={isClickingAction}
        />
      </div>

      {/* Actions Dropdown */}
      <DropdownMenu open={isOpenDropdown} onOpenChange={setIsOpenDropdown}>
        <DropdownMenuTrigger
          className='p-2 rounded-full text-neutral-400 hover:text-neutral-900 hover:bg-neutral-50 transition-colors duration-200 focus-visible:outline-none'
          aria-label='Acciones del producto'
        >
          <DotsIcon className='size-4' />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className='bg-white shadow-lg border-neutral-200 p-2 min-w-[140px]'
          style={{ borderRadius: '18px' }}
          align='end'
        >
          <UpdateProductDrawer product={product}>
            <DropdownMenuItem
              onSelect={(ev) => ev.preventDefault()}
              disabled={isClickingAction}
              className='gap-2 cursor-pointer px-3 py-2 text-sm text-neutral-600 focus:text-neutral-900 focus:bg-neutral-50'
              style={{ borderRadius: '12px' }}
            >
              <EditIcon className='size-4' />
              <span>Editar</span>
            </DropdownMenuItem>
          </UpdateProductDrawer>
          <DropdownMenuItem
            onClick={handleDeleteProduct}
            onSelect={(ev) => ev.preventDefault()}
            className='gap-2 cursor-pointer px-3 py-2 text-sm text-red-500 focus:text-red-600 focus:bg-red-50'
            style={{ borderRadius: '12px' }}
            disabled={isClickingAction}
          >
            <RemoveIcon className='size-4' />
            <span>Eliminar</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </article>
  )
}

export { ProductCard }
