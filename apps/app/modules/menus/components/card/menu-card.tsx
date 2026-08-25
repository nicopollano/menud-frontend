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
import { CategoryIcon } from '@ristokit/ui/icons/category.icon'
import { cn } from '@ristokit/ui/lib/utils'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface MenuCardProps {
  menu: Menu
  index?: number
}

function MenuCard({ menu, index = 0 }: MenuCardProps) {
  const { businessId, branchId } = useNavigationParams()
  const router = useRouter()
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const navigateTo = (to: string) => router.push(to)

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      navigateTo(ROUTES.BRANCH_MENU(businessId, branchId, menu.id))
    }
  }

  const categoriesCount = menu.summary?.totalCategories || 0
  const productsCount = menu.summary?.totalProducts || 0
  const categoriesText = pluralize({ count: categoriesCount, singular: 'categoría', plural: 'categorías' })
  const productsText = pluralize({ count: productsCount, singular: 'producto', plural: 'productos' })

  return (
    <article
      onClick={() => navigateTo(ROUTES.BRANCH_MENU(businessId, branchId, menu.id))}
      onKeyDown={handleKeyPress}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role='button'
      tabIndex={0}
      aria-label={`${menu.name}, ${categoriesCount} ${categoriesText}, ${productsCount} ${productsText}, ${menu.enabled ? 'Activo' : 'Inactivo'}`}
      className={cn(
        'group relative cursor-pointer overflow-hidden',
        'bg-white rounded-[32px]',
        'p-6 md:p-8',
        'shadow-xl shadow-neutral-200/50',
        'transition-all duration-300 ease-out',
        'hover:shadow-2xl hover:shadow-primary-500/10 hover:-translate-y-1',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
        'animate-fade-in'
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className='relative flex flex-col md:flex-row items-start gap-6 md:gap-8'>
        {/* Logo Container - Forced Rounded */}
        <div className='relative shrink-0'>
          <div
            className={cn(
              'relative size-24 md:size-28 lg:size-32',
              'rounded-[32px] overflow-hidden',
              'bg-neutral-100',
              'transition-all duration-300',
              'group-hover:shadow-lg group-hover:shadow-primary-500/10',
              isHovered && 'scale-105',
              !menu.logo && 'flex items-center justify-center'
            )}
          >
            {menu.logo ? (
              <>
                <Image
                  src={menu.logo}
                  alt={`Logo de ${menu.name}`}
                  fill
                  className={cn(
                    'object-cover object-center',
                    'transition-all duration-500',
                    !imageLoaded && 'opacity-0 scale-110'
                  )}
                  onLoad={() => setImageLoaded(true)}
                  sizes='(max-width: 768px) 96px, (max-width: 1024px) 112px, 128px'
                  priority={index < 2}
                />
                {!imageLoaded && <div className='absolute inset-0 skeleton-pulse' />}
              </>
            ) : (
              <CategoryIcon className='size-12 md:size-14 lg:size-16 text-neutral-400' />
            )}
          </div>

          {/* Status indicator dot */}
          <div className='absolute -bottom-2 -right-2'>
            <div className={cn('relative size-8 rounded-full bg-white flex items-center justify-center', 'shadow-md')}>
              <div
                className={cn(
                  'size-4 rounded-full transition-colors duration-300',
                  menu.enabled ? 'bg-success-500 shadow-[0_0_10px_rgba(16,185,129,0.4)]' : 'bg-neutral-300'
                )}
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className='flex-1 min-w-0 space-y-4 md:space-y-5'>
          {/* Header with title and actions */}
          <div className='flex items-start justify-between gap-4'>
            <div className='flex-1 min-w-0 space-y-2'>
              <h3
                className={cn(
                  'text-2xl md:text-3xl font-bold',
                  'text-neutral-900 line-clamp-1',
                  'transition-colors duration-200',
                  'group-hover:text-primary-600'
                )}
              >
                {menu.name}
              </h3>

              {/* Categories and Products badges */}
              <div className='flex items-center gap-2 flex-wrap'>
                {/* Categories badge */}
                <div
                  className={cn(
                    'inline-flex items-center gap-2.5',
                    'px-4 py-2 rounded-full',
                    'bg-neutral-50',
                    'transition-all duration-200',
                    'group-hover:bg-warning-50'
                  )}
                >
                  <div
                    className={cn(
                      'flex items-center justify-center',
                      'size-6 rounded-full',
                      'bg-white shadow-sm text-warning-600',
                      'text-xs font-bold',
                      'transition-all duration-200',
                      'group-hover:scale-110'
                    )}
                  >
                    {categoriesCount}
                  </div>
                  <span className='text-sm font-semibold text-neutral-600 group-hover:text-warning-700 transition-colors'>
                    {categoriesText}
                  </span>
                </div>

                {/* Products badge */}
                <div
                  className={cn(
                    'inline-flex items-center gap-2.5',
                    'px-4 py-2 rounded-full',
                    'bg-neutral-50',
                    'transition-all duration-200',
                    'group-hover:bg-primary-50'
                  )}
                >
                  <div
                    className={cn(
                      'flex items-center justify-center',
                      'size-6 rounded-full',
                      'bg-white shadow-sm text-primary-600',
                      'text-xs font-bold',
                      'transition-all duration-200',
                      'group-hover:scale-110'
                    )}
                  >
                    {productsCount}
                  </div>
                  <span className='text-sm font-semibold text-neutral-600 group-hover:text-primary-700 transition-colors'>
                    {productsText}
                  </span>
                </div>
              </div>
            </div>

            {/* Action buttons - Round Buttons */}
            <div
              className='flex items-center gap-2'
              onClick={(ev) => ev.stopPropagation()}
              role='group'
              aria-label='Acciones del menú'
            >
              <MoveMenuDrawer menu={menu}>
                <button
                  type='button'
                  className={cn(
                    'p-3 rounded-full',
                    'bg-neutral-100 text-neutral-600', // Borderless, higher contrast bg
                    'transition-all duration-200',
                    'hover:bg-info-100 hover:text-info-700 hover:shadow-lg hover:shadow-info-500/10 hover:-translate-y-0.5',
                    'active:scale-95',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-info-500 focus-visible:ring-offset-1'
                  )}
                  aria-label={`Mover ${menu.name}`}
                >
                  <MoveIcon className='size-5' stroke='currentColor' />
                </button>
              </MoveMenuDrawer>
              <CopyMenuButton menu={menu} className='!bg-neutral-100 !border-none hover:!bg-warning-100' />
              <UpdateMenuDrawer menu={menu}>
                <button
                  type='button'
                  className={cn(
                    'p-3 rounded-full',
                    'bg-neutral-100 text-neutral-600', // Borderless, high contrast
                    'transition-all duration-200',
                    'hover:bg-primary-100 hover:text-primary-700 hover:shadow-lg hover:shadow-primary-500/10 hover:-translate-y-0.5',
                    'active:scale-95',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-1'
                  )}
                  aria-label={`Editar ${menu.name}`}
                >
                  <EditIcon className='size-5' stroke='currentColor' />
                </button>
              </UpdateMenuDrawer>
              <DeleteMenuAlertDialog menu={menu}>
                <button
                  type='button'
                  className={cn(
                    'p-3 rounded-full',
                    'bg-neutral-100 text-neutral-600', // Borderless, high contrast
                    'transition-all duration-200',
                    'hover:bg-error-100 hover:text-error-700 hover:shadow-lg hover:shadow-error-500/10 hover:-translate-y-0.5',
                    'active:scale-95',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-error-500 focus-visible:ring-offset-1'
                  )}
                  aria-label={`Eliminar ${menu.name}`}
                >
                  <RemoveIcon className='size-5' stroke='currentColor' />
                </button>
              </DeleteMenuAlertDialog>
            </div>
          </div>

          {/* Description */}
          {menu.description && (
            <p className='text-base text-neutral-500 leading-relaxed line-clamp-2 font-medium'>{menu.description}</p>
          )}

          {/* Footer with badge */}
          <div className='flex items-center gap-3 pt-2'>
            <Badge
              variant={menu.enabled ? 'default' : 'disabled'}
              className='text-sm font-semibold px-4 py-1.5 rounded-full shadow-sm border-none'
            >
              {menu.enabled ? 'Activo' : 'Inactivo'}
            </Badge>
          </div>
        </div>
      </div>
    </article>
  )
}

export { MenuCard }
