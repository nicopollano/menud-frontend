'use client'
import { useProducts } from '@/modules/products/hooks/use-products'
import { PROMOTION_HOURS } from '@/modules/promotions/constants/promotion.const'
import { usePromotionAvailableDays } from '@/modules/promotions/hooks/use-promotion-available-days'
import { mutatePromotions } from '@/modules/promotions/hooks/use-promotions'
import { type UpdatePromotionSchema, updatePromotionSchema } from '@/modules/promotions/schemas/update-promotion.schema'
import { promotionService } from '@/modules/promotions/services/promotion.service'
import { scheduleTimesAdapter } from '@/modules/schedules/adapters/schedule.adapter'
import { formatDateTimeToSchedule } from '@/modules/schedules/helpers/schedules.helper'
import { PreviewImagesList } from '@/modules/shared/components/images/preview-images-list'
import { ACCEPTED_IMAGE_TYPES } from '@/modules/shared/constants/images.const'
import { combineDateStringAndTime, formatDateStringToDDMMYYYY } from '@/modules/shared/helpers/date.helper'
import { formatSelectedDays } from '@/modules/shared/helpers/day.helper'
import { adapterFileListToImages } from '@/modules/shared/helpers/images.helper'
import { pluralize } from '@/modules/shared/helpers/text.helper'
import { addPeriodTo24Hour, extractTimeFromDate } from '@/modules/shared/helpers/time.helper'
import { useNavigationParams } from '@/modules/shared/hooks/use-navigation-params'
import { useRevokeObjectURL } from '@/modules/shared/hooks/use-revoke-object-url'
import { useToggle } from '@/modules/shared/hooks/use-toggle'
import { getDirtyValues } from '@/modules/shared/lib/react-hook-form/react-hook-form.helper'
import { imagesSchema } from '@/modules/shared/schemas/images.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { DAYS, DAYS_DICTIONARY } from '@ristokit/shared/models/general.model'
import type { Promotion } from '@ristokit/shared/models/promotion.model'
import { AlertError } from '@ristokit/ui/components/alert'
import { Button, UploaderButton } from '@ristokit/ui/components/button'
import { Calendar } from '@ristokit/ui/components/calendar'
import { Checkbox } from '@ristokit/ui/components/checkbox'
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
import { Popover, PopoverContent, PopoverTrigger } from '@ristokit/ui/components/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ristokit/ui/components/select'
import { toast } from '@ristokit/ui/components/sonner'
import { Textarea } from '@ristokit/ui/components/textarea'
import { ArrowDownIcon } from '@ristokit/ui/icons/arrow-down.icon'
import { LineIcon } from '@ristokit/ui/icons/line.icon'
import { cn } from '@ristokit/ui/lib/utils'
import { LoaderIcon } from 'lucide-react'
import Image from 'next/image'
import { useRef } from 'react'
import { useForm } from 'react-hook-form'

interface UpdatePromotionDrawerProps {
  promotion: Promotion
  children: React.ReactNode
}

