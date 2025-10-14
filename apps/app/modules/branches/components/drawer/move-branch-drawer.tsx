'use client'
import { mutateBranches } from '@/modules/branches/hooks/use-branches'
import { mutateBranchesSummary } from '@/modules/branches/hooks/use-branches-summary'
import { type MoveBranchSchema, moveBranchSchema } from '@/modules/branches/schemas/move-branch.schema'
import { branchService } from '@/modules/branches/services/branches.service'
import { useBusinesses } from '@/modules/businesses/hooks/use-businesses'
import { useNavigationParams } from '@/modules/shared/hooks/use-navigation-params'
import { useToggle } from '@/modules/shared/hooks/use-toggle'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Branch } from '@ristokit/shared/models/branch.model'
import { AlertError, AlertSuccess } from '@ristokit/ui/components/alert'
import { Button } from '@ristokit/ui/components/button'
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
import { Form, FormControl, FormField, FormGroup, FormItem, FormLabel, FormMessage } from '@ristokit/ui/components/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ristokit/ui/components/select'
import { toast } from '@ristokit/ui/components/sonner'
import { LineIcon } from '@ristokit/ui/icons/line.icon'
import { LoaderIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'

interface MoveBranchDrawerProps {
  branch: Branch
  children: React.ReactNode
}

function MoveBranchDrawer({ branch, children }: MoveBranchDrawerProps) {
  const { businessId } = useNavigationParams()

  const { isOn: isOpenDrawer, update: setIsOpenDrawer, off: closeDrawer } = useToggle()

  const form = useForm<MoveBranchSchema>({
    resolver: zodResolver(moveBranchSchema),
    defaultValues: {
      businessId: ''
    }
  })
  const { isSubmitting } = form.formState

  const { data: businesses, isLoading: isLoadingBusinesses } = useBusinesses({
    canRequest: isOpenDrawer
  })
  const filteredBusinesses = businesses?.filter((b) => b.id !== businessId)

  const onSubmit = async (values: MoveBranchSchema) => {
    try {
      const business = filteredBusinesses?.find((b) => b.id === values.businessId)
      if (!business) {
        return toast.custom(() => (
          <AlertError title='¡Error al mover la sucursal!' description='No se encontró el restaurante seleccionado.' />
        ))
      }

      await branchService.moveBranchById({
        businessId,
        branchId: branch.id,
        data: values
      })

      await Promise.all([mutateBranchesSummary({ businessId }), mutateBranches({ businessId })])

      toast.custom(() => (
        <AlertSuccess
          title='¡Sucursal movida!'
          description={`La sucursal ${branch.name} ha sido movida al restaurante ${business.name} correctamente.`}
        />
      ))
      closeDrawer()
    } catch (error) {
      toast.custom(() => (
        <AlertError
          title='¡Error al mover la sucursal!'
          description={`Ocurrió un error al intentar mover la sucursal ${branch.name}.`}
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
                <DrawerTitle>Mover sucursal</DrawerTitle>
                <DrawerDescription className='sr-only'>
                  Selecciona un restaurante para mover la sucursal.
                </DrawerDescription>
                <LineIcon className='h-px' />
              </div>
              <FormField
                control={form.control}
                name='businessId'
                render={({ field }) => (
                  <FormItem>
                    <Select value={field.value} defaultValue={field.value} onValueChange={field.onChange}>
                      <FormGroup>
                        <FormControl>
                          <SelectTrigger variant='field'>
                            <SelectValue placeholder='' />
                          </SelectTrigger>
                        </FormControl>
                        <FormLabel variant='field'>Restaurante*</FormLabel>
                      </FormGroup>
                      <SelectContent>
                        {isLoadingBusinesses && 'Cargando restaurantes...'}
                        {!isLoadingBusinesses && !filteredBusinesses?.length && 'Sin restaurantes'}
                        {filteredBusinesses?.map((business) => (
                          <SelectItem key={business.id} value={business.id}>
                            {business.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </DrawerHeader>
            <DrawerFooter>
              <Button type='submit' size='medium' disabled={isSubmitting}>
                {isSubmitting ? <LoaderIcon className='size-4 animate-spin' /> : 'Mover sucursal'}
              </Button>
              <DrawerClose type='button'>Cancelar</DrawerClose>
            </DrawerFooter>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  )
}

export { MoveBranchDrawer }
