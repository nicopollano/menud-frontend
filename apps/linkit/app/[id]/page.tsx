import { linkitService } from '@/modules/linkit/services/linkit.service'
import { Button } from '@ristokit/ui/components/button'
import { FacebookIcon } from '@ristokit/ui/icons/facebook.icon'
import { InstagramIcon } from '@ristokit/ui/icons/instagram.icon'
import { LinkedInIcon } from '@ristokit/ui/icons/linkedin.icon'
import { LogoIcon } from '@ristokit/ui/icons/logo.icon'
import { MapIcon } from '@ristokit/ui/icons/map.icon'
import { TiktokIcon } from '@ristokit/ui/icons/tiktok.icon'
import { WebIcon } from '@ristokit/ui/icons/web.icon'
import { WhatsappIcon } from '@ristokit/ui/icons/whatsapp.icon'
import { XTwitterIcon } from '@ristokit/ui/icons/x-twitter.icon'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface LinkitPageParams {
  id: string
}

interface LinkitPageProps {
  params: Promise<LinkitPageParams>
}

async function LinkitPage({ params }: LinkitPageProps) {
  const { id } = await params

  const linkit = await linkitService.findLinkitByBusinessId({
    businessId: id
  })

  if (!linkit) return notFound()

  return (
    <main className='flex min-h-dvh items-center justify-center'>
      <section className='grid max-w-md gap-y-[3.125rem] p-4'>
        <header className='flex flex-col items-center justify-center gap-y-5 text-center'>
          <div className='relative size-[8.875rem] rounded-full bg-secondary'>
            <Image
              src={linkit.business.logo || '#'}
              alt={`Logo de ${linkit.business.name}`}
              fill
              className='rounded-full object-cover'
            />
          </div>
          <h2 className='px-8 text-heading-mobile-1 text-text'>Conecta con nuestro restaurante</h2>
          <p className='mt-1 px-8 text-body-mobile-3 text-gray-dark'>
            Accedé a nuestras redes, ubicación, contacto y más desde un solo lugar.
          </p>
        </header>
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
        </div>
        <LogoIcon className='absolute inset-x-0 bottom-[1.875rem] mx-auto [&>path]:fill-gray' />
      </section>
      <div className='-rotate-30 -left-[8.125rem] -top-[7.1875rem] -z-10 fixed size-[18.25rem] rounded-full bg-linear-(--gradient-eclipse)' />
      <div className='-bottom-[5.3125rem] -right-[4.625rem] -z-10 fixed size-[12.125rem] rotate-150 rounded-full bg-linear-(--gradient-eclipse)' />
    </main>
  )
}

export default LinkitPage
