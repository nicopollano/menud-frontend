'use client'
import { mutateMenu } from '@/modules/menus/hooks/use-menu'
import { updatePaletteById } from '@/modules/palettes/services/palettes.service'
import { useNavigationParams } from '@/modules/shared/hooks/use-navigation-params'
import type { Menu, MenuPalette } from '@ristokit/shared/models/menu.model'
import { AlertError, AlertSuccess } from '@ristokit/ui/components/alert'
import { Button } from '@ristokit/ui/components/button'
import { toast } from '@ristokit/ui/components/sonner'
import { MagicWandIcon } from '@ristokit/ui/icons/magic-wand.icon'
import { cn } from '@ristokit/ui/lib/utils'
import { useState } from 'react'

interface UpdateMenuPalletteSectionProps {
  menu: Menu
}

function UpdateMenuPalletteSection({ menu }: UpdateMenuPalletteSectionProps) {
  const { businessId, branchId, menuId } = useNavigationParams()

  const [isClickingAction, setIsClickingAction] = useState(false)

  const handlePaletteChange = async (palette: MenuPalette) => {
    try {
      setIsClickingAction(true)

      const { error } = await updatePaletteById({
        businessId,
        branchId,
        paletteId: palette.id,
        enabled: !palette.enabled
      })
      if (error) {
        return toast.custom(() => (
          <AlertError
            title='¡Error al actualizar la paleta!'
            description={`Ocurrió un error al intentar actualizar la paleta del menú ${menu.name}.`}
            details={[error.message]}
          />
        ))
      }

      await mutateMenu({ businessId, branchId, menuId })

      toast.custom(() => (
        <AlertSuccess
          title='¡Paleta actualizada!'
          description={`La paleta del menú ${menu.name} ha sido actualizada correctamente.`}
        />
      ))
    } catch (error) {
      toast.custom(() => (
        <AlertError
          title='¡Error al actualizar la paleta!'
          description={`Ocurrió un error al intentar actualizar la paleta del menú ${menu.name}.`}
          details={error instanceof Error ? [error.message] : undefined}
        />
      ))
    } finally {
      setIsClickingAction(false)
    }
  }

  return (
    <div className='grid grid-cols-3 gap-x-4 gap-y-[0.9375rem]'>
      {menu.palettes.map((palette) => (
        <Button
          key={palette.id}
          onClick={() => handlePaletteChange(palette)}
          className={cn(
            'h-[2.875rem] gap-x-0 rounded-[0.5rem] border border-gray bg-background px-2.5 disabled:bg-background',
            {
              'border-text': palette.enabled
            }
          )}
          variant='styless'
          size='styless'
          disabled={isClickingAction}
        >
          <span className='h-[1.625rem] w-[1.8125rem]' style={{ backgroundColor: palette.color1 }} />
          <span className='h-[1.625rem] w-[1.8125rem]' style={{ backgroundColor: palette.color2 }} />
          <span className='h-[1.625rem] w-[1.8125rem]' style={{ backgroundColor: palette.color3 }} />
        </Button>
      ))}
      <Button
        className='col-span-2 h-[2.875rem] w-fit gap-x-2.5 rounded-[0.5rem] bg-gray-light px-6 text-button-mobile-medium disabled:bg-gray-light disabled:text-text'
        variant='styless'
        size='styless'
        disabled={isClickingAction}
      >
        <MagicWandIcon className='stroke-text' />
        Cambiar
      </Button>
    </div>
  )
}

export { UpdateMenuPalletteSection }
