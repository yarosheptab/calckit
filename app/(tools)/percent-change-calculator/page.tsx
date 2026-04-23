import type { Metadata } from 'next'
import PercentageCalculator from '../percentage-calculator/PercentageCalculator'

export const metadata: Metadata = {
  title: 'Percent Change Calculator – Increase or Decrease Between Values',
  description: 'Calculate the percentage change between two numbers. Instantly see percent increase or decrease — useful for comparing prices, statistics, and financial data.',
  keywords: ['percent change calculator', 'percentage change calculator', 'percent increase calculator', 'percent decrease calculator'],
  alternates: { canonical: 'https://calckit.yaro-labs.com/percentage-calculator' },
  openGraph: {
    title: 'Percent Change Calculator – Increase or Decrease Between Values',
    description: 'Calculate the percentage change between two numbers. Instantly see percent increase or decrease.',
    url: 'https://calckit.yaro-labs.com/percent-change-calculator',
    siteName: 'calckit',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Percent Change Calculator – Increase or Decrease Between Values',
    description: 'Calculate percentage increase or decrease between any two numbers.',
  },
}


const BASE = 'https://calckit.yaro-labs.com'
const jsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'Percent Change Calculator',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web',
      url: `${BASE}/percent-change-calculator`,
      description: 'Calculate the percentage change between two numbers.',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: { '@type': 'Organization', name: 'Yaro Labs', url: 'https://yaro-labs.com' },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'calckit', item: BASE },
        { '@type': 'ListItem', position: 2, name: 'Percent Change Calculator', item: `${BASE}/percent-change-calculator` },
      ],
    },
  ],
})

export default function PercentChangeCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <PercentageCalculator pageTitle="Percent Change Calculator" />
    </>
  )
}

