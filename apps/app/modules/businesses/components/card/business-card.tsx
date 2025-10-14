'use client'
import { DeleteBusinessAlertDialog } from '@/modules/businesses/components/alert-dialog/delete-business-alert-dialog'
import { UpdateBusinessDrawer } from '@/modules/businesses/components/drawer/update-business-drawer'

import { pluralize } from '@/modules/shared/helpers/text.helper'
import { ROUTES } from '@/modules/shared/lib/routes'
import type { Business } from '@ristokit/shared/models/business.model'
import { Badge } from '@ristokit/ui/components/badge'
import { EditIcon } from '@ristokit/ui/icons/edit.icon'
import { RemoveIcon } from '@ristokit/ui/icons/remove.icon'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface BusinessCardProps {
  business: Business
}

function BusinessCard({ business }: BusinessCardProps) {
  const router = useRouter()
  const navigateTo = (to: string) => router.push(to)

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
    <article
      onClick={() => navigateTo(ROUTES.BUSINESS_BRANCHES(business.id))}
      className='grid cursor-pointer gap-y-5 rounded-sm bg-gray-light px-4 py-5'
    >
      <div className='flex items-center justify-between gap-x-2'>
        <div className='relative size-[3.875rem] rounded-sm bg-secondary'>
          <Image
            src={business.logo || '#'}
            alt={business.name}
            fill
            className='overflow-hidden rounded-sm object-cover object-center'
          />
        </div>
        {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
        <div className='flex items-center gap-x-5' onClick={(ev) => ev.stopPropagation()}>
          <UpdateBusinessDrawer business={business}>
            <button type='button'>
              <EditIcon className='size-6 stroke-text' />
            </button>
          </UpdateBusinessDrawer>
          <DeleteBusinessAlertDialog business={business}>
            <button type='button'>
              <RemoveIcon className='size-6 stroke-text' />
            </button>
          </DeleteBusinessAlertDialog>
        </div>
      </div>
      <Badge variant={business.enabled ? 'default' : 'disabled'}>{business.enabled ? 'Activo' : 'Inactivo'}</Badge>
      <footer className='grid gap-y-2.5'>
        <h3 className='flex flex-wrap items-center gap-x-2.5 gap-y-1 text-heading-mobile-3 text-text'>
          {business.name}{' '}
          <span className='text-body-mobile-4 text-gray-dark'>
            ({business.summary?.totalBranches}){' '}
            {pluralize({ count: business.summary?.totalBranches || 0, singular: 'sucursal', plural: 'sucursales' })}
          </span>
        </h3>
        <p className='line-clamp-3 text-body-mobile-3 text-gray-dark'>{business.description}</p>
      </footer>
    </article>
  )
}

export { BusinessCard }
