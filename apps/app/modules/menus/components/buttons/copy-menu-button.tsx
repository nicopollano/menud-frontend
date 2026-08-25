'use client'
import { mutateMenus } from '@/modules/menus/hooks/use-menus'
import { mutateMenusSummary } from '@/modules/menus/hooks/use-menus-summary'
import { menuService } from '@/modules/menus/services/menus.service'
import { useNavigationParams } from '@/modules/shared/hooks/use-navigation-params'
import type { Menu } from '@ristokit/shared/models/menu.model'
import { AlertError, AlertSuccess } from '@ristokit/ui/components/alert'
import { toast } from '@ristokit/ui/components/sonner'
import { CopyIcon } from '@ristokit/ui/icons/copy.icon'
import { cn } from '@ristokit/ui/lib/utils'
import { useState } from 'react'

export function CopyMenuButton({ menu, className }: { menu: Menu; className?: string }) {
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
      type='button'
      className={cn(
        'p-3 rounded-full',
        'bg-white border border-neutral-200 shadow-sm',
        'text-neutral-600',
        'transition-all duration-200',
        'hover:bg-warning-50 hover:text-warning-600 hover:border-warning-200 hover:shadow-lg hover:shadow-warning-500/10 hover:-translate-y-0.5',
        'active:scale-95',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warning-500 focus-visible:ring-offset-1',
        'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      aria-label={`Copiar menú ${menu.name}`}
    >
      <CopyIcon className='size-5' stroke='currentColor' />
    </button>
  )
}

