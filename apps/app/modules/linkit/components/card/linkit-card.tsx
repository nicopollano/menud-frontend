'use client'
import { UpdateLinkitDrawer } from '@/modules/linkit/components/drawer/update-linkit-drawer'
import { buildLinkitPublicUrl } from '@/modules/linkit/helpers/linkit.helper'
import type { Linkit } from '@ristokit/shared/models/linkit.model'
import { AlertError, AlertSuccess } from '@ristokit/ui/components/alert'
import { Button } from '@ristokit/ui/components/button'
import { toast } from '@ristokit/ui/components/sonner'
import { FacebookIcon } from '@ristokit/ui/icons/facebook.icon'
import { InstagramIcon } from '@ristokit/ui/icons/instagram.icon'
import { LinkIcon } from '@ristokit/ui/icons/link.icon'
import { LinkedInIcon } from '@ristokit/ui/icons/linkedin.icon'
import { MapIcon } from '@ristokit/ui/icons/map.icon'
import { TiktokIcon } from '@ristokit/ui/icons/tiktok.icon'
import { WebIcon } from '@ristokit/ui/icons/web.icon'
import { WhatsappIcon } from '@ristokit/ui/icons/whatsapp.icon'
import { XTwitterIcon } from '@ristokit/ui/icons/x-twitter.icon'
import Image from 'next/image'
import Link from 'next/link'

interface LinkitCardProps {
  linkit: Linkit
}

function LinkitCard({ linkit }: LinkitCardProps) {
  const linkitUrl = buildLinkitPublicUrl(linkit.business.id)

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(linkitUrl)

      toast.custom(() => (
        <AlertSuccess title='¡Enlace copiado!' description='El enlace del linkit ha sido copiado correctamente.' />
      ))
    } catch (error) {
      toast.custom(() => (
        <AlertError
          title='¡Error al copiar el enlace!'
          description='Ocurrió un error al intentar copiar el enlace del linkit.'
          details={error instanceof Error ? [error.message] : undefined}
        />
      ))
    }
  }

  return (
    <article className='grid gap-y-[3.125rem] p-4'>
      <header className='flex flex-col items-center justify-center gap-y-5 text-center'>
        <div className='relative size-[8.875rem] rounded-full bg-secondary'>
          <Image
            src={linkit.business?.logo || '#'}
            alt='Logo del restaurante'
            fill
            className='rounded-full object-cover'
          />
        </div>
        <h2 className='px-4 text-heading-mobile-1 text-text'>Conecta con nuestro restaurante</h2>
        <p className='mt-1 px-4 text-body-mobile-3 text-gray-dark'>
          Accedé a nuestras redes, ubicación, contacto y más desde un solo lugar.
        </p>
      </header>
      <footer className='grid gap-y-10'>
        <div className='grid gap-y-5'>
          {linkit.website && (
            <Button variant='outline' asChild>
              <Link href={linkit.website} target='_blank' rel='noopener noreferrer'>
                <WebIcon className='stroke-text' />
                Sitio web
              </Link>
            </Button>
          )}
          {linkit.whatsapp && (
            <Button variant='outline' asChild>
              <Link href={linkit.whatsapp} target='_blank' rel='noopener noreferrer'>
                <WhatsappIcon />
                WhatsApp
              </Link>
            </Button>
          )}
          {linkit.instagram && (
            <Button variant='outline' asChild>
              <Link href={linkit.instagram} target='_blank' rel='noopener noreferrer'>
                <InstagramIcon />
                Instagram
              </Link>
            </Button>
          )}
          {linkit.facebook && (
            <Button variant='outline' asChild>
              <Link href={linkit.facebook} target='_blank' rel='noopener noreferrer'>
                <FacebookIcon />
                Facebook
              </Link>
            </Button>
          )}
          {linkit.twitter && (
            <Button variant='outline' asChild>
              <Link href={linkit.twitter} target='_blank' rel='noopener noreferrer'>
                <XTwitterIcon />
                X-Twitter
              </Link>
            </Button>
          )}
          {linkit.linkedin && (
            <Button variant='outline' asChild>
              <Link href={linkit.linkedin} target='_blank' rel='noopener noreferrer'>
                <LinkedInIcon />
                LinkedIn
              </Link>
            </Button>
          )}
          {linkit.tiktok && (
            <Button variant='outline' asChild>
              <Link href={linkit.tiktok} target='_blank' rel='noopener noreferrer'>
                <TiktokIcon />
                TikTok
              </Link>
            </Button>
          )}
          {linkit.location && (
            <Button variant='outline' asChild>
              <Link href={linkit.location} target='_blank' rel='noopener noreferrer'>
                <MapIcon className='size-6' />
                Ubicación
              </Link>
            </Button>
          )}
          <UpdateLinkitDrawer linkit={linkit}>
            <Button variant='primary'>Agregar link</Button>
          </UpdateLinkitDrawer>
        </div>
        <div className='flex flex-col items-center justify-center gap-y-5'>
          <p className='text-center text-body-mobile-2 text-gray-dark'>{linkitUrl}</p>
          <Button variant='secondary' onClick={handleCopyLink}>
            <LinkIcon className='stroke-primary' />
            Copiar link
          </Button>
        </div>
      </footer>
    </article>
  )
}

export { LinkitCard }
