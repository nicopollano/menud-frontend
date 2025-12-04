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
  DrawerClose,
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
import { ReadIcon } from '@ristokit/ui/icons/read.icon'
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
    } catch (error: any) {
      console.log(error)
      const isMaxMenusReached = error?.code === 'SUBSCRIPTION/MAXMENUSREACHED' || error?.message === 'Max menus reached'

      toast.custom(() => (
        <AlertError
          title={isMaxMenusReached ? '¡Límite de menús alcanzado!' : '¡Error al crear el menú!'}
          description={
            isMaxMenusReached
              ? 'Has alcanzado el número máximo de menús permitidos por tu plan actual. Por favor, actualiza tu suscripción para crear más.'
              : `Ocurrió un error al intentar crear el menú ${values.name}.`
          }
          details={isMaxMenusReached ? undefined : error instanceof Error ? [error.message] : undefined}
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
        <button
          style={{ backgroundColor: 'white' }}
          className='relative z-10 group flex items-center gap-3 rounded-full !bg-white p-1.5 pr-4 shadow-[0_4px_20px_rgb(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:scale-105 hover:!bg-[#fa5252] hover:border-white transition-all duration-300 border border-neutral-100'
        >
          <div className='flex size-8 items-center justify-center rounded-full bg-primary-50 text-primary-600 group-hover:!bg-white group-hover:!text-[#fa5252] transition-all duration-300'>
            <ReadIcon className='size-4' strokeWidth={2.5} />
          </div>
          <span className='text-sm font-semibold text-neutral-600 group-hover:text-white transition-colors duration-300'>
            Agregar menú
          </span>
        </button>
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
                    <FormLabel className='text-base font-semibold text-neutral-900 ml-1'>Restaurante</FormLabel>
                    <Select
                      value={field.value}
                      defaultValue={field.value}
                      onValueChange={(value) => {
                        field.onChange(value)
                        form.resetField('branchId')
                      }}
                    >
                      <FormControl>
                        <SelectTrigger className='h-12 rounded-full border-neutral-200 bg-neutral-50 px-4 hover:bg-neutral-100 focus:ring-primary-500/20'>
                          <SelectValue placeholder='Seleccionar restaurante' />
                        </SelectTrigger>
                      </FormControl>
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
                    <FormLabel className='text-base font-semibold text-neutral-900 ml-1'>Sucursal</FormLabel>
                    <Select value={field.value} defaultValue={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className='h-12 rounded-full border-neutral-200 bg-neutral-50 px-4 hover:bg-neutral-100 focus:ring-primary-500/20'>
                          <SelectValue placeholder='Seleccionar sucursal' />
                        </SelectTrigger>
                      </FormControl>
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
                    <FormLabel className='text-base font-semibold text-neutral-900 ml-1'>Nombre</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Ej: Desayunos, Cena, etc.'
                        {...field}
                        className='h-12 rounded-full border-neutral-200 bg-neutral-50 px-4 hover:bg-neutral-100 focus:ring-primary-500/20'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-base font-semibold text-neutral-900 ml-1'>Descripción</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='Breve descripción del menú...'
                        {...field}
                        value={field.value ?? ''}
                        className='min-h-[100px] rounded-[24px] border-neutral-200 bg-neutral-50 px-4 py-3 hover:bg-neutral-100 focus:ring-primary-500/20 resize-none'
                      />
                    </FormControl>
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
                    <UploaderButton
                      onClick={() => imagesRef.current?.click()}
                      placeholder='Subir logo'
                      className='rounded-[24px] border-2 border-dashed border-neutral-200 bg-neutral-50 hover:bg-neutral-100 hover:border-primary-400'
                    />
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
            <div className='flex flex-col gap-3'>
              <DrawerClose asChild>
                <Button
                  variant='ghost'
                  size='md'
                  className='w-full rounded-full text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100'
                >
                  Cancelar
                </Button>
              </DrawerClose>
              <Button
                type='submit'
                size='md'
                disabled={isSubmitting}
                className='w-full rounded-full !bg-[#fa5252] hover:!bg-[#f03e3e] text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300'
              >
                {isSubmitting ? <LoaderIcon className='size-4 animate-spin' /> : 'Crear menú'}
              </Button>
            </div>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  )
}

export { CreateMenuDrawer }
