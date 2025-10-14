'use client'
import { useBranch } from '@/modules/branches/hooks/use-branch'
import { useBranches } from '@/modules/branches/hooks/use-branches'
import { useBusiness } from '@/modules/businesses/hooks/use-business'
import { useMenu } from '@/modules/menus/hooks/use-menu'
import { useMenus } from '@/modules/menus/hooks/use-menus'
import { useNavigationParams } from '@/modules/shared/hooks/use-navigation-params'
import { ROUTES } from '@/modules/shared/lib/routes'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@ristokit/ui/components/breadcrumb'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@ristokit/ui/components/dropdown-menu'
import { Skeleton } from '@ristokit/ui/components/skeleton'
import { ArrowDownIcon } from '@ristokit/ui/icons/arrow-down.icon'
import { cn } from '@ristokit/ui/lib/utils'
import Link from 'next/link'

function BranchBreadcrumb() {
  const { businessId, branchId, menuId } = useNavigationParams()

  const { data: business, isLoading: isLoadingBusiness } = useBusiness({
    businessId
  })
  const { data: branches, isLoading: isLoadingBranches } = useBranches({
    businessId,
    canRequest: !!businessId
  })
  const { data: branch, isLoading: isLoadingBranch } = useBranch({
    businessId,
    branchId,
    canRequest: !!(businessId && branchId)
  })
  const { data: menus, isLoading: isLoadingMenus } = useMenus({
    businessId,
    branchId,
    canRequest: !!(businessId && branchId && menuId)
  })
  const { data: menu, isLoading: isLoadingMenu } = useMenu({
    businessId,
    branchId,
    menuId,
    canRequest: !!(businessId && branchId && menuId)
  })

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          {isLoadingBusiness && <Skeleton className='min-h-5 min-w-24' />}
          {business?.name && <BreadcrumbPage>{business?.name}</BreadcrumbPage>}
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>
            <BreadcrumbLink asChild>
              <Link href={ROUTES.BUSINESS_BRANCHES(businessId)}>Sucursales</Link>
            </BreadcrumbLink>
          </BreadcrumbPage>
        </BreadcrumbItem>
        {branchId && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <DropdownMenu>
                {isLoadingBranch && <Skeleton className='min-h-5 min-w-20' />}
                {branch?.name && (
                  <DropdownMenuTrigger
                    className={cn(
                      'flex items-center text-body-mobile-3 text-text [&>svg]:size-5 [&>svg]:stroke-text',
                      menuId && 'text-gray-dark [&>svg]:stroke-gray-dark'
                    )}
                  >
                    {branch.name} <ArrowDownIcon />
                  </DropdownMenuTrigger>
                )}
                <DropdownMenuContent className='bg-background' align='start'>
                  {isLoadingBranches && 'Cargando sucursales...'}
                  {!isLoadingBranches && !branches?.length && 'Sin sucursales'}
                  {branches?.map((branch) => (
                    <DropdownMenuItem key={branch.id} asChild>
                      <BreadcrumbLink asChild>
                        <Link href={ROUTES.BRANCH_MENUS(businessId, branch.id)} className='cursor-pointer'>
                          {branch.name}
                        </Link>
                      </BreadcrumbLink>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
          </>
        )}
        {menuId && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <DropdownMenu>
                {isLoadingMenu && <Skeleton className='min-h-5 min-w-20' />}
                {menu?.name && (
                  <DropdownMenuTrigger className='flex items-center text-body-mobile-3 text-text [&>svg]:size-5 [&>svg]:stroke-text'>
                    {menu.name} <ArrowDownIcon />
                  </DropdownMenuTrigger>
                )}
                <DropdownMenuContent className='bg-background' align='start'>
                  {isLoadingMenus && 'Cargando menús...'}
                  {!isLoadingMenus && !menus?.length && 'Sin menús'}
                  {menus?.map((menu) => (
                    <DropdownMenuItem key={menu.id} asChild>
                      <BreadcrumbLink asChild>
                        <Link href={ROUTES.BRANCH_MENU(businessId, branchId, menu.id)} className='cursor-pointer'>
                          {menu.name}
                        </Link>
                      </BreadcrumbLink>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export { BranchBreadcrumb }
