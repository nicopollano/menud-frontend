'use client'
import { mutateBusinesses } from '@/modules/businesses/hooks/use-businesses'
import { mutateBusinessesSummary } from '@/modules/businesses/hooks/use-businesses-summary'
import { deleteBusinessById } from '@/modules/businesses/services/businesses.service'
import { useToggle } from '@/modules/shared/hooks/use-toggle'
import type { Business } from '@ristokit/shared/models/business.model'
import { AlertError, AlertSuccess } from '@ristokit/ui/components/alert'
import { AlertDialog } from '@ristokit/ui/components/alert-dialog'
import { Button } from '@ristokit/ui/components/button'
import { toast } from '@ristokit/ui/components/sonner'
import { LoaderIcon } from 'lucide-react'

interface DeleteBusinessAlertDialogProps {
  business: Business
  children: React.ReactNode
}

function DeleteBusinessAlertDialog({ business, children }: DeleteBusinessAlertDialogProps) {
  const { isOn: isOpenDrawer, update: setIsOpenDrawer, off: closeDrawer } = useToggle()
  const { isOn: isDeleting, update: setIsDeleting } = useToggle()

  const handleDeleteBusiness = async () => {
    try {
      setIsDeleting(true)

      const { error } = await deleteBusinessById({
        businessId: business.id
      })
      if (error) {
        return toast.custom(() => (
          <AlertError
            title='¡Error al eliminar el restaurante!'
            description={`No se pudo eliminar el restaurante ${business.name}.`}
            details={[error.message]}
          />
        ))
      }

      await Promise.all([mutateBusinesses(), mutateBusinessesSummary()])

      toast.custom(() => (
        <AlertSuccess
          title='¡Restaurante eliminado!'
          description={`El restaurante ${business.name} ha sido eliminado correctamente.`}
        />
      ))

      closeDrawer()
    } catch (error) {
      toast.custom(() => (
        <AlertError
          title='¡Error al eliminar el restaurante!'
          description={`Ocurrió un error al intentar eliminar el restaurante ${business.name}.`}
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
        <AlertDialog.Title>¿Seguro que desea eliminar el restaurante {business.name}?</AlertDialog.Title>
        <AlertDialog.Description className='sr-only'>Esta acción no se puede deshacer.</AlertDialog.Description>
        <AlertDialog.Footer>
          <Button onClick={handleDeleteBusiness} disabled={isDeleting}>
            {isDeleting ? <LoaderIcon className='size-4 animate-spin' /> : 'Eliminar'}
          </Button>
          <AlertDialog.Cancel>Cancelar</AlertDialog.Cancel>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}

export { DeleteBusinessAlertDialog }
