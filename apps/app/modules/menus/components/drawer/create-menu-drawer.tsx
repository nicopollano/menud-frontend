'use client'
import { useBranches } from '@/modules/branches/hooks/use-branches'
import { useBusinesses } from '@/modules/businesses/hooks/use-businesses'
import { mutateMenus } from '@/modules/menus/hooks/use-menus'
import { mutateMenusSummary } from '@/modules/menus/hooks/use-menus-summary'
import { type CreateMenuSchema, createMenuSchema } from '@/modules/menus/schemas/create-menu.schema'
import { createMenu } from '@/modules/menus/services/menus.service'
import { PreviewImagesList } from '@/modules/shared/components/images/preview-images-list'
import { ACCEPTED_IMAGE_TYPES } from '@/modules/shared/constants/images.const'
import { adapterFileListToImages } from '@/modules/shared/helpers/images.helper'
import { useRevokeObjectURL } from '@/modules/shared/hooks/use-revoke-object-url'
import { useToggle } from '@/modules/shared/hooks/use-toggle'
import { imagesSchema } from '@/modules/shared/schemas/images.schema'
import { zodResolver } from '@hookform/resolvers/zod'
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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormGroup,
  FormItem,
  FormLabel,
  FormMessage
} from '@ristokit/ui/components/form'
import { Input } from '@ristokit/ui/components/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ristokit/ui/components/select'
import { toast } from '@ristokit/ui/components/sonner'
import { Textarea } from '@ristokit/ui/components/textarea'
import { LineIcon } from '@ristokit/ui/icons/line.icon'
import { LoaderIcon } from 'lucide-react'
import { useRef } from 'react'
import { useForm } from 'react-hook-form'

function CreateMenuDrawer() {
  const imagesRef = useRef<HTMLInputElement>(null)
  const { isOn: isOpenDrawer, update: setIsOpenDrawer, off: closeDrawer } = useToggle()

  const form = useForm<CreateMenuSchema>({
    resolver: zodResolver(createMenuSchema),
    defaultValues: {
      businessId: '',
      branchId: '',
      name: '',
      description: null,
      images: []
    }
  })
  const { isSubmitting } = form.formState
  const selectedBusinessId = form.watch('businessId')

  const selectedImages = form.watch('images')
  const hasSelectedImages = selectedImages.length > 0

  useRevokeObjectURL(selectedImages.map((image) => image.url))

  const { data: businesses, isLoading: isLoadingBusinesses } = useBusinesses({
    canRequest: isOpenDrawer
  })
  const { data: branches, isLoading: isLoadingBranches } = useBranches({
    businessId: selectedBusinessId,
    canRequest: !!(isOpenDrawer && selectedBusinessId)
  })

  const onSubmit = async (values: CreateMenuSchema) => {
    try {
      const { error } = await createMenu({
        businessId: values.businessId,
        branchId: values.branchId,
        name: values.name,
        description: values.description,
        images: values.images
      })
      if (error) {
        return toast.custom(() => (
          <AlertError
            title='¡Error al crear el menú!'
            description={`No se pudo crear el menú ${values.name}.`}
            details={[error.message]}
          />
        ))
      }

      await Promise.all([
        mutateMenus({ businessId: values.businessId, branchId: values.branchId }),
        mutateMenusSummary({ businessId: values.businessId, branchId: values.branchId })
      ])

      closeDrawer()
    } catch (error) {
      console.log(error)
      toast.custom(() => (
        <AlertError
          title='¡Error al crear el menú!'
          description={`Ocurrió un error al intentar crear el menú ${values.name}.`}
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
    const filteredImages = form.getValues('images').filter((_, i) => i !== index)
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
      <DrawerTrigger asChild>
        <Button variant='outline' size='small'>
          Agregar menú
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex flex-col gap-y-[3.75rem] overflow-y-auto px-[0.9375rem] pb-[3.75rem]'
          >
            <DrawerHandle />
            <DrawerHeader className='gap-y-[1.875rem]'>
              <div className='grid gap-y-2.5'>
                <DrawerTitle>Nuevo menú</DrawerTitle>
                <DrawerDescription className='sr-only'>Crea un nuevo menú</DrawerDescription>
                <LineIcon className='h-px' />
              </div>
              <FormField
                control={form.control}
                name='businessId'
                render={({ field }) => (
                  <FormItem>
                    <Select
                      value={field.value}
                      defaultValue={field.value}
                      onValueChange={(value) => {
                        field.onChange(value)
                        form.resetField('branchId')
                      }}
                    >
                      <FormGroup>
                        <FormControl>
                          <SelectTrigger variant='field'>
                            <SelectValue placeholder='' />
                          </SelectTrigger>
                        </FormControl>
                        <FormLabel variant='field'>Restaurante*</FormLabel>
                      </FormGroup>
                      <SelectContent>
                        {isLoadingBusinesses && 'Cargando restaurantes...'}
                        {businesses?.map((business) => (
                          <SelectItem key={business.id} value={business.id}>
                            {business.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='branchId'
                render={({ field }) => (
                  <FormItem>
                    <Select value={field.value} defaultValue={field.value} onValueChange={field.onChange}>
                      <FormGroup>
                        <FormControl>
                          <SelectTrigger variant='field'>
                            <SelectValue placeholder='' />
                          </SelectTrigger>
                        </FormControl>
                        <FormLabel variant='field'>Sucursal*</FormLabel>
                      </FormGroup>
                      <SelectContent>
                        {isLoadingBranches && 'Cargando sucursales...'}
                        {!isLoadingBranches && !branches?.length && 'No hay sucursales disponibles'}
                        {branches?.map((branch) => (
                          <SelectItem key={branch.id} value={branch.id}>
                            {branch.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                    <FormDescription>Ejemplo: Desayunos, Cena, etc.</FormDescription>
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
            <Button type='submit' size='medium' disabled={isSubmitting}>
              {isSubmitting ? <LoaderIcon className='size-4 animate-spin' /> : 'Crear menú'}
            </Button>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  )
}

export { CreateMenuDrawer }
