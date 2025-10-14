'use client'
import { mutateMenus } from '@/modules/menus/hooks/use-menus'
import { mutateMenusSummary } from '@/modules/menus/hooks/use-menus-summary'
import { menuService } from '@/modules/menus/services/menus.service'
import { useNavigationParams } from '@/modules/shared/hooks/use-navigation-params'
import type { Menu } from '@ristokit/shared/models/menu.model'
import { AlertError, AlertSuccess } from '@ristokit/ui/components/alert'
import { toast } from '@ristokit/ui/components/sonner'
import { CopyIcon } from '@ristokit/ui/icons/copy.icon'
import { useState } from 'react'

interface CopyMenuButtonProps {
  menu: Menu
}

function CopyMenuButton({ menu }: CopyMenuButtonProps) {
  const { businessId, branchId } = useNavigationParams()
  const [isCopying, setIsCopying] = useState(false)

  const handleCopyMenu = async () => {
    try {
      setIsCopying(true)

      await menuService.copyMenuById({
        businessId,
        branchId,
        menuId: menu.id,
        data: { businessId, branchId }
      })

      await Promise.all([mutateMenusSummary({ businessId, branchId }), mutateMenus({ businessId, branchId })])

      toast.custom(() => (
        <AlertSuccess title='¡Menú copiado!' description={`El menú ${menu.name} ha sido copiado correctamente.`} />
      ))
    } catch (error) {
      toast.custom(() => (
        <AlertError
          title='¡Error al copiar el menú!'
          description={`Ocurrió un error al intentar copiar el menú ${menu.name}.`}
          details={error instanceof Error ? [error.message] : undefined}
        />
      ))
    } finally {
      setIsCopying(false)
    }
  }

  return (
    <button
      onClick={handleCopyMenu}
      disabled={isCopying}
      className='disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50'
      type='button'
    >
      <CopyIcon className='size-6 stroke-text' />
    </button>
  )
}

export { CopyMenuButton }
