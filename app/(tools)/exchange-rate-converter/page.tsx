import type { Metadata } from 'next'
import CurrencyConverter from '../currency-converter/CurrencyConverter'

export const metadata: Metadata = {
  title: 'Exchange Rate Converter – Live Currency Exchange Rates',
  description: 'Convert currencies using live exchange rates. Get the current rate between any two world currencies — perfect for travel planning and international payments.',
  keywords: ['exchange rate converter', 'currency exchange calculator', 'live exchange rates', 'forex converter'],
  alternates: { canonical: 'https://calckit.yaro-labs.com/currency-converter' },
  openGraph: {
    title: 'Exchange Rate Converter – Live Currency Exchange Rates',
    description: 'Convert currencies using live exchange rates. Get the current rate between any two world currencies — perfect for travel planning and international payments.',
    url: 'https://calckit.yaro-labs.com/exchange-rate-converter',
    siteName: 'calckit',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Exchange Rate Converter – Live Currency Exchange Rates',
    description: 'Convert currencies using live exchange rates. Get the current rate between any two world currencies — perfect for travel planning and international payments.',
  },
}


const BASE = 'https://calckit.yaro-labs.com'
const jsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'Exchange Rate Converter',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Web',
      url: `${BASE}/exchange-rate-converter`,
      description: 'Convert currencies using live exchange rates.',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: { '@type': 'Organization', name: 'Yaro Labs', url: 'https://yaro-labs.com' },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'calckit', item: BASE },
        { '@type': 'ListItem', position: 2, name: 'Exchange Rate Converter', item: `${BASE}/exchange-rate-converter` },
      ],
    },
  ],
})

export default function ExchangeRateConverterPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <CurrencyConverter pageTitle="Exchange Rate Converter" />
    </>
  )
}

