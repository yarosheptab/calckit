import type { Metadata } from 'next'
import LoanCalculator from '../loan-calculator/LoanCalculator'

export const metadata: Metadata = {
  title: 'Personal Loan Calculator – Monthly Payment & Total Cost',
  description: 'Estimate your personal loan monthly payment and total interest cost. Enter loan amount, APR, and term to compare lender offers and choose the best deal.',
  keywords: ['personal loan calculator', 'personal loan payment calculator', 'loan payment estimator', 'unsecured loan calculator'],
  alternates: { canonical: 'https://calckit.yaro-labs.com/loan-calculator' },
  openGraph: {
    title: 'Personal Loan Calculator – Monthly Payment & Total Cost',
    description: 'Estimate your personal loan monthly payment and total interest cost. Compare lender offers to find the best deal.',
    url: 'https://calckit.yaro-labs.com/personal-loan-calculator',
    siteName: 'calckit',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Personal Loan Calculator – Monthly Payment & Total Cost',
    description: 'Estimate your personal loan payment and compare lender offers.',
  },
}


const BASE = 'https://calckit.yaro-labs.com'
const jsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'Personal Loan Calculator',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Web',
      url: `${BASE}/personal-loan-calculator`,
      description: 'Estimate your personal loan monthly payment and total interest cost.',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: { '@type': 'Organization', name: 'Yaro Labs', url: 'https://yaro-labs.com' },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'calckit', item: BASE },
        { '@type': 'ListItem', position: 2, name: 'Personal Loan Calculator', item: `${BASE}/personal-loan-calculator` },
      ],
    },
  ],
})

export default function PersonalLoanCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <LoanCalculator pageTitle="Personal Loan Calculator" />
    </>
  )
}

