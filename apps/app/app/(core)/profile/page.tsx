'use client'
import { PlansSection } from '@/modules/plans/components/section/plans-section'
import { ProfileSummary } from '@/modules/profile/components/summary/profile-summary'

function ProfilePage() {
  return (
    <section className='flex flex-col gap-y-[1.875rem]'>
      <ProfileSummary />
      <PlansSection />
    </section>
  )
}

export default ProfilePage
