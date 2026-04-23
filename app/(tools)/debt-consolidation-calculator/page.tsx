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


const BASE = 'https://calckit.yaro-labs.com'
const jsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'Debt Consolidation Calculator',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Web',
      url: `${BASE}/debt-consolidation-calculator`,
      description: 'See how consolidating debts into one loan could lower your monthly payment and total interest.',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: { '@type': 'Organization', name: 'Yaro Labs', url: 'https://yaro-labs.com' },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'calckit', item: BASE },
        { '@type': 'ListItem', position: 2, name: 'Debt Consolidation Calculator', item: `${BASE}/debt-consolidation-calculator` },
      ],
    },
  ],
})

export default function DebtConsolidationCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <DebtCalculator pageTitle="Debt Consolidation Calculator" />
    </>
  )
}

