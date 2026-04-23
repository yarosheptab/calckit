import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'open-launch.com' },
      { protocol: 'https', hostname: 'toolfio.com' },
      { protocol: 'https', hostname: 'launchigniter.com' },
      { protocol: 'https', hostname: 'www.startupfa.st' },
      { protocol: 'https', hostname: 'fazier.com' },
      { protocol: 'https', hostname: 'twelve.tools' },
      { protocol: 'https', hostname: 'findly.tools' },
      { protocol: 'https', hostname: 'acidtools.com' },
      { protocol: 'https', hostname: 'neeed.directory' },
      { protocol: 'https', hostname: 'dang.ai' },
      { protocol: 'https', hostname: 'toolfame.com' },
      { protocol: 'https', hostname: 'saasfame.com' },
      { protocol: 'https', hostname: 'productfame.com' },
      { protocol: 'https', hostname: 'dofollow.tools' },
    ],
  },
  async redirects() {
    return [
      { source: '/bmi', destination: '/bmi-calculator', permanent: true },
      { source: '/body-fat', destination: '/body-fat-calculator', permanent: true },
      { source: '/calorie', destination: '/calorie-calculator', permanent: true },
      { source: '/compound-interest', destination: '/compound-interest-calculator', permanent: true },
      { source: '/currency', destination: '/currency-converter', permanent: true },
      { source: '/date', destination: '/date-calculator', permanent: true },
      { source: '/debt', destination: '/debt-payoff-calculator', permanent: true },
      { source: '/discount', destination: '/discount-calculator', permanent: true },
      { source: '/grade', destination: '/grade-calculator', permanent: true },
      { source: '/inflation', destination: '/inflation-calculator', permanent: true },
      { source: '/loan', destination: '/loan-calculator', permanent: true },
      { source: '/mortgage', destination: '/mortgage-calculator', permanent: true },
      { source: '/percentage', destination: '/percentage-calculator', permanent: true },
      { source: '/roi', destination: '/roi-calculator', permanent: true },
      { source: '/salary', destination: '/salary-calculator', permanent: true },
      { source: '/savings', destination: '/savings-calculator', permanent: true },
      { source: '/tax', destination: '/tax-calculator', permanent: true },
      { source: '/tip', destination: '/tip-calculator', permanent: true },
      { source: '/age', destination: '/age-calculator', permanent: true },
    ]
  },
}

export default nextConfig
