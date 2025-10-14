'use client'
import { useParams } from 'next/navigation'

function useNavigationParams() {
  const params = useParams<{ businessId: string; branchId: string; menuId: string }>()
  return params
}

export { useNavigationParams }
