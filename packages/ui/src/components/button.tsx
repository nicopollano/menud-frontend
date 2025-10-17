'use client'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@ristokit/ui/lib/utils'
import { type VariantProps, cva } from 'class-variance-authority'
import { motion } from 'framer-motion'
import type * as React from 'react'

const buttonVariants = cva(
  'rounded-xs disabled:bg-gray-dark disabled:text-background disabled:opacity-50 inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap outline-none transition duration-300 disabled:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-background hover:bg-text hover:text-background',
        secondary: 'bg-secondary text-primary',
        outline: 'border-text bg-background hover:border-primary text-text border',
        icon: 'bg-background border-primary rounded-xs border',
        styless: 'gap-0 rounded-none',
        tab: 'rounded-xs bg-background text-text text-body-mobile-3 hover:border-text/5 hover:shadow-tab hover:text-button-mobile-medium h-[1.875rem] border border-transparent px-5 py-[0.3125rem] transition duration-300',
        'navigation-menu':
          'bg-gray-light flex flex-col gap-y-0 items-center justify-center text-body-mobile-2 text-text p-5 max-h-[5.25rem] rounded-sm [&>svg]:size-6 [&>svg]:stroke-text',
        link: 'text-button-mobile-normal text-text flex justify-start gap-x-[0.3125rem] [&>svg]:size-[1.125rem] [&>svg]:stroke-text'
      },
      size: {
        normal: 'text-button-desktop-normal h-[3.125rem] px-6',
        medium: 'text-button-desktop-medium h-11 px-5',
        small: 'text-button-desktop-small h-9 px-[1.0625rem]',
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
        className: 'border-text/5 shadow-tab text-button-mobile-medium'
      }
    ],
    defaultVariants: {
      variant: 'primary',
      size: 'normal'
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
      className={cn('h-16 flex-col rounded-sm bg-gray-light text-body-mobile-3', className)}
      variant='styless'
      size='styless'
      type='button'
      {...props}
    >
      {placeholder} <span className='text-body-mobile-4 text-gray-dark'>png o jpg (máximo 5MB)</span>
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
          'h-[1.875rem] px-5 py-[0.3125rem] text-body-mobile-3 text-text',
          isActive && 'text-button-mobile-medium',
          className
        )}
        {...props}
      />
      {isActive && (
        <motion.span
          layoutId='menu-button-indicator'
          className='pointer-events-none absolute inset-0 rounded-xs border border-text/5 shadow-tab'
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      )}
    </div>
  )
}

export { Button, buttonVariants, UploaderButton, MenuButton }
