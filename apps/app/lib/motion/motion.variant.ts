import type { Variants } from 'motion/react'

export const fadeInVariants: Variants = {
  initial: { opacity: 0, transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] } },
  animate: { opacity: 1, transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] } }
}
