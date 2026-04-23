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

export default function InvestmentCalculatorPage() {
  return <CompoundInterestCalculator pageTitle="Investment Calculator" />
}
