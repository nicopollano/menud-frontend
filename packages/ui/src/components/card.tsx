import { cn } from '@ristokit/ui/lib/utils'
import { type VariantProps, cva } from 'class-variance-authority'
import type * as React from 'react'

export const cardVariants = cva(
  [
    // Base styles - 2025 modern
    'flex flex-col',
    'bg-background text-text',
    'transition-all duration-300 ease-out'
  ],
  {
    variants: {
      variant: {
        // Default - Soft card with border and shadow
        default: ['rounded-xl md:rounded-2xl', 'border border-neutral-200', 'shadow-soft-sm', 'hover:shadow-soft-md'],

        // Elevated - Card with more prominent shadow
        elevated: ['rounded-xl md:rounded-2xl', 'border border-neutral-100', 'shadow-soft-md', 'hover:shadow-soft-lg'],

        // Outlined - Clean border, no shadow
        outlined: ['rounded-xl md:rounded-2xl', 'border-2 border-neutral-200', 'hover:border-neutral-300'],

        // Ghost - No border or shadow
        ghost: ['rounded-xl md:rounded-2xl', 'hover:bg-neutral-50']
      },

      padding: {
        none: '',
        sm: 'p-4 md:p-5',
        md: 'p-5 md:p-6',
        lg: 'p-6 md:p-8'
      }
    },
    defaultVariants: {
      variant: 'default',
      padding: 'md'
    }
  }
)

export interface CardProps extends React.ComponentProps<'div'>, VariantProps<typeof cardVariants> {}

function Card({ className, variant, padding, ...props }: CardProps) {
  return <div data-slot='card' className={cn(cardVariants({ variant, padding, className }))} {...props} />
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='card-header'
      className={cn(
        '@container/card-header',
        'grid auto-rows-min grid-rows-[auto_auto] items-start gap-2',
        'has-data-[slot=card-action]:grid-cols-[1fr_auto]',
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='card-title'
      className={cn('text-lg md:text-xl font-bold text-text leading-tight', className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='card-description'
      className={cn('text-sm md:text-base text-neutral-600 leading-relaxed', className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='card-action'
      className={cn('col-start-2 row-span-2 row-start-1 self-start justify-self-end', className)}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot='card-content' className={cn('', className)} {...props} />
}

function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot='card-footer' className={cn('flex items-center', className)} {...props} />
}

export { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle }
