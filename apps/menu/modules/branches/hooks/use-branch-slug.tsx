'use client'
import { useParams } from 'next/navigation'

function useBranchId() {
  const params = useParams<{ id: string }>()
  return params.id
}

export { useBranchId }
