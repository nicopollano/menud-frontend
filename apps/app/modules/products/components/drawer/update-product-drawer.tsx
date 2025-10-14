'use client'
import { mutateMenu } from '@/modules/menus/hooks/use-menu'
import { PreviewDiscountProductCard } from '@/modules/products/components/card/preview-discount-product-card'
import { generatePreviewProduct, parsePriceInput } from '@/modules/products/helpers/product.helper'
import { type UpdateProductSchema, updateProductSchema } from '@/modules/products/schemas/update-product.schema'
import { updateProductById } from '@/modules/products/services/products.service'
import { PreviewImagesList } from '@/modules/shared/components/images/preview-images-list'
import { ACCEPTED_IMAGE_TYPES } from '@/modules/shared/constants/images.const'
import { adapterFileListToImages } from '@/modules/shared/helpers/images.helper'
import { useNavigationParams } from '@/modules/shared/hooks/use-navigation-params'
import { useRevokeObjectURL } from '@/modules/shared/hooks/use-revoke-object-url'
import { useToggle } from '@/modules/shared/hooks/use-toggle'
import { getDirtyValues } from '@/modules/shared/lib/react-hook-form/react-hook-form.helper'
import { imagesSchema } from '@/modules/shared/schemas/images.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { formatPrice } from '@ristokit/shared/helpers/product.helper'
import { Currency, Locale } from '@ristokit/shared/models/general.model'
import type { Product } from '@ristokit/shared/models/product.model'
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
import { toast } from '@ristokit/ui/components/sonner'
import { Textarea } from '@ristokit/ui/components/textarea'
import { LineIcon } from '@ristokit/ui/icons/line.icon'
import { LoaderIcon } from 'lucide-react'
import { useRef } from 'react'
import { useForm } from 'react-hook-form'

interface UpdateProductDrawerProps {
  product: Product
  children: React.ReactNode
}

function UpdateProductDrawer({ product, children }: UpdateProductDrawerProps) {
  const { businessId, branchId, menuId } = useNavigationParams()

  const imagesRef = useRef<HTMLInputElement>(null)
  const { isOn: isOpenDrawer, update: setIsOpenDrawer, off: closeDrawer } = useToggle()

  const form = useForm<UpdateProductSchema>({
    resolver: zodResolver(updateProductSchema),
    defaultValues: {
      name: product.name,
      description: product.description ?? null,
      images: product.images ? product.images.map((image) => ({ url: image, file: null })) : [],
      price: formatPrice({ price: product.price, currency: Currency.ARS, locale: Locale.ES_AR }),
      discountedPrice:
        product.discountedPrice && product.discountedPrice > 0
          ? formatPrice({ price: product.discountedPrice, currency: Currency.ARS, locale: Locale.ES_AR })
          : null
    }
  })
  const { isSubmitting, isDirty, dirtyFields } = form.formState

  const selectedImages = form.watch('images')
  const hasSelectedImages = selectedImages && selectedImages.length > 0

  useRevokeObjectURL(hasSelectedImages ? selectedImages.map((image) => image.url) : [])

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

  const onSubmit = async (values: UpdateProductSchema) => {
    try {
      const changedValues = getDirtyValues(dirtyFields, values)

      const { error } = await updateProductById({
        businessId,
        branchId,
        productId: product.id,
        name: changedValues.name,
        description: changedValues.description,
        images: changedValues.images,
        price: changedValues.price
          ? String(parsePriceInput({ value: changedValues.price, locale: Locale.ES_AR }))
          : undefined,
        discountedPrice: changedValues.discountedPrice
          ? String(parsePriceInput({ value: changedValues.discountedPrice, locale: Locale.ES_AR }))
          : undefined
      })
      if (error) {
        return toast.custom(() => (
          <AlertError
            title='¡Error al actualizar el producto!'
            description={`Ocurrió un error al intentar actualizar el producto ${product.name}.`}
            details={[error.message]}
          />
        ))
      }

      await mutateMenu({ businessId, branchId, menuId })

      form.reset(values)
      closeDrawer()
    } catch (error) {
      toast.custom(() => (
        <AlertError
          title='¡Error al actualizar el producto!'
          description={`Ocurrió un error al intentar actualizar el producto ${product.name}.`}
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

  const handleFormatPrice = (ev: React.ChangeEvent<HTMLInputElement>, onChange: (...event: unknown[]) => void) => {
    const value = ev.target.value
    if (!value) return
    const price = parsePriceInput({ value, locale: Locale.ES_AR })
    if (price === 0) return onChange('')
    const formattedPrice = formatPrice({ price, currency: Currency.ARS, locale: Locale.ES_AR })
    onChange(formattedPrice)
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
                <DrawerTitle>Editar producto</DrawerTitle>
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
                        multiple
                        accept={ACCEPTED_IMAGE_TYPES.join(', ')}
                        ref={imagesRef}
                        onChange={handleUploadImages}
                        {...field}
                      />
                    </FormControl>
                    <UploaderButton onClick={() => imagesRef.current?.click()} />
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
                      <FormGroup>
                        <FormControl>
                          <Input
                            placeholder=''
                            variant='field'
                            {...field}
                            onBlur={(ev) => handleFormatPrice(ev, field.onChange)}
                          />
                        </FormControl>
                        <FormLabel variant='field'>Precio*</FormLabel>
                      </FormGroup>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='discountedPrice'
                  render={({ field }) => (
                    <FormItem>
                      <FormGroup>
                        <FormControl>
                          <Input
                            placeholder=''
                            variant='field'
                            {...field}
                            onBlur={(ev) => handleFormatPrice(ev, field.onChange)}
                            value={field.value ?? ''}
                          />
                        </FormControl>
                        <FormLabel variant='field'>Precio dcto</FormLabel>
                      </FormGroup>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {discountedPrice && <PreviewDiscountProductCard product={previewProduct} />}
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

export { UpdateProductDrawer }
