import type { Metadata } from 'next'
import TaxCalculator from '../tax-calculator/TaxCalculator'

export const metadata: Metadata = {
  title: 'Estimated Tax Calculator – Quarterly Tax Payment Estimator',
  description: 'Calculate your estimated quarterly tax payments for self-employment, freelance, or investment income. Avoid underpayment penalties with accurate estimates.',
  keywords: ['estimated tax calculator', 'quarterly tax calculator', 'self employment tax calculator', 'estimated tax payments'],
  alternates: { canonical: 'https://calckit.yaro-labs.com/tax-calculator' },
  openGraph: {
    title: 'Estimated Tax Calculator – Quarterly Tax Payment Estimator',
    description: 'Calculate your estimated quarterly tax payments for self-employment, freelance, or investment income. Avoid underpayment penalties with accurate estimates.',
    url: 'https://calckit.yaro-labs.com/estimated-tax-calculator',
    siteName: 'calckit',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Estimated Tax Calculator – Quarterly Tax Payment Estimator',
    description: 'Calculate your estimated quarterly tax payments for self-employment or freelance income.',
  },
}


const BASE = 'https://calckit.yaro-labs.com'
const jsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'Estimated Tax Calculator',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Web',
      url: `${BASE}/estimated-tax-calculator`,
      description: 'Calculate your estimated quarterly tax payments for self-employment, freelance, or investment income.',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: { '@type': 'Organization', name: 'Yaro Labs', url: 'https://yaro-labs.com' },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'calckit', item: BASE },
        { '@type': 'ListItem', position: 2, name: 'Estimated Tax Calculator', item: `${BASE}/estimated-tax-calculator` },
      ],
    },
  ],
})

export default function EstimatedTaxCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <TaxCalculator pageTitle="Estimated Tax Calculator" />
    </>
  )
}

