import { getServerSession } from '@/modules/auth/services/auth.service'
import { Header } from '@/modules/layout/header/header'
import { ROUTES } from '@/modules/shared/lib/routes'
import { redirect } from 'next/navigation'

interface CoreLayoutProps {
  children: React.ReactNode
}

async function CoreLayout({ children }: CoreLayoutProps) {
  const session = await getServerSession()
  if (!session) return redirect(ROUTES.AUTH_SIGN_IN)

  return (
    <main className='flex min-h-dvh flex-col gap-y-8 bg-neutral-50 px-4 py-8 md:px-6'>
      <Header />
      {children}
    </main>
  )
}

export default CoreLayout
