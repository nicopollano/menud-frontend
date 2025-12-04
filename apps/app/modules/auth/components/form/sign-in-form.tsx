'use client'
import { type SignInSchema, signInSchema } from '@/modules/auth/schemas/auth.schema'
import { ROUTES } from '@/modules/shared/lib/routes'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@ristokit/ui/components/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@ristokit/ui/components/form'
import { Input } from '@ristokit/ui/components/input'
import { EyeIcon, EyeOffIcon, KeyRoundIcon, LoaderIcon, LockKeyholeIcon, MailIcon } from 'lucide-react'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

function SignInForm() {
  const router = useRouter()
  const [apiErrorMessage, setApiErrorMessage] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })
  const { isSubmitting } = form.formState

  const onSubmit = async (values: SignInSchema) => {
    try {
      setApiErrorMessage(null)

      const response = await signIn('credentials', {
        email: values.email,
        password: values.password,
        redirect: false
      })
      if (response?.error) return setApiErrorMessage(response.error)

      router.push(ROUTES.HOME)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-6'>
        <div className='flex flex-col gap-6'>
          {/* Email Field */}
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-neutral-900 font-semibold text-sm'>Correo electrónico</FormLabel>
                <div className='relative'>
                  <FormControl>
                    <Input
                      placeholder='nombre@empresa.com'
                      className='peer h-10 rounded-none border-0 border-b-2 border-neutral-200 bg-transparent px-0 text-base shadow-none transition-all duration-200 focus:border-primary-500 focus:ring-0'
                      {...field}
                    />
                  </FormControl>
                  <div className='pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-neutral-400 peer-focus:text-primary-500'>
                    <MailIcon className='size-5' />
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password Field */}
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-neutral-900 font-semibold text-sm'>Contraseña</FormLabel>
                <div className='relative'>
                  <FormControl>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder='••••••••'
                      className='peer h-10 rounded-none border-0 border-b-2 border-neutral-200 bg-transparent px-0 pr-8 text-base shadow-none transition-all duration-200 focus:border-primary-500 focus:ring-0'
                      {...field}
                    />
                  </FormControl>
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-0 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors'
                  >
                    {showPassword ? <EyeOffIcon className='size-5' /> : <EyeIcon className='size-5' />}
                  </button>
                </div>
                <div className='flex justify-end mt-1'>
                  <Link
                    href='#'
                    className='text-xs font-medium text-neutral-500 hover:text-neutral-900 transition-colors'
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {apiErrorMessage && (
          <div className='flex flex-col gap-2 rounded-lg border border-error-200 bg-error-50 p-3 shadow-sm animate-in fade-in slide-in-from-top-2'>
            <FormMessage className='font-semibold text-sm text-error-900'>{apiErrorMessage}</FormMessage>
          </div>
        )}

        <Button
          variant='primary'
          size='lg'
          type='submit'
          disabled={isSubmitting}
          className='h-12 w-full rounded-full bg-[#C82020] text-white text-base font-bold shadow-lg shadow-red-900/20 transition-all duration-200 hover:bg-[#b01c1c] hover:shadow-red-900/30 active:scale-[0.98]'
        >
          {isSubmitting ? (
            <span className='flex items-center justify-center gap-2.5'>
              <LoaderIcon className='size-5 animate-spin' />
              <span className='font-medium'>Iniciando sesión...</span>
            </span>
          ) : (
            <span>Iniciar sesión</span>
          )}
        </Button>
      </form>
    </Form>
  )
}

export { SignInForm }
