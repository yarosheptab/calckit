import type { Metadata } from 'next'
import CompoundInterestCalculator from './CompoundInterestCalculator'

export const metadata: Metadata = {
  title: 'Compound Interest Calculator — Future Value & Growth',
  description: 'Calculate how investments grow with compound interest. Choose annual, monthly, or daily compounding — see future value and interest earned.',
  keywords: ['compound interest calculator', 'investment calculator', 'interest calculator', 'future value calculator', 'compounding frequency'],
  openGraph: {
    title: 'Compound Interest Calculator — Future Value & Growth',
    description: 'Calculate how investments grow with compound interest. Choose annual, monthly, or daily compounding — see future value and interest earned.',
    url: 'https://calckit.yaro-labs.com/compound-interest',
    siteName: 'calckit',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Compound Interest Calculator — Future Value & Growth',
    description: 'Calculate how investments grow with compound interest. Choose annual, monthly, or daily compounding — see future value and interest earned.',
  },
}

const BASE = 'https://calckit.yaro-labs.com'

const jsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'Compound Interest Calculator',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Web',
      url: `${BASE}/compound-interest`,
      description: 'Calculate how investments grow with compound interest. Choose annual, monthly, or daily compounding — see future value and interest earned.',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: { '@type': 'Organization', name: 'Yaro Labs', url: 'https://yaro-labs.com' },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'calckit', item: BASE },
        { '@type': 'ListItem', position: 2, name: 'Compound Interest Calculator', item: `${BASE}/compound-interest` },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is compound interest?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Compound interest is interest calculated on both the initial principal and the accumulated interest from previous periods. Unlike simple interest, it causes investments to grow exponentially over time.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the compound interest formula?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'FV = P × (1 + r/n)^(n×t), where P is the principal, r is the annual interest rate as a decimal, n is the number of compounding periods per year, and t is the time in years.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the difference between annual and monthly compounding?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "With monthly compounding (12 times/year), interest is added to the principal each month. Each month's earned interest starts earning interest sooner, producing higher returns than annual compounding over the same period.",
          },
        },
      ],
    },
  ],
})

export default function CompoundInterestPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <CompoundInterestCalculator />
    </>
  )
}
