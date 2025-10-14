'use client'
import { useBranch } from '@/modules/branches/providers/branch.provider'
import { MenuDrawer } from '@/modules/shared/components/drawer/menu-drawer'
import { ReadingModeDrawer } from '@/modules/shared/components/drawer/reading-mode-drawer'
import { SelectLanguageDrawer } from '@/modules/shared/components/drawer/select-language-drawer'
import Image from 'next/image'

function Header() {
  const { menu } = useBranch()

  return (
    <header className='mx-auto grid w-full max-w-5xl gap-y-[3.125rem] px-4 xl:px-0'>
      <div className='relative flex h-[9.125rem] flex-col rounded-sm bg-secondary'>
        {menu.cover && (
          <Image className='rounded-sm object-cover' src={menu.cover} alt='Portada del negocio' fill priority />
        )}
        <div className='z-10 flex items-center justify-between gap-x-2.5 p-4'>
          <MenuDrawer />
          <SelectLanguageDrawer />
          <ReadingModeDrawer />
        </div>
        <div className='-bottom-[2.375rem] absolute inset-x-0 z-10 mx-auto size-[4.75rem] rounded-full bg-primary'>
          {menu.logo && (
            <Image className='rounded-full object-cover' src={menu.logo} alt='Logo del negocio' fill priority />
          )}
        </div>
      </div>
      <h1 className='text-center text-heading-mobile-3 text-text'>{menu.name || 'Nombre del negocio'}</h1>
    </header>
  )
}

export { Header }
