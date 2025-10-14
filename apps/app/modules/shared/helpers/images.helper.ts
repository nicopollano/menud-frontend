import type { ImageSchema, ImagesSchema } from '@/modules/shared/schemas/images.schema'

export const adapterFileListToImages = (fileList: FileList): ImagesSchema => {
  return Array.from(fileList).map(adapterFileToImage)
}

export const adapterFileToImage = (file: File): ImageSchema => ({
  url: URL.createObjectURL(file),
  file
})
