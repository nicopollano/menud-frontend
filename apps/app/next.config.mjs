/**
 * apps/app next.config.mjs
 * Keep dynamic env imports via jiti and produce standalone output for Docker.
 */
import { fileURLToPath } from 'node:url'
import { createJiti } from 'jiti'
const jiti = createJiti(fileURLToPath(import.meta.url))

// Load env helpers (keeps parity with repo conventions)
jiti.import('./env.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@ristokit/ui'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com'
      }
    ],
    unoptimized: true
  },
  // Build a standalone server in .next/standalone
  output: 'standalone'
}

export default nextConfig
