'use client'
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

function BusinessNavigationMenuDrawer() {
  const { isOn: isOpenDrawer, update: setIsOpenDrawer, toggle: toggleDrawer } = useToggle()

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

  return (
    <Drawer open={isOpenDrawer} onOpenChange={setIsOpenDrawer}>
      <DrawerTrigger>
        <MenuIcon />
      </DrawerTrigger>
      <DrawerContent>
        <div className='flex flex-col gap-y-[3.75rem] overflow-y-auto px-[0.9375rem] pb-[3.75rem]'>
          <DrawerHandle />
          <DrawerHeader className='gap-y-[1.875rem]'>
            <div className='grid gap-y-2.5'>
              <DrawerTitle>Menú</DrawerTitle>
              <LineIcon className='h-px' />
            </div>
            <div className='flex flex-col gap-y-2'>
              <Link
                href={ROUTES.BUSINESSES}
                onClick={toggleDrawer}
                className={cn(
                  buttonVariants({ variant: 'ghost', size: 'lg' }),
                  'w-full justify-start gap-3 px-4 text-base font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-xl'
                )}
              >
                <BranchIcon className='size-5' />
                Restaurantes
              </Link>
              <Link
                href={ROUTES.LINKIT}
                onClick={toggleDrawer}
                className={cn(
                  buttonVariants({ variant: 'ghost', size: 'lg' }),
                  'w-full justify-start gap-3 px-4 text-base font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-xl'
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
                  buttonVariants({ variant: 'ghost', size: 'lg' }),
                  'w-full justify-start gap-3 px-4 text-base font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-xl'
                )}
              >
                <SupportIcon className='size-5' />
                Soporte
              </Link>
              <Link
                href={ROUTES.PROFILE}
                onClick={toggleDrawer}
                className={cn(
                  buttonVariants({ variant: 'ghost', size: 'lg' }),
                  'w-full justify-start gap-3 px-4 text-base font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-xl'
                )}
              >
                <UserIcon className='size-5' />
                Perfil
              </Link>
            </div>

            <div className='pt-4 mt-auto'>
              <Button
                onClick={handleSignOut}
                variant='ghost'
                size='lg'
                className='w-full justify-start gap-3 px-4 text-base font-medium text-error-600 hover:text-error-700 hover:bg-error-50 rounded-xl'
              >
                <SignoutIcon className='size-5' />
                Cerrar sesión
              </Button>
            </div>
          </DrawerHeader>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export { BusinessNavigationMenuDrawer }
