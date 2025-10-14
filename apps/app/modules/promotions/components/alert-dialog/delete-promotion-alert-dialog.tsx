'use client'
import { mutatePromotions } from '@/modules/promotions/hooks/use-promotions'
import { mutatePromotionsSummary } from '@/modules/promotions/hooks/use-promotions-summary'
import { promotionService } from '@/modules/promotions/services/promotion.service'
import { useNavigationParams } from '@/modules/shared/hooks/use-navigation-params'
import { useToggle } from '@/modules/shared/hooks/use-toggle'
import type { Promotion } from '@ristokit/shared/models/promotion.model'
import { AlertError, AlertSuccess } from '@ristokit/ui/components/alert'
import { AlertDialog } from '@ristokit/ui/components/alert-dialog'
import { Button } from '@ristokit/ui/components/button'
import { toast } from '@ristokit/ui/components/sonner'
import { LoaderIcon } from 'lucide-react'

interface DeletePromotionAlertDialogProps {
  promotion: Promotion
  children: React.ReactNode
}

function DeletePromotionAlertDialog({ promotion, children }: DeletePromotionAlertDialogProps) {
  const { businessId, branchId, menuId } = useNavigationParams()

  const { isOn: isOpenDrawer, update: setIsOpenDrawer, off: closeDrawer } = useToggle()
  const { isOn: isDeleting, update: setIsDeleting } = useToggle()

  const handleDeletePromotion = async () => {
    try {
      setIsDeleting(true)

      await promotionService.deletePromotionById({
        businessId,
        branchId,
        promotionId: promotion.id
      })

      await Promise.all([
        mutatePromotions({ businessId, branchId, menuId }),
        mutatePromotionsSummary({ businessId, branchId, menuId })
      ])

      toast.custom(() => (
        <AlertSuccess
          title='¡Promoción eliminada!'
          description={`La promoción ${promotion.title} ha sido eliminada correctamente.`}
        />
      ))

      closeDrawer()
    } catch (error) {
      toast.custom(() => (
        <AlertError
          title='¡Error al eliminar la promoción!'
          description={`Ocurrió un error al intentar eliminar la promoción ${promotion.title}.`}
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
        <AlertDialog.Title>¿Seguro que desea eliminar la promoción {promotion.title}?</AlertDialog.Title>
        <AlertDialog.Description className='sr-only'>Esta acción no se puede deshacer.</AlertDialog.Description>
        <AlertDialog.Footer>
          <Button onClick={handleDeletePromotion} disabled={isDeleting}>
            {isDeleting ? <LoaderIcon className='size-4 animate-spin' /> : 'Eliminar'}
          </Button>
          <AlertDialog.Cancel>Cancelar</AlertDialog.Cancel>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}

export { DeletePromotionAlertDialog }
