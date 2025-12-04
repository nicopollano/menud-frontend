'use client'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@ristokit/ui/lib/utils'
import { type VariantProps, cva } from 'class-variance-authority'
import { motion } from 'framer-motion'
import type * as React from 'react'

const buttonVariants = cva(
  [
    // Base styles - 2025 modern
    'inline-flex shrink-0 items-center justify-center gap-2',
    'whitespace-nowrap font-medium',
    'transition-all duration-300 ease-out',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-60',
    '[&_svg]:shrink-0 [&_svg]:transition-transform [&_svg]:duration-200'
  ],
  {
    variants: {
      variant: {
        // Primary - Modern gradient with shadow
        primary: [
          'bg-gradient-to-r from-primary-600 to-primary-500',
          'text-white shadow-soft-md',
          'hover:from-primary-700 hover:to-primary-600 hover:shadow-soft-lg hover:scale-[1.02]',
          'active:scale-95',
          'focus-visible:ring-primary-500'
        ],

        // Secondary - Soft neutral
        secondary: [
          'bg-neutral-100 text-neutral-900 shadow-soft-sm',
          'hover:bg-neutral-200 hover:shadow-soft-md hover:scale-[1.02]',
          'active:scale-95',
          'focus-visible:ring-neutral-400'
        ],

        // Outline - Clean border
        outline: [
          'border-2 border-neutral-300 bg-background text-text',
          'hover:border-primary-500 hover:text-primary-600 hover:shadow-soft-sm hover:scale-[1.02]',
          'active:scale-95',
          'focus-visible:ring-primary-500'
        ],

        // Ghost - Minimal
        ghost: [
          'bg-transparent text-text',
          'hover:bg-neutral-100 hover:text-primary-600',
          'active:bg-neutral-200',
          'focus-visible:ring-neutral-400'
        ],

        // Destructive - Error state
        destructive: [
          'bg-error-500 text-white shadow-soft-md',
          'hover:bg-error-600 hover:shadow-soft-lg hover:scale-[1.02]',
          'active:scale-95',
          'focus-visible:ring-error-500'
        ],

        // Icon - For icon-only buttons
        icon: [
          'bg-neutral-50 border border-neutral-200',
          'hover:bg-neutral-100 hover:border-neutral-300 hover:shadow-soft-sm hover:scale-110',
          'active:scale-95',
          'focus-visible:ring-neutral-400'
        ],

        // Link - Text button
        link: [
          'text-primary-600 underline-offset-4',
          'hover:underline hover:text-primary-700',
          'focus-visible:ring-primary-500',
          '[&_svg]:size-[1.125rem]'
        ],

        // Tab - For tab navigation
        tab: [
          'bg-transparent border-2 border-transparent text-neutral-600',
          'hover:bg-neutral-50 hover:text-neutral-900',
          'data-[state=active]:border-primary-500 data-[state=active]:text-primary-600',
          'data-[state=active]:bg-primary-50/50',
          'focus-visible:ring-primary-500'
        ],

        // Navigation menu - Bottom nav style
        'navigation-menu': [
          'flex flex-col gap-y-1 items-center justify-center',
          'bg-neutral-50 text-neutral-600 rounded-lg',
          'hover:bg-neutral-100 hover:text-neutral-900',
          'data-[state=active]:bg-primary-50 data-[state=active]:text-primary-600',
          'focus-visible:ring-primary-500',
          '[&>svg]:size-6'
        ],

        // Styless - No styles
        styless: 'gap-0 rounded-none'
      },

      size: {
        sm: 'h-9 px-3 text-sm rounded-lg',
        md: 'h-11 px-4 text-base rounded-xl',
        lg: 'h-12 md:h-14 px-5 md:px-6 text-base md:text-lg rounded-xl md:rounded-2xl',
        icon: 'size-10 rounded-lg',
        'icon-sm': 'size-8 rounded-lg',
        'icon-lg': 'size-12 md:size-14 rounded-xl',
        styless: 'h-auto'
      },

      state: {
        default: '',
        active: ''
      }
    },
    compoundVariants: [
      {
        variant: 'tab',
        state: 'active',
        className: 'border-primary-500 text-primary-600 bg-primary-50/50'
      }
    ],
    defaultVariants: {
      variant: 'primary',
      size: 'md'
    }
  }
)

function Button({
  className,
  variant,
  size,
  state,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return <Comp data-slot='button' className={cn(buttonVariants({ variant, size, state }), className)} {...props} />
}

function UploaderButton({
  className,
  placeholder = 'Subir imagenes',
  ...props
}: React.ComponentProps<'button'> & {
  placeholder?: string
}) {
  return (
    <Button
      className={cn(
        'h-20 md:h-24 flex-col gap-2',
        'rounded-xl md:rounded-2xl',
        'bg-neutral-50 border-2 border-dashed border-neutral-300',
        'text-sm md:text-base text-neutral-700',
        'hover:bg-neutral-100 hover:border-primary-400 hover:text-primary-700',
        'focus-visible:ring-primary-500',
        '[&>span]:text-xs [&>span]:md:text-sm [&>span]:text-neutral-500',
        className
      )}
      variant='styless'
      size='styless'
      type='button'
      {...props}
    >
      {placeholder} <span>png o jpg (máximo 5MB)</span>
    </Button>
  )
}

function MenuButton({
  className,
  isActive = false,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> & {
  asChild?: boolean
  isActive?: boolean
}) {
  const Comp = asChild ? Slot : 'button'

  return (
    <div className='relative grid'>
      <Comp
        data-slot='menu-button'
        className={cn(
          'h-9 md:h-10 px-4 md:px-5 py-2',
          'text-sm md:text-base font-medium',
          'text-neutral-600 transition-all duration-200',
          'hover:text-neutral-900',
          isActive && 'text-primary-600',
          className
        )}
        {...props}
      />
      {isActive && (
        <motion.span
          layoutId='menu-button-indicator'
          className={cn(
            'pointer-events-none absolute inset-0',
            'rounded-lg border-2 border-primary-500',
            'bg-primary-50/30 shadow-soft-sm'
          )}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      )}
    </div>
  )
}

export { Button, buttonVariants, UploaderButton, MenuButton }
