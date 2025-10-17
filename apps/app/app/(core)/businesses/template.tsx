'use client'
import { fadeInVariants } from '@/lib/motion/motion.variant'
import { motion } from 'framer-motion'

interface BusinessesTemplateProps {
  children: React.ReactNode
}

function BusinessesTemplate({ children }: BusinessesTemplateProps) {
  return (
    <motion.div className='grid grow' variants={fadeInVariants} initial='initial' animate='animate'>
      {children}
    </motion.div>
  )
}

export default BusinessesTemplate
