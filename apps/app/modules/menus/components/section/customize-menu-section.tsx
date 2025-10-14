'use client'
import { UpdateMenuCoverDrawer } from '@/modules/menus/components/drawer/update-menu-cover-drawer'
import { UpdateMenuLogoDrawer } from '@/modules/menus/components/drawer/update-menu-logo-drawer'
import { UpdateMenuPalletteSection } from '@/modules/menus/components/section/update-menu-palette-section'
import { UpdateMenuTypographySection } from '@/modules/menus/components/section/update-menu-typography-section'
import { MenuPalettesListSkeleton } from '@/modules/menus/components/skeleton/menu-palettes-list-skeleton'
import { MenuTypographyListSkeleton } from '@/modules/menus/components/skeleton/menu-typography-list-skeleton'
import { useMenu } from '@/modules/menus/hooks/use-menu'
import { useNavigationParams } from '@/modules/shared/hooks/use-navigation-params'
import { Button } from '@ristokit/ui/components/button'
import { Skeleton } from '@ristokit/ui/components/skeleton'
import { UploadIcon } from '@ristokit/ui/icons/upload.icon'

function CustomizeMenuSection() {
  const { businessId, branchId, menuId } = useNavigationParams()

  const { data, isLoading } = useMenu({
    businessId,
    branchId,
    menuId
  })

  return (
    <section className='flex flex-col gap-y-[1.875rem] rounded-[0.5rem] border border-gray p-5'>
      <h4 className='text-heading-mobile-4 text-text'>Personalizá tu menú</h4>
      <article className='grid gap-y-2.5'>
        <p className='text-button-mobile-small text-text'>Logo del menú</p>
        {isLoading && <Skeleton className='min-h-16' />}
        {data && (
          <UpdateMenuLogoDrawer menu={data}>
            <Button
              className='h-16 gap-x-2.5 rounded-[0.5rem] bg-gray-light text-button-mobile-medium text-text'
              variant='styless'
              size='styless'
            >
              <UploadIcon />
              Subir logo
            </Button>
          </UpdateMenuLogoDrawer>
        )}
      </article>
      <article className='grid gap-y-2.5'>
        <p className='text-button-mobile-small text-text'>Portada del menú</p>
        {isLoading && <Skeleton className='min-h-16' />}
        {data && (
          <UpdateMenuCoverDrawer menu={data}>
            <Button
              className='h-16 gap-x-2.5 rounded-[0.5rem] bg-gray-light text-button-mobile-medium text-text'
              variant='styless'
              size='styless'
            >
              <UploadIcon />
              Subir portada
            </Button>
          </UpdateMenuCoverDrawer>
        )}
      </article>
      <article className='grid gap-y-5'>
        <p className='text-button-mobile-small text-text'>Cambiar colores del menú</p>
        {isLoading && <MenuPalettesListSkeleton />}
        {data && <UpdateMenuPalletteSection menu={data} />}
      </article>
      <article className='grid gap-y-5'>
        <p className='text-button-mobile-small text-text'>Cambiar tipografía del menú</p>
        {isLoading && <MenuTypographyListSkeleton />}
        {data && <UpdateMenuTypographySection menu={data} />}
      </article>
    </section>
  )
}

export { CustomizeMenuSection }
