'use client'
import { mutateBranches } from '@/modules/branches/hooks/use-branches'
import { mutateBranchesSummary } from '@/modules/branches/hooks/use-branches-summary'
import { deleteBranchById } from '@/modules/branches/services/branches.service'
import { useNavigationParams } from '@/modules/shared/hooks/use-navigation-params'
import { useToggle } from '@/modules/shared/hooks/use-toggle'
import type { Branch } from '@ristokit/shared/models/branch.model'
import { AlertError, AlertSuccess } from '@ristokit/ui/components/alert'
import { AlertDialog } from '@ristokit/ui/components/alert-dialog'
import { Button } from '@ristokit/ui/components/button'
import { toast } from '@ristokit/ui/components/sonner'
import { LoaderIcon } from 'lucide-react'

interface DeleteBranchAlertDialogProps {
  branch: Branch
  children: React.ReactNode
}

function DeleteBranchAlertDialog({ branch, children }: DeleteBranchAlertDialogProps) {
  const { businessId } = useNavigationParams()

  const { isOn: isOpenDrawer, update: setIsOpenDrawer, off: closeDrawer } = useToggle()
  const { isOn: isDeleting, update: setIsDeleting } = useToggle()

  const handleDeleteBranch = async () => {
    try {
      setIsDeleting(true)

      const { error } = await deleteBranchById({
        businessId,
        branchId: branch.id
      })
      if (error) {
        return toast.custom(() => (
          <AlertError
            title='¡Error al eliminar la sucursal!'
            description={`No se pudo eliminar la sucursal ${branch.name}.`}
            details={[error.message]}
          />
        ))
      }

      await Promise.all([mutateBranches({ businessId }), mutateBranchesSummary({ businessId })])

      toast.custom(() => (
        <AlertSuccess
          title='¡Sucursal eliminada!'
          description={`La sucursal ${branch.name} ha sido eliminada correctamente.`}
        />
      ))

      closeDrawer()
    } catch (error) {
      toast.custom(() => (
        <AlertError
          title='¡Error al eliminar la sucursal!'
          description={`Ocurrió un error al intentar eliminar la sucursal ${branch.name}.`}
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
        <AlertDialog.Title>¿Seguro que desea eliminar la sucursal {branch.name}?</AlertDialog.Title>
        <AlertDialog.Description className='sr-only'>Esta acción no se puede deshacer.</AlertDialog.Description>
        <AlertDialog.Footer>
          <Button onClick={handleDeleteBranch} disabled={isDeleting}>
            {isDeleting ? <LoaderIcon className='size-4 animate-spin' /> : 'Eliminar'}
          </Button>
          <AlertDialog.Cancel>Cancelar</AlertDialog.Cancel>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}

export { DeleteBranchAlertDialog }
