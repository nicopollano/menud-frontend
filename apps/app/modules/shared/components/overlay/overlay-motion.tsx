'use client'
import { AnimatePresence, type HTMLMotionProps, type Variants, motion } from 'framer-motion'
import type React from 'react'

const overlayVariants: Variants = {
  default: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4
    }
  },
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.4
    }
  }
}

interface OverlayMotionProps {
  visible: boolean
}

function OverlayMotion({ visible }: OverlayMotionProps) {
  return (
    <AnimatePresence>
      {visible &&
        // Use a small typed wrapper around motion.div to satisfy TypeScript
        (() => {
          type Props = React.HTMLAttributes<HTMLDivElement> & HTMLMotionProps<'div'>
          const MotionDiv = motion.div as unknown as React.FC<Props>

          return (
            <MotionDiv
              key='overlay-blur'
              variants={overlayVariants}
              initial='default'
              animate='visible'
              exit='hidden'
              className='fixed inset-0 z-40 bg-gradient-to-t from-secondary/70 to-transparent'
            />
          )
        })()}
    </AnimatePresence>
  )
}

export { OverlayMotion }
