import type { Metadata } from 'next'
import TaxCalculator from '../tax-calculator/TaxCalculator'

export const metadata: Metadata = {
  title: 'Income Tax Calculator – Estimate Your Federal & State Tax',
  description: 'Estimate how much income tax you owe for the year. Enter your filing status and income to get a breakdown of federal and state tax liability.',
  keywords: ['income tax calculator', 'federal income tax calculator', 'tax liability estimator', 'income tax estimator'],
  alternates: { canonical: 'https://calckit.yaro-labs.com/tax-calculator' },
  openGraph: {
    title: 'Income Tax Calculator – Estimate Your Federal & State Tax',
    description: 'Estimate how much income tax you owe for the year. Enter your filing status and income to get a breakdown of federal and state tax liability.',
    url: 'https://calckit.yaro-labs.com/income-tax-calculator',
    siteName: 'calckit',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Income Tax Calculator – Estimate Your Federal & State Tax',
    description: 'Estimate how much income tax you owe for the year.',
  },
}


const BASE = 'https://calckit.yaro-labs.com'
const jsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'Income Tax Calculator',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Web',
      url: `${BASE}/income-tax-calculator`,
      description: 'Estimate how much income tax you owe for the year.',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: { '@type': 'Organization', name: 'Yaro Labs', url: 'https://yaro-labs.com' },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'calckit', item: BASE },
        { '@type': 'ListItem', position: 2, name: 'Income Tax Calculator', item: `${BASE}/income-tax-calculator` },
      ],
    },
  ],
})

export default function IncomeTaxCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <TaxCalculator pageTitle="Income Tax Calculator" />
    </>
  )
}

