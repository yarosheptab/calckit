import type { Metadata } from 'next'
import MortgageCalculator from '../mortgage-calculator/MortgageCalculator'

export const metadata: Metadata = {
  title: 'Home Loan Calculator – Monthly Payment & Total Interest',
  description: 'Estimate your monthly home loan payment including principal and interest. See total interest over the life of your loan with a full amortization schedule.',
  keywords: ['home loan calculator', 'house loan calculator', 'home loan payment calculator', 'home loan amortization'],
  alternates: { canonical: 'https://calckit.yaro-labs.com/mortgage-calculator' },
  openGraph: {
    title: 'Home Loan Calculator – Monthly Payment & Total Interest',
    description: 'Estimate your monthly home loan payment including principal and interest. See total interest over the life of your loan with a full amortization schedule.',
    url: 'https://calckit.yaro-labs.com/home-loan-calculator',
    siteName: 'calckit',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Home Loan Calculator – Monthly Payment & Total Interest',
    description: 'Estimate your monthly home loan payment including principal and interest. See total interest over the life of your loan with a full amortization schedule.',
  },
}

export default function HomeLoanCalculatorPage() {
  return <MortgageCalculator pageTitle="Home Loan Calculator" />
}
