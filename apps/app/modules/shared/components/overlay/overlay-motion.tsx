'use client'
import { AnimatePresence, type Variants, motion } from 'motion/react'

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
      {visible && (
        <motion.div
          key='overlay-blur'
          variants={overlayVariants}
          initial='default'
          animate='visible'
          exit='hidden'
          className='fixed inset-0 z-40 bg-gradient-to-t from-secondary/70 to-transparent'
        />
      )}
    </AnimatePresence>
  )
}

export { OverlayMotion }
