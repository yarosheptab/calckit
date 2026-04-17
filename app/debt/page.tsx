import type { Metadata } from 'next'
import DebtCalculator from './DebtCalculator'

export const metadata: Metadata = {
  title: 'Debt Payoff Calculator — Credit Card & Loan Payoff',
  description: 'Calculate how long to pay off any debt and total interest paid. Find the monthly payment needed to become debt-free by a target date.',
  keywords: ['debt payoff calculator', 'credit card payoff calculator', 'debt snowball calculator', 'debt avalanche calculator', 'how long to pay off debt'],
  openGraph: {
    title: 'Debt Payoff Calculator — Credit Card & Loan Payoff',
    description: 'Calculate how long to pay off any debt and total interest paid. Find the monthly payment needed to become debt-free by a target date.',
    url: 'https://calckit.yaro-labs.com/debt',
    siteName: 'calckit',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Debt Payoff Calculator — Credit Card & Loan Payoff',
    description: 'Calculate how long to pay off any debt and total interest paid. Find the monthly payment needed to become debt-free by a target date.',
  },
}

const BASE = 'https://calckit.yaro-labs.com'

const jsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'Debt Payoff Calculator',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Web',
      url: `${BASE}/debt`,
      description: 'Calculate how long to pay off any debt and total interest paid. Find the monthly payment needed to become debt-free by a target date.',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: { '@type': 'Organization', name: 'Yaro Labs', url: 'https://yaro-labs.com' },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'calckit', item: BASE },
        { '@type': 'ListItem', position: 2, name: 'Debt Payoff Calculator', item: `${BASE}/debt` },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is the debt avalanche method?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The debt avalanche method prioritizes paying off debts with the highest interest rate first while making minimum payments on others.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the debt snowball method?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The debt snowball method pays off the smallest balance first, regardless of interest rate, to gain psychological momentum.',
          },
        },
        {
          '@type': 'Question',
          name: 'How long does it take to pay off $5,000 in credit card debt?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'At 20% APR with a $150/month payment, it takes about 42 months (3.5 years) and $1,263 in interest.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the minimum payment on a credit card?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Most cards set minimums at 1-2% of balance or $25, whichever is greater.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does credit card interest work?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Credit cards use daily periodic rate (APR / 365). On a $5,000 balance at 20% APR: daily rate = 0.0548%, daily interest = $2.74, monthly about $83.',
          },
        },
      ],
    },
  ],
})

export default function DebtPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <DebtCalculator />
    </>
  )
}
