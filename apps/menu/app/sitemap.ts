import { getBranchSlugs } from '@/modules/branches/services/branches.service'
import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:5000'

  // Get all branch slugs
  const { data: branches, error } = await getBranchSlugs()

  if (error || !branches) {
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 1
      }
    ]
  }

  // Create sitemap entries for each branch
  const branchUrls = branches.map((branch) => ({
    url: `${baseUrl}/${branch.slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.9
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1
    },
    ...branchUrls
  ]
}
