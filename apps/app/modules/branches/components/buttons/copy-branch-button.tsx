'use client'
import { mutateBranches } from '@/modules/branches/hooks/use-branches'
import { mutateBranchesSummary } from '@/modules/branches/hooks/use-branches-summary'
import { branchService } from '@/modules/branches/services/branches.service'
import { useNavigationParams } from '@/modules/shared/hooks/use-navigation-params'
import type { Branch } from '@ristokit/shared/models/branch.model'
import { AlertError, AlertSuccess } from '@ristokit/ui/components/alert'
import { toast } from '@ristokit/ui/components/sonner'
import { CopyIcon } from '@ristokit/ui/icons/copy.icon'
import { useState } from 'react'

interface CopyBranchButtonProps {
  branch: Branch
}

function CopyBranchButton({ branch }: CopyBranchButtonProps) {
  const { businessId } = useNavigationParams()
  const [isCopying, setIsCopying] = useState(false)

  const handleCopyBranch = async () => {
    try {
      setIsCopying(true)

      await branchService.copyBranchById({
        businessId,
        branchId: branch.id,
        data: { businessId }
      })

      await Promise.all([mutateBranchesSummary({ businessId }), mutateBranches({ businessId })])

      toast.custom(() => (
        <AlertSuccess
          title='¡Sucursal copiada!'
          description={`La sucursal ${branch.name} ha sido copiada correctamente.`}
        />
      ))
    } catch (error) {
      toast.custom(() => (
        <AlertError
          title='¡Error al copiar la sucursal!'
          description={`Ocurrió un error al intentar copiar la sucursal ${branch.name}.`}
          details={error instanceof Error ? [error.message] : undefined}
        />
      ))
    } finally {
      setIsCopying(false)
    }
  }

  return (
    <button
      onClick={handleCopyBranch}
      disabled={isCopying}
      className='disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50'
      type='button'
    >
      <CopyIcon className='size-6 stroke-text' />
    </button>
  )
}

export { CopyBranchButton }
