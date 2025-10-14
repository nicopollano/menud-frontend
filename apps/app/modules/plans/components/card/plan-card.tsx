'use client'
import { Badge } from '@ristokit/ui/components/badge'
import { Button } from '@ristokit/ui/components/button'
import { cn } from '@ristokit/ui/lib/utils'

function PlanCardRoot({ className, ...props }: React.ComponentProps<'article'>) {
  return (
    <article
      className={cn(
        'grid gap-y-[1.875rem] rounded-sm bg-gray-light px-4 py-10 transition-colors duration-300',
        className
      )}
      {...props}
    />
  )
}

function PlanCardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('grid gap-y-5', className)} {...props} />
}

function PlanCardTitle({ className, ...props }: React.ComponentProps<'header'>) {
  return <header className={cn('grid gap-y-2', className)} {...props} />
}

function PlanCardName({ className, ...props }: React.ComponentProps<'h3'>) {
  return (
    <h3
      className={cn(
        'flex items-center gap-x-5 text-heading-desktop-4 text-text transition-colors duration-300 first-letter:uppercase',
        className
      )}
      {...props}
    />
  )
}

function PlanCardBadge({ className, ...props }: React.ComponentProps<'span'>) {
  return <Badge className={cn(className)} {...props} />
}

function PlanCardDescription({ className, ...props }: React.ComponentProps<'p'>) {
  return <p className={cn('text-body-mobile-3 text-gray-dark transition duration-300', className)} {...props} />
}

function PlanCardPrice({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      className={cn('flex items-center text-heading-desktop-1 text-text transition-colors duration-300', className)}
      {...props}
    />
  )
}

function PlanCardCurrency({ className, ...props }: React.ComponentProps<'span'>) {
  return <span className={cn('font-normal text-heading-desktop-3', className)} {...props} />
}

function PlanCardAction({ className, ...props }: React.ComponentProps<'button'>) {
  return <Button className={cn('bg-text hover:bg-primary', className)} {...props} />
}

function PlanCardFeatures({ className, ...props }: React.ComponentProps<'ul'>) {
  return <ul className={cn('grid gap-y-2.5', className)} {...props} />
}

function PlanCardFeature({ className, ...props }: React.ComponentProps<'li'>) {
  return <li className={cn('flex items-center gap-x-2.5 text-body-mobile-3 text-gray-dark', className)} {...props} />
}

const PlanCard = Object.assign(PlanCardRoot, {
  Root: PlanCardRoot,
  Header: PlanCardHeader,
  Title: PlanCardTitle,
  Name: PlanCardName,
  Badge: PlanCardBadge,
  Description: PlanCardDescription,
  Price: PlanCardPrice,
  Currency: PlanCardCurrency,
  Action: PlanCardAction,
  Features: PlanCardFeatures,
  Feature: PlanCardFeature
})

export { PlanCard }
