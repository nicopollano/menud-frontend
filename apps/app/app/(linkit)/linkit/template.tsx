'use client'
import { fadeInVariants } from '@/lib/motion/motion.variant'
import { motion } from 'motion/react'

interface LinkitTemplateProps {
  children: React.ReactNode
}

function LinkitTemplate({ children }: LinkitTemplateProps) {
  return (
    <motion.div className='grid grow' variants={fadeInVariants} initial='initial' animate='animate'>
      {children}
    </motion.div>
  )
}

export default LinkitTemplate
