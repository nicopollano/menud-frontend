import { fileURLToPath } from 'node:url'
import { createJiti } from 'jiti'
const jiti = createJiti(fileURLToPath(import.meta.url))

jiti.import('./env.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@ristokit/ui'],
  images: {
    unoptimized: true
  }
}

// produce standalone output to run with the Dockerfile runner
nextConfig.output = 'standalone'

export default nextConfig
