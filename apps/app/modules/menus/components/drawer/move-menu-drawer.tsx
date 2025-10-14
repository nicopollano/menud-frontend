'use client'
import { useBranches } from '@/modules/branches/hooks/use-branches'
import { useBusinesses } from '@/modules/businesses/hooks/use-businesses'
import { mutateMenus } from '@/modules/menus/hooks/use-menus'
import { mutateMenusSummary } from '@/modules/menus/hooks/use-menus-summary'
import { type MoveMenuSchema, moveMenuSchema } from '@/modules/menus/schemas/move-menu.schema'
import { menuService } from '@/modules/menus/services/menus.service'
import { useNavigationParams } from '@/modules/shared/hooks/use-navigation-params'
import { useToggle } from '@/modules/shared/hooks/use-toggle'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Menu } from '@ristokit/shared/models/menu.model'
import { AlertError, AlertSuccess } from '@ristokit/ui/components/alert'
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ristokit/ui/components/select'
import { toast } from '@ristokit/ui/components/sonner'
import { LineIcon } from '@ristokit/ui/icons/line.icon'
import { LoaderIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'

interface MoveMenuDrawerProps {
  menu: Menu
  children: React.ReactNode
}

function MoveMenuDrawer({ menu, children }: MoveMenuDrawerProps) {
  const { businessId, branchId } = useNavigationParams()

  const { isOn: isOpenDrawer, update: setIsOpenDrawer, off: closeDrawer } = useToggle()

  const form = useForm<MoveMenuSchema>({
    resolver: zodResolver(moveMenuSchema),
    defaultValues: {
      businessId: '',
      branchId: ''
    }
  })
  const { isSubmitting } = form.formState
  const selectedBusinessId = form.watch('businessId')

  const { data: businesses, isLoading: isLoadingBusinesses } = useBusinesses({
    canRequest: isOpenDrawer
  })

  const { data: branches, isLoading: isLoadingBranches } = useBranches({
    businessId: selectedBusinessId,
    canRequest: !!(isOpenDrawer && selectedBusinessId)
  })
  const filteredBranches = branches?.filter((b) => b.id !== branchId)

  const onSubmit = async (values: MoveMenuSchema) => {
    try {
      const business = businesses?.find((b) => b.id === values.businessId)
      if (!business) {
        return toast.custom(() => (
          <AlertError title='¡Error al mover la sucursal!' description='No se encontró el restaurante seleccionado.' />
        ))
      }

      const branch = filteredBranches?.find((b) => b.id === values.branchId)
      if (!branch) {
        return toast.custom(() => (
          <AlertError title='¡Error al mover la sucursal!' description='No se encontró la sucursal seleccionada.' />
        ))
      }

      await menuService.moveMenuById({
        businessId,
        branchId,
        menuId: menu.id,
        data: values
      })

      await Promise.all([mutateMenusSummary({ businessId, branchId }), mutateMenus({ businessId, branchId })])

      toast.custom(() => (
        <AlertSuccess
          title='¡Menú movido!'
          description={`El menú ${menu.name} ha sido movido a la sucursal ${branch.name} del restaurante ${business.name} correctamente.`}
        />
      ))
      closeDrawer()
    } catch (error) {
      toast.custom(() => (
        <AlertError
          title='¡Error al mover el menú!'
          description={`Ocurrió un error al intentar mover el menú ${menu.name}.`}
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
                <DrawerTitle>Mover menú</DrawerTitle>
                <LineIcon className='h-px' />
              </div>
              <FormField
                control={form.control}
                name='businessId'
                render={({ field }) => (
                  <FormItem>
                    <Select
                      value={field.value}
                      defaultValue={field.value}
                      onValueChange={(value) => {
                        field.onChange(value)
                        form.resetField('branchId')
                      }}
                    >
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
                        {!isLoadingBusinesses && !businesses?.length && 'Sin restaurantes'}
                        {businesses?.map((business) => (
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
              <FormField
                control={form.control}
                name='branchId'
                render={({ field }) => (
                  <FormItem>
                    <Select value={field.value} defaultValue={field.value} onValueChange={field.onChange}>
                      <FormGroup>
                        <FormControl>
                          <SelectTrigger variant='field'>
                            <SelectValue placeholder='' />
                          </SelectTrigger>
                        </FormControl>
                        <FormLabel variant='field'>Sucursal*</FormLabel>
                      </FormGroup>
                      <SelectContent>
                        {isLoadingBranches && 'Cargando sucursales...'}
                        {!isLoadingBranches && !filteredBranches?.length && 'Sin sucursales'}
                        {filteredBranches?.map((branch) => (
                          <SelectItem key={branch.id} value={branch.id}>
                            {branch.name}
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
                {isSubmitting ? <LoaderIcon className='size-4 animate-spin' /> : 'Mover menú'}
              </Button>
              <DrawerClose type='button'>Cancelar</DrawerClose>
            </DrawerFooter>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  )
}

export { MoveMenuDrawer }
