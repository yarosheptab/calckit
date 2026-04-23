import type { Metadata } from 'next'
import MortgageCalculator from '../mortgage-calculator/MortgageCalculator'

export const metadata: Metadata = {
  title: 'Mortgage Payment Calculator – Principal, Interest & PMI',
  description: 'Calculate your monthly mortgage payment broken down by principal, interest, taxes, and insurance. Adjust down payment and loan term to find your fit.',
  keywords: ['mortgage payment calculator', 'monthly mortgage calculator', 'mortgage payment estimator', 'PITI calculator'],
  alternates: { canonical: 'https://calckit.yaro-labs.com/mortgage-calculator' },
  openGraph: {
    title: 'Mortgage Payment Calculator – Principal, Interest & PMI',
    description: 'Calculate your monthly mortgage payment broken down by principal, interest, taxes, and insurance. Adjust down payment and loan term to find your fit.',
    url: 'https://calckit.yaro-labs.com/mortgage-payment-calculator',
    siteName: 'calckit',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mortgage Payment Calculator – Principal, Interest & PMI',
    description: 'Calculate your monthly mortgage payment broken down by principal, interest, taxes, and insurance. Adjust down payment and loan term to find your fit.',
  },
}


const BASE = 'https://calckit.yaro-labs.com'
const jsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'Mortgage Payment Calculator',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Web',
      url: `${BASE}/mortgage-payment-calculator`,
      description: 'Calculate your monthly mortgage payment broken down by principal, interest, taxes, and insurance.',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: { '@type': 'Organization', name: 'Yaro Labs', url: 'https://yaro-labs.com' },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'calckit', item: BASE },
        { '@type': 'ListItem', position: 2, name: 'Mortgage Payment Calculator', item: `${BASE}/mortgage-payment-calculator` },
      ],
    },
  ],
})

export default function MortgagePaymentCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <MortgageCalculator pageTitle="Mortgage Payment Calculator" />
    </>
  )
}

