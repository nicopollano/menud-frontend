'use client'

import { SignInForm } from '@/modules/auth/components/form/sign-in-form'
import { Card } from '@ristokit/ui/components/card'
import { LogoIcon } from '@ristokit/ui/icons/logo.icon'
import { motion } from 'framer-motion'
import { ChefHatIcon, CoffeeIcon, CroissantIcon, PizzaIcon, UtensilsIcon, WineIcon } from 'lucide-react'

function AuthSignInPage() {
  return (
    <main className='relative flex min-h-dvh items-center justify-center overflow-hidden bg-gradient-to-br from-neutral-50 via-background to-primary-50/30 p-4'>
      {/* Animated Background Elements - Restaurant Theme */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <FloatingIcon icon={PizzaIcon} className='left-[10%] top-[20%] text-primary-200' delay={0} />
        <FloatingIcon icon={CoffeeIcon} className='right-[15%] top-[15%] text-orange-200' delay={2} />
        <FloatingIcon icon={UtensilsIcon} className='left-[20%] bottom-[20%] text-neutral-200' delay={4} />
        <FloatingIcon icon={ChefHatIcon} className='right-[25%] bottom-[25%] text-primary-100' delay={1} />
        <FloatingIcon icon={CroissantIcon} className='left-[5%] bottom-[40%] text-yellow-200' delay={3} />
        <FloatingIcon icon={WineIcon} className='right-[5%] top-[40%] text-red-200' delay={5} />
      </div>

      {/* Subtle Red Lights / Glows - Intensified */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] bg-primary-500/20 blur-[100px] rounded-full mix-blend-multiply' />
        <div className='absolute left-1/2 top-0 -translate-x-1/2 h-[400px] w-[900px] bg-gradient-to-b from-primary-500/10 to-transparent blur-3xl' />
      </div>

      <section className='relative z-10 mx-auto flex w-full max-w-[480px] flex-col items-center'>
        <div className='mb-6 flex flex-col items-center text-center'>
          <div className='mb-2'>
            <LogoIcon className='h-[123px] w-[123px] text-primary-600 drop-shadow-sm' />
          </div>
        </div>

        <div className='w-full max-w-[400px]'>
          <div className='flex flex-col gap-8'>
            <SignInForm />
          </div>
        </div>

        <p className='mt-8 text-center text-sm text-neutral-600 font-medium'>
          ¿No tienes una cuenta?{' '}
          <a
            href='#'
            className='font-semibold text-primary-600 hover:text-primary-700 hover:underline transition-colors'
          >
            Contactar soporte
          </a>
        </p>
      </section>
    </main>
  )
}

export default AuthSignInPage

function FloatingIcon({ icon: Icon, className, delay }: { icon: any; className?: string; delay: number }) {
  return (
    <motion.div
      className={`absolute ${className}`}
      initial={{ opacity: 0, y: 0 }}
      animate={{
        y: [-20, 20, -20],
        rotate: [0, 10, -10, 0],
        opacity: [0.2, 0.5, 0.2]
      }}
      transition={{
        duration: 5,
        repeat: Number.POSITIVE_INFINITY,
        ease: 'easeInOut',
        delay: delay
      }}
    >
      <Icon className='h-24 w-24 opacity-20' />
    </motion.div>
  )
}
