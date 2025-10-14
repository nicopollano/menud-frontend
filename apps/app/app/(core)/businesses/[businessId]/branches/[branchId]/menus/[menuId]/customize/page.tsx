import { BranchPreviewCard } from '@/modules/branches/components/card/branch-preview-card'
import { MenuActionsCard } from '@/modules/menus/components/card/menu-actions-card'
import { CustomizeMenuSection } from '@/modules/menus/components/section/customize-menu-section'

function CustomizePage() {
  return (
    <section className='flex flex-col gap-y-[1.875rem]'>
      <BranchPreviewCard />
      <MenuActionsCard />
      <CustomizeMenuSection />
    </section>
  )
}

export default CustomizePage
