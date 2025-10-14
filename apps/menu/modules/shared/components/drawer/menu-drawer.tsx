'use client'
import { useBranch } from '@/modules/branches/providers/branch.provider'
import { DAYS_DICTIONARY } from '@ristokit/shared/models/general.model'
import { Button } from '@ristokit/ui/components/button'
import { DialogTitle } from '@ristokit/ui/components/dialog'
import { Drawer, DrawerContent, DrawerHandle, DrawerHeader, DrawerTrigger } from '@ristokit/ui/components/drawer'
import { CopyIcon } from '@ristokit/ui/icons/copy.icon'
import { LineIcon } from '@ristokit/ui/icons/line.icon'
import { MenuIcon } from 'lucide-react'

function MenuDrawer() {
  const { branch } = useBranch()

  const handleCopyText = async (text: string | undefined | null) => {
    try {
      if (!text) return

      await navigator.clipboard.writeText(text)
    } catch (error) {
      console.error('The error occurred while copying text:', error)
    }
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className='mr-auto size-9 border-primary' variant='outline' size='small'>
          <MenuIcon />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className='flex flex-col gap-y-[3.75rem] overflow-y-auto px-[0.9375rem] pb-[3.75rem]'>
          <DrawerHandle />
          <DrawerHeader className='gap-y-5'>
            <DialogTitle className='text-heading-mobile-3'>Datos del negocio</DialogTitle>
            <div className='grid grid-cols-[1fr_auto] gap-2.5'>
              <p className='text-heading-mobile-4 text-text'>Dirección</p>
              <Button
                className='row-span-2 mt-auto stroke-text'
                variant='styless'
                size='styless'
                onClick={() => handleCopyText(branch.address)}
              >
                <CopyIcon />
              </Button>
              <p className='truncate text-body-mobile-2 text-gray-dark'>{branch.address}</p>
            </div>
            <div className='grid grid-cols-[1fr_auto] gap-2.5'>
              <p className='text-heading-mobile-4 text-text'>Número de teléfono</p>
              <Button
                className='row-span-2 mt-auto stroke-text'
                variant='styless'
                size='styless'
                onClick={() => handleCopyText(branch.phone)}
              >
                <CopyIcon />
              </Button>
              <p className='truncate text-body-mobile-2 text-gray-dark'>{branch.phone}</p>
            </div>
            <LineIcon className='h-px' />
            <div className='grid gap-y-5'>
              <p className='text-heading-mobile-3 text-text'>Horario de atención</p>
              <ul className='grid gap-y-5'>
                {branch.schedules.map((schedule) => (
                  <li key={crypto.randomUUID()} className='grid grid-cols-[7.5rem_1fr]'>
                    <span className='text-heading-mobile-4 text-text'>{DAYS_DICTIONARY[schedule.day]}</span>
                    <span className='text-body-mobile-2 text-gray-dark'>
                      {schedule.openTime} - <span>{schedule.closeTime}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </DrawerHeader>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export { MenuDrawer }
