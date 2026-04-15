import type { Metadata } from 'next'
import CurrencyConverter from './CurrencyConverter'

export const metadata: Metadata = {
  title: 'Currency Converter — Live Exchange Rates',
  description: 'Convert between 170+ currencies with live exchange rates. Updated hourly. No account needed.',
  keywords: ['currency converter', 'exchange rate', 'live currency rates', 'forex converter', 'money converter online'],
  openGraph: {
    title: 'Currency Converter — Live Exchange Rates',
    description: 'Convert between 170+ currencies with live exchange rates. Updated hourly. No account needed.',
    url: 'https://calckit.yaro-labs.com/currency',
    siteName: 'calckit',
    type: 'website',
    images: [{ url: 'https://calckit.yaro-labs.com/og/home.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Currency Converter — Live Exchange Rates',
    description: 'Convert between 170+ currencies with live exchange rates. Updated hourly. No account needed.',
  },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Currency Converter',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://calckit.yaro-labs.com/currency',
  description: 'Convert between 170+ currencies with live exchange rates. Updated hourly. No account needed.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  author: { '@type': 'Organization', name: 'Yaro Labs', url: 'https://yaro-labs.com' },
}

export default function CurrencyPage() {
  const schemaStr = JSON.stringify(schema)
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaStr }} />
      <CurrencyConverter />
    </>
  )
}