function UpdatePromotionDrawer({ promotion, children }: UpdatePromotionDrawerProps) {
  const { businessId, branchId, menuId } = useNavigationParams()

  const imagesRef = useRef<HTMLInputElement>(null)
  const { isOn: isOpenDrawer, update: setIsOpenDrawer, off: closeDrawer } = useToggle()

  const { data: products, isLoading: isLoadingProducts } = useProducts({
    businessId,
    branchId,
    menuId,
    canRequest: isOpenDrawer
  })

  const form = useForm<UpdatePromotionSchema>({
    resolver: zodResolver(updatePromotionSchema),
    defaultValues: {
      productIds: promotion.products.map((product) => product.id),
      title: promotion.title,
      description: promotion.description ?? null,
      images: promotion.image ? [{ url: promotion.image, file: null }] : [],
      startsAt: promotion.startsAt.toISOString(),
      endsAt: promotion.endsAt.toISOString(),
      startTime: extractTimeFromDate(promotion.startsAt),
      endTime: extractTimeFromDate(promotion.endsAt),
      days: promotion.days
    }
  })
  const { isSubmitting, isDirty, dirtyFields } = form.formState
  const selectedImages = form.watch('images')
  const hasSelectedImages = selectedImages && selectedImages.length > 0

  useRevokeObjectURL(hasSelectedImages ? selectedImages.map((image) => image.url) : [])

  const selectedStartsAt = form.watch('startsAt')
  const selectedEndsAt = form.watch('endsAt')
  const selectedStartTime = form.watch('startTime')
  const selectedEndTime = form.watch('endTime')

  const { data: availableDays, isLoading: isLoadingAvailableDays } = usePromotionAvailableDays({
    businessId,
    branchId,
    menuId,
    data: scheduleTimesAdapter({
      startsAt: selectedStartsAt,
      endsAt: selectedEndsAt,
      startTime: selectedStartTime,
      endTime: selectedEndTime
    }),
    canRequest: !!(isOpenDrawer && selectedStartsAt && selectedEndsAt && selectedStartTime && selectedEndTime)
  })

  const onSubmit = async (values: UpdatePromotionSchema) => {
    try {
      const changedValues = getDirtyValues(dirtyFields, values)

      const startsAt = combineDateStringAndTime(values.startsAt, values.startTime)
      const endsAt = combineDateStringAndTime(values.endsAt, values.endTime)

      await promotionService.updatePromotionById({
        businessId,
        branchId,
        promotionId: promotion.id,
        data: {
          productIds: changedValues.productIds,
          title: changedValues.title,
          description: changedValues.description,
          startsAt: changedValues.startsAt ? formatDateTimeToSchedule(startsAt) : undefined,
          endsAt: changedValues.endsAt ? formatDateTimeToSchedule(endsAt) : undefined,
          days: changedValues.days,
          images: changedValues.images,
          startTime: changedValues.startTime,
          endTime: changedValues.endTime
        }
      })

      await mutatePromotions({ businessId, branchId, menuId })

      form.reset(values)
      closeDrawer()
    } catch (error) {
      toast.custom(() => (
        <AlertError
          title='¡Error al actualizar la promoción!'
          description='Ocurrió un error al intentar actualizar la promoción.'
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
                <DrawerTitle>Editar promoción</DrawerTitle>
                <DrawerDescription className='sr-only'>Actualiza la información de la promoción.</DrawerDescription>
                <LineIcon className='h-px' />
              </div>
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormGroup>
                      <FormControl>
                        <Input placeholder='' variant='field' {...field} />
                      </FormControl>
                      <FormLabel variant='field'>Título*</FormLabel>
                    </FormGroup>
                    <FormDescription>Ejemplo: ¡Solo por hoy! Hasta 35% de descuento.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='productIds'
                render={({ field }) => (
                  <FormItem>
                    <Select value={field.value.length ? 'placeholder' : undefined}>
                      <FormGroup>
                        <FormControl>
                          <SelectTrigger variant='field'>
                            <SelectValue placeholder='' />
                          </SelectTrigger>
                        </FormControl>
                        <FormLabel variant='field'>Elegir productos*</FormLabel>
                      </FormGroup>
                      <SelectContent className='relative [&>div]:gap-y-5'>
                        {isLoadingProducts && 'Cargando productos...'}
                        {!isLoadingProducts && !products?.length && 'Sin productos disponibles'}
                        <SelectItem value='placeholder' className='hidden'>
                          {field.value.length}{' '}
                          {pluralize({ count: field.value.length, singular: 'producto', plural: 'productos' })}{' '}
                          {pluralize({ count: field.value.length, singular: 'seleccionado', plural: 'seleccionados' })}
                        </SelectItem>
                        {products?.map((product) => (
                          <FormField
                            key={product.id}
                            control={form.control}
                            name='productIds'
                            render={({ field }) => {
                              return (
                                <FormItem key={product.id} className='flex flex-row items-center gap-x-2.5'>
                                  <div className='relative size-7 shrink-0 rounded-[0.3125rem] bg-secondary'>
                                    <Image
                                      src={product.images[0] ?? '#'}
                                      alt={product.name}
                                      fill
                                      className='rounded-[0.3125rem] object-cover'
                                    />
                                  </div>
                                  <FormLabel className='line-clamp-1 grow break-all text-body-mobile-2 text-text'>
                                    {product.name}
                                  </FormLabel>
                                  <FormControl>
                                    <Checkbox
                                      className='size-5 rounded-[0.3125rem] border-gray-dark data-[state=checked]:border-text data-[state=checked]:bg-text data-[state=checked]:text-background [&>span>svg]:size-2.5 [&>span>svg]:stroke-background'
                                      checked={field.value?.includes(product.id)}
                                      onCheckedChange={(checked) => {
                                        if (checked) {
                                          return field.onChange([...field.value, product.id])
                                        }
                                        return field.onChange(field.value?.filter((value) => value !== product.id))
                                      }}
                                    />
                                  </FormControl>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='grid grid-cols-2 gap-x-4 gap-y-2.5'>
                <p className='col-span-full text-body-mobile-4 text-gray-dark'>Fecha:</p>
                <FormField
                  control={form.control}
                  name='startsAt'
                  render={({ field }) => (
                    <FormItem>
                      <Popover>
                        <FormGroup>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                className={cn(
                                  'peer group grid h-14 grid-cols-[1fr_auto] items-center rounded-sm border border-transparent bg-gray-light px-5 text-body-mobile-2 text-transparent transition-none aria-[invalid=true]:border-error',
                                  {
                                    'text-text': field.value
                                  }
                                )}
                                variant='styless'
                                size='styless'
                                data-placeholder={field.value ? undefined : ''}
                              >
                                <span className={cn('truncate pt-[1.625rem] pb-2.5 text-left')}>
                                  {field.value ? formatDateStringToDDMMYYYY(field.value) : 'Desde*'}
                                </span>
                                <ArrowDownIcon className='size-6 shrink-0 stroke-text transition-transform duration-300 group-data-[state=open]:rotate-180' />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <FormLabel variant='field'>Desde*</FormLabel>
                        </FormGroup>
                        <PopoverContent align='start'>
                          <Calendar
                            mode='single'
                            selected={new Date(field.value)}
                            onSelect={(date) => field.onChange(date?.toISOString())}
                            disabled={{
                              before: new Date()
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='endsAt'
                  render={({ field }) => (
                    <FormItem>
                      <Popover>
                        <FormGroup>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                className={cn(
                                  'peer group grid h-14 grid-cols-[1fr_auto] items-center rounded-sm border border-transparent bg-gray-light px-5 text-body-mobile-2 text-transparent transition-none aria-[invalid=true]:border-error',
                                  {
                                    'text-text': field.value
                                  }
                                )}
                                variant='styless'
                                size='styless'
                                data-placeholder={field.value ? undefined : ''}
                              >
                                <span className={cn('truncate pt-[1.625rem] pb-2.5 text-left')}>
                                  {field.value ? formatDateStringToDDMMYYYY(field.value) : 'Hasta*'}
                                </span>
                                <ArrowDownIcon className='size-6 shrink-0 stroke-text transition-transform duration-300 group-data-[state=open]:rotate-180' />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <FormLabel variant='field'>Hasta*</FormLabel>
                        </FormGroup>
                        <PopoverContent align='start'>
                          <Calendar
                            mode='single'
                            selected={new Date(field.value)}
                            onSelect={(date) => field.onChange(date?.toISOString())}
                            disabled={{
                              before: new Date()
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='grid grid-cols-2 gap-x-4 gap-y-2.5'>
                <p className='col-span-full text-body-mobile-4 text-gray-dark'>Horarios:</p>
                <FormField
                  control={form.control}
                  name='startTime'
                  render={({ field }) => (
                    <FormItem>
                      <Select value={field.value} defaultValue={field.value} onValueChange={field.onChange}>
                        <FormGroup>
                          <FormControl>
                            <SelectTrigger variant='field'>
                              <SelectValue placeholder='' />
                            </SelectTrigger>
                          </FormControl>
                          <FormLabel variant='field'>Desde*</FormLabel>
                        </FormGroup>
                        <SelectContent>
                          {PROMOTION_HOURS.map((hour) => (
                            <SelectItem key={hour} value={hour}>
                              {addPeriodTo24Hour(hour)}
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
                  name='endTime'
                  render={({ field }) => (
                    <FormItem>
                      <Select value={field.value} defaultValue={field.value} onValueChange={field.onChange}>
                        <FormGroup>
                          <FormControl>
                            <SelectTrigger variant='field'>
                              <SelectValue placeholder='' />
                            </SelectTrigger>
                          </FormControl>
                          <FormLabel variant='field'>Hasta*</FormLabel>
                        </FormGroup>
                        <SelectContent>
                          {PROMOTION_HOURS.map((hour) => (
                            <SelectItem key={hour} value={hour}>
                              {addPeriodTo24Hour(hour)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name='days'
                render={({ field }) => (
                  <FormItem>
                    <Select value={field.value.length ? 'placeholder' : undefined}>
                      <FormGroup>
                        <FormControl>
                          <SelectTrigger variant='field'>
                            <SelectValue placeholder='' />
                          </SelectTrigger>
                        </FormControl>
                        <FormLabel variant='field'>Días*</FormLabel>
                      </FormGroup>
                      <SelectContent className='relative [&>div]:gap-y-2.5'>
                        <SelectItem value='placeholder' className='hidden'>
                          {formatSelectedDays(field.value, { short: true })}
                        </SelectItem>
                        <FormField
                          control={form.control}
                          name='days'
                          render={({ field }) => {
                            return (
                              <FormItem className='flex flex-row items-center justify-between gap-x-2.5'>
                                <FormLabel className='line-clamp-1 grow break-all text-body-mobile-2 text-text'>
                                  Todos los días
                                </FormLabel>
                                <FormControl>
                                  <Checkbox
                                    className='size-5 rounded-[0.3125rem] border-gray-dark data-[state=checked]:border-text data-[state=checked]:bg-text data-[state=checked]:text-background [&>span>svg]:size-2.5 [&>span>svg]:stroke-background'
                                    checked={
                                      !!(
                                        availableDays &&
                                        availableDays?.length > 0 &&
                                        availableDays?.every((day) => field.value?.includes(day))
                                      )
                                    }
                                    disabled={isLoadingAvailableDays || !availableDays?.length}
                                    onCheckedChange={(checked) => {
                                      if (isLoadingAvailableDays || !availableDays?.length) {
                                        return
                                      }

                                      if (checked) {
                                        return field.onChange([...availableDays])
                                      }
                                      return field.onChange([])
                                    }}
                                  />
                                </FormControl>
                              </FormItem>
                            )
                          }}
                        />
                        {DAYS?.map((day) => (
                          <FormField
                            key={day}
                            control={form.control}
                            name='days'
                            render={({ field }) => {
                              return (
                                <FormItem key={day} className='flex flex-row items-center justify-between gap-x-2.5'>
                                  <FormLabel className='line-clamp-1 grow break-all text-body-mobile-2 text-text'>
                                    {DAYS_DICTIONARY[day]}
                                  </FormLabel>
                                  <FormControl>
                                    <Checkbox
                                      className='size-5 rounded-[0.3125rem] border-gray-dark data-[state=checked]:border-text data-[state=checked]:bg-text data-[state=checked]:text-background [&>span>svg]:size-2.5 [&>span>svg]:stroke-background'
                                      checked={field.value?.includes(day)}
                                      disabled={isLoadingAvailableDays || !availableDays?.includes(day)}
                                      onCheckedChange={(checked) => {
                                        if (isLoadingAvailableDays || !availableDays?.includes(day)) {
                                          return
                                        }

                                        if (checked) {
                                          return field.onChange([...field.value, day])
                                        }
                                        return field.onChange(field.value?.filter((value) => value !== day))
                                      }}
                                    />
                                  </FormControl>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                      </SelectContent>
                    </Select>
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
            <Button type='submit' size='medium' disabled={isSubmitting || !isDirty}>
              {isSubmitting ? <LoaderIcon className='size-4 animate-spin' /> : 'Guardar cambios'}
            </Button>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  )
}

export { UpdatePromotionDrawer }
