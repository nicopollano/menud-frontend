import { SignInForm } from '@/modules/auth/components/form/sign-in-form'

function AuthSignInPage() {
  return (
    <main className='flex min-h-dvh items-center justify-center'>
      <section className='grid max-w-md gap-y-[6.25rem] p-2.5'>
        <header className='grid gap-y-[1.5625rem] text-center'>
          <h1 className='text-heading-mobile-1 text-text'>Inicia sesión</h1>
          <p className='max-w-prose 430:px-10 text-body-mobile-3 text-gray-dark'>
            Ingresá a tu cuenta para gestionar tu menú y personalizar tu restaurante con Ristokit.
          </p>
        </header>
        <SignInForm />
      </section>
      <div className='-rotate-30 -left-[8.125rem] -top-[7.1875rem] fixed size-[18.25rem] rounded-full bg-linear-(--gradient-eclipse)' />
      <div className='-bottom-[5.3125rem] -right-[4.625rem] fixed size-[12.125rem] rotate-150 rounded-full bg-linear-(--gradient-eclipse)' />
    </main>
  )
}

export default AuthSignInPage
