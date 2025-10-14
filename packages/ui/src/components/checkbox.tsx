'use client'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { CheckIcon } from '@ristokit/ui/icons/check.icon'
import { cn } from '@ristokit/ui/lib/utils'
import type * as React from 'react'

function Checkbox({ className, ...props }: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot='checkbox'
      className={cn(
        'peer size-4 shrink-0 rounded-[0.25rem] border border-primary outline-none transition-shadow focus-visible:border-primary focus-visible:ring-[0.1875rem] focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-red-500 aria-invalid:ring-red-500/20 data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-background [&>span>svg]:size-4 [&>span>svg]:stroke-primary',
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot='checkbox-indicator'
        className='flex items-center justify-center text-current transition-none'
      >
        <CheckIcon />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
