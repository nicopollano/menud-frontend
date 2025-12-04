'use client'
import { useTheme } from 'next-themes'
import { Toaster as Sonner, type ToasterProps, toast } from 'sonner'

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className='toaster group'
      position='bottom-right'
      expand
      toastOptions={{
        unstyled: true,
        classNames: {
          toast: 'group toast w-full flex items-center gap-2',
          description: 'group-[.toast]:text-neutral-500',
          actionButton: 'group-[.toast]:bg-neutral-900 group-[.toast]:text-neutral-50',
          cancelButton: 'group-[.toast]:bg-neutral-100 group-[.toast]:text-neutral-500'
        }
      }}
      {...props}
    />
  )
}

export { Toaster, toast }
