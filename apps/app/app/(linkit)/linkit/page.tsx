import { LinkitCardCarousel } from '@/modules/linkit/components/carousel/linkit-card-carousel'
import { linkitService } from '@/modules/linkit/services/linkit.service'

export const dynamic = 'force-dynamic'

async function LinkitPage() {
  const linkits = await linkitService.getLinkits()

  return (
    <main className='flex min-h-dvh items-center justify-center'>
      <LinkitCardCarousel linkits={linkits} />
      <div className='-rotate-30 -left-[8.125rem] -top-[7.1875rem] -z-10 fixed size-[18.25rem] rounded-full bg-linear-(--gradient-eclipse)' />
      <div className='-bottom-[5.3125rem] -right-[4.625rem] -z-10 fixed size-[12.125rem] rotate-150 rounded-full bg-linear-(--gradient-eclipse)' />
    </main>
  )
}

export default LinkitPage
