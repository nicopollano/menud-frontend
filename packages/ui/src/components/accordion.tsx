'use client'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { cn } from '@ristokit/ui/lib/utils'
import type * as React from 'react'

function Accordion({ ...props }: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot='accordion' {...props} />
}

function AccordionItem({ className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot='accordion-item'
      className={cn('border-b-2 border-neutral-200 last:border-b-0', 'transition-colors duration-200', className)}
      {...props}
    />
  )
}

function AccordionTrigger({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Trigger
      data-slot='accordion-trigger'
      className={cn(
        // Layout & spacing - 2025 modern
        'flex flex-1 items-center justify-between gap-3',
        'py-4 md:py-5',
        'text-left',
        // Typography
        'text-base md:text-lg font-semibold text-text',
        // States
        'outline-none transition-all duration-300 ease-out',
        'hover:text-primary-600',
        'focus-visible:text-primary-600 focus-visible:ring-2 focus-visible:ring-primary-500/20',
        'disabled:pointer-events-none disabled:opacity-60',
        // Icon rotation
        '[&[data-state=open]>svg]:rotate-180',
        '[&>svg]:size-5 [&>svg]:shrink-0 [&>svg]:transition-transform [&>svg]:duration-300',
        className
      )}
      {...props}
    >
      {children}
    </AccordionPrimitive.Trigger>
  )
}

function AccordionContent({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot='accordion-content'
      className='overflow-hidden text-sm md:text-base text-neutral-700 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down'
      {...props}
    >
      <div className={cn('pt-0 pb-4 md:pb-5 leading-relaxed', className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger }
