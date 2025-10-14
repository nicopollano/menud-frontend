'use client'
import { type SignInSchema, signInSchema } from '@/modules/auth/schemas/auth.schema'
import { ROUTES } from '@/modules/shared/lib/routes'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@ristokit/ui/components/button'
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
import { LoaderIcon } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

function SignInForm() {
  const router = useRouter()
  const [apiErrorMessage, setApiErrorMessage] = useState<string | null>(null)

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
      <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-y-5'>
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
            </FormItem>
          )}
        />
        {apiErrorMessage && (
          <>
            <FormMessage>{apiErrorMessage}</FormMessage>
            <p className='text-body-mobile-4 text-gray-dark'>
              Verificá que estés ingresando los datos tal como te los compartimos. Si el problema persiste, contactanos
              para ayudarte.
            </p>
          </>
        )}
        <Button className='mt-2.5' type='submit' disabled={isSubmitting}>
          {isSubmitting ? <LoaderIcon className='size-4 animate-spin' /> : 'Iniciar sesión'}
        </Button>
      </form>
    </Form>
  )
}

export { SignInForm }
