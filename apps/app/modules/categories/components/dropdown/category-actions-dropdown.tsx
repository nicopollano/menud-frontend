'use client'
import { UpdateCategoryDrawer } from '@/modules/categories/components/drawer/update-category-drawer'
import { deleteCategoryById } from '@/modules/categories/services/categories.service'
import { mutateMenu } from '@/modules/menus/hooks/use-menu'
import { useNavigationParams } from '@/modules/shared/hooks/use-navigation-params'
import { useToggle } from '@/modules/shared/hooks/use-toggle'
import type { Category } from '@ristokit/shared/models/category.model'
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

interface CategoryActionsDropdownProps {
  category: Category
}

function CategoryActionsDropdown({ category }: CategoryActionsDropdownProps) {
  const { businessId, branchId, menuId } = useNavigationParams()

  const { isOn: isOpenDropdown, update: setIsOpenDropdown } = useToggle()
  const { isOn: isClickingAction, update: setIsClickingAction } = useToggle()

  const handleDeleteCategory = async () => {
    try {
      setIsClickingAction(true)

      const { error } = await deleteCategoryById({
        businessId,
        branchId,
        categoryId: category.id
      })
      if (error) {
        return toast.custom(() => (
          <AlertError
            title='¡Error al eliminar la categoría!'
            description={`No se pudo eliminar la categoría ${category.name}.`}
            details={[error.message]}
          />
        ))
      }

      await mutateMenu({ businessId, branchId, menuId })

      setIsOpenDropdown(false)
    } catch (error) {
      toast.custom(() => (
        <AlertError
          title='¡Error al eliminar el restaurante!'
          description={`Ocurrió un error al intentar eliminar el restaurante ${category.name}.`}
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
        <UpdateCategoryDrawer category={category}>
          <DropdownMenuItem onSelect={(ev) => ev.preventDefault()} disabled={isClickingAction}>
            <EditIcon className='size-4 stroke-text' /> Editar
          </DropdownMenuItem>
        </UpdateCategoryDrawer>
        <DropdownMenuItem
          onClick={handleDeleteCategory}
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

export { CategoryActionsDropdown }
