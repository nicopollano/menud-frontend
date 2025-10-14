'use client'
import { UpdateBranchAddressDrawer } from '@/modules/branches/components/drawer/update-branch-address-drawer'
import { UpdateBranchCurrencyDrawer } from '@/modules/branches/components/drawer/update-branch-currency-drawer'
import { UpdateBranchPhoneDrawer } from '@/modules/branches/components/drawer/update-branch-phone-drawer'
import { useBranch } from '@/modules/branches/hooks/use-branch'
import { UpdateSchedulesDrawer } from '@/modules/schedules/components/drawer/update-schedules-drawer'
import { getOpenDaysText } from '@/modules/schedules/helpers/schedules.helper'
import { useNavigationParams } from '@/modules/shared/hooks/use-navigation-params'
import type { Branch } from '@ristokit/shared/models/branch.model'
import { Skeleton } from '@ristokit/ui/components/skeleton'
import { ClockIcon } from '@ristokit/ui/icons/clock.icon'
import { CurrencyIcon } from '@ristokit/ui/icons/currency.icon'
import { EditIcon } from '@ristokit/ui/icons/edit.icon'
import { LocationIcon } from '@ristokit/ui/icons/location.icon'
import { PhoneIcon } from '@ristokit/ui/icons/phone.icon'

const BRANCH_DETAIL_OPTIONS = [
  {
    label: 'Dirección',
    icon: <LocationIcon />,
    placeholder: 'Agregar dirección',
    component: UpdateBranchAddressDrawer,
    getValue: (branch: Branch) => branch.address
  },
  {
    label: 'Teléfono',
    icon: <PhoneIcon />,
    placeholder: 'Agregar teléfono',
    component: UpdateBranchPhoneDrawer,
    getValue: (branch: Branch) => branch.phone
  },
  {
    label: 'Horario',
    icon: <ClockIcon />,
    placeholder: 'Agregar horario',
    component: UpdateSchedulesDrawer,
    getValue: (branch: Branch) => getOpenDaysText(branch.schedules)
  },
  {
    label: 'Moneda',
    icon: <CurrencyIcon />,
    placeholder: 'Agregar moneda',
    component: UpdateBranchCurrencyDrawer,
    getValue: (branch: Branch) => branch.currency
  }
]

function SettingsPage() {
  const { businessId, branchId } = useNavigationParams()

  const { data, isLoading } = useBranch({
    businessId,
    branchId
  })

  return (
    <section className='flex h-fit flex-col gap-y-5 rounded-[0.5rem] border border-gray p-5'>
      <h2 className='text-heading-mobile-4 text-text'>Datos de sucursal</h2>
      <div className='grid 360:grid-cols-2 gap-2.5'>
        {BRANCH_DETAIL_OPTIONS.map(({ label, icon, placeholder, getValue, component: Component }) => {
          const value = data ? getValue(data) : null

          return (
            <article
              key={label}
              className='grid gap-y-2.5 rounded-[0.5rem] border border-gray bg-background px-2.5 py-5'
            >
              <div className='flex items-center justify-between text-button-mobile-small text-text'>
                {label}
                {data && (
                  <Component branch={data}>
                    <button type='button'>
                      <EditIcon className='size-4 stroke-text' />
                    </button>
                  </Component>
                )}
              </div>
              <div className='grid grid-cols-[auto_1fr] gap-x-[0.4375rem] text-body-mobile-4 text-gray-dark'>
                {icon}
                {isLoading && <Skeleton className='min-h-4 w-3/4' />}
                {!isLoading && <span className='truncate'>{value || placeholder}</span>}
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default SettingsPage
