'use client'
import { mutateBranch } from '@/modules/branches/hooks/use-branch'
import { type UpdateSchedulesSchema, updateSchedulesSchema } from '@/modules/schedules/schemas/update-schedules.schema'
import { updateSchedules } from '@/modules/schedules/services/schedules.service'
import { useNavigationParams } from '@/modules/shared/hooks/use-navigation-params'
import { useToggle } from '@/modules/shared/hooks/use-toggle'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Branch } from '@ristokit/shared/models/branch.model'
import { DAYS_DICTIONARY, type Day } from '@ristokit/shared/models/general.model'
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
import { Form, FormControl, FormField, FormItem } from '@ristokit/ui/components/form'
import { Input } from '@ristokit/ui/components/input'
import { toast } from '@ristokit/ui/components/sonner'
import { Switch } from '@ristokit/ui/components/switch'
import { LineIcon } from '@ristokit/ui/icons/line.icon'
import { LoaderIcon } from 'lucide-react'
import { useFieldArray, useForm } from 'react-hook-form'

interface UpdateSchedulesDrawerProps {
  branch: Branch
  children: React.ReactNode
}

function UpdateSchedulesDrawer({ branch, children }: UpdateSchedulesDrawerProps) {
  const { businessId, branchId } = useNavigationParams()

  const { isOn: isOpenDrawer, update: setIsOpenDrawer, off: closeDrawer } = useToggle()

  const form = useForm<UpdateSchedulesSchema>({
    resolver: zodResolver(updateSchedulesSchema),
    defaultValues: {
      schedules: branch.schedules
    }
  })
  const { isSubmitting, isDirty } = form.formState

  const { fields } = useFieldArray({
    control: form.control,
    name: 'schedules'
  })

  const onSubmit = async (values: UpdateSchedulesSchema) => {
    try {
      const { error } = await updateSchedules({
        businessId,
        branchId,
        schedules: values.schedules
      })
      if (error) {
        return toast.custom(() => (
          <AlertError
            title='¡Error al actualizar los horarios!'
            description={`No se pudo actualizar los horarios de la sucursal ${branch.name}.`}
            details={[error.message]}
          />
        ))
      }

      await mutateBranch({ businessId, branchId })

      form.reset(values)
      closeDrawer()
    } catch (error) {
      toast.custom(() => (
        <AlertError
          title='¡Error al actualizar los horarios!'
          description={`Ocurrió un error al intentar actualizar los horarios de la sucursal ${branch.name}.`}
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
                <DrawerTitle>Horario</DrawerTitle>
                <LineIcon className='h-px' />
              </div>
              {fields.map((field, index) => (
                <div key={field.id} className='flex items-center justify-between gap-x-2'>
                  <p className='truncate text-heading-mobile-4 text-text'>{DAYS_DICTIONARY[field.day as Day]}</p>
                  <div className='flex items-center gap-x-2.5'>
                    <FormField
                      control={form.control}
                      name={`schedules.${index}.enabled`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Switch size='small' checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`schedules.${index}.openTime`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              className='h-[2.125rem] min-w-20 rounded-xs px-2'
                              type='time'
                              {...field}
                              value={field.value ?? ''}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`schedules.${index}.closeTime`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              className='h-[2.125rem] min-w-20 rounded-xs px-2'
                              type='time'
                              {...field}
                              value={field.value ?? ''}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              ))}
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

export { UpdateSchedulesDrawer }
