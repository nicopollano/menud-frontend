'use client'
import { fadeInVariants } from '@/lib/motion/motion.variant'
import { motion } from 'motion/react'

interface ProfileTemplateProps {
  children: React.ReactNode
}

function ProfileTemplate({ children }: ProfileTemplateProps) {
  return (
    <motion.div className='grid grow' variants={fadeInVariants} initial='initial' animate='animate'>
      {children}
    </motion.div>
  )
}

export default ProfileTemplate
