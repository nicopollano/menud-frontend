'use client'
import { useCategories } from '@/modules/categories/hooks/use-categories'
import { mutateMenu } from '@/modules/menus/hooks/use-menu'
import { PreviewDiscountProductCard } from '@/modules/products/components/card/preview-discount-product-card'
import { generatePreviewProduct, parsePriceInput } from '@/modules/products/helpers/product.helper'
import { type CreateProductSchema, createProductSchema } from '@/modules/products/schemas/create-product.schema'
import { createProduct } from '@/modules/products/services/products.service'
import { PreviewImagesList } from '@/modules/shared/components/images/preview-images-list'
import { ACCEPTED_IMAGE_TYPES } from '@/modules/shared/constants/images.const'
import { adapterFileListToImages } from '@/modules/shared/helpers/images.helper'
import { useNavigationParams } from '@/modules/shared/hooks/use-navigation-params'
import { useRevokeObjectURL } from '@/modules/shared/hooks/use-revoke-object-url'
import { useToggle } from '@/modules/shared/hooks/use-toggle'
import { imagesSchema } from '@/modules/shared/schemas/images.schema'
import { useSubcategories } from '@/modules/subcategories/hooks/use-subcategories'
import { zodResolver } from '@hookform/resolvers/zod'
import { formatPrice } from '@ristokit/shared/helpers/product.helper'
import { Currency, Locale } from '@ristokit/shared/models/general.model'
import { AlertError } from '@ristokit/ui/components/alert'
import { Button, UploaderButton } from '@ristokit/ui/components/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
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
import { LoaderIcon, UtensilsIcon } from 'lucide-react'
import { useRef } from 'react'
import { useForm } from 'react-hook-form'

