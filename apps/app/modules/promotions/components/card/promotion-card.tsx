'use client'
import { DeletePromotionAlertDialog } from '@/modules/promotions/components/alert-dialog/delete-promotion-alert-dialog'
import { UpdatePromotionDrawer } from '@/modules/promotions/components/drawer/update-promotion-drawer'
import { formatDateRange } from '@/modules/shared/helpers/date.helper'
import { formatSelectedDays } from '@/modules/shared/helpers/day.helper'
import { pluralize } from '@/modules/shared/helpers/text.helper'
import { formatTimeRange } from '@/modules/shared/helpers/time.helper'
import type { Promotion } from '@ristokit/shared/models/promotion.model'
import { Badge } from '@ristokit/ui/components/badge'
import { EditIcon } from '@ristokit/ui/icons/edit.icon'
import { RemoveIcon } from '@ristokit/ui/icons/remove.icon'
import Image from 'next/image'

interface PromotionCardProps {
  promotion: Promotion
}

function PromotionCard({ promotion }: PromotionCardProps) {
  return (
    <article className='grid gap-y-5 rounded-sm bg-gray-light px-4 py-5'>
      <div className='flex items-center justify-between gap-x-2'>
        <div className='relative size-[3.875rem] rounded-sm bg-secondary'>
          <Image
            src={promotion.image || '#'}
            alt={promotion.title}
            fill
            className='overflow-hidden rounded-sm object-cover object-center'
          />
        </div>
        <div className='flex items-center gap-x-5'>
          <UpdatePromotionDrawer promotion={promotion}>
            <button type='button'>
              <EditIcon className='size-6 stroke-text' />
            </button>
          </UpdatePromotionDrawer>
          <DeletePromotionAlertDialog promotion={promotion}>
            <button type='button'>
              <RemoveIcon className='size-6 stroke-text' />
            </button>
          </DeletePromotionAlertDialog>
        </div>
      </div>
      <Badge variant={promotion.enabled ? 'default' : 'disabled'}>{promotion.enabled ? 'Activo' : 'Inactivo'}</Badge>
      <footer className='grid gap-y-2.5'>
        <h3 className='text-heading-mobile-3 text-text'>{promotion.title}</h3>
        <p className='flex flex-wrap items-center gap-x-2.5 gap-y-1 text-body-mobile-4 text-gray-dark'>
          <span>
            ({promotion.products.length}){' '}
            {pluralize({ count: promotion.products.length, singular: 'producto', plural: 'productos' })}
          </span>
          <span>{formatDateRange(promotion.startsAt, promotion.endsAt)}</span>
          <span>{formatSelectedDays(promotion.days, { short: true })}</span>
          <span>{formatTimeRange(promotion.startsAt, promotion.endsAt)}</span>
        </p>
        <p className='line-clamp-3 text-body-mobile-3 text-gray-dark'>{promotion.description}</p>
      </footer>
    </article>
  )
}

export { PromotionCard }
