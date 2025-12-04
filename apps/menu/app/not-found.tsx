'use client'

import { Button } from '@ristokit/ui/components/button'
import Link from 'next/link'
import { useEffect } from 'react'

export default function NotFound() {
  useEffect(() => {
    // Update page title for 404
    document.title = '404 - Página no encontrada'
  }, [])
  return (
    <html lang='es'>
      <body className='min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-50 via-white to-neutral-50 p-4'>
        <div className='max-w-2xl w-full text-center space-y-8 animate-fade-in'>
          {/* 404 Text with gradient */}
          <div className='space-y-4'>
            <h1 className='text-[120px] md:text-[200px] font-black leading-none bg-gradient-to-br from-primary-600 via-primary-500 to-primary-400 bg-clip-text text-transparent animate-scale-in'>
              404
            </h1>
            <div className='space-y-3'>
              <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900'>Página no encontrada</h2>
              <p className='text-lg md:text-xl text-neutral-600 max-w-lg mx-auto'>
                Lo sentimos, la página que buscás no existe o fue movida.
              </p>
            </div>
          </div>

          {/* Decorative illustration */}
          <div className='flex justify-center py-8'>
            <svg
              className='w-64 h-64 md:w-80 md:h-80 text-neutral-300 animate-float'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={0.5}
                d='M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
          </div>

          {/* CTA Buttons */}
          <div className='flex flex-col sm:flex-row gap-4 justify-center items-center pt-4'>
            <Link href='/'>
              <Button
                size='lg'
                className='w-full sm:w-auto px-8 py-6 text-lg font-semibold shadow-xl shadow-primary-500/30 hover:shadow-2xl hover:shadow-primary-500/40 transition-all'
              >
                Volver al inicio
              </Button>
            </Link>
            <Button
              variant='outline'
              size='lg'
              onClick={() => window.history.back()}
              className='w-full sm:w-auto px-8 py-6 text-lg font-semibold'
            >
              Página anterior
            </Button>
          </div>

          {/* Helper text */}
          <p className='text-sm md:text-base text-neutral-500 pt-8'>
            Si creés que esto es un error, por favor contactanos
          </p>
        </div>

        {/* Background decoration */}
        <div className='fixed inset-0 -z-10 overflow-hidden pointer-events-none'>
          <div className='absolute top-0 right-0 w-96 h-96 bg-primary-200/20 rounded-full blur-3xl' />
          <div className='absolute bottom-0 left-0 w-96 h-96 bg-primary-300/20 rounded-full blur-3xl' />
        </div>
      </body>
    </html>
  )
}
