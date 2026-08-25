'use client'
import { useMediaQuery } from '@/modules/shared/hooks/use-media-query'
import { useToggle } from '@/modules/shared/hooks/use-toggle'
import { ROUTES } from '@/modules/shared/lib/routes'
import { AlertError } from '@ristokit/ui/components/alert'
import { Button, buttonVariants } from '@ristokit/ui/components/button'
import {
  Drawer,
  DrawerContent,
  DrawerHandle,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@ristokit/ui/components/drawer'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@ristokit/ui/components/dropdown-menu'
import { toast } from '@ristokit/ui/components/sonner'
import { BranchIcon } from '@ristokit/ui/icons/branch-icon'
import { LineIcon } from '@ristokit/ui/icons/line.icon'
import { LinkitIcon } from '@ristokit/ui/icons/linkit-icon'
import { MenuIcon } from '@ristokit/ui/icons/menu.icon'
import { SignoutIcon } from '@ristokit/ui/icons/signout-icon'
import { SupportIcon } from '@ristokit/ui/icons/support.icon'
import { UserIcon } from '@ristokit/ui/icons/user-icon'
import { cn } from '@ristokit/ui/lib/utils'
import { signOut } from 'next-auth/react'
import Link from 'next/link'

interface BusinessNavigationMenuContentProps {
  isDropdown?: boolean
  onClose?: () => void
}

function BusinessNavigationMenuContent({ isDropdown = false, onClose }: BusinessNavigationMenuContentProps) {
  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      toast.custom(() => (
        <AlertError
          title='¡Error al cerrar sesión!'
          description='Ocurrió un error al intentar cerrar sesión.'
          details={error instanceof Error ? [error.message] : undefined}
        />
      ))
    }
  }

  const handleLinkClick = () => {
    if (onClose) onClose()
  }

  return (
    <div className={cn('flex flex-col gap-2', isDropdown ? 'p-1' : 'px-4 pb-[3.75rem]')}>
      {!isDropdown && (
        <div className='grid gap-y-2.5 mb-6'>
          <DrawerTitle>Menú</DrawerTitle>
          <LineIcon className='h-px' />
        </div>
      )}
      
      <Link
        href={ROUTES.BUSINESSES}
        onClick={handleLinkClick}
        className={cn(
          buttonVariants({ variant: 'ghost', size: isDropdown ? 'sm' : 'lg' }),
          'w-full justify-start gap-3',
          isDropdown ? 'px-2 rounded-lg' : 'px-4 rounded-xl',
          'text-base font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
        )}
      >
        <BranchIcon className='size-5' />
        Restaurantes
      </Link>
      <Link
        href={ROUTES.LINKIT}
        onClick={handleLinkClick}
        className={cn(
          buttonVariants({ variant: 'ghost', size: isDropdown ? 'sm' : 'lg' }),
          'w-full justify-start gap-3',
          isDropdown ? 'px-2 rounded-lg' : 'px-4 rounded-xl',
          'text-base font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
        )}
      >
        <LinkitIcon className='size-5' />
        Linkit
      </Link>
      <Link
        href='mailto:hello@ristokit.com'
        target='_blank'
        rel='noopener noreferrer'
        className={cn(
          buttonVariants({ variant: 'ghost', size: isDropdown ? 'sm' : 'lg' }),
          'w-full justify-start gap-3',
          isDropdown ? 'px-2 rounded-lg' : 'px-4 rounded-xl',
          'text-base font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
        )}
      >
        <SupportIcon className='size-5' />
        Soporte
      </Link>
      <Link
        href={ROUTES.PROFILE}
        onClick={handleLinkClick}
        className={cn(
          buttonVariants({ variant: 'ghost', size: isDropdown ? 'sm' : 'lg' }),
          'w-full justify-start gap-3',
          isDropdown ? 'px-2 rounded-lg' : 'px-4 rounded-xl',
          'text-base font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
        )}
      >
        <UserIcon className='size-5' />
        Perfil
      </Link>

      <div className={cn('mt-auto', isDropdown ? 'pt-2 border-t border-neutral-100' : 'pt-4')}>
        <Button
          onClick={handleSignOut}
          variant='ghost'
          size={isDropdown ? 'sm' : 'lg'}
          className={cn(
            'w-full justify-start gap-3',
            isDropdown ? 'px-2 rounded-lg' : 'px-4 rounded-xl',
            'text-base font-medium text-error-600 hover:text-error-700 hover:bg-error-50'
          )}
        >
          <SignoutIcon className='size-5' />
          Cerrar sesión
        </Button>
      </div>
    </div>
  )
}

// Legacy component for backwards compatibility (still used internally if needed)
function BusinessNavigationMenuDrawer() {
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const { isOn: isOpenDrawer, toggle: toggleDrawer } = useToggle()

  // Desktop: This is now handled by Header directly
  // Mobile: Still use Drawer
  if (isDesktop) {
    return null // Desktop menu is now rendered by Header
  }

  return (
    <Drawer open={isOpenDrawer} onOpenChange={toggleDrawer}>
      <DrawerTrigger asChild>
        <Button variant='ghost' className='h-10 w-10 rounded-full hover:bg-neutral-100 p-0'>
          <MenuIcon className='size-6' />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className='flex flex-col overflow-y-auto h-full max-h-[85vh]'>
          <DrawerHandle />
          <DrawerHeader>
            <BusinessNavigationMenuContent onClose={toggleDrawer} />
          </DrawerHeader>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export { BusinessNavigationMenuDrawer, BusinessNavigationMenuContent }
