'use client'
import { type UpdateLinkitSchema, updateLinkitSchema } from '@/modules/linkit/schemas/update-linkit.schema'
import { linkitService } from '@/modules/linkit/services/linkit.service'
import { useToggle } from '@/modules/shared/hooks/use-toggle'
import { getDirtyValues } from '@/modules/shared/lib/react-hook-form/react-hook-form.helper'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Linkit } from '@ristokit/shared/models/linkit.model'
import { AlertError } from '@ristokit/ui/components/alert'
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
import { Form, FormControl, FormField, FormGroup, FormItem, FormLabel, FormMessage } from '@ristokit/ui/components/form'
import { Input } from '@ristokit/ui/components/input'
import { toast } from '@ristokit/ui/components/sonner'
import { LineIcon } from '@ristokit/ui/icons/line.icon'
import { LoaderIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

interface UpdateLinkitDrawerProps {
  linkit: Linkit
  children: React.ReactNode
}

function UpdateLinkitDrawer({ children, linkit }: UpdateLinkitDrawerProps) {
  const router = useRouter()

  const { isOn: isOpenDrawer, update: setIsOpenDrawer, off: closeDrawer } = useToggle()

  const form = useForm<UpdateLinkitSchema>({
    resolver: zodResolver(updateLinkitSchema),
    defaultValues: {
      website: linkit.website,
      whatsapp: linkit.whatsapp,
      instagram: linkit.instagram,
      facebook: linkit.facebook,
      twitter: linkit.twitter,
      linkedin: linkit.linkedin,
      tiktok: linkit.tiktok,
      location: linkit.location
    }
  })
  const { isSubmitting, isDirty, dirtyFields } = form.formState

  const onSubmit = async (values: UpdateLinkitSchema) => {
    try {
      const changedValues = getDirtyValues(dirtyFields, values)

      await linkitService.updateLinkitById({
        businessId: linkit.business.id,
        linkitId: linkit.id,
        data: changedValues
      })
      await linkitService.revalidateLinkitByBusinessId({
        businessId: linkit.business.id
      })

      router.refresh()

      form.reset(values)
      closeDrawer()
    } catch (error) {
      console.info(error)
      toast.custom(() => (
        <AlertError
          title='¡Error al agregar el enlace!'
          description='Ocurrió un error al intentar agregar el enlace.'
          details={error instanceof Error ? [error.message] : undefined}
        />
      ))
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
                <DrawerTitle>Agregar link</DrawerTitle>
                <DrawerDescription className='sr-only'>
                  Completa los campos para agregar un nuevo enlace a tu perfil de Linkit.
                </DrawerDescription>
                <LineIcon className='h-px' />
              </div>
              <FormField
                control={form.control}
                name='website'
                render={({ field }) => (
                  <FormItem>
                    <FormGroup>
                      <FormControl>
                        <Input placeholder='' variant='field' {...field} value={field.value ?? ''} />
                      </FormControl>
                      <FormLabel variant='field'>Sitio web</FormLabel>
                    </FormGroup>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='whatsapp'
                render={({ field }) => (
                  <FormItem>
                    <FormGroup>
                      <FormControl>
                        <Input placeholder='' variant='field' {...field} value={field.value ?? ''} />
                      </FormControl>
                      <FormLabel variant='field'>WhatsApp</FormLabel>
                    </FormGroup>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='instagram'
                render={({ field }) => (
                  <FormItem>
                    <FormGroup>
                      <FormControl>
                        <Input placeholder='' variant='field' {...field} value={field.value ?? ''} />
                      </FormControl>
                      <FormLabel variant='field'>Instagram</FormLabel>
                    </FormGroup>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='facebook'
                render={({ field }) => (
                  <FormItem>
                    <FormGroup>
                      <FormControl>
                        <Input placeholder='' variant='field' {...field} value={field.value ?? ''} />
                      </FormControl>
                      <FormLabel variant='field'>Facebook</FormLabel>
                    </FormGroup>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='twitter'
                render={({ field }) => (
                  <FormItem>
                    <FormGroup>
                      <FormControl>
                        <Input placeholder='' variant='field' {...field} value={field.value ?? ''} />
                      </FormControl>
                      <FormLabel variant='field'>X-Twitter</FormLabel>
                    </FormGroup>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='linkedin'
                render={({ field }) => (
                  <FormItem>
                    <FormGroup>
                      <FormControl>
                        <Input placeholder='' variant='field' {...field} value={field.value ?? ''} />
                      </FormControl>
                      <FormLabel variant='field'>LinkedIn</FormLabel>
                    </FormGroup>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='tiktok'
                render={({ field }) => (
                  <FormItem>
                    <FormGroup>
                      <FormControl>
                        <Input placeholder='' variant='field' {...field} value={field.value ?? ''} />
                      </FormControl>
                      <FormLabel variant='field'>TikTok</FormLabel>
                    </FormGroup>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='location'
                render={({ field }) => (
                  <FormItem>
                    <FormGroup>
                      <FormControl>
                        <Input placeholder='' variant='field' {...field} value={field.value ?? ''} />
                      </FormControl>
                      <FormLabel variant='field'>Ubicación</FormLabel>
                    </FormGroup>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </DrawerHeader>
            <Button type='submit' size='medium' disabled={isSubmitting || !isDirty}>
              {isSubmitting ? <LoaderIcon className='size-4 animate-spin' /> : 'Agregar'}
            </Button>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  )
}

export { UpdateLinkitDrawer }
