'use client'
import { mutateBranch } from '@/modules/branches/hooks/use-branch'
import { type UpdateBranchSchema, updateBranchSchema } from '@/modules/branches/schemas/update-branch.schema'
import { updateBranchById } from '@/modules/branches/services/branches.service'
import { useNavigationParams } from '@/modules/shared/hooks/use-navigation-params'
import { useToggle } from '@/modules/shared/hooks/use-toggle'
import { getDirtyValues } from '@/modules/shared/lib/react-hook-form/react-hook-form.helper'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Branch } from '@ristokit/shared/models/branch.model'
import { AlertError } from '@ristokit/ui/components/alert'
import { Button } from '@ristokit/ui/components/button'
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
import { Form, FormControl, FormField, FormGroup, FormItem, FormLabel, FormMessage } from '@ristokit/ui/components/form'
import { Input } from '@ristokit/ui/components/input'
import { toast } from '@ristokit/ui/components/sonner'
import { LineIcon } from '@ristokit/ui/icons/line.icon'
import { LoaderIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'

interface UpdateBranchPhoneDrawerProps {
  branch: Branch
  children: React.ReactNode
}

function UpdateBranchPhoneDrawer({ branch, children }: UpdateBranchPhoneDrawerProps) {
  const { businessId } = useNavigationParams()

  const { isOn: isOpenDrawer, update: setIsOpenDrawer, off: closeDrawer } = useToggle()

  const form = useForm<UpdateBranchSchema>({
    resolver: zodResolver(updateBranchSchema),
    defaultValues: {
      businessId: businessId,
      phone: branch.phone ?? null
    }
  })
  const { isSubmitting, isDirty, dirtyFields } = form.formState

  const onSubmit = async (values: UpdateBranchSchema) => {
    try {
      const changedValues = getDirtyValues(dirtyFields, values)

      const { error } = await updateBranchById({
        businessId: businessId,
        branchId: branch.id,
        phone: changedValues.phone
      })
      if (error) {
        return toast.custom(() => (
          <AlertError
            title='¡Error al actualizar la sucursal!'
            description={`No se pudo actualizar la sucursal ${values.name}.`}
            details={[error.message]}
          />
        ))
      }

      await mutateBranch({ businessId, branchId: branch.id })

      form.reset(values)
      closeDrawer()
    } catch (error) {
      toast.custom(() => (
        <AlertError
          title='¡Error al actualizar la sucursal!'
          description={`Ocurrió un error al intentar actualizar la sucursal ${values.name}.`}
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
                <DrawerTitle>Teléfono</DrawerTitle>
                <LineIcon className='h-px' />
              </div>
              <FormField
                control={form.control}
                name='phone'
                render={({ field }) => (
                  <FormItem>
                    <FormGroup>
                      <FormControl>
                        <Input placeholder='' variant='field' {...field} value={field.value ?? ''} />
                      </FormControl>
                      <FormLabel variant='field'>Teléfono</FormLabel>
                    </FormGroup>
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

export { UpdateBranchPhoneDrawer }
