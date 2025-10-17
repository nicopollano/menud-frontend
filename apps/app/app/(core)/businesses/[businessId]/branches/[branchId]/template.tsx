'use client'
import { fadeInVariants } from '@/lib/motion/motion.variant'
import { motion } from 'framer-motion'

interface BranchTemplateProps {
  children: React.ReactNode
}

function BranchTemplate({ children }: BranchTemplateProps) {
  return (
    <motion.div className='grid grow' variants={fadeInVariants} initial='initial' animate='animate'>
      {children}
    </motion.div>
  )
}

export default BranchTemplate
