import { getServerSession } from '@/modules/auth/services/auth.service'
import { ROUTES } from '@/modules/shared/lib/routes'
import { redirect } from 'next/navigation'

interface LinkitLayoutProps {
  children: React.ReactNode
}

async function LinkitLayout({ children }: LinkitLayoutProps) {
  const session = await getServerSession()
  if (!session) return redirect(ROUTES.AUTH_SIGN_IN)

  return children
}

export default LinkitLayout
