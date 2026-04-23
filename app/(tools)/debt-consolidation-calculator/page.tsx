import type { Metadata } from 'next'
import DebtCalculator from '../debt-payoff-calculator/DebtCalculator'

export const metadata: Metadata = {
  title: 'Debt Consolidation Calculator – Compare Payoff Strategies',
  description: 'See how consolidating debts into one loan could lower your monthly payment and total interest. Compare consolidation vs. paying each debt separately.',
  keywords: ['debt consolidation calculator', 'consolidate debt calculator', 'debt consolidation savings', 'debt payoff comparison'],
  alternates: { canonical: 'https://calckit.yaro-labs.com/debt-payoff-calculator' },
  openGraph: {
    title: 'Debt Consolidation Calculator – Compare Payoff Strategies',
    description: 'See how consolidating debts into one loan could lower your monthly payment and total interest. Compare consolidation vs. paying each debt separately.',
    url: 'https://calckit.yaro-labs.com/debt-consolidation-calculator',
    siteName: 'calckit',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Debt Consolidation Calculator – Compare Payoff Strategies',
    description: 'See how consolidating debts into one loan could lower your monthly payment and total interest. Compare consolidation vs. paying each debt separately.',
  },
}

export default function DebtConsolidationCalculatorPage() {
  return <DebtCalculator pageTitle="Debt Consolidation Calculator" />
}
