'use client'
import { fadeInVariants } from '@/lib/motion/motion.variant'
import { motion } from 'framer-motion'

interface MenuTemplateProps {
  children: React.ReactNode
}

function MenuTemplate({ children }: MenuTemplateProps) {
  return (
    <motion.div className='grid grow' variants={fadeInVariants} initial='initial' animate='animate'>
      {children}
    </motion.div>
  )
}

export default MenuTemplate
