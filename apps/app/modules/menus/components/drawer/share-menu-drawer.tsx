'use client'
import { useBranch } from '@/modules/branches/hooks/use-branch'
import { buildMenuPublicUrl } from '@/modules/menus/helpers/menu.helper'
import { useNavigationParams } from '@/modules/shared/hooks/use-navigation-params'
import { AlertError, AlertSuccess } from '@ristokit/ui/components/alert'
import { Button } from '@ristokit/ui/components/button'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHandle,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@ristokit/ui/components/drawer'
import { toast } from '@ristokit/ui/components/sonner'
import { LinkIcon } from '@ristokit/ui/icons/link.icon'
import Image from 'next/image'

function ShareMenuDrawer() {
  const { businessId, branchId } = useNavigationParams()

  const { data } = useBranch({
    businessId,
    branchId
  })

  if (!data) return null

  const menuUrl = buildMenuPublicUrl(data.id)
  const shareText = `¡Descubrí el menú de ${data.name}!`

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(menuUrl)

      toast.custom(() => (
        <AlertSuccess
          title='¡Enlace copiado!'
          description={`El enlace del menú ${data.name} ha sido copiado correctamente.`}
        />
      ))
    } catch (error) {
      toast.custom(() => (
        <AlertError
          title='¡Error al copiar el enlace!'
          description={`Ocurrió un error al intentar copiar el enlace del menú ${data.name}.`}
          details={error instanceof Error ? [error.message] : undefined}
        />
      ))
    }
  }

  const handleShareOnTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(menuUrl)}`
    window.open(twitterUrl, '_blank', 'noopener,noreferrer')
  }

  const handleShareOnFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(menuUrl)}&quote=${encodeURIComponent(shareText)}`
    window.open(facebookUrl, '_blank', 'noopener,noreferrer')
  }

  const handleShareOnWhatsApp = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${menuUrl}`)}`
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className='rounded-[0.5rem] border-gray' variant='outline'>
          <LinkIcon className='stroke-text' />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className='flex flex-col gap-y-[3.125rem] overflow-y-auto px-[0.9375rem] pb-[3.75rem]'>
          <DrawerHandle />
          <DrawerHeader className='gap-y-[1.875rem]'>
            <DrawerTitle>Compartí tu menú con el mundo</DrawerTitle>
            <DrawerDescription>
              Poné tu menú al alcance de tus clientes. Copiá el enlace o compartilo en redes sociales, WhatsApp o donde
              prefieras.
            </DrawerDescription>
          </DrawerHeader>
          <div className='flex flex-wrap items-center justify-center 360:gap-x-[1.875rem] gap-x-4 gap-y-2'>
            <div className='flex flex-col items-center justify-center gap-y-[0.3125rem] text-body-mobile-4 text-gray-dark'>
              <Button onClick={handleShareOnTwitter} className='relative size-[3.125rem]' variant='styless'>
                <Image className='object-contain' src='/assets/brands/x.png' alt='X' fill sizes='10vw' />
              </Button>
              <span>X-Twitter</span>
            </div>
            <div className='flex flex-col items-center justify-center gap-y-[0.3125rem] text-body-mobile-4 text-gray-dark'>
              <Button onClick={handleShareOnFacebook} className='relative size-[3.125rem]' variant='styless'>
                <Image className='object-contain' src='/assets/brands/facebook.png' alt='Facebook' fill sizes='10vw' />
              </Button>
              <span>Facebook</span>
            </div>
            <div className='flex flex-col items-center justify-center gap-y-[0.3125rem] text-body-mobile-4 text-gray-dark'>
              <Button onClick={handleShareOnWhatsApp} className='relative size-[3.125rem]' variant='styless'>
                <Image className='object-contain' src='/assets/brands/whatsapp.png' alt='WhatsApp' fill sizes='10vw' />
              </Button>
              <span>WhatsApp</span>
            </div>
            <div className='flex flex-col items-center justify-center gap-y-[0.3125rem] text-body-mobile-4 text-gray-dark'>
              <Button className='size-[3.125rem]' variant='secondary' onClick={handleCopyLink}>
                <LinkIcon className='stroke-primary' />
              </Button>
              <span>Copiar</span>
            </div>
          </div>
          <DrawerFooter>
            <DrawerDescription className='truncate text-center'>{menuUrl}</DrawerDescription>
            <Button className='mx-auto' variant='secondary' onClick={handleCopyLink}>
              <LinkIcon className='stroke-primary' /> Copiar link
            </Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export { ShareMenuDrawer }
