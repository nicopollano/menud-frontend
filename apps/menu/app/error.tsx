'use client'

import { Button } from '@ristokit/ui/components/button'
import { useEffect } from 'react'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log error to error reporting service
    console.error('Application error:', error)
    // Update page title for error
    document.title = '500 - Error del servidor'
  }, [error])

  return (
    <html lang='es'>
      <body className='min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-red-50 p-4'>
        <div className='max-w-2xl w-full text-center space-y-8 animate-fade-in'>
          {/* 500 Text with gradient */}
          <div className='space-y-4'>
            <h1 className='text-[120px] md:text-[200px] font-black leading-none bg-gradient-to-br from-red-600 via-red-500 to-red-400 bg-clip-text text-transparent animate-scale-in'>
              500
            </h1>
            <div className='space-y-3'>
              <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900'>Algo salió mal</h2>
              <p className='text-lg md:text-xl text-neutral-600 max-w-lg mx-auto'>
                Lo sentimos, ocurrió un error inesperado. Estamos trabajando para solucionarlo.
              </p>
            </div>
          </div>

          {/* Decorative illustration */}
          <div className='flex justify-center py-8'>
            <svg
              className='w-64 h-64 md:w-80 md:h-80 text-red-300 animate-float'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={0.5}
                d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
          </div>

          {/* Error details (development only) */}
          {process.env.NODE_ENV === 'development' && error.message && (
            <div className='mx-auto max-w-lg p-4 bg-red-50 border border-red-200 rounded-xl text-left'>
              <h3 className='text-sm font-semibold text-red-900 mb-2'>Error Details (Dev Only):</h3>
              <p className='text-xs text-red-700 font-mono break-all'>{error.message}</p>
              {error.digest && (
                <p className='text-xs text-red-600 mt-2'>
                  <span className='font-semibold'>Digest:</span> {error.digest}
                </p>
              )}
            </div>
          )}

          {/* CTA Buttons */}
          <div className='flex flex-col sm:flex-row gap-4 justify-center items-center pt-4'>
            <Button
              onClick={reset}
              size='lg'
              className='w-full sm:w-auto px-8 py-6 text-lg font-semibold shadow-xl shadow-red-500/30 hover:shadow-2xl hover:shadow-red-500/40 transition-all bg-red-600 hover:bg-red-700'
            >
              Intentar nuevamente
            </Button>
            <Button
              variant='outline'
              size='lg'
              onClick={() => (window.location.href = '/')}
              className='w-full sm:w-auto px-8 py-6 text-lg font-semibold'
            >
              Volver al inicio
            </Button>
          </div>

          {/* Helper text */}
          <p className='text-sm md:text-base text-neutral-500 pt-8'>Si el problema persiste, por favor contactanos</p>
        </div>

        {/* Background decoration */}
        <div className='fixed inset-0 -z-10 overflow-hidden pointer-events-none'>
          <div className='absolute top-0 right-0 w-96 h-96 bg-red-200/20 rounded-full blur-3xl' />
          <div className='absolute bottom-0 left-0 w-96 h-96 bg-red-300/20 rounded-full blur-3xl' />
        </div>
      </body>
    </html>
  )
}
