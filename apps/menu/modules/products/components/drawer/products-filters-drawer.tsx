'use client'
import { useBranch } from '@/modules/branches/providers/branch.provider'
import { INTERVAL_PRICE, MAX_PRICE, MIN_PRICE } from '@/modules/products/constants/product.const'
import { type ProductsFiltersSchema, productsFiltersSchema } from '@/modules/products/schemas/product.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@ristokit/ui/components/button'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHandle,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@ristokit/ui/components/drawer'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@ristokit/ui/components/form'
import { Pill } from '@ristokit/ui/components/pill'
import { RadioGroup, RadioGroupItem } from '@ristokit/ui/components/radio-group'
import { Slider } from '@ristokit/ui/components/slider'
import { FiltersIcon } from '@ristokit/ui/icons/filters.icon'
import { LineIcon } from '@ristokit/ui/icons/line.icon'
import { PolygonIcon } from '@ristokit/ui/icons/polygon.icon'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

function ProductsFiltersDrawer() {
  const { filters, updateFilters, countActiveFilters, categories } = useBranch()

  const [isOpenDrawer, setIsOpenDrawer] = useState(false)

  const form = useForm<ProductsFiltersSchema>({
    resolver: zodResolver(productsFiltersSchema),
    defaultValues: {
      categoryId: filters.categoryId,
      subcategoryId: filters.subcategoryId,
      price: filters.price || MAX_PRICE
    }
  })
  const { isSubmitting } = form.formState

  const selectedCategoryId = form.watch('categoryId')
  const selectedSubcategoryId = form.watch('subcategoryId')

  const subcategories = categories.find((category) => category.id === selectedCategoryId)?.subcategories || []

  const onSubmit = (values: ProductsFiltersSchema) => {
    try {
      updateFilters({
        categoryId: values.categoryId,
        subcategoryId: values.subcategoryId,
        price: values.price === MAX_PRICE ? undefined : values.price
      })
      setIsOpenDrawer(false)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Drawer
      open={isOpenDrawer}
      onOpenChange={(state) => {
        setIsOpenDrawer(state)
        form.reset({
          categoryId: filters.categoryId,
          subcategoryId: filters.subcategoryId,
          price: filters.price || MAX_PRICE
        })
      }}
    >
      <DrawerTrigger asChild>
        <Button className='relative size-[3.125rem] border-primary stroke-text' variant='outline'>
          {countActiveFilters() > 0 && (
            <span className='absolute top-[0.4375rem] left-[0.4375rem] size-3.5 rounded-full bg-primary text-center text-background text-body-mobile-4'>
              {countActiveFilters()}
            </span>
          )}
          <FiltersIcon />
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
              <div className='grid gap-y-[1.875rem]'>
                <DrawerTitle>Filtros</DrawerTitle>
                <DrawerDescription>
                  Podés marcar tus preferencias para que sólo veas platos que se adapten a vos.
                </DrawerDescription>
              </div>
              {categories.length > 0 && (
                <FormField
                  control={form.control}
                  name='categoryId'
                  render={({ field }) => (
                    <FormItem className='grid gap-y-5'>
                      <div className='grid gap-y-2.5'>
                        <p className='text-heading-mobile-4 text-text'>Categorías</p>
                        <LineIcon className='bg-primary' />
                      </div>
                      <FormControl>
                        <RadioGroup
                          onValueChange={(value) => {
                            field.onChange(value)
                            form.setValue('subcategoryId', undefined)
                          }}
                          value={field.value}
                          defaultValue={field.value}
                          className='flex flex-wrap gap-x-[0.9375rem] gap-y-4'
                        >
                          {categories.map((category) => (
                            <FormItem key={category.id}>
                              <FormControl>
                                <RadioGroupItem value={category.id} className='sr-only' />
                              </FormControl>
                              <FormLabel>
                                <Pill isSelected={selectedCategoryId === category.id}>{category.name}</Pill>
                              </FormLabel>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              {subcategories?.length > 0 && (
                <FormField
                  control={form.control}
                  name='subcategoryId'
                  render={({ field }) => (
                    <FormItem className='grid gap-y-5'>
                      <div className='grid gap-y-2.5'>
                        <p className='text-heading-mobile-4 text-text'>Subcategorías</p>
                        <LineIcon className='bg-primary' />
                      </div>
                      <FormControl>
                        <RadioGroup
                          onValueChange={(value) => field.onChange(value)}
                          value={field.value}
                          defaultValue={field.value}
                          className='flex flex-wrap gap-x-[0.9375rem] gap-y-4'
                        >
                          {subcategories.map((subcategory) => (
                            <FormItem key={subcategory.id}>
                              <FormControl>
                                <RadioGroupItem value={subcategory.id} className='sr-only' />
                              </FormControl>
                              <FormLabel>
                                <Pill isSelected={selectedSubcategoryId === subcategory.id}>{subcategory.name}</Pill>
                              </FormLabel>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name='price'
                render={({ field }) => (
                  <FormItem className='grid gap-y-[4.375rem]'>
                    <div className='grid gap-y-2.5'>
                      <p className='text-heading-mobile-4 text-text'>Rango de precio</p>
                      <LineIcon className='bg-primary' />
                    </div>
                    <FormItem className='grid gap-y-2.5'>
                      <div className='relative'>
                        <FormControl>
                          <Slider
                            className='mx-auto w-[calc(100%-1.25rem)]'
                            value={[field.value]}
                            onValueChange={(value) => field.onChange(value[0])}
                            min={MIN_PRICE}
                            max={MAX_PRICE}
                            step={INTERVAL_PRICE}
                            name={field.name}
                            disabled={field.disabled}
                            onBlur={field.onBlur}
                            ref={field.ref}
                          />
                        </FormControl>
                        <div
                          className='absolute flex min-w-[2.625rem] items-center rounded-[0.3125rem] bg-secondary px-[0.1875rem] py-0.5 text-body-mobile-3 text-text'
                          style={{
                            left: 'calc(0% + 1px)',
                            bottom: 'calc(100% + 14px)'
                          }}
                        >
                          <span className='text-primary'>$</span>
                          {field.value}
                          <PolygonIcon className='-bottom-1.5 absolute inset-x-0 mx-auto' />
                        </div>
                      </div>
                      <p className='flex items-center justify-between gap-x-1 text-body-mobile-3 text-gray-dark'>
                        <span>${MIN_PRICE}</span>
                        <span>${MAX_PRICE}</span>
                      </p>
                    </FormItem>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </DrawerHeader>
            <Button type='submit' size='medium' disabled={isSubmitting}>
              Aplicar filtros
            </Button>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  )
}

export { ProductsFiltersDrawer }
