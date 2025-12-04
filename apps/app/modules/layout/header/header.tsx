'use client'
import { BusinessNavigationMenuDrawer } from '@/modules/businesses/components/drawer/business-navigation-menu-drawer'
import { ROUTES } from '@/modules/shared/lib/routes'
import { LogoIcon } from '@ristokit/ui/icons/logo.icon'
import Link from 'next/link'

function Header() {
  return (
    <header className='sticky top-4 z-50 mx-auto w-full max-w-5xl'>
      <div className='flex items-center justify-between rounded-full border border-white/20 bg-white/80 px-6 py-3 shadow-lg backdrop-blur-xl transition-all hover:bg-white/90 hover:shadow-xl'>
        <Link href={ROUTES.BUSINESSES} className='flex items-center gap-2 transition-opacity hover:opacity-80'>
          <div className='size-10 text-primary-600'>
            <LogoIcon />
          </div>
          <span className='hidden font-bold text-neutral-900 md:block'>MenuD</span>
        </Link>

        <BusinessNavigationMenuDrawer />
      </div>
    </header>
  )
}

export { Header }
