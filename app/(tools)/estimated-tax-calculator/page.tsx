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

export default function EstimatedTaxCalculatorPage() {
  return <TaxCalculator pageTitle="Estimated Tax Calculator" />
}
