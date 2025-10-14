import { cn } from '@ristokit/ui/lib/utils'
import type * as React from 'react'

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot='textarea'
      className={cn(
        'field-sizing-content w-full resize-none rounded-sm focus:border-none focus:outline-none',
        'peer h-[6.25rem] bg-gray-light px-5 py-[1.625rem] text-body-mobile-2 text-text placeholder-shown:pt-[1.125rem]',
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
