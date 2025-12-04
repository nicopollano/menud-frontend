'use client'
import { useProducts } from '@/modules/products/hooks/use-products'
import { PROMOTION_HOURS } from '@/modules/promotions/constants/promotion.const'
import { usePromotionAvailableDays } from '@/modules/promotions/hooks/use-promotion-available-days'
import { mutatePromotions } from '@/modules/promotions/hooks/use-promotions'
import { type CreatePromotionSchema, createPromotionSchema } from '@/modules/promotions/schemas/create-promotion.schema'
import { promotionService } from '@/modules/promotions/services/promotion.service'
import { scheduleTimesAdapter } from '@/modules/schedules/adapters/schedule.adapter'
import { formatDateTimeToSchedule } from '@/modules/schedules/helpers/schedules.helper'
import { PreviewImagesList } from '@/modules/shared/components/images/preview-images-list'
import { ACCEPTED_IMAGE_TYPES } from '@/modules/shared/constants/images.const'
import { combineDateStringAndTime, formatDateStringToDDMMYYYY } from '@/modules/shared/helpers/date.helper'
import { formatSelectedDays } from '@/modules/shared/helpers/day.helper'
import { adapterFileListToImages } from '@/modules/shared/helpers/images.helper'
import { pluralize } from '@/modules/shared/helpers/text.helper'
import { addPeriodTo24Hour } from '@/modules/shared/helpers/time.helper'
import { useNavigationParams } from '@/modules/shared/hooks/use-navigation-params'
import { useRevokeObjectURL } from '@/modules/shared/hooks/use-revoke-object-url'
import { useToggle } from '@/modules/shared/hooks/use-toggle'
import { imagesSchema } from '@/modules/shared/schemas/images.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { DAYS, DAYS_DICTIONARY } from '@ristokit/shared/models/general.model'
import { AlertError } from '@ristokit/ui/components/alert'
import { Button, UploaderButton } from '@ristokit/ui/components/button'
import { Calendar } from '@ristokit/ui/components/calendar'
import { Checkbox } from '@ristokit/ui/components/checkbox'
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
import { Popover, PopoverContent, PopoverTrigger } from '@ristokit/ui/components/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ristokit/ui/components/select'
import { toast } from '@ristokit/ui/components/sonner'
import { Textarea } from '@ristokit/ui/components/textarea'
import { ArrowDownIcon } from '@ristokit/ui/icons/arrow-down.icon'
import { LineIcon } from '@ristokit/ui/icons/line.icon'
import { cn } from '@ristokit/ui/lib/utils'
import { LoaderIcon, PercentIcon } from 'lucide-react'
import Image from 'next/image'
import { useRef } from 'react'
import { useForm } from 'react-hook-form'

