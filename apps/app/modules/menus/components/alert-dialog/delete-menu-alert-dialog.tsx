'use client'
import { mutateMenus } from '@/modules/menus/hooks/use-menus'
import { mutateMenusSummary } from '@/modules/menus/hooks/use-menus-summary'
import { deleteMenuById } from '@/modules/menus/services/menus.service'
import { useNavigationParams } from '@/modules/shared/hooks/use-navigation-params'
import { useToggle } from '@/modules/shared/hooks/use-toggle'
import type { Menu } from '@ristokit/shared/models/menu.model'
import { AlertError, AlertSuccess } from '@ristokit/ui/components/alert'
import { AlertDialog } from '@ristokit/ui/components/alert-dialog'
import { Button } from '@ristokit/ui/components/button'
import { toast } from '@ristokit/ui/components/sonner'
import { LoaderIcon } from 'lucide-react'

interface DeleteMenuAlertDialogProps {
  menu: Menu
  children: React.ReactNode
}

function DeleteMenuAlertDialog({ menu, children }: DeleteMenuAlertDialogProps) {
  const { businessId, branchId } = useNavigationParams()

  const { isOn: isOpenDrawer, update: setIsOpenDrawer, off: closeDrawer } = useToggle()
  const { isOn: isDeleting, update: setIsDeleting } = useToggle()

  const handleDeleteMenu = async () => {
    try {
      setIsDeleting(true)

      const { error } = await deleteMenuById({
        businessId,
        branchId,
        menuId: menu.id
      })
      if (error) {
        return toast.custom(() => (
          <AlertError
            title='¡Error al eliminar el menú!'
            description={`No se pudo eliminar el menú ${menu.name}.`}
            details={[error.message]}
          />
        ))
      }

      await Promise.all([mutateMenus({ businessId, branchId }), mutateMenusSummary({ businessId, branchId })])

      toast.custom(() => (
        <AlertSuccess title='¡Menú eliminado!' description={`El menú ${menu.name} ha sido eliminado correctamente.`} />
      ))

      closeDrawer()
    } catch (error) {
      toast.custom(() => (
        <AlertError
          title='¡Error al eliminar el menú!'
          description={`Ocurrió un error al intentar eliminar el menú ${menu.name}.`}
          details={error instanceof Error ? [error.message] : undefined}
        />
      ))
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <AlertDialog.Root open={isOpenDrawer} onOpenChange={setIsOpenDrawer}>
      <AlertDialog.Trigger asChild>{children}</AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>¿Seguro que desea eliminar el menú {menu.name}?</AlertDialog.Title>
        <AlertDialog.Description className='sr-only'>Esta acción no se puede deshacer.</AlertDialog.Description>
        <AlertDialog.Footer>
          <Button onClick={handleDeleteMenu} disabled={isDeleting}>
            {isDeleting ? <LoaderIcon className='size-4 animate-spin' /> : 'Eliminar'}
          </Button>
          <AlertDialog.Cancel>Cancelar</AlertDialog.Cancel>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}

export { DeleteMenuAlertDialog }
