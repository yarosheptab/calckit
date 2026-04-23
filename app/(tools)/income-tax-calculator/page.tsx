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

export default function IncomeTaxCalculatorPage() {
  return <TaxCalculator pageTitle="Income Tax Calculator" />
}
