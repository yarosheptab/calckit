import type { Metadata } from 'next'
import InflationCalculator from '../inflation-calculator/InflationCalculator'

export const metadata: Metadata = {
  title: 'Purchasing Power Calculator – How Inflation Erodes Value',
  description: "See how inflation has eroded the purchasing power of money over time. Find out what today's dollars were worth in the past — or what past dollars equal today.",
  keywords: ['purchasing power calculator', 'inflation purchasing power', 'real value of money calculator', 'dollar value over time'],
  alternates: { canonical: 'https://calckit.yaro-labs.com/inflation-calculator' },
  openGraph: {
    title: 'Purchasing Power Calculator – How Inflation Erodes Value',
    description: "See how inflation has eroded the purchasing power of money over time.",
    url: 'https://calckit.yaro-labs.com/purchasing-power-calculator',
    siteName: 'calckit',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Purchasing Power Calculator – How Inflation Erodes Value',
    description: "Find out what today's dollars were worth in the past or what past dollars equal today.",
  },
}


const BASE = 'https://calckit.yaro-labs.com'
const jsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'Purchasing Power Calculator',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Web',
      url: `${BASE}/purchasing-power-calculator`,
      description: 'See how inflation has eroded the purchasing power of money over time.',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: { '@type': 'Organization', name: 'Yaro Labs', url: 'https://yaro-labs.com' },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'calckit', item: BASE },
        { '@type': 'ListItem', position: 2, name: 'Purchasing Power Calculator', item: `${BASE}/purchasing-power-calculator` },
      ],
    },
  ],
})

export default function PurchasingPowerCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <InflationCalculator pageTitle="Purchasing Power Calculator" />
    </>
  )
}

