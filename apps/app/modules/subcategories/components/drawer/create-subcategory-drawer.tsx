'use client'
import { useCategories } from '@/modules/categories/hooks/use-categories'
import { mutateMenu } from '@/modules/menus/hooks/use-menu'
import { PreviewImagesList } from '@/modules/shared/components/images/preview-images-list'
import { ACCEPTED_IMAGE_TYPES } from '@/modules/shared/constants/images.const'
import { adapterFileListToImages } from '@/modules/shared/helpers/images.helper'
import { useNavigationParams } from '@/modules/shared/hooks/use-navigation-params'
import { useRevokeObjectURL } from '@/modules/shared/hooks/use-revoke-object-url'
import { useToggle } from '@/modules/shared/hooks/use-toggle'
import { imagesSchema } from '@/modules/shared/schemas/images.schema'
import {
  type CreateSubcategorySchema,
  createSubcategorySchema
} from '@/modules/subcategories/schemas/create-subcategory.schema'
import { createSubcategory } from '@/modules/subcategories/services/subcategories.service'
import { zodResolver } from '@hookform/resolvers/zod'
import { AlertError } from '@ristokit/ui/components/alert'
import { Button, UploaderButton } from '@ristokit/ui/components/button'
import {
  Drawer,
  DrawerContent,
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

function CreateSubcategoryDrawer() {
  const { businessId, branchId, menuId } = useNavigationParams()

  const imagesRef = useRef<HTMLInputElement>(null)
  const { isOn: isOpenDrawer, update: setIsOpenDrawer, off: closeDrawer } = useToggle()

  const { data: categories, isLoading: isLoadingCategories } = useCategories({
    businessId,
    branchId,
    menuId,
    canRequest: isOpenDrawer
  })

  const form = useForm<CreateSubcategorySchema>({
    resolver: zodResolver(createSubcategorySchema),
    defaultValues: {
      categoryId: '',
      name: '',
      description: null,
      images: []
    }
  })
  const { isSubmitting } = form.formState
  const selectedImages = form.watch('images')
  const hasSelectedImages = selectedImages.length > 0

  useRevokeObjectURL(selectedImages.map((image) => image.url))

  const onSubmit = async (values: CreateSubcategorySchema) => {
    try {
      const { error } = await createSubcategory({
        businessId,
        branchId,
        categoryId: values.categoryId,
        name: values.name,
        description: values.description,
        images: values.images
      })
      if (error) {
        return toast.custom(() => (
          <AlertError
            title='¡Error al crear la subcategoría!'
            description='Ocurrió un error al intentar crear la subcategoría.'
            details={[error.message]}
          />
        ))
      }

      await mutateMenu({ businessId, branchId, menuId })

      closeDrawer()
    } catch (error) {
      toast.custom(() => (
        <AlertError
          title='¡Error al crear la subcategoría!'
          description='Ocurrió un error al intentar crear la subcategoría.'
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
          Agregar subcategoría
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
                <DrawerTitle>Nueva subcategoría</DrawerTitle>
                <LineIcon className='h-px' />
              </div>
              <FormField
                control={form.control}
                name='categoryId'
                render={({ field }) => (
                  <FormItem>
                    <Select value={field.value} defaultValue={field.value} onValueChange={field.onChange}>
                      <FormGroup>
                        <FormControl>
                          <SelectTrigger variant='field'>
                            <SelectValue placeholder='' />
                          </SelectTrigger>
                        </FormControl>
                        <FormLabel variant='field'>Categoría*</FormLabel>
                      </FormGroup>
                      <SelectContent>
                        {isLoadingCategories && 'Cargando categorías...'}
                        {!isLoadingCategories && !categories?.length && 'Sin categorías'}
                        {categories?.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
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
                    <FormDescription>Ejemplo: Bebidas, Entrada, etc.</FormDescription>
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
                    <UploaderButton onClick={() => imagesRef.current?.click()} placeholder='Subir imagen' />
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
              {isSubmitting ? <LoaderIcon className='size-4 animate-spin' /> : 'Crear subcategoría'}
            </Button>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  )
}

export { CreateSubcategoryDrawer }
