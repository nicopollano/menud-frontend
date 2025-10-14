'use client'
import { buttonVariants } from '@ristokit/ui/components/button'
import { NotFoundIcon } from '@ristokit/ui/icons/not-found.icon'
import { cn } from '@ristokit/ui/lib/utils'
import Link from 'next/link'

function NotFound() {
  return (
    <main className='relative flex min-h-dvh flex-col gap-y-3 px-5 py-[4.75rem] text-center'>
      <NotFoundIcon className='-z-10 pointer-events-none absolute inset-0 size-full object-cover' />
      <h2 className='text-heading-mobile-2 text-primary'>Oops... pagina no encontrada</h2>
      <p className='mx-auto max-w-[18.875rem] text-body-mobile-4 text-gray-dark'>
        Lo sentimos, la página que estás buscando no existe o ha sido movida.
      </p>
      <Link
        href='mailto:hello@ristokit.com'
        target='_blank'
        rel='noopener noreferrer'
        className={cn(buttonVariants(), 'mx-auto mt-auto')}
      >
        Contactar con soporte
      </Link>
    </main>
  )
}

export default NotFound
