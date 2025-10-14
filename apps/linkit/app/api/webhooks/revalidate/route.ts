import { env } from '@/env'
import { revalidateTag } from 'next/cache'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const tag = request.nextUrl.searchParams.get('tag')

  if (tag) {
    revalidateTag(tag)
    return Response.json(
      {
        revalidated: true,
        now: Date.now(),
        message: `The tag ${tag} has been revalidated`
      },
      {
        headers: {
          'Access-Control-Allow-Origin': env.NEXT_PUBLIC_APP_DOMAIN
        }
      }
    )
  }

  return Response.json(
    {
      revalidated: false,
      now: Date.now(),
      message: 'The tag is missing'
    },
    {
      headers: {
        'Access-Control-Allow-Origin': env.NEXT_PUBLIC_APP_DOMAIN
      }
    }
  )
}
