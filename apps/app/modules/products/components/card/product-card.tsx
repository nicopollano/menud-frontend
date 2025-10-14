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
  variant: 'category' | 'subcategory'
}

function ProductCard({ product, variant }: ProductCardProps) {
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
        'grid grid-cols-[auto_1fr_auto_auto] items-center gap-x-2.5 rounded-sm border border-text p-4 opacity-70 transition duration-300 ease-in-out',
        {
          'border-primary opacity-100': variant === 'category' && product.enabled,
          'border-text opacity-100': variant === 'subcategory' && product.enabled
        }
      )}
    >
      <div
        className={cn('relative h-[3.625rem] w-[3.5625rem] rounded-xs', {
          'bg-secondary': variant === 'category',
          'bg-gray': variant === 'subcategory'
        })}
      >
        <Image
          className='rounded-xs object-cover'
          src={product.images[0] ?? '/assets/placeholder.jpeg'}
          alt={product.name}
          fill
          sizes='30vw'
        />
      </div>
      <header className='grid gap-y-2.5'>
        <h4 className='truncate text-heading-mobile-4 text-text'>{product.name}</h4>
        <p className='truncate text-heading-mobile-4 text-text'>
          {formatPrice({
            currency: Currency.ARS,
            currencyDisplay: 'symbol',
            locale: Locale.ES_AR,
            price: product.price
          })}
        </p>
      </header>
      <div
        className={cn('flex items-center gap-x-2.5 text-body-mobile-4 text-text', {
          'text-button-mobile-small': product.enabled
        })}
      >
        <Switch
          size='small'
          checked={product.enabled}
          onCheckedChange={handleSwitchVisibilityProduct}
          disabled={isClickingAction}
        />
        {product.enabled ? 'Visible' : 'Oculto'}
      </div>
      <DropdownMenu open={isOpenDropdown} onOpenChange={setIsOpenDropdown}>
        <DropdownMenuTrigger>
          <DotsIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent className='bg-background' align='end'>
          <UpdateProductDrawer product={product}>
            <DropdownMenuItem onSelect={(ev) => ev.preventDefault()} disabled={isClickingAction}>
              <EditIcon className='size-4 stroke-text' /> Editar
            </DropdownMenuItem>
          </UpdateProductDrawer>
          <DropdownMenuItem
            onClick={handleDeleteProduct}
            onSelect={(ev) => ev.preventDefault()}
            className='rounded-none text-error'
            disabled={isClickingAction}
          >
            <RemoveIcon className='size-4 stroke-error' /> Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </article>
  )
}

export { ProductCard }
