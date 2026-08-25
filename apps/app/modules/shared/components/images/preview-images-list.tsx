'use client'
import { PreviewImageCard } from '@/modules/shared/components/images/preview-image-card'
import type { ImageSchema } from '@/modules/shared/schemas/images.schema'
import { Button } from '@ristokit/ui/components/button'
import { PlusIcon } from '@ristokit/ui/icons/plus.icon'

interface PreviewImagesListProps {
  multiple?: boolean
  images: ImageSchema[]
  addImage: () => void
  removeImage: (index: number) => void
}

function PreviewImagesList({ multiple = true, images, addImage, removeImage }: PreviewImagesListProps) {
  return (
    <div className='flex flex-wrap items-center gap-x-3 gap-y-1.5'>
      {images.map((image, index) => (
        <PreviewImageCard key={index} image={image} removeImage={() => removeImage(index)} />
      ))}
      {multiple && (
        <Button
          onClick={addImage}
          className='size-[3.125rem] rounded-xs bg-secondary'
          variant='styless'
          size='styless'
          type='button'
        >
          <PlusIcon className='stroke-2 stroke-primary' />
        </Button>
      )}
    </div>
  )
}

export { PreviewImagesList }
