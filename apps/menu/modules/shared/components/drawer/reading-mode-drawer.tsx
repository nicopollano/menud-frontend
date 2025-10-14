'use client'
import { Button } from '@ristokit/ui/components/button'
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHandle,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@ristokit/ui/components/drawer'
import { Slider } from '@ristokit/ui/components/slider'
import { Switch } from '@ristokit/ui/components/switch'
import { ReadIcon } from '@ristokit/ui/icons/read.icon'
import { cn } from '@ristokit/ui/lib/utils'
import { useState } from 'react'

function ReadingModeDrawer() {
  const [isReadingMode, setIsReadingMode] = useState(false)

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className='size-9 border-primary' variant='outline' size='small'>
          <ReadIcon />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className='flex flex-col gap-y-[3.75rem] overflow-y-auto px-[0.9375rem] pb-[3.75rem]'>
          <DrawerHandle />
          <DrawerHeader className='gap-y-[1.875rem]'>
            <DrawerTitle className='flex items-center justify-between gap-x-2'>
              Modo de lectura <Switch checked={isReadingMode} onCheckedChange={setIsReadingMode} />
            </DrawerTitle>
            <div className={cn('text-gray-dark', isReadingMode && 'text-text')}>
              <p className='text-body-mobile-2'>
                Sabemos lo importante que es poder leer y navegar el menú de manera cómoda. Activá el Modo Lectura y
                adaptá el menú a tus necesidades:
              </p>
              <ul className='ml-2 list-inside list-disc text-body-mobile-2'>
                <li className='-indent-6 pl-6'>
                  <span className='text-heading-mobile-4'>Agrandar el texto</span> para ver los nombres y descripciones
                  de los platos sin esfuerzo.
                </li>
                <li className='-indent-6 pl-6'>
                  <span className='text-heading-mobile-4'>Mostrar imágenes más grandes</span> para identificar
                  fácilmente cada producto.
                </li>
                <li className='-indent-6 pl-6'>
                  <span className='text-heading-mobile-4'>Mejorar el contraste</span> para que todo se vea más claro y
                  definido
                </li>
              </ul>
            </div>
          </DrawerHeader>
          {isReadingMode && (
            <DrawerFooter className='gap-y-8'>
              <Slider defaultValue={[50]} max={100} step={50} />
              <p className='flex items-center justify-between gap-x-1'>
                <span className='text-button-mobile-medium'>Pequeño</span>
                <span className='text-heading-mobile-4'>Mediano</span>
                <span className='text-heading-mobile-3'>Grande</span>
              </p>
            </DrawerFooter>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export { ReadingModeDrawer }
