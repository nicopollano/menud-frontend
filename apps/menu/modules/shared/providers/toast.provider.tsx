'use client'

import { Toast, ToastContainer, type ToastProps } from '@ristokit/ui/components/toast'
import { createContext, useCallback, useContext, useState } from 'react'

interface ToastContextType {
  toast: (props: Omit<ToastProps, 'id' | 'onClose'>) => void
  success: (title: string, description?: string) => void
  error: (title: string, description?: string) => void
  warning: (title: string, description?: string) => void
  info: (title: string, description?: string) => void
}

const ToastContext = createContext<ToastContextType | null>(null)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const toast = useCallback(
    (props: Omit<ToastProps, 'id' | 'onClose'>) => {
      const id = Math.random().toString(36).substring(7)
      const newToast: ToastProps = {
        ...props,
        id,
        onClose: () => removeToast(id)
      }
      setToasts((prev) => [...prev, newToast])
    },
    [removeToast]
  )

  const success = useCallback(
    (title: string, description?: string) => {
      toast({ title, description, variant: 'success' })
    },
    [toast]
  )

  const error = useCallback(
    (title: string, description?: string) => {
      toast({ title, description, variant: 'error' })
    },
    [toast]
  )

  const warning = useCallback(
    (title: string, description?: string) => {
      toast({ title, description, variant: 'warning' })
    },
    [toast]
  )

  const info = useCallback(
    (title: string, description?: string) => {
      toast({ title, description, variant: 'info' })
    },
    [toast]
  )

  return (
    <ToastContext.Provider value={{ toast, success, error, warning, info }}>
      {children}
      <ToastContainer>
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} />
        ))}
      </ToastContainer>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}
