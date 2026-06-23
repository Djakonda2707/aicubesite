import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    '/[slug]': ['./content/**/*.json'],
  },
}

export default nextConfig
