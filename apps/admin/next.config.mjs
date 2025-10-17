/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@ristokit/ui'],
  // produce standalone output to run with the Dockerfile runner
  output: 'standalone'
}

export default nextConfig
