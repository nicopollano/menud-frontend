'use client'
import { useBranch } from '@/modules/branches/providers/branch.provider'
import { MenuDrawer } from '@/modules/shared/components/drawer/menu-drawer'
import { ReadingModeDrawer } from '@/modules/shared/components/drawer/reading-mode-drawer'
import { SelectLanguageDrawer } from '@/modules/shared/components/drawer/select-language-drawer'
import Image from 'next/image'

function Header() {
  const { menu } = useBranch()

  return (
    <header className='mx-auto grid w-full max-w-5xl md:max-w-6xl lg:max-w-7xl gap-y-[3.125rem] md:gap-y-16 px-4 md:px-6 lg:px-8'>
      <div className='relative flex h-[9.125rem] md:h-[12rem] lg:h-[15rem] flex-col rounded-xl md:rounded-2xl bg-secondary overflow-hidden shadow-lg'>
        {/* Cover Image with Gradient Overlay */}
        {menu.cover && (
          <>
            <Image
              className='rounded-xl md:rounded-2xl object-cover'
              src={menu.cover}
              alt='Portada del negocio'
              fill
              priority
            />
            {/* Gradient overlay for better contrast */}
            <div className='absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60' />
          </>
        )}

        {/* Top Actions Bar */}
        <div className='z-10 flex items-center justify-between gap-x-2.5 p-4 md:p-6'>
          <MenuDrawer />
          <SelectLanguageDrawer />
          <ReadingModeDrawer />
        </div>

        {/* Logo - Positioned at bottom center */}
        <div className='-bottom-[2.375rem] md:-bottom-[3rem] lg:-bottom-[3.5rem] absolute inset-x-0 z-10 mx-auto size-[4.75rem] md:size-[6rem] lg:size-[7rem] rounded-full bg-primary shadow-2xl ring-4 ring-white'>
          {menu.logo && (
            <Image className='rounded-full object-cover' src={menu.logo} alt='Logo del negocio' fill priority />
          )}
        </div>
      </div>

      {/* Business Name */}
      <h1 className='text-center text-heading-mobile-3 md:text-3xl lg:text-4xl font-bold text-text px-4'>
        {menu.name || 'Nombre del negocio'}
      </h1>
    </header>
  )
}

export { Header }
