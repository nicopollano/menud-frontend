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
      className={cn('border-b last:border-b-0', className)}
      {...props}
    />
  )
}

function AccordionTrigger({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Trigger
      data-slot='accordion-trigger'
      className={cn(
        'flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left font-medium text-sm outline-none transition-all hover:underline focus-visible:border-neutral-950 focus-visible:ring-[0.1875rem] focus-visible:ring-neutral-950/50 disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:border-neutral-300 dark:focus-visible:ring-neutral-300/50 [&[data-state=open]>svg]:rotate-180',
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
      className='overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down'
      {...props}
    >
      <div className={cn('pt-0 pb-4', className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger }
