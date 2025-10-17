'use client'
import { fadeInVariants } from '@/lib/motion/motion.variant'
import { motion } from 'framer-motion'

interface BranchesTemplateProps {
  children: React.ReactNode
}

function BranchesTemplate({ children }: BranchesTemplateProps) {
  return (
    <motion.div className='grid grow' variants={fadeInVariants} initial='initial' animate='animate'>
      {children}
    </motion.div>
  )
}

export default BranchesTemplate