function CreatePromotionDrawer() {
  const { businessId, branchId, menuId } = useNavigationParams()

  const imagesRef = useRef<HTMLInputElement>(null)
  const { isOn: isOpenDrawer, update: setIsOpenDrawer, off: closeDrawer } = useToggle()

  const { data: products, isLoading: isLoadingProducts } = useProducts({
    businessId,
    branchId,
    menuId,
    canRequest: isOpenDrawer
  })

  const form = useForm<CreatePromotionSchema>({
    resolver: zodResolver(createPromotionSchema),
    defaultValues: {
      productIds: [],
      title: '',
      description: null,
      images: [],
      startsAt: '',
      endsAt: '',
      startTime: '',
      endTime: '',
      days: []
    }
  })
  const { isSubmitting } = form.formState
  const selectedImages = form.watch('images')
  const hasSelectedImages = selectedImages.length > 0

  useRevokeObjectURL(selectedImages.map((image) => image.url))

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

  const onSubmit = async (values: CreatePromotionSchema) => {
    try {
      const startsAt = combineDateStringAndTime(values.startsAt, values.startTime)
      const endsAt = combineDateStringAndTime(values.endsAt, values.endTime)

      await promotionService.createPromotion({
        businessId,
        branchId,
        menuId,
        data: {
          productIds: values.productIds,
          title: values.title,
          description: values.description,
          startsAt: formatDateTimeToSchedule(startsAt),
          endsAt: formatDateTimeToSchedule(endsAt),
          days: values.days,
          images: values.images,
          startTime: values.startTime,
          endTime: values.endTime
        }
      })

      await mutatePromotions({ businessId, branchId, menuId })

      closeDrawer()
    } catch (error) {
      toast.custom(() => (
        <AlertError
          title='¡Error al crear la promoción!'
          description='Ocurrió un error al intentar crear la promoción.'
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
        <button
          style={{ backgroundColor: 'white' }}
          className='relative z-10 group flex items-center gap-3 rounded-full !bg-white p-1.5 pr-4 shadow-[0_4px_20px_rgb(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:scale-105 hover:!bg-[#fa5252] hover:border-white transition-all duration-300 border border-neutral-100'
        >
          <div className='flex size-8 items-center justify-center rounded-full bg-primary-50 text-primary-600 group-hover:!bg-white group-hover:!text-[#fa5252] transition-all duration-300'>
            <PercentIcon className='size-4' strokeWidth={2.5} />
          </div>
          <span className='text-sm font-semibold text-neutral-600 group-hover:text-white transition-colors duration-300'>
            Agregar promoción
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
                <DrawerTitle>Nueva promoción</DrawerTitle>
                <DrawerDescription className='sr-only'>
                  Crea promociones para tus productos y aumenta tus ventas.
                </DrawerDescription>
                <LineIcon className='h-px' />
              </div>
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-base font-semibold text-neutral-900 ml-1'>Título</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Ej: ¡Solo por hoy! Hasta 35% de descuento.'
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
                name='productIds'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-base font-semibold text-neutral-900 ml-1'>Elegir productos</FormLabel>
                    <Select value={field.value.length ? 'placeholder' : undefined}>
                      <FormControl>
                        <SelectTrigger className='h-12 rounded-full border-neutral-200 bg-neutral-50 px-4 hover:bg-neutral-100 focus:ring-primary-500/20'>
                          <SelectValue placeholder='Seleccionar productos' />
                        </SelectTrigger>
                      </FormControl>
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
                      <FormLabel className='text-base font-semibold text-neutral-900 ml-1'>Desde</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              className={cn(
                                'h-12 w-full justify-between rounded-full border border-neutral-200 bg-neutral-50 px-4 text-left font-normal hover:bg-neutral-100 focus:ring-primary-500/20',
                                !field.value && 'text-neutral-500'
                              )}
                              variant='ghost'
                            >
                              {field.value ? formatDateStringToDDMMYYYY(field.value) : 'Seleccionar fecha'}
                              <ArrowDownIcon className='size-4 opacity-50' />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent align='start'>
                          <Calendar
                            mode='single'
                            selected={new Date(field.value)}
                            onSelect={(date) => {
                              field.onChange(date?.toISOString())
                              form.setValue('days', [])
                            }}
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
                      <FormLabel className='text-base font-semibold text-neutral-900 ml-1'>Hasta</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              className={cn(
                                'h-12 w-full justify-between rounded-full border border-neutral-200 bg-neutral-50 px-4 text-left font-normal hover:bg-neutral-100 focus:ring-primary-500/20',
                                !field.value && 'text-neutral-500'
                              )}
                              variant='ghost'
                            >
                              {field.value ? formatDateStringToDDMMYYYY(field.value) : 'Seleccionar fecha'}
                              <ArrowDownIcon className='size-4 opacity-50' />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent align='start'>
                          <Calendar
                            mode='single'
                            selected={new Date(field.value)}
                            onSelect={(date) => {
                              field.onChange(date?.toISOString())
                              form.setValue('days', [])
                            }}
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
                      <FormLabel className='text-base font-semibold text-neutral-900 ml-1'>Desde</FormLabel>
                      <Select
                        value={field.value}
                        defaultValue={field.value}
                        onValueChange={(value) => {
                          field.onChange(value)
                          form.setValue('days', [])
                        }}
                      >
                        <FormControl>
                          <SelectTrigger className='h-12 rounded-full border-neutral-200 bg-neutral-50 px-4 hover:bg-neutral-100 focus:ring-primary-500/20'>
                            <SelectValue placeholder='00:00' />
                          </SelectTrigger>
                        </FormControl>
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
                      <FormLabel className='text-base font-semibold text-neutral-900 ml-1'>Hasta</FormLabel>
                      <Select
                        value={field.value}
                        defaultValue={field.value}
                        onValueChange={(value) => {
                          field.onChange(value)
                          form.setValue('days', [])
                        }}
                      >
                        <FormControl>
                          <SelectTrigger className='h-12 rounded-full border-neutral-200 bg-neutral-50 px-4 hover:bg-neutral-100 focus:ring-primary-500/20'>
                            <SelectValue placeholder='00:00' />
                          </SelectTrigger>
                        </FormControl>
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
                    <FormLabel className='text-base font-semibold text-neutral-900 ml-1'>Días</FormLabel>
                    <Select value={field.value.length ? 'placeholder' : undefined}>
                      <FormControl>
                        <SelectTrigger className='h-12 rounded-full border-neutral-200 bg-neutral-50 px-4 hover:bg-neutral-100 focus:ring-primary-500/20'>
                          <SelectValue placeholder='Seleccionar días' />
                        </SelectTrigger>
                      </FormControl>
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
                    <FormLabel className='text-base font-semibold text-neutral-900 ml-1'>Descripción</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='Breve descripción de la promoción...'
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
                      placeholder='Subir imagen'
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
                {isSubmitting ? <LoaderIcon className='size-4 animate-spin' /> : 'Crear promoción'}
              </Button>
            </div>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  )
}

export { CreatePromotionDrawer }
