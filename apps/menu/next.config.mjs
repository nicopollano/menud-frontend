import { fileURLToPath } from 'node:url'
import { createJiti } from 'jiti'
const jiti = createJiti(fileURLToPath(import.meta.url))

jiti.import('./env.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@ristokit/ui'],
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384]
  },
  // Performance optimizations
  experimental: {
    optimizePackageImports: ['@ristokit/ui', 'lucide-react'],
    webpackBuildWorker: true
  },
  // Production optimizations
  productionBrowserSourceMaps: false,
  compress: true,
  poweredByHeader: false,
  // React strict mode for better development experience
  reactStrictMode: true
}

// produce standalone output to run with the Dockerfile runner
nextConfig.output = 'standalone'

export default nextConfig
