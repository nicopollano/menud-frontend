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
    <main className='flex flex-col gap-y-[1.875rem] px-4 py-[1.875rem]'>
      <Header />
      {children}
    </main>
  )
}

export default CoreLayout
