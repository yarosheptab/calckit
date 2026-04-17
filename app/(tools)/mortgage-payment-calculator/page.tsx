import type { Metadata } from 'next'
import MortgageCalculator from '../mortgage-calculator/MortgageCalculator'

export const metadata: Metadata = {
  title: 'Mortgage Payment Calculator – Principal, Interest & PMI',
  description: 'Calculate your exact monthly mortgage payment broken down by principal, interest, taxes, and insurance. Adjust down payment and loan term to find what fits your budget.',
  keywords: ['mortgage payment calculator', 'monthly mortgage calculator', 'mortgage payment estimator', 'PITI calculator'],
  alternates: { canonical: 'https://calckit.yaro-labs.com/mortgage-calculator' },
  openGraph: {
    title: 'Mortgage Payment Calculator – Principal, Interest & PMI',
    description: 'Calculate your exact monthly mortgage payment broken down by principal, interest, taxes, and insurance.',
    url: 'https://calckit.yaro-labs.com/mortgage-payment-calculator',
    siteName: 'calckit',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mortgage Payment Calculator – Principal, Interest & PMI',
    description: 'Calculate your monthly mortgage payment broken down by principal, interest, taxes, and insurance.',
  },
}

export default function MortgagePaymentCalculatorPage() {
  return <MortgageCalculator />
}
