'use client'
import * as SwitchPrimitive from '@radix-ui/react-switch'
import { cn } from '@ristokit/ui/lib/utils'
import { type VariantProps, cva } from 'class-variance-authority'
import type * as React from 'react'

export const switchVariants = cva(
  'data-[state=checked]:bg-primary data-[state=unchecked]:bg-gray-dark peer inline-flex h-[1.875rem] w-[3.9375rem] shrink-0 items-center rounded-full outline-none transition-all disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      size: {
        normal: 'h-[1.875rem] w-[3.9375rem]',
        small: 'h-[1.3125rem] w-[2.75rem]'
      }
    },
    defaultVariants: {
      size: 'normal'
    }
  }
)

export const switchThumbVariants = cva(
  'bg-background pointer-events-none block rounded-full ring-0 transition-transform',
  {
    variants: {
      size: {
        normal:
          'size-[1.625rem] data-[state=checked]:translate-x-[calc(150%-0.25rem)] data-[state=unchecked]:translate-x-0.5',
        small:
          'size-[0.9375rem] data-[state=checked]:translate-x-[calc(200%-0.25rem)] data-[state=unchecked]:translate-x-[0.1875rem]'
      }
    },
    defaultVariants: {
      size: 'normal'
    }
  }
)

interface SwitchProps extends React.ComponentProps<typeof SwitchPrimitive.Root>, VariantProps<typeof switchVariants> {}

function Switch({ className, size, ...props }: SwitchProps) {
  return (
    <SwitchPrimitive.Root data-slot='switch' className={cn(switchVariants({ size, className }))} {...props}>
      <SwitchPrimitive.Thumb data-slot='switch-thumb' className={cn(switchThumbVariants({ size, className }))} />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
