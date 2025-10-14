'use client'
import { BusinessNavigationMenuDrawer } from '@/modules/businesses/components/drawer/business-navigation-menu-drawer'
import { ROUTES } from '@/modules/shared/lib/routes'
import { LogoIcon } from '@ristokit/ui/icons/logo.icon'
import Link from 'next/link'

function Header() {
  return (
    <header className='flex items-center gap-x-5'>
      <BusinessNavigationMenuDrawer />
      <Link href={ROUTES.BUSINESSES}>
        <LogoIcon />
      </Link>
    </header>
  )
}

export { Header }
