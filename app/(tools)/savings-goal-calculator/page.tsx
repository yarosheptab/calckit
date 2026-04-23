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


const BASE = 'https://calckit.yaro-labs.com'
const jsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'Savings Goal Calculator',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Web',
      url: `${BASE}/savings-goal-calculator`,
      description: 'Find out how long it takes to reach a savings goal with regular contributions.',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: { '@type': 'Organization', name: 'Yaro Labs', url: 'https://yaro-labs.com' },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'calckit', item: BASE },
        { '@type': 'ListItem', position: 2, name: 'Savings Goal Calculator', item: `${BASE}/savings-goal-calculator` },
      ],
    },
  ],
})

export default function SavingsGoalCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <SavingsCalculator pageTitle="Savings Goal Calculator" />
    </>
  )
}

