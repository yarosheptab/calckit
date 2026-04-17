import type { Metadata } from 'next'
import DebtCalculator from '../debt-payoff-calculator/DebtCalculator'

export const metadata: Metadata = {
  title: 'Debt Consolidation Calculator – Compare Payoff Strategies',
  description: 'See how consolidating your debts into a single loan could lower your monthly payment and reduce total interest. Compare debt consolidation vs. paying each debt separately.',
  keywords: ['debt consolidation calculator', 'consolidate debt calculator', 'debt consolidation savings', 'debt payoff comparison'],
  alternates: { canonical: 'https://calckit.yaro-labs.com/debt-payoff-calculator' },
  openGraph: {
    title: 'Debt Consolidation Calculator – Compare Payoff Strategies',
    description: 'See how consolidating your debts could lower your monthly payment and reduce total interest paid.',
    url: 'https://calckit.yaro-labs.com/debt-consolidation-calculator',
    siteName: 'calckit',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Debt Consolidation Calculator – Compare Payoff Strategies',
    description: 'Compare debt consolidation vs. paying each debt separately to find the best strategy.',
  },
}

export default function DebtConsolidationCalculatorPage() {
  return <DebtCalculator />
}
