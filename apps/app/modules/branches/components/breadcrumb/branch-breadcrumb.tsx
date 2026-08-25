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
    <Breadcrumb className='py-4'>
      <BreadcrumbList className='gap-2 sm:gap-2'>
        <BreadcrumbItem>
          {isLoadingBusiness && <Skeleton className='min-h-5 min-w-24' />}
          {business?.name && (
            <BreadcrumbPage className='font-semibold text-neutral-900'>
              {business?.name}
            </BreadcrumbPage>
          )}
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>
            <BreadcrumbLink asChild>
              <Link 
                href={ROUTES.BUSINESS_BRANCHES(businessId)}
                className='text-neutral-500 hover:text-neutral-900 transition-colors'
              >
                Sucursales
              </Link>
            </BreadcrumbLink>
          </BreadcrumbPage>
        </BreadcrumbItem>
        {branchId && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <DropdownMenu>
                {isLoadingBranch && <Skeleton className='min-h-8 min-w-32 rounded-full' />}
                {branch?.name && (
                  <DropdownMenuTrigger
                    className={cn(
                      'flex items-center gap-1.5 h-8 px-3 rounded-full',
                      'bg-white border border-neutral-200',
                      'text-sm font-medium text-neutral-700',
                      'shadow-sm hover:shadow hover:bg-neutral-50 hover:border-neutral-300',
                      'transition-all duration-200 outline-none focus:ring-2 focus:ring-primary-100',
                      '[&>svg]:size-4 [&>svg]:text-neutral-400',
                      menuId && 'text-neutral-600 bg-neutral-50'
                    )}
                  >
                    {branch.name} <ArrowDownIcon />
                  </DropdownMenuTrigger>
                )}
                <DropdownMenuContent className='bg-white p-1 shadow-lg border-neutral-100 rounded-xl min-w-[200px]' align='start'>
                  {isLoadingBranches && <div className="p-2 text-sm text-neutral-500">Cargando...</div>}
                  {!isLoadingBranches && !branches?.length && <div className="p-2 text-sm text-neutral-500">Sin sucursales</div>}
                  {branches?.map((branch) => (
                    <DropdownMenuItem key={branch.id} asChild>
                      <Link 
                        href={ROUTES.BRANCH_MENUS(businessId, branch.id)} 
                        className='cursor-pointer rounded-lg px-3 py-2 text-sm hover:bg-neutral-50 focus:bg-neutral-50'
                      >
                        {branch.name}
                      </Link>
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
                {isLoadingMenu && <Skeleton className='min-h-8 min-w-32 rounded-full' />}
                {menu?.name && (
                  <DropdownMenuTrigger 
                    className={cn(
                      'flex items-center gap-1.5 h-8 px-3 rounded-full',
                      'bg-white border border-neutral-200',
                      'text-sm font-semibold text-neutral-900', // Current active item bolder
                      'shadow-sm hover:shadow hover:bg-neutral-50 hover:border-neutral-300',
                      'transition-all duration-200 outline-none focus:ring-2 focus:ring-primary-100',
                      '[&>svg]:size-4 [&>svg]:text-neutral-400'
                    )}
                  >
                    {menu.name} <ArrowDownIcon />
                  </DropdownMenuTrigger>
                )}
                <DropdownMenuContent className='bg-white p-1 shadow-lg border-neutral-100 rounded-xl min-w-[200px]' align='start'>
                  {isLoadingMenus && <div className="p-2 text-sm text-neutral-500">Cargando...</div>}
                  {!isLoadingMenus && !menus?.length && <div className="p-2 text-sm text-neutral-500">Sin menús</div>}
                  {menus?.map((menu) => (
                    <DropdownMenuItem key={menu.id} asChild>
                      <Link 
                        href={ROUTES.BRANCH_MENU(businessId, branchId, menu.id)} 
                        className='cursor-pointer rounded-lg px-3 py-2 text-sm hover:bg-neutral-50 focus:bg-neutral-50'
                      >
                        {menu.name}
                      </Link>
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
