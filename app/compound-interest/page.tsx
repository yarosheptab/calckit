import type { Metadata } from 'next'
import CompoundInterestCalculator from './CompoundInterestCalculator'

export const metadata: Metadata = {
  title: 'Compound Interest Calculator',
  description: 'Calculate how investments grow with compound interest. Choose annual, monthly, or daily compounding — see future value and interest earned.',
  keywords: ['compound interest calculator', 'investment calculator', 'interest calculator', 'future value calculator', 'compounding frequency'],
  openGraph: {
    title: 'Compound Interest Calculator',
    description: 'Calculate how investments grow with compound interest. Choose annual, monthly, or daily compounding — see future value and interest earned.',
    url: 'https://calckit.yaro-labs.com/compound-interest',
    siteName: 'calckit',
    type: 'website',
    images: [{ url: 'https://calckit.yaro-labs.com/og/home.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Compound Interest Calculator',
    description: 'Calculate how investments grow with compound interest. Choose annual, monthly, or daily compounding — see future value and interest earned.',
  },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Compound Interest Calculator',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://calckit.yaro-labs.com/compound-interest',
  description: 'Calculate how investments grow with compound interest. Choose annual, monthly, or daily compounding — see future value and interest earned.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  author: { '@type': 'Organization', name: 'Yaro Labs', url: 'https://yaro-labs.com' },
}

export default function CompoundInterestPage() {
  const schemaStr = JSON.stringify(schema)
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaStr }} />
      <CompoundInterestCalculator />
    </>
  )
}
