import { getServerSession } from '@/modules/auth/services/auth.service'
import { ROUTES } from '@/modules/shared/lib/routes'
import { redirect } from 'next/navigation'

async function HomePage() {
  const session = await getServerSession()
  if (!session) return redirect(ROUTES.AUTH_SIGN_IN)

  return redirect(ROUTES.BUSINESSES)
}

export default HomePage
