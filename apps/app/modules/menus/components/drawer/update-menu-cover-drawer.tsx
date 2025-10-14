'use client'
import { mutateMenu } from '@/modules/menus/hooks/use-menu'
import { type UpdateMenuSchema, updateMenuSchema } from '@/modules/menus/schemas/update-menu.schema'
import { updateMenuById } from '@/modules/menus/services/menus.service'
import { ACCEPTED_IMAGE_TYPES } from '@/modules/shared/constants/images.const'
import { adapterFileToImage } from '@/modules/shared/helpers/images.helper'
import { useNavigationParams } from '@/modules/shared/hooks/use-navigation-params'
import { useRevokeObjectURL } from '@/modules/shared/hooks/use-revoke-object-url'
import { useToggle } from '@/modules/shared/hooks/use-toggle'
import { getDirtyValues } from '@/modules/shared/lib/react-hook-form/react-hook-form.helper'
import { imageSchema } from '@/modules/shared/schemas/images.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Menu } from '@ristokit/shared/models/menu.model'
import { AlertError } from '@ristokit/ui/components/alert'
import { Button, UploaderButton } from '@ristokit/ui/components/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHandle,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@ristokit/ui/components/drawer'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@ristokit/ui/components/form'
import { Input } from '@ristokit/ui/components/input'
import { toast } from '@ristokit/ui/components/sonner'
import { LineIcon } from '@ristokit/ui/icons/line.icon'
import { LoaderIcon } from 'lucide-react'
import Image from 'next/image'
import { useRef } from 'react'
import { useForm } from 'react-hook-form'

interface UpdateMenuCoverDrawerProps {
  menu: Menu
  children: React.ReactNode
}

function UpdateMenuCoverDrawer({ menu, children }: UpdateMenuCoverDrawerProps) {
  const { businessId, branchId, menuId } = useNavigationParams()

  const { isOn: isOpenDrawer, update: setIsOpenDrawer, off: closeDrawer } = useToggle()
  const imagesRef = useRef<HTMLInputElement>(null)

  const form = useForm<UpdateMenuSchema>({
    resolver: zodResolver(updateMenuSchema),
    defaultValues: {
      businessId,
      branchId,
      cover: menu?.cover ? { url: menu.cover, file: null } : null
    }
  })
  const { isSubmitting, isDirty, dirtyFields } = form.formState
  const selectedCover = form.watch('cover')

  useRevokeObjectURL(selectedCover ? [selectedCover.url] : [])

  const onSubmit = async (values: UpdateMenuSchema) => {
    try {
      const changedValues = getDirtyValues(dirtyFields, values)

      const { error } = await updateMenuById({
        businessId,
        branchId,
        menuId,
        cover: changedValues.cover
      })
      if (error) {
        return toast.custom(() => (
          <AlertError
            title='¡Error al actualizar el menú!'
            description={`No se pudo actualizar el menú ${menu.name}.`}
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
          title='¡Error al actualizar el menú!'
          description={`Ocurrió un error al intentar actualizar el menú ${menu.name}.`}
          details={error instanceof Error ? [error.message] : undefined}
        />
      ))
    }
  }

  const handleUploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const adaptedFile = adapterFileToImage(file)
    const validatedImage = imageSchema.safeParse(adaptedFile)

    if (validatedImage.error) {
      const details = validatedImage.error.errors.map((error) => error.message)

      return toast.custom(() => (
        <AlertError
          title='¡Error al subir la imagen!'
          description='Ocurrió un error al intentar subir la imagen.'
          details={details}
        />
      ))
    }

    form.setValue('cover', validatedImage.data, { shouldDirty: true, shouldValidate: true })
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
                <DrawerTitle>Portada del menú</DrawerTitle>
                <LineIcon className='h-px' />
              </div>
              <DrawerDescription>Te recomendamos que mida 1080x170 pixeles.</DrawerDescription>
              <FormField
                control={form.control}
                name='cover'
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                render={({ field: { value, onChange, ref, ...field } }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className='sr-only'
                        type='file'
                        accept={ACCEPTED_IMAGE_TYPES.join(', ')}
                        ref={imagesRef}
                        onChange={handleUploadImage}
                        {...field}
                      />
                    </FormControl>
                    {!selectedCover && (
                      <UploaderButton onClick={() => imagesRef.current?.click()} placeholder='Subir imagen' />
                    )}
                    {selectedCover?.url && (
                      <Button
                        onClick={() => imagesRef.current?.click()}
                        className='relative size-full min-h-[8.875rem] rounded-sm bg-secondary'
                        type='button'
                        variant='styless'
                        size='styless'
                      >
                        <Image
                          className='rounded-sm object-cover'
                          src={selectedCover.url}
                          alt='Portada del menú'
                          fill
                        />
                      </Button>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </DrawerHeader>
            <DrawerFooter>
              <Button type='submit' size='medium' disabled={isSubmitting || !isDirty}>
                {isSubmitting ? <LoaderIcon className='size-4 animate-spin' /> : 'Guardar'}
              </Button>
              <DrawerClose type='button'>Cancelar</DrawerClose>
            </DrawerFooter>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  )
}

export { UpdateMenuCoverDrawer }
