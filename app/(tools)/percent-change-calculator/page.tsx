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

export default function PercentChangeCalculatorPage() {
  return <PercentageCalculator />
}
