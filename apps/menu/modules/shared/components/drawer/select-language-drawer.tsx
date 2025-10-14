'use client'
import { type SelectLanguageSchema, selectLanguageSchema } from '@/modules/shared/schemas/language.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { LOCALES, LOCALES_DICTIONARY, Locale } from '@ristokit/shared/models/general.model'
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
import { RadioGroup, RadioGroupItem } from '@ristokit/ui/components/radio-group'
import { CheckIcon } from '@ristokit/ui/icons/check.icon'
import { LanguageIcon } from '@ristokit/ui/icons/language.icon'
import { cn } from '@ristokit/ui/lib/utils'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

function SelectLanguageDrawer() {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false)

  const form = useForm<SelectLanguageSchema>({
    resolver: zodResolver(selectLanguageSchema),
    defaultValues: {
      language: Locale.ES_AR
    }
  })
  const selectedLanguage = form.watch('language')

  const onSubmit = async (data: SelectLanguageSchema) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      console.log(data)
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
        form.reset()
      }}
    >
      <DrawerTrigger asChild>
        <Button className='size-9 border-primary' variant='outline' size='small'>
          <LanguageIcon />
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
              <DrawerTitle>Seleccioná tu idioma preferido</DrawerTitle>
              <DrawerDescription className='text-text'>
                Para que puedas disfrutar mejor tu experiencia, te ofrecemos la opción de ver el menú en el idioma que
                te resulte más cómodo. Elegí entre los siguientes idiomas disponibles:
              </DrawerDescription>
              <FormField
                control={form.control}
                name='language'
                render={({ field }) => (
                  <FormItem className='grid gap-y-[1.875rem]'>
                    <DrawerTitle>Idiomas:</DrawerTitle>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className='flex flex-col gap-y-2.5'
                      >
                        {LOCALES.map((locale) => (
                          <FormItem key={locale}>
                            <FormControl>
                              <RadioGroupItem value={locale} className='sr-only' />
                            </FormControl>
                            <FormLabel
                              className={cn(
                                'flex items-center gap-x-2.5 text-body-mobile-2 text-text',
                                selectedLanguage === locale && 'text-heading-mobile-4'
                              )}
                            >
                              {LOCALES_DICTIONARY[locale]}
                              {selectedLanguage === locale && <CheckIcon className='stroke-primary' />}
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </DrawerHeader>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  )
}

export { SelectLanguageDrawer }
