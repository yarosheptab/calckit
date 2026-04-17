import type { Metadata } from 'next'
import CurrencyConverter from './CurrencyConverter'

export const metadata: Metadata = {
  title: 'Currency Converter — Live Exchange Rates, 170+ Currencies',
  description: 'Convert between 170+ currencies with live exchange rates. Updated hourly. No account needed.',
  keywords: ['currency converter', 'exchange rate', 'live currency rates', 'forex converter', 'money converter online'],
  openGraph: {
    title: 'Currency Converter — Live Exchange Rates, 170+ Currencies',
    description: 'Convert between 170+ currencies with live exchange rates. Updated hourly. No account needed.',
    url: 'https://calckit.yaro-labs.com/currency',
    siteName: 'calckit',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Currency Converter — Live Exchange Rates, 170+ Currencies',
    description: 'Convert between 170+ currencies with live exchange rates. Updated hourly. No account needed.',
  },
}

const BASE = 'https://calckit.yaro-labs.com'

const jsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'Currency Converter',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Web',
      url: `${BASE}/currency`,
      description: 'Convert between 170+ currencies with live exchange rates. Updated hourly. No account needed.',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: { '@type': 'Organization', name: 'Yaro Labs', url: 'https://yaro-labs.com' },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'calckit', item: BASE },
        { '@type': 'ListItem', position: 2, name: 'Currency Converter', item: `${BASE}/currency` },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How often are exchange rates updated?',
          acceptedAnswer: { '@type': 'Answer', text: 'Our rates are sourced from an open exchange-rate API and updated hourly. For real-time trading rates, use a dedicated forex platform.' },
        },
        {
          '@type': 'Question',
          name: 'What is the mid-market exchange rate?',
          acceptedAnswer: { '@type': 'Answer', text: 'The mid-market rate is the midpoint between buy and sell prices in the global currency market. Banks and services typically charge a markup above this rate.' },
        },
        {
          '@type': 'Question',
          name: 'Why do banks give worse exchange rates?',
          acceptedAnswer: { '@type': 'Answer', text: 'Banks and airport kiosks add a markup (spread) of 1–5% on top of the mid-market rate. Services like Wise and Revolut are closer to the mid-market rate with a transparent fee.' },
        },
      ],
    },
  ],
})

export default function CurrencyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <CurrencyConverter />
    </>
  )
}
