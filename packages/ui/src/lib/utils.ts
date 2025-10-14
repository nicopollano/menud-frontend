import { type ClassValue, clsx } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: [
        'heading-desktop-1',
        'heading-desktop-2',
        'heading-desktop-3',
        'heading-desktop-4',
        'heading-mobile-1',
        'heading-mobile-2',
        'heading-mobile-3',
        'heading-mobile-4',
        'body-desktop-1',
        'body-desktop-2',
        'body-desktop-3',
        'body-desktop-4',
        'body-desktop-1',
        'body-desktop-2',
        'body-desktop-3',
        'body-desktop-4',
        'body-mobile-1',
        'body-mobile-2',
        'body-mobile-3',
        'body-mobile-4',
        'button-desktop-normal',
        'button-desktop-medium',
        'button-desktop-small',
        'button-mobile-normal',
        'button-mobile-medium',
        'button-mobile-small'
      ]
    }
  }
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
