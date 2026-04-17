import type { Metadata } from 'next'
import SavingsCalculator from '../savings-calculator/SavingsCalculator'

export const metadata: Metadata = {
  title: 'Savings Goal Calculator – How Long to Reach Your Target',
  description: 'Find out how long it will take to reach a savings goal with regular contributions. Enter your target amount, monthly deposit, and interest rate to get a clear timeline.',
  keywords: ['savings goal calculator', 'how long to save calculator', 'savings target calculator', 'savings timeline calculator'],
  alternates: { canonical: 'https://calckit.yaro-labs.com/savings-calculator' },
  openGraph: {
    title: 'Savings Goal Calculator – How Long to Reach Your Target',
    description: 'Find out how long it will take to reach a savings goal with regular contributions and compound interest.',
    url: 'https://calckit.yaro-labs.com/savings-goal-calculator',
    siteName: 'calckit',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Savings Goal Calculator – How Long to Reach Your Target',
    description: 'See how long it takes to hit your savings goal with regular monthly contributions.',
  },
}

export default function SavingsGoalCalculatorPage() {
  return <SavingsCalculator />
}
