'use client'
import { mutateBranches } from '@/modules/branches/hooks/use-branches'
import { mutateBranchesSummary } from '@/modules/branches/hooks/use-branches-summary'
import { type UpdateBranchSchema, updateBranchSchema } from '@/modules/branches/schemas/update-branch.schema'
import { updateBranchById } from '@/modules/branches/services/branches.service'
import { PreviewImagesList } from '@/modules/shared/components/images/preview-images-list'
import { ACCEPTED_IMAGE_TYPES } from '@/modules/shared/constants/images.const'
import { adapterFileListToImages } from '@/modules/shared/helpers/images.helper'
import { useNavigationParams } from '@/modules/shared/hooks/use-navigation-params'
import { useRevokeObjectURL } from '@/modules/shared/hooks/use-revoke-object-url'
import { useToggle } from '@/modules/shared/hooks/use-toggle'
import { getDirtyValues } from '@/modules/shared/lib/react-hook-form/react-hook-form.helper'
import { imagesSchema } from '@/modules/shared/schemas/images.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Branch } from '@ristokit/shared/models/branch.model'
import { AlertError } from '@ristokit/ui/components/alert'
import { Button, UploaderButton } from '@ristokit/ui/components/button'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHandle,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@ristokit/ui/components/drawer'
import { Form, FormControl, FormField, FormGroup, FormItem, FormLabel, FormMessage } from '@ristokit/ui/components/form'
import { Input } from '@ristokit/ui/components/input'
import { toast } from '@ristokit/ui/components/sonner'
import { Textarea } from '@ristokit/ui/components/textarea'
import { LineIcon } from '@ristokit/ui/icons/line.icon'
import { LoaderIcon } from 'lucide-react'
import { useRef } from 'react'
import { useForm } from 'react-hook-form'

interface UpdateBranchDrawerProps {
  branch: Branch
  children: React.ReactNode
}

function UpdateBranchDrawer({ branch, children }: UpdateBranchDrawerProps) {
  const { businessId } = useNavigationParams()

  const imagesRef = useRef<HTMLInputElement>(null)
  const { isOn: isOpenDrawer, update: setIsOpenDrawer, off: closeDrawer } = useToggle()

  const form = useForm<UpdateBranchSchema>({
    resolver: zodResolver(updateBranchSchema),
    defaultValues: {
      businessId: businessId,
      name: branch.name,
      description: branch.description ?? null,
      images: branch.logo ? [{ url: branch.logo, file: null }] : []
    }
  })
  const { isSubmitting, isDirty, dirtyFields } = form.formState
  const selectedImages = form.watch('images')
  const hasSelectedImages = selectedImages && selectedImages.length > 0

  useRevokeObjectURL(hasSelectedImages ? selectedImages.map((image) => image.url) : [])

  const onSubmit = async (values: UpdateBranchSchema) => {
    try {
      const changedValues = getDirtyValues(dirtyFields, values)

      const { error } = await updateBranchById({
        businessId: businessId,
        branchId: branch.id,
        name: changedValues.name,
        description: changedValues.description,
        images: changedValues.images
      })
      if (error) {
        return toast.custom(() => (
          <AlertError
            title='¡Error al actualizar la sucursal!'
            description={`No se pudo actualizar la sucursal ${values.name}.`}
            details={[error.message]}
          />
        ))
      }

      await Promise.all([mutateBranches({ businessId }), mutateBranchesSummary({ businessId })])

      form.reset(values)
      closeDrawer()
    } catch (error) {
      toast.custom(() => (
        <AlertError
          title='¡Error al actualizar la sucursal!'
          description={`Ocurrió un error al intentar actualizar la sucursal ${values.name}.`}
          details={error instanceof Error ? [error.message] : undefined}
        />
      ))
    }
  }

  const handleUploadImages = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    const adaptedFiles = adapterFileListToImages(files)
    const validatedImages = imagesSchema.safeParse(adaptedFiles)

    if (validatedImages.error) {
      const details = validatedImages.error.errors.map((error) => error.message)

      return toast.custom(() => (
        <AlertError
          title='¡Error al subir la imagen!'
          description='Ocurrió un error al intentar subir la imagen.'
          details={details}
        />
      ))
    }

    form.setValue('images', validatedImages.data, { shouldDirty: true, shouldValidate: true })
  }

  const handleRemoveImage = (index: number) => {
    const filteredImages = form.getValues('images')?.filter((_, i) => i !== index)
    form.setValue('images', filteredImages, { shouldDirty: true, shouldValidate: true })
  }

  return (
    <Drawer
      open={isOpenDrawer}
      onOpenChange={(state) => {
        setIsOpenDrawer(state)
        form.reset()
      }}
    >
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex flex-col gap-y-[3.75rem] overflow-y-auto px-[0.9375rem] pb-[3.75rem]'
          >
            <DrawerHandle />
            <DrawerHeader className='gap-y-[1.875rem]'>
              <div className='grid gap-y-2.5'>
                <DrawerTitle>Editar sucursal</DrawerTitle>
                <DrawerDescription className='sr-only'>Actualiza la información de la sucursal</DrawerDescription>
                <LineIcon className='h-px' />
              </div>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormGroup>
                      <FormControl>
                        <Input placeholder='' variant='field' {...field} />
                      </FormControl>
                      <FormLabel variant='field'>Nombre*</FormLabel>
                    </FormGroup>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormGroup>
                      <FormControl>
                        <Textarea placeholder='' {...field} value={field.value ?? ''} />
                      </FormControl>
                      <FormLabel variant='field'>Descripción</FormLabel>
                    </FormGroup>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='images'
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                render={({ field: { value, onChange, ref, ...field } }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className='sr-only'
                        type='file'
                        accept={ACCEPTED_IMAGE_TYPES.join(', ')}
                        ref={imagesRef}
                        onChange={handleUploadImages}
                        {...field}
                      />
                    </FormControl>
                    <UploaderButton onClick={() => imagesRef.current?.click()} placeholder='Subir logo' />
                    {hasSelectedImages && (
                      <PreviewImagesList
                        multiple={false}
                        images={selectedImages}
                        addImage={() => imagesRef.current?.click()}
                        removeImage={handleRemoveImage}
                      />
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </DrawerHeader>
            <Button type='submit' size='medium' disabled={isSubmitting || !isDirty}>
              {isSubmitting ? <LoaderIcon className='size-4 animate-spin' /> : 'Guardar cambios'}
            </Button>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  )
}

export { UpdateBranchDrawer }
