import type { Metadata } from 'next'
import LoanCalculator from './LoanCalculator'

export const metadata: Metadata = {
  title: 'Loan Calculator — Monthly Payment & Total Interest',
  description: 'Calculate monthly loan payments and total interest for any personal, auto, or student loan. Enter loan amount, interest rate, and term for instant results.',
  keywords: ['loan calculator', 'personal loan calculator', 'loan payment calculator', 'monthly payment calculator', 'auto loan calculator'],
  openGraph: {
    title: 'Loan Calculator — Monthly Payment & Total Interest',
    description: 'Calculate monthly loan payments and total interest for any personal, auto, or student loan. Enter loan amount, interest rate, and term for instant results.',
    url: 'https://calckit.yaro-labs.com/loan',
    siteName: 'calckit',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Loan Calculator — Monthly Payment & Total Interest',
    description: 'Calculate monthly loan payments and total interest for any personal, auto, or student loan. Enter loan amount, interest rate, and term for instant results.',
  },
}

const BASE = 'https://calckit.yaro-labs.com'

const jsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'Loan Calculator',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Web',
      url: `${BASE}/loan`,
      description: 'Calculate monthly loan payments and total interest for any personal, auto, or student loan. Enter loan amount, interest rate, and term for instant results.',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: { '@type': 'Organization', name: 'Yaro Labs', url: 'https://yaro-labs.com' },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'calckit', item: BASE },
        { '@type': 'ListItem', position: 2, name: 'Loan Calculator', item: `${BASE}/loan` },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is the monthly payment on a $10,000 loan?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'At 7.5% interest over 3 years, the monthly payment on a $10,000 loan is approximately $311. Over 5 years at the same rate, it drops to $200/month but you pay more total interest ($2,000 vs $1,193).',
          },
        },
        {
          '@type': 'Question',
          name: 'How is a loan payment calculated?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Loan payments use the amortization formula: M = P × [r(1+r)^n] / [(1+r)^n − 1], where P is the principal, r is the monthly interest rate (annual rate ÷ 12), and n is the total number of monthly payments. Each payment covers interest for that period plus a portion of the principal.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is a good interest rate for a personal loan?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'As of 2025, average personal loan rates range from 11-25% APR for most borrowers. Excellent credit (720+) can get 7-12% APR. Below 10% is considered very good. Credit unions and online lenders often offer better rates than banks. Avoid rates above 30%, as these approach payday loan territory.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is it better to take a shorter or longer loan term?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Shorter terms mean higher monthly payments but less total interest paid. For example, a $15,000 loan at 8%: over 3 years you pay ~$2,000 in interest; over 7 years, ~$4,600. Choose a shorter term if you can afford the payments. Only extend the term if cash flow is tight.',
          },
        },
        {
          '@type': 'Question',
          name: 'How much does a 1% difference in interest rate matter?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'On a $20,000 loan over 5 years, going from 7% to 8% adds about $550 in total interest and raises monthly payments by ~$9. On larger amounts like $50,000, a 1% rate difference over 5 years costs ~$1,400 more. Rates matter more on longer terms and larger principals.',
          },
        },
      ],
    },
  ],
})

export default function LoanPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <LoanCalculator />
    </>
  )
}
