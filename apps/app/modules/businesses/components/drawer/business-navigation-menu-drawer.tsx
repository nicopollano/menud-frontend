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
            <div className='grid grid-cols-2 gap-x-4 gap-y-[1.875rem]'>
              <Link
                href={ROUTES.BUSINESSES}
                onClick={toggleDrawer}
                className={buttonVariants({ variant: 'navigation-menu', size: 'styless' })}
              >
                <BranchIcon />
                Restaurantes
              </Link>
              <Link
                href={ROUTES.LINKIT}
                onClick={toggleDrawer}
                className={buttonVariants({ variant: 'navigation-menu', size: 'styless' })}
              >
                <LinkitIcon />
                Linkit
              </Link>
              <Link
                href='mailto:hello@ristokit.com'
                target='_blank'
                rel='noopener noreferrer'
                className={buttonVariants({ variant: 'navigation-menu', size: 'styless' })}
              >
                <SupportIcon />
                Soporte
              </Link>
              <Link
                href={ROUTES.PROFILE}
                onClick={toggleDrawer}
                className={buttonVariants({ variant: 'navigation-menu', size: 'styless' })}
              >
                <UserIcon />
                Perfil
              </Link>
            </div>
            <Button onClick={handleSignOut} variant='link' size='styless'>
              <SignoutIcon /> Cerrar sesión
            </Button>
          </DrawerHeader>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export { BusinessNavigationMenuDrawer }
