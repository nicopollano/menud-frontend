'use client'
import { mutateMenu } from '@/modules/menus/hooks/use-menu'
import { updateMenuById } from '@/modules/menus/services/menus.service'
import { useNavigationParams } from '@/modules/shared/hooks/use-navigation-params'
import { TYPOGRAPHIES, Typography } from '@ristokit/shared/models/general.model'
import type { Menu } from '@ristokit/shared/models/menu.model'
import { AlertError, AlertSuccess } from '@ristokit/ui/components/alert'
import { Button } from '@ristokit/ui/components/button'
import { toast } from '@ristokit/ui/components/sonner'
import { cn } from '@ristokit/ui/lib/utils'
import { useState } from 'react'

interface UpdateMenuTypographySectionProps {
  menu: Menu
}

function UpdateMenuTypographySection({ menu }: UpdateMenuTypographySectionProps) {
  const { businessId, branchId, menuId } = useNavigationParams()

  const [isClickingAction, setIsClickingAction] = useState(false)

  const handleTypographyChange = async (typography: Typography) => {
    try {
      setIsClickingAction(true)

      const { error } = await updateMenuById({
        businessId,
        branchId,
        menuId,
        typography
      })
      if (error) {
        return toast.custom(() => (
          <AlertError
            title='¡Error al actualizar la tipografía!'
            description={`Ocurrió un error al intentar actualizar la tipografía del menú ${menu.name}.`}
            details={[error.message]}
          />
        ))
      }

      await mutateMenu({ businessId, branchId, menuId })

      toast.custom(() => (
        <AlertSuccess
          title='¡Tipografía actualizada!'
          description={`La tipografía del menú ${menu.name} ha sido actualizada correctamente.`}
        />
      ))
    } catch (error) {
      toast.custom(() => (
        <AlertError
          title='¡Error al actualizar la tipografía!'
          description={`Ocurrió un error al intentar actualizar la tipografía del menú ${menu.name}.`}
          details={error instanceof Error ? [error.message] : undefined}
        />
      ))
    } finally {
      setIsClickingAction(false)
    }
  }

  return (
    <div className='grid 360:grid-cols-3 grid-cols-2 gap-4'>
      {TYPOGRAPHIES.map((typography) => (
        <Button
          key={typography}
          onClick={() => handleTypographyChange(typography)}
          className={cn(
            'h-[3.75rem] rounded-[0.5rem] border border-gray bg-background px-1.5 text-button-mobile-small text-text disabled:bg-transparent disabled:text-text',
            {
              'border-text': menu?.typography === typography,
              'font-poppins': typography === Typography.POPPINS,
              'font-roboto': typography === Typography.ROBOTO,
              'font-maven-pro': typography === Typography.MAVEN_PRO,
              'font-lato': typography === Typography.LATO,
              'font-pompiere': typography === Typography.POMPIERE,
              'font-salsa': typography === Typography.SALSA,
              'font-niconne': typography === Typography.NICONNE,
              'font-baloo-tammudu': typography === Typography.BALOO_TAMMUDU
            }
          )}
          variant='styless'
          size='styless'
          disabled={isClickingAction}
        >
          <span className='truncate'>{typography}</span>
        </Button>
      ))}
    </div>
  )
}

export { UpdateMenuTypographySection }
