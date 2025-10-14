'use client'
import { DeleteMenuAlertDialog } from '@/modules/menus/components/alert-dialog/delete-menu-alert-dialog'
import { CopyMenuButton } from '@/modules/menus/components/buttons/copy-menu-button'
import { MoveMenuDrawer } from '@/modules/menus/components/drawer/move-menu-drawer'
import { UpdateMenuDrawer } from '@/modules/menus/components/drawer/update-menu-drawer'
import { pluralize } from '@/modules/shared/helpers/text.helper'
import { useNavigationParams } from '@/modules/shared/hooks/use-navigation-params'
import { ROUTES } from '@/modules/shared/lib/routes'
import type { Menu } from '@ristokit/shared/models/menu.model'
import { Badge } from '@ristokit/ui/components/badge'
import { EditIcon } from '@ristokit/ui/icons/edit.icon'
import { MoveIcon } from '@ristokit/ui/icons/move.icon'
import { RemoveIcon } from '@ristokit/ui/icons/remove.icon'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface MenuCardProps {
  menu: Menu
}

function MenuCard({ menu }: MenuCardProps) {
  const { businessId, branchId } = useNavigationParams()
  const router = useRouter()
  const navigateTo = (to: string) => router.push(to)

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
    <article
      onClick={() => navigateTo(ROUTES.BRANCH_MENU(businessId, branchId, menu.id))}
      className='grid cursor-pointer gap-y-5 rounded-sm bg-gray-light px-4 py-5'
    >
      <div className='flex items-center justify-between gap-x-2'>
        <div className='relative size-[3.875rem] rounded-sm bg-secondary'>
          <Image
            src={menu.logo || '#'}
            alt={menu.name}
            fill
            className='overflow-hidden rounded-sm object-cover object-center'
          />
        </div>
        {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
        <div onClick={(ev) => ev.stopPropagation()} className='flex items-center gap-x-5'>
          <MoveMenuDrawer menu={menu}>
            <button type='button'>
              <MoveIcon className='size-6 stroke-text' />
            </button>
          </MoveMenuDrawer>
          <CopyMenuButton menu={menu} />
          <UpdateMenuDrawer menu={menu}>
            <button type='button'>
              <EditIcon className='size-6 stroke-text' />
            </button>
          </UpdateMenuDrawer>
          <DeleteMenuAlertDialog menu={menu}>
            <button type='button'>
              <RemoveIcon className='size-6 stroke-text' />
            </button>
          </DeleteMenuAlertDialog>
        </div>
      </div>
      <Badge variant={menu.enabled ? 'default' : 'disabled'}>{menu.enabled ? 'Activo' : 'Inactivo'}</Badge>
      <footer className='grid gap-y-2.5'>
        <h3 className='flex flex-wrap items-center gap-x-2.5 gap-y-1 text-heading-mobile-3 text-text'>
          {menu.name}{' '}
          <span className='text-body-mobile-4 text-gray-dark'>
            ({menu.summary?.totalCategories}){' '}
            {pluralize({ count: menu.summary?.totalCategories || 0, singular: 'categoría', plural: 'categorías' })}
          </span>{' '}
          <span className='text-body-mobile-4 text-gray-dark'>
            ({menu.summary?.totalProducts}){' '}
            {pluralize({ count: menu.summary?.totalProducts || 0, singular: 'producto', plural: 'productos' })}
          </span>
        </h3>
        <p className='line-clamp-3 text-body-mobile-3 text-gray-dark'>{menu.description}</p>
      </footer>
    </article>
  )
}

export { MenuCard }
