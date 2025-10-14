'use client'
import { useBranch } from '@/modules/branches/hooks/use-branch'
import { ShareMenuDrawer } from '@/modules/menus/components/drawer/share-menu-drawer'
import { MenuActionsCardSkeleton } from '@/modules/menus/components/skeleton/menu-actions-card-skeleton'
import { buildMenuPublicUrl } from '@/modules/menus/helpers/menu.helper'
import { mutateMenu, useMenu } from '@/modules/menus/hooks/use-menu'
import { updateVisibilityMenuById } from '@/modules/menus/services/menus.service'
import { useNavigationParams } from '@/modules/shared/hooks/use-navigation-params'
import { AlertError, AlertSuccess } from '@ristokit/ui/components/alert'
import { Button, buttonVariants } from '@ristokit/ui/components/button'
import { toast } from '@ristokit/ui/components/sonner'
import { EyeIcon } from '@ristokit/ui/icons/eye.icon'
import { PrintIcon } from '@ristokit/ui/icons/print.icon'
import { cn } from '@ristokit/ui/lib/utils'
import Link from 'next/link'
import { useState } from 'react'

function MenuActionsCard() {
  const { businessId, branchId, menuId } = useNavigationParams()

  const { data: branch, isLoading: isLoadingBranch } = useBranch({
    businessId,
    branchId
  })
  const { data: menu, isLoading: isLoadingMenu } = useMenu({
    businessId,
    branchId,
    menuId
  })

  const [isClickingAction, setIsClickingAction] = useState(false)

  if (isLoadingBranch || isLoadingMenu) return <MenuActionsCardSkeleton />
  if (!branch || !menu) return null

  const handleVisibilityChange = async () => {
    try {
      setIsClickingAction(true)

      const { error } = await updateVisibilityMenuById({
        businessId,
        branchId,
        menuId,
        enabled: !menu.enabled
      })
      if (error) {
        return toast.custom(() => (
          <AlertError
            title={`¡Error al ${menu.enabled ? 'desactivar' : 'publicar'} el menú!`}
            description={`No se pudo ${menu.enabled ? 'desactivar' : 'publicar'} el menú ${menu.name}.`}
            details={[error.message]}
          />
        ))
      }

      await mutateMenu({ businessId, branchId, menuId })

      toast.custom(() => (
        <AlertSuccess
          title={`¡Menú ${menu.enabled ? 'desactivado' : 'publicado'}!`}
          description={`El menú ${menu.name} ha sido ${menu.enabled ? 'desactivado' : 'publicado'} correctamente.`}
        />
      ))
    } catch (error) {
      toast.custom(() => (
        <AlertError
          title={`¡Error al ${menu.enabled ? 'desactivar' : 'publicar'} el menú!`}
          description={`Ocurrió un error al intentar ${menu.enabled ? 'desactivar' : 'publicar'} el menú ${menu.name}.`}
          details={error instanceof Error ? [error.message] : undefined}
        />
      ))
    } finally {
      setIsClickingAction(false)
    }
  }

  return (
    <article className='grid grid-cols-3 gap-x-[1.875rem] gap-y-2.5 rounded-[0.5rem] border border-gray bg-background p-5'>
      <Button className='rounded-[0.5rem] border-gray' variant='outline'>
        <EyeIcon className='stroke-text' />
      </Button>
      <ShareMenuDrawer />
      <Button className='rounded-[0.5rem] border-gray' variant='outline'>
        <PrintIcon className='stroke-text' />
      </Button>
      <Link
        href={buildMenuPublicUrl(branch.id)}
        target='_blank'
        rel='noopener noreferrer'
        className={cn(
          buttonVariants({ variant: 'outline' }),
          'col-span-full rounded-[0.5rem] border-gray text-button-mobile-medium'
        )}
      >
        Ver mi menú
      </Link>
      <Button
        onClick={handleVisibilityChange}
        className='col-span-full rounded-[0.5rem] border-gray text-button-mobile-medium disabled:bg-background disabled:text-text'
        variant='outline'
        disabled={isClickingAction}
      >
        {menu.enabled ? 'Desactivar menú' : 'Publicar menú'}
      </Button>
    </article>
  )
}

export { MenuActionsCard }
