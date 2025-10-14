'use client'
import { useEffect, useRef } from 'react'

function useRevokeObjectURL(urls: string[]) {
  const urlsRef = useRef<string[]>([])

  useEffect(() => {
    const previousURLs = urlsRef.current

    const urlsToRevoke = previousURLs.filter((url) => !urls.includes(url))

    for (const url of urlsToRevoke) {
      if (!url) continue
      URL.revokeObjectURL(url)
    }

    urlsRef.current = urls
  }, [urls])
}

export { useRevokeObjectURL }
