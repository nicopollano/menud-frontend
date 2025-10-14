import type { ImageSchema } from '@/modules/shared/schemas/images.schema'
import { Button } from '@ristokit/ui/components/button'
import { CloseIcon } from '@ristokit/ui/icons/close.icon'
import Image from 'next/image'

interface PreviewImageCardProps {
  image: ImageSchema
  removeImage: () => void
}

function PreviewImageCard({ image, removeImage }: PreviewImageCardProps) {
  return (
    <div className='relative size-[3.125rem] rounded-xs bg-secondary'>
      <Image
        className='rounded-xs object-cover'
        src={image.url}
        alt={image.file?.name ?? 'Vista previa'}
        fill
        sizes='15vw'
      />
      <Button
        onClick={removeImage}
        className='-right-1 -top-1 absolute size-[0.9375rem] rounded-full bg-primary'
        variant='styless'
        size='styless'
        type='button'
      >
        <CloseIcon className='stroke-background' />
      </Button>
    </div>
  )
}

export { PreviewImageCard }