function CreateProductDrawer() {
  const { businessId, branchId, menuId } = useNavigationParams()

  const imagesRef = useRef<HTMLInputElement>(null)
  const { isOn: isOpenDrawer, update: setIsOpenDrawer, off: closeDrawer } = useToggle()
  const hasPersistDrawerRef = useRef(false)

  const form = useForm<CreateProductSchema>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      categoryId: '',
      subcategoryId: undefined,
      name: '',
      description: null,
      images: [],
      price: '',
      discountedPrice: null
    }
  })
  const { isSubmitting } = form.formState

  const selectedImages = form.watch('images')
  const hasSelectedImages = selectedImages.length > 0

  useRevokeObjectURL(selectedImages.map((image) => image.url))

  const selectedCategoryId = form.watch('categoryId')

  const { data: categories, isLoading: isLoadingCategories } = useCategories({
    businessId,
    branchId,
    menuId,
    canRequest: isOpenDrawer
  })
  const { data: subcategories, isLoading: isLoadingSubcategories } = useSubcategories({
    businessId,
    branchId,
    menuId,
    categoryId: selectedCategoryId,
    canRequest: !!(isOpenDrawer && selectedCategoryId)
  })

  const hasSubcategories = subcategories && subcategories.length > 0

  const name = form.watch('name')
  const description = form.watch('description')
  const price = form.watch('price')
  const discountedPrice = form.watch('discountedPrice')

  const previewProduct = generatePreviewProduct({
    name,
    description,
    price,
    discountedPrice,
    images: selectedImages
  })

  const onSubmit = async (values: CreateProductSchema) => {
    try {
      const { error } = await createProduct({
        businessId,
        branchId,
        categoryId: values.categoryId,
        subcategoryId: values.subcategoryId,
        name: values.name,
        description: values.description,
        images: values.images,
        price: String(parsePriceInput({ value: values.price, locale: Locale.ES_AR })),
        discountedPrice: values.discountedPrice
          ? String(parsePriceInput({ value: values.discountedPrice, locale: Locale.ES_AR }))
          : undefined
      })
      if (error) {
        return toast.custom(() => (
          <AlertError
            title='¡Error al crear el producto!'
            description={`No se pudo crear el producto ${values.name}.`}
            details={[error.message]}
          />
        ))
      }

      await mutateMenu({ businessId, branchId, menuId })

      if (hasPersistDrawerRef.current) {
        return form.reset({
          categoryId: '',
          subcategoryId: undefined,
          name: '',
          description: null,
          images: [],
          price: '',
          discountedPrice: null
        })
      }

      closeDrawer()
    } catch (error) {
      toast.custom(() => (
        <AlertError
          title='¡Error al crear el producto!'
          description={`Ocurrió un error al intentar crear el producto ${values.name}.`}
          details={error instanceof Error ? [error.message] : undefined}
        />
      ))
    } finally {
      hasPersistDrawerRef.current = false
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

  const handleFormatPrice = (ev: React.ChangeEvent<HTMLInputElement>, onChange: (...event: unknown[]) => void) => {
    const value = ev.target.value
    const price = parsePriceInput({ value, locale: Locale.ES_AR })
    if (price === 0) return onChange('')
    const formattedPrice = formatPrice({ price, currency: Currency.ARS, locale: Locale.ES_AR })
    onChange(formattedPrice)
  }

  const handleAddProductAndCreateNewProduct = () => {
    hasPersistDrawerRef.current = true
    form.handleSubmit(onSubmit)()
  }

  const handleCreateNewProduct = () => {
    hasPersistDrawerRef.current = false
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
            <UtensilsIcon className='size-4' strokeWidth={2.5} />
          </div>
          <span className='text-sm font-semibold text-neutral-600 group-hover:text-white transition-colors duration-300'>
            Agregar producto
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
                <DrawerTitle>Nuevo producto</DrawerTitle>
                <LineIcon className='h-px' />
              </div>
              <FormField
                control={form.control}
                name='categoryId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-base font-semibold text-neutral-900 ml-1'>Categoría</FormLabel>
                    <Select
                      value={field.value}
                      defaultValue={field.value}
                      onValueChange={(value) => {
                        field.onChange(value)
                        form.resetField('subcategoryId')
                      }}
                    >
                      <FormControl>
                        <SelectTrigger className='h-12 rounded-full border-neutral-200 bg-neutral-50 px-4 hover:bg-neutral-100 focus:ring-primary-500/20'>
                          <SelectValue placeholder='Seleccionar categoría' />
                        </SelectTrigger>
                      </FormControl>
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
                name='subcategoryId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-base font-semibold text-neutral-900 ml-1'>
                      Subcategoría (Opcional)
                    </FormLabel>
                    <Select value={field.value} defaultValue={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger
                          className='h-12 rounded-full border-neutral-200 bg-neutral-50 px-4 hover:bg-neutral-100 focus:ring-primary-500/20'
                          disabled={!hasSubcategories}
                        >
                          <SelectValue placeholder='Seleccionar subcategoría' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {isLoadingSubcategories && 'Cargando subcategorías...'}
                        {!isLoadingSubcategories && !subcategories?.length && 'Sin subcategorías'}
                        {subcategories?.map((subcategory) => (
                          <SelectItem key={subcategory.id} value={subcategory.id}>
                            {subcategory.name}
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
                        placeholder='Ej: Hamburguesa Doble'
                        variant='field'
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
                        placeholder='Breve descripción del producto...'
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
                        multiple
                        accept={ACCEPTED_IMAGE_TYPES.join(', ')}
                        ref={imagesRef}
                        onChange={handleUploadImages}
                        {...field}
                      />
                    </FormControl>
                    <UploaderButton
                      onClick={() => imagesRef.current?.click()}
                      className='rounded-[24px] border-2 border-dashed border-neutral-200 bg-neutral-50 hover:bg-neutral-100 hover:border-primary-400'
                    />
                    {hasSelectedImages && (
                      <PreviewImagesList
                        images={selectedImages}
                        addImage={() => imagesRef.current?.click()}
                        removeImage={handleRemoveImage}
                      />
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='grid 360:grid-cols-2 gap-x-4 gap-y-[1.875rem]'>
                <FormField
                  control={form.control}
                  name='price'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-base font-semibold text-neutral-900 ml-1'>Precio</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='$ 0,00'
                          variant='field'
                          {...field}
                          onBlur={(ev) => handleFormatPrice(ev, field.onChange)}
                          className='h-12 rounded-full border-neutral-200 bg-neutral-50 px-4 hover:bg-neutral-100 focus:ring-primary-500/20'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='discountedPrice'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-base font-semibold text-neutral-900 ml-1'>
                        Precio con descuento
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder='$ 0,00'
                          variant='field'
                          {...field}
                          onBlur={(ev) => handleFormatPrice(ev, field.onChange)}
                          value={field.value ?? ''}
                          className='h-12 rounded-full border-neutral-200 bg-neutral-50 px-4 hover:bg-neutral-100 focus:ring-primary-500/20'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {discountedPrice && <PreviewDiscountProductCard product={previewProduct} />}
            </DrawerHeader>
            <DrawerFooter className='flex flex-col gap-3'>
              <Button
                onClick={handleCreateNewProduct}
                type='submit'
                size='md'
                disabled={isSubmitting}
                className='w-full rounded-full !bg-[#fa5252] hover:!bg-[#f03e3e] text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300'
              >
                {isSubmitting ? <LoaderIcon className='size-4 animate-spin' /> : 'Crear producto'}
              </Button>
              <Button
                onClick={handleAddProductAndCreateNewProduct}
                className='w-full rounded-full text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                variant='ghost'
                size='md'
                type='button'
                disabled={isSubmitting}
              >
                Añadir producto y crear otro
              </Button>
              <DrawerClose asChild>
                <Button
                  variant='ghost'
                  size='md'
                  className='w-full rounded-full text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100'
                >
                  Cancelar
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  )
}

export { CreateProductDrawer }
