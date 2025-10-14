'use client'
import { mutateMenu } from '@/modules/menus/hooks/use-menu'
import { useNavigationParams } from '@/modules/shared/hooks/use-navigation-params'
import { useToggle } from '@/modules/shared/hooks/use-toggle'
import { UpdateSubcategoryDrawer } from '@/modules/subcategories/components/drawer/update-subcategory-drawer'
import { deleteSubcategoryById } from '@/modules/subcategories/services/subcategories.service'
import type { Subcategory } from '@ristokit/shared/models/subcategory.model'
import { AlertError } from '@ristokit/ui/components/alert'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@ristokit/ui/components/dropdown-menu'
import { toast } from '@ristokit/ui/components/sonner'
import { DotsIcon } from '@ristokit/ui/icons/dots.icon'
import { EditIcon } from '@ristokit/ui/icons/edit.icon'
import { RemoveIcon } from '@ristokit/ui/icons/remove.icon'

interface SubcategoryActionsDropdownProps {
  subcategory: Subcategory
}

function SubcategoryActionsDropdown({ subcategory }: SubcategoryActionsDropdownProps) {
  const { businessId, branchId, menuId } = useNavigationParams()

  const { isOn: isOpenDropdown, update: setIsOpenDropdown } = useToggle()
  const { isOn: isClickingAction, update: setIsClickingAction } = useToggle()

  const handleDeleteSubcategory = async () => {
    try {
      setIsClickingAction(true)

      const { error } = await deleteSubcategoryById({
        businessId,
        branchId,
        subcategoryId: subcategory.id
      })
      if (error) {
        return toast.custom(() => (
          <AlertError
            title='¡Error al eliminar la subcategoría!'
            description={`Ocurrió un error al intentar eliminar la subcategoría ${subcategory.name}.`}
            details={[error.message]}
          />
        ))
      }

      await mutateMenu({ businessId, branchId, menuId })

      setIsOpenDropdown(false)
    } catch (error) {
      toast.custom(() => (
        <AlertError
          title='¡Error al eliminar la subcategoría!'
          description={`Ocurrió un error al intentar eliminar la subcategoría ${subcategory.name}.`}
          details={error instanceof Error ? [error.message] : undefined}
        />
      ))
    } finally {
      setIsClickingAction(false)
    }
  }

  return (
    <DropdownMenu open={isOpenDropdown} onOpenChange={setIsOpenDropdown}>
      <DropdownMenuTrigger>
        <DotsIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='bg-background' align='end'>
        <UpdateSubcategoryDrawer subcategory={subcategory}>
          <DropdownMenuItem onSelect={(ev) => ev.preventDefault()} disabled={isClickingAction}>
            <EditIcon className='size-4 stroke-text' /> Editar
          </DropdownMenuItem>
        </UpdateSubcategoryDrawer>
        <DropdownMenuItem
          onClick={handleDeleteSubcategory}
          onSelect={(ev) => ev.preventDefault()}
          className='rounded-none text-error'
          disabled={isClickingAction}
        >
          <RemoveIcon className='size-4 stroke-error' /> Eliminar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { SubcategoryActionsDropdown }
