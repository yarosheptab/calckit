import type { Metadata } from 'next'
import SavingsCalculator from '../savings-calculator/SavingsCalculator'

export const metadata: Metadata = {
  title: 'Savings Goal Calculator – How Long to Reach Your Target',
  description: 'Find out how long it takes to reach a savings goal with regular contributions. Enter your target, monthly deposit, and interest rate to see a timeline.',
  keywords: ['savings goal calculator', 'how long to save calculator', 'savings target calculator', 'savings timeline calculator'],
  alternates: { canonical: 'https://calckit.yaro-labs.com/savings-calculator' },
  openGraph: {
    title: 'Savings Goal Calculator – How Long to Reach Your Target',
    description: 'Find out how long it takes to reach a savings goal with regular contributions. Enter your target, monthly deposit, and interest rate to see a timeline.',
    url: 'https://calckit.yaro-labs.com/savings-goal-calculator',
    siteName: 'calckit',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Savings Goal Calculator – How Long to Reach Your Target',
    description: 'Find out how long it takes to reach a savings goal with regular contributions. Enter your target, monthly deposit, and interest rate to see a timeline.',
  },
}

export default function SavingsGoalCalculatorPage() {
  return <SavingsCalculator />
}
