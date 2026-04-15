import type { Metadata } from 'next'
import TipCalculator from './TipCalculator'

export const metadata: Metadata = {
  title: 'Tip Calculator — Split Bill',
  description: 'Calculate tip amounts and split the bill between multiple people. Enter your total, tip %, and number of people.',
  keywords: ['tip calculator', 'bill splitter', 'split bill calculator', 'restaurant tip calculator', 'gratuity calculator'],
  openGraph: {
    title: 'Tip Calculator — Split Bill',
    description: 'Calculate tip amounts and split the bill between multiple people. Enter your total, tip %, and number of people.',
    url: 'https://calckit.yaro-labs.com/tip',
    siteName: 'calckit',
    type: 'website',
    images: [{ url: 'https://calckit.yaro-labs.com/og/home.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tip Calculator — Split Bill',
    description: 'Calculate tip amounts and split the bill between multiple people. Enter your total, tip %, and number of people.',
  },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Tip Calculator',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://calckit.yaro-labs.com/tip',
  description: 'Calculate tip amounts and split the bill between multiple people. Enter your total, tip %, and number of people.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  author: { '@type': 'Organization', name: 'Yaro Labs', url: 'https://yaro-labs.com' },
}

export default function TipPage() {
  const schemaStr = JSON.stringify(schema)
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaStr }} />
      <TipCalculator />
    </>
  )
}
