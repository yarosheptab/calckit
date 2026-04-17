import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: { unoptimized: true },
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
