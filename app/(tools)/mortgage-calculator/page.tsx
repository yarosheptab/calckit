import type { Metadata } from 'next'
import MortgageCalculator from './MortgageCalculator'

export const metadata: Metadata = {
  title: 'Mortgage Calculator — Monthly Payment & Amortization',
  description: 'Calculate monthly mortgage payments, total interest, and amortization. Enter loan amount, rate, and term — get instant results.',
  keywords: ['mortgage calculator', 'monthly payment calculator', 'home loan calculator', 'mortgage payment', 'amortization calculator'],
  openGraph: {
    title: 'Mortgage Calculator — Monthly Payment & Amortization',
    description: 'Calculate monthly mortgage payments, total interest, and amortization. Enter loan amount, rate, and term — get instant results.',
    url: 'https://calckit.yaro-labs.com/mortgage-calculator',
    siteName: 'calckit',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mortgage Calculator — Monthly Payment & Amortization',
    description: 'Calculate monthly mortgage payments, total interest, and amortization. Enter loan amount, rate, and term — get instant results.',
  },
}

const BASE = 'https://calckit.yaro-labs.com'

const jsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'Mortgage Calculator',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Web',
      url: `${BASE}/mortgage-calculator`,
      description: 'Calculate monthly mortgage payments, total interest, and amortization. Enter loan amount, rate, and term — get instant results.',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: { '@type': 'Organization', name: 'Yaro Labs', url: 'https://yaro-labs.com' },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'calckit', item: BASE },
        { '@type': 'ListItem', position: 2, name: 'Mortgage Calculator', item: `${BASE}/mortgage-calculator` },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is the monthly payment on a $300,000 mortgage?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'At a 6.5% interest rate over 30 years, the monthly payment on a $300,000 mortgage is approximately $1,896. The exact payment depends on your interest rate and loan term.',
          },
        },
        {
          '@type': 'Question',
          name: 'How is a mortgage payment calculated?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A mortgage payment is calculated using the formula: M = P[r(1+r)^n]/[(1+r)^n-1], where P is the principal loan amount, r is the monthly interest rate, and n is the number of monthly payments.',
          },
        },
        {
          '@type': 'Question',
          name: 'How much of my mortgage payment goes to interest vs principal?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'In the early years, most of your payment goes toward interest. Over time, more goes toward principal. Our calculator shows the full breakdown of principal vs. total interest paid.',
          },
        },
      ],
    },
  ],
})

export default function MortgagePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <MortgageCalculator />
    </>
  )
}
