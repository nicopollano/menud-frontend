'use client'
import { BRANCH_TAB_BAR_ROUTES } from '@/modules/branches/constants/branch-tab-bar.const'
import { useNavigationParams } from '@/modules/shared/hooks/use-navigation-params'
import { MenuButton } from '@ristokit/ui/components/button'
import { ScrollArea, ScrollBar } from '@ristokit/ui/components/scroll-area'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function BranchTabBar() {
  const pathname = usePathname()
  const { businessId, branchId } = useNavigationParams()

  return (
    <ScrollArea className='-my-2.5 grid'>
      <nav className='px-1 py-2.5'>
        <ul className='flex items-center gap-x-2.5'>
          {BRANCH_TAB_BAR_ROUTES.map((route) => (
            <li key={route.label}>
              <MenuButton isActive={route.href(businessId, branchId) === pathname} asChild>
                <Link href={route.href(businessId, branchId)}>{route.label}</Link>
              </MenuButton>
            </li>
          ))}
        </ul>
      </nav>
      <ScrollBar orientation='horizontal' />
    </ScrollArea>
  )
}

export { BranchTabBar }
