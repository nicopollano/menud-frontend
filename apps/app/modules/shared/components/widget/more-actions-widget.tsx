'use client'
import { OverlayMotion } from '@/modules/shared/components/overlay/overlay-motion'
import { useToggle } from '@/modules/shared/hooks/use-toggle'
import { Button } from '@ristokit/ui/components/button'
import { cn } from '@ristokit/ui/lib/utils'
import { AnimatePresence, type HTMLMotionProps, type Variants, motion } from 'framer-motion'

const drawerVariants: Variants = {
  default: {
    scale: 0,
    x: 110,
    y: 90
  },
  open: {
    scale: 1,
    x: 0,
    y: 0,
    transition: {
      type: 'spring',
      bounce: 0.5,
      duration: 0.8
    }
  },
  close: {
    scale: 0,
    x: 110,
    y: 90,
    transition: {
      duration: 0.15
    }
  }
}

export interface MoreActionsWidgetOptions {
  id: string
  component: () => React.JSX.Element
}

interface MoreActionsWidgetProps {
  actions: MoreActionsWidgetOptions[]
}

function MoreActionsWidget({ actions }: MoreActionsWidgetProps) {
  const { isOn: isOpenMenu, off: closeMenu, toggle: toggleMenu } = useToggle()

  return (
    <>
      <OverlayMotion visible={isOpenMenu} />
      <div
        style={{ zIndex: 10000 }}
        className={cn(
          'pointer-events-none fixed right-4 bottom-[10rem] flex flex-col items-end gap-y-2.5',
          isOpenMenu && 'pointer-events-auto'
        )}
      >
        <AnimatePresence>
          {actions.map(({ id, component: Component }) => {
            type Props = React.HTMLAttributes<HTMLDivElement> & HTMLMotionProps<'div'>
            const MotionDiv = motion.div as unknown as React.FC<Props>

            return (
              <MotionDiv
                key={id}
                onClick={closeMenu}
                variants={drawerVariants}
                initial='default'
                animate={isOpenMenu ? 'open' : 'default'}
                exit='close'
              >
                <Component />
              </MotionDiv>
            )
          })}
        </AnimatePresence>
      </div>
      <Button
        onClick={toggleMenu}
        variant='primary'
        style={{ zIndex: 10000, backgroundColor: isOpenMenu ? 'white' : '#fa5252' }}
        className={cn(
          'fixed right-4 bottom-[4.375rem] size-20 rounded-full',
          'shadow-xl hover:shadow-2xl',
          'transition-all duration-300',
          // Default state (Closed): Red bg, White icon
          !isOpenMenu && '!text-white border-none',
          // Active state (Open): White bg, Dark icon, Border
          isOpenMenu && 'rotate-45 !text-neutral-900 border-2 border-neutral-200 hover:!bg-neutral-50'
        )}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={3}
          stroke='currentColor'
          className='size-10'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
        </svg>
      </Button>
    </>
  )
}

export { MoreActionsWidget }
