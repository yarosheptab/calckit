import type { Metadata } from 'next'
import TaxCalculator from './TaxCalculator'

export const metadata: Metadata = {
  title: 'Income Tax Calculator 2024 (US Federal)',
  description: 'Estimate your 2024 US federal income tax based on gross salary and filing status. Uses current tax brackets.',
  keywords: ['tax calculator', 'income tax calculator', '2024 tax brackets', 'US federal tax', 'take-home pay calculator'],
  openGraph: {
    title: 'Income Tax Calculator 2024 (US Federal)',
    description: 'Estimate your 2024 US federal income tax based on gross salary and filing status. Uses current tax brackets.',
    url: 'https://calckit.yaro-labs.com/tax',
    siteName: 'calckit',
    type: 'website',
    images: [{ url: 'https://calckit.yaro-labs.com/og/home.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Income Tax Calculator 2024 (US Federal)',
    description: 'Estimate your 2024 US federal income tax based on gross salary and filing status. Uses current tax brackets.',
  },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Income Tax Calculator',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://calckit.yaro-labs.com/tax',
  description: 'Estimate your 2024 US federal income tax based on gross salary and filing status. Uses current tax brackets.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  author: { '@type': 'Organization', name: 'Yaro Labs', url: 'https://yaro-labs.com' },
}

export default function TaxPage() {
  const schemaStr = JSON.stringify(schema)
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaStr }} />
      <TaxCalculator />
    </>
  )
}
