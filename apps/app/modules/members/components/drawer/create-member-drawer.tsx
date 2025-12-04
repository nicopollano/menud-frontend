'use client'
import { MEMBER_PERMISSIONS } from '@/modules/members/constants/member-permissions.const'
import { mutateMembers } from '@/modules/members/hooks/use-members'
import { type CreateMemberSchema, createMemberSchema } from '@/modules/members/schemas/create-member.schema'
import { createMember } from '@/modules/members/services/member.service'
import { generateRandomPassword } from '@/modules/shared/helpers/text.helper'
import { useNavigationParams } from '@/modules/shared/hooks/use-navigation-params'
import { useToggle } from '@/modules/shared/hooks/use-toggle'
import { zodResolver } from '@hookform/resolvers/zod'
import { AlertError } from '@ristokit/ui/components/alert'
import { Button } from '@ristokit/ui/components/button'
import { Checkbox } from '@ristokit/ui/components/checkbox'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@ristokit/ui/components/collapsible'
import {
  Drawer,
  DrawerContent,
  DrawerHandle,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@ristokit/ui/components/drawer'
import {
  Form,
  FormControl,
  FormField,
  FormGroup,
  FormItem,
  FormLabel,
  FormMessage,
  FormPasswordField
} from '@ristokit/ui/components/form'
import { Input } from '@ristokit/ui/components/input'
import { toast } from '@ristokit/ui/components/sonner'
import { LineIcon } from '@ristokit/ui/icons/line.icon'
import { LoaderIcon, ShuffleIcon, UserPlusIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'

function CreateMemberDrawer() {
  const { businessId, branchId } = useNavigationParams()
  const { isOn: isOpenDrawer, update: setIsOpenDrawer, off: closeDrawer } = useToggle()

  const form = useForm<CreateMemberSchema>({
    resolver: zodResolver(createMemberSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      role: undefined
    }
  })
  const { isSubmitting } = form.formState

  const onSubmit = async (values: CreateMemberSchema) => {
    try {
      const { error } = await createMember({
        businessId,
        branchId,
        name: values.name,
        email: values.email,
        password: values.password,
        role: values.role
      })
      if (error) {
        return toast.custom(() => (
          <AlertError
            title='¡Error al agregar al usuario!'
            description={`No se pudo crear el usuario ${values.name}.`}
            details={[error.message]}
          />
        ))
      }

      await mutateMembers({ businessId, branchId })

      closeDrawer()
    } catch (error) {
      toast.custom(() => (
        <AlertError
          title='¡Error al agregar al usuario!'
          description={`Ocurrió un error al intentar agregar al usuario ${values.name}.`}
          details={error instanceof Error ? [error.message] : undefined}
        />
      ))
    }
  }

  const handleGeneratePassword = () => {
    form.setValue('password', generateRandomPassword(), { shouldValidate: true })
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
            <UserPlusIcon className='size-4' strokeWidth={2.5} />
          </div>
          <span className='text-sm font-semibold text-neutral-600 group-hover:text-white transition-colors duration-300'>
            Agregar usuario
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
                <DrawerTitle>Nuevo usuario</DrawerTitle>
                <LineIcon className='h-px' />
              </div>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormGroup>
                      <FormControl>
                        <Input placeholder='' variant='field' {...field} />
                      </FormControl>
                      <FormLabel variant='field'>Nombre*</FormLabel>
                    </FormGroup>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormGroup>
                      <FormControl>
                        <Input placeholder='' variant='field' {...field} />
                      </FormControl>
                      <FormLabel variant='field'>Correo electrónico*</FormLabel>
                    </FormGroup>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormPasswordField {...field} />
                    <FormMessage />
                    <Button
                      onClick={handleGeneratePassword}
                      className='ml-auto'
                      variant='link'
                      size='styless'
                      type='button'
                    >
                      <ShuffleIcon />
                      Generar contraseña
                    </Button>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='role'
                render={() => (
                  <FormItem className='gap-y-[1.875rem]'>
                    <FormLabel className='text-heading-mobile-4 text-text'>Establecer permisos</FormLabel>
                    {MEMBER_PERMISSIONS.map((item) => (
                      <FormField
                        key={item.label}
                        control={form.control}
                        name='role'
                        render={({ field }) => {
                          return (
                            <Collapsible className='grid gap-y-4'>
                              <FormItem key={item.label} className='flex flex-row items-center gap-x-5'>
                                <FormControl>
                                  <Checkbox
                                    className='size-12 rounded-[0.5rem] border border-gray-dark bg-background data-[state=checked]:border-text data-[state=checked]:bg-text [&>span>svg]:size-6 [&>span>svg]:stroke-background'
                                    checked={field.value === item.role}
                                    onCheckedChange={(checked) => {
                                      return checked ? field.onChange(item.role) : field.onChange(undefined)
                                    }}
                                  />
                                </FormControl>
                                <div className='flex flex-col items-start gap-y-[0.3125rem]'>
                                  <p className='text-heading-mobile-4 text-text'>{item.label}</p>
                                  <CollapsibleTrigger className='text-body-mobile-3 text-gray-dark' type='button'>
                                    Ver permisos
                                  </CollapsibleTrigger>
                                </div>
                              </FormItem>
                              <CollapsibleContent className='grid'>
                                {item.permissions.map((permission) => (
                                  <p key={permission} className='text-body-mobile-3 text-gray-dark'>
                                    - {permission}
                                  </p>
                                ))}
                              </CollapsibleContent>
                            </Collapsible>
                          )
                        }}
                      />
                    ))}
                    <FormMessage className='-mt-5' />
                  </FormItem>
                )}
              />
            </DrawerHeader>
            <Button type='submit' size='medium' disabled={isSubmitting}>
              {isSubmitting ? <LoaderIcon className='size-4 animate-spin' /> : 'Agregar usuario'}
            </Button>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  )
}

export { CreateMemberDrawer }
