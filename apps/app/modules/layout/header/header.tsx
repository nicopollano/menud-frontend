'use client'
import { BusinessNavigationMenuContent } from '@/modules/businesses/components/drawer/business-navigation-menu-drawer'
import { useMediaQuery } from '@/modules/shared/hooks/use-media-query'
import { ROUTES } from '@/modules/shared/lib/routes'
import { Button } from '@ristokit/ui/components/button'
import { Drawer, DrawerContent, DrawerHandle, DrawerHeader, DrawerTrigger } from '@ristokit/ui/components/drawer'
import { LogoIcon } from '@ristokit/ui/icons/logo.icon'
import { MenuIcon } from '@ristokit/ui/icons/menu.icon'
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const menuRef = useRef<HTMLDivElement>(null)

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isMenuOpen])

  if (isDesktop) {
    return (
      <header className='sticky top-4 z-50 mx-auto w-full max-w-5xl px-4'>
        <div ref={menuRef} className='relative'>
          {/* Header Card */}
          <div className='flex items-center justify-between rounded-full border border-white/20 bg-white/80 px-6 py-3 shadow-lg backdrop-blur-xl transition-all hover:bg-white/90 hover:shadow-xl'>
            <Link href={ROUTES.BUSINESSES} className='flex items-center gap-2 transition-opacity hover:opacity-80'>
              <div className='size-10 text-primary-600'>
                <LogoIcon />
              </div>
              <span className='hidden font-bold text-neutral-900 md:block'>MenuD</span>
            </Link>

            <Button 
              variant='ghost' 
              className='h-10 w-10 rounded-full hover:bg-neutral-100 p-0'
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <MenuIcon className='size-6' />
            </Button>
          </div>

          {/* Full Width Dropdown Menu */}
          {isMenuOpen && (
            <div className='absolute left-0 right-0 top-[calc(100%+8px)] z-[100] bg-white shadow-xl rounded-2xl border border-neutral-200 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200'>
              <BusinessNavigationMenuContent isDropdown onClose={() => setIsMenuOpen(false)} />
            </div>
          )}
        </div>
      </header>
    )
  }

  // Mobile: Use Drawer
  return (
    <header className='sticky top-4 z-50 mx-auto w-full max-w-5xl px-4'>
      <div className='flex items-center justify-between rounded-full border border-white/20 bg-white/80 px-6 py-3 shadow-lg backdrop-blur-xl transition-all hover:bg-white/90 hover:shadow-xl'>
        <Link href={ROUTES.BUSINESSES} className='flex items-center gap-2 transition-opacity hover:opacity-80'>
          <div className='size-10 text-primary-600'>
            <LogoIcon />
          </div>
          <span className='hidden font-bold text-neutral-900 md:block'>MenuD</span>
        </Link>

        <Drawer>
          <DrawerTrigger asChild>
            <Button variant='ghost' className='h-10 w-10 rounded-full hover:bg-neutral-100 p-0'>
              <MenuIcon className='size-6' />
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className='flex flex-col overflow-y-auto h-full max-h-[85vh]'>
              <DrawerHandle />
              <DrawerHeader>
                <BusinessNavigationMenuContent />
              </DrawerHeader>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </header>
  )
}

export { Header }

