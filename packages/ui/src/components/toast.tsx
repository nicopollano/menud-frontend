'use client'

import { cn } from '@ristokit/ui/lib/utils'
import { useEffect, useState } from 'react'

export interface ToastProps {
  id: string
  title?: string
  description?: string
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info'
  duration?: number
  onClose?: () => void
}

export function Toast({ id, title, description, variant = 'default', duration = 5000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    // Trigger animation on mount
    setTimeout(() => setIsVisible(true), 10)

    // Auto-dismiss after duration
    const timer = setTimeout(() => {
      handleClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration])

  const handleClose = () => {
    setIsExiting(true)
    setTimeout(() => {
      onClose?.()
    }, 300)
  }

  const variants = {
    default: 'bg-neutral-900 text-white border-neutral-700',
    success: 'bg-green-600 text-white border-green-500',
    error: 'bg-red-600 text-white border-red-500',
    warning: 'bg-orange-600 text-white border-orange-500',
    info: 'bg-blue-600 text-white border-blue-500'
  }

  const icons = {
    default: null,
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ'
  }

  return (
    <div
      role='alert'
      aria-live='polite'
      aria-atomic='true'
      className={cn(
        'flex items-start gap-3 p-4 rounded-xl border-2 shadow-2xl backdrop-blur-sm',
        'min-w-[320px] max-w-md',
        'transition-all duration-300 ease-out',
        variants[variant],
        isVisible && !isExiting ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      )}
    >
      {icons[variant] && (
        <div className='text-2xl flex-shrink-0' aria-hidden='true'>
          {icons[variant]}
        </div>
      )}
      <div className='flex-1 space-y-1'>
        {title && <div className='font-semibold text-sm'>{title}</div>}
        {description && <div className='text-sm opacity-90'>{description}</div>}
      </div>
      <button
        onClick={handleClose}
        className='flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity'
        aria-label='Cerrar notificación'
      >
        <svg className='size-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
        </svg>
      </button>
    </div>
  )
}

export function ToastContainer({ children }: { children: React.ReactNode }) {
  return (
    <div
      className='fixed top-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none'
      aria-label='Notificaciones'
      role='region'
    >
      <div className='pointer-events-auto'>{children}</div>
    </div>
  )
}
