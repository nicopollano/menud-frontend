'use client'
import { OverlayMotion } from '@/modules/shared/components/overlay/overlay-motion'
import { useToggle } from '@/modules/shared/hooks/use-toggle'
import { Button } from '@ristokit/ui/components/button'
import { PlusIcon } from '@ristokit/ui/icons/plus.icon'
import { cn } from '@ristokit/ui/lib/utils'
import { AnimatePresence, type Variants, motion } from 'motion/react'

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
        className={cn(
          'pointer-events-none fixed right-4 bottom-[10rem] z-50 flex flex-col items-end gap-y-2.5',
          isOpenMenu && 'pointer-events-auto'
        )}
      >
        <AnimatePresence>
          {actions.map(({ id, component: Component }) => (
            <motion.div
              key={id}
              onClick={closeMenu}
              variants={drawerVariants}
              initial='default'
              animate={isOpenMenu ? 'open' : 'default'}
              exit='close'
            >
              <Component />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <Button
        onClick={toggleMenu}
        className={cn('fixed right-4 bottom-[4.375rem] z-50 size-20 rounded-full', isOpenMenu && 'bg-text')}
      >
        <PlusIcon
          className={cn('size-12 stroke-1 stroke-background transition duration-300', isOpenMenu && '-rotate-45')}
        />
      </Button>
    </>
  )
}

export { MoreActionsWidget }
