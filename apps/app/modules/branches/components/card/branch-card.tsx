'use client'
import { DeleteBranchAlertDialog } from '@/modules/branches/components/alert-dialog/delete-branch-alert-dialog'
import { CopyBranchButton } from '@/modules/branches/components/buttons/copy-branch-button'
import { MoveBranchDrawer } from '@/modules/branches/components/drawer/move-branch-drawer'
import { UpdateBranchDrawer } from '@/modules/branches/components/drawer/update-branch-drawer'
import { pluralize } from '@/modules/shared/helpers/text.helper'
import { useNavigationParams } from '@/modules/shared/hooks/use-navigation-params'
import { ROUTES } from '@/modules/shared/lib/routes'
import type { Branch } from '@ristokit/shared/models/branch.model'
import { Badge } from '@ristokit/ui/components/badge'
import { EditIcon } from '@ristokit/ui/icons/edit.icon'
import { MoveIcon } from '@ristokit/ui/icons/move.icon'
import { RemoveIcon } from '@ristokit/ui/icons/remove.icon'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface BranchCardProps {
  branch: Branch
}

function BranchCard({ branch }: BranchCardProps) {
  const { businessId } = useNavigationParams()
  const router = useRouter()
  const navigateTo = (to: string) => router.push(to)

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
    <article
      onClick={() => navigateTo(ROUTES.BRANCH_MENUS(businessId, branch.id))}
      className='grid cursor-pointer gap-y-5 rounded-sm bg-gray-light px-4 py-5'
    >
      <div className='flex items-center justify-between gap-x-2'>
        <div className='relative size-[3.875rem] rounded-sm bg-secondary'>
          <Image
            src={branch.logo || '#'}
            alt={branch.name}
            fill
            className='overflow-hidden rounded-sm object-cover object-center'
          />
        </div>
        {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
        <div onClick={(ev) => ev.stopPropagation()} className='flex items-center gap-x-5'>
          <MoveBranchDrawer branch={branch}>
            <button type='button'>
              <MoveIcon className='size-6 stroke-text' />
            </button>
          </MoveBranchDrawer>
          <CopyBranchButton branch={branch} />
          <UpdateBranchDrawer branch={branch}>
            <button type='button'>
              <EditIcon className='size-6 stroke-text' />
            </button>
          </UpdateBranchDrawer>
          <DeleteBranchAlertDialog branch={branch}>
            <button type='button'>
              <RemoveIcon className='size-6 stroke-text' />
            </button>
          </DeleteBranchAlertDialog>
        </div>
      </div>
      <Badge variant={branch.enabled ? 'default' : 'disabled'}>{branch.enabled ? 'Activo' : 'Inactivo'}</Badge>
      <footer className='grid gap-y-2.5'>
        <h3 className='flex flex-wrap items-center gap-x-2.5 gap-y-1 text-heading-mobile-3 text-text'>
          {branch.name}{' '}
          <span className='text-body-mobile-4 text-gray-dark'>
            ({branch.summary?.totalMenus}){' '}
            {pluralize({ count: branch.summary?.totalMenus || 0, singular: 'menú', plural: 'menús' })}
          </span>
        </h3>
        <p className='line-clamp-3 text-body-mobile-3 text-gray-dark'>{branch.description}</p>
      </footer>
    </article>
  )
}

export { BranchCard }
