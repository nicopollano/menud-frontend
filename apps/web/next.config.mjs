/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@ristokit/ui'],
  // produce standalone output to run with the Dockerfile runner
  output: 'standalone'
  // NOTE: temporary alias was removed — ensure all imports use 'framer-motion'
}

export default nextConfig
