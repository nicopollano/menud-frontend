import { cn } from '@ristokit/ui/lib/utils'
import { type VariantProps, cva } from 'class-variance-authority'
import type * as React from 'react'

export const inputVariants = cva(
  'aria-[invalid=true]:border-error w-full rounded-sm border border-transparent transition-colors duration-300 focus:outline-none disabled:pointer-events-none disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        default: 'bg-gray-light text-body-mobile-2 placeholder:text-gray-dark text-text h-[3.5rem] px-5',
        search:
          'text-text border-primary placeholder:text-gray-dark text-body-desktop-4 h-[3.125rem] border pl-[3.5rem] focus:border',
        field: 'bg-gray-light text-text text-body-mobile-2 peer h-14 px-5 pb-2.5 pt-[1.625rem] placeholder-shown:py-0'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)

export interface InputProps extends React.ComponentProps<'input'>, VariantProps<typeof inputVariants> {}

function Input({ className, type, variant, ...props }: InputProps) {
  return <input type={type} data-slot='input' className={cn(inputVariants({ variant, className }))} {...props} />
}

export { Input }
