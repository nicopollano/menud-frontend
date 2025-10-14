'use client'
import { useBranch } from '@/modules/branches/hooks/use-branch'
import { buildMenuPublicUrl } from '@/modules/menus/helpers/menu.helper'
import { downloadQrCode } from '@/modules/shared/helpers/qr.helper'
import { useNavigationParams } from '@/modules/shared/hooks/use-navigation-params'
import { AlertError, AlertSuccess } from '@ristokit/ui/components/alert'
import { Button } from '@ristokit/ui/components/button'
import { Skeleton } from '@ristokit/ui/components/skeleton'
import { toast } from '@ristokit/ui/components/sonner'
import QRCode from 'react-qr-code'

function BranchPreviewCard() {
  const { businessId, branchId } = useNavigationParams()

  const { data, isLoading } = useBranch({
    businessId,
    branchId
  })

  const handleDownloadQR = () => {
    try {
      if (!data) return

      const filename = `${data.id}-qr-code.png`
      downloadQrCode(data.id, filename)

      toast.custom(() => (
        <AlertSuccess
          title='¡QR descargado!'
          description={`El QR de la sucursal ${data.name} ha sido descargado correctamente.`}
        />
      ))
    } catch (error) {
      toast.custom(() => (
        <AlertError
          title='¡Error al descargar el QR!'
          description={`No se pudo descargar el QR de la sucursal ${data?.name || 'desconocida'}.`}
          details={error instanceof Error ? [error.message] : undefined}
        />
      ))
    }
  }

  return (
    <article className='grid grid-cols-[auto_1fr] gap-x-[1.875rem] gap-y-4 rounded-[0.5rem] border border-gray bg-background p-5'>
      {isLoading && <Skeleton className='360:col-span-1 col-span-full size-[7.625rem]' />}
      {data?.slug && (
        <div className='relative 360:col-span-1 col-span-full size-[7.625rem]'>
          <QRCode
            id={data.id}
            fgColor='#ff852d'
            style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
            value={buildMenuPublicUrl(data.id)}
          />
        </div>
      )}
      <header className='grid gap-y-5'>
        <div>
          <p className='text-body-mobile-4 text-gray-dark'>Nombre de tu sucursal</p>
          {isLoading && <Skeleton className='min-h-6 w-3/4' />}
          {data?.name && <h2 className='line-clamp-1 break-all text-heading-mobile-4 text-text'>{data.name}</h2>}
        </div>
        <div className='grid gap-y-2.5'>
          <Button
            onClick={handleDownloadQR}
            className='mr-auto border-gray'
            variant='outline'
            size='small'
            disabled={!data?.slug}
          >
            Descargar QR
          </Button>
          <p className='text-body-mobile-4 text-gray-dark'>Imprímelo y pégalo en tus mesas</p>
        </div>
      </header>
    </article>
  )
}

export { BranchPreviewCard }
