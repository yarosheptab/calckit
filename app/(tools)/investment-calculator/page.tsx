import type { Metadata } from 'next'
import CompoundInterestCalculator from '../compound-interest-calculator/CompoundInterestCalculator'

export const metadata: Metadata = {
  title: 'Investment Calculator – Grow Your Money with Compound Interest',
  description: 'Project the future value of any investment with regular contributions. See how compound interest grows your money over time at different rates and horizons.',
  keywords: ['investment calculator', 'investment growth calculator', 'compound investment calculator', 'future value calculator'],
  alternates: { canonical: 'https://calckit.yaro-labs.com/compound-interest-calculator' },
  openGraph: {
    title: 'Investment Calculator – Grow Your Money with Compound Interest',
    description: 'Project the future value of any investment with regular contributions. See how compound interest grows your money over time at different rates and horizons.',
    url: 'https://calckit.yaro-labs.com/investment-calculator',
    siteName: 'calckit',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Investment Calculator – Grow Your Money with Compound Interest',
    description: 'Project the future value of any investment with regular contributions. See how compound interest grows your money over time at different rates and horizons.',
  },
}


const BASE = 'https://calckit.yaro-labs.com'
const jsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'Investment Calculator',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Web',
      url: `${BASE}/investment-calculator`,
      description: 'Project the future value of any investment with regular contributions.',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: { '@type': 'Organization', name: 'Yaro Labs', url: 'https://yaro-labs.com' },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'calckit', item: BASE },
        { '@type': 'ListItem', position: 2, name: 'Investment Calculator', item: `${BASE}/investment-calculator` },
      ],
    },
  ],
})

export default function InvestmentCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <CompoundInterestCalculator pageTitle="Investment Calculator" />
    </>
  )
}

