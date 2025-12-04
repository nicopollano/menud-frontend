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

  const productStyle =
    variant === 'category'
      ? {
          backgroundColor: '#ffffff',
          boxShadow: '0 8px 12px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.06)',
          padding: '0.875rem',
          borderRadius: '20px',
          border: '1px solid rgba(0, 0, 0, 0.04)'
        }
      : {
          background: '#ffffff',
          boxShadow: '0 6px 10px -3px rgba(0, 0, 0, 0.08), 0 3px 5px -2px rgba(0, 0, 0, 0.05)',
          padding: '0.75rem',
          borderRadius: '18px',
          border: '1px solid rgba(250, 82, 82, 0.08)'
        }

  return (
    <article
      className={cn(
        'group relative grid grid-cols-[auto_1fr_auto_auto] items-center gap-x-4',
        'transition-all duration-300 ease-out',
        'hover:-translate-y-0.5',
        {
          'opacity-60 grayscale-[0.5]': !product.enabled
        }
      )}
      style={productStyle}
    >
      {/* Product Image */}
      <div
        className={cn(
          'relative shrink-0 overflow-hidden rounded-2xl bg-neutral-50 transition-all duration-300 group-hover:shadow-md',
          {
            'size-14 md:size-16': variant === 'category',
            'size-13 md:size-15': variant === 'subcategory'
          }
        )}
      >
        <Image
          className='object-cover transition-transform duration-500 group-hover:scale-110'
          src={product.images[0] ?? '/assets/placeholder.jpeg'}
          alt={product.name}
          fill
          sizes='(max-width: 768px) 56px, 64px'
        />
      </div>

      {/* Product Info */}
      <header className='grid gap-y-1 overflow-hidden min-w-0'>
        <h4 className='truncate font-bold text-base text-neutral-900 group-hover:text-primary-600 transition-colors duration-300'>
          {product.name}
        </h4>
        <div className='flex items-center gap-2'>
          <p className='truncate font-bold text-sm md:text-base text-neutral-700'>
            {formatPrice({
              currency: Currency.ARS,
              currencyDisplay: 'symbol',
              locale: Locale.ES_AR,
              price: product.price
            })}
          </p>
          {product.discountedPrice && (
            <span className='text-xs text-neutral-400 line-through decoration-neutral-400'>
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
      <div className='flex flex-col items-end gap-1.5'>
        <div className='flex items-center gap-2'>
          <Badge
            variant={product.enabled ? 'success' : 'secondary'}
            className={cn(
              'rounded-full px-3 py-1 text-[10px] uppercase tracking-wider font-bold shadow-sm border-none',
              product.enabled ? 'bg-success-100 text-success-700' : 'bg-neutral-100 text-neutral-500'
            )}
          >
            {product.enabled ? 'Visible' : 'Oculto'}
          </Badge>
          <Switch
            size='small'
            checked={product.enabled}
            onCheckedChange={handleSwitchVisibilityProduct}
            disabled={isClickingAction}
          />
        </div>
      </div>

      {/* Actions Dropdown */}
      <DropdownMenu open={isOpenDropdown} onOpenChange={setIsOpenDropdown}>
        <DropdownMenuTrigger
          className='p-2 rounded-full text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500'
          aria-label='Acciones del producto'
        >
          <DotsIcon className='size-5' />
        </DropdownMenuTrigger>
        <DropdownMenuContent className='bg-white rounded-xl shadow-xl border-neutral-100 p-1 min-w-[160px]' align='end'>
          <UpdateProductDrawer product={product}>
            <DropdownMenuItem
              onSelect={(ev) => ev.preventDefault()}
              disabled={isClickingAction}
              className='gap-2.5 cursor-pointer rounded-lg px-3 py-2 text-neutral-600 focus:text-neutral-900 focus:bg-neutral-50'
            >
              <EditIcon className='size-4' />
              <span className='font-medium'>Editar</span>
            </DropdownMenuItem>
          </UpdateProductDrawer>
          <DropdownMenuItem
            onClick={handleDeleteProduct}
            onSelect={(ev) => ev.preventDefault()}
            className='gap-2.5 cursor-pointer rounded-lg px-3 py-2 text-red-500 focus:text-red-600 focus:bg-red-50'
            disabled={isClickingAction}
          >
            <RemoveIcon className='size-4' />
            <span className='font-medium'>Eliminar</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </article>
  )
}

export { ProductCard }
