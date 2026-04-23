import type { Metadata } from 'next'
import LoanCalculator from '../loan-calculator/LoanCalculator'

export const metadata: Metadata = {
  title: 'Car Loan Calculator – Monthly Auto Payment Estimator',
  description: 'Calculate your monthly car loan payment from vehicle price, down payment, interest rate, and term. Compare financing options before visiting the dealership.',
  keywords: ['car loan calculator', 'auto loan calculator', 'car payment calculator', 'vehicle financing calculator'],
  alternates: { canonical: 'https://calckit.yaro-labs.com/loan-calculator' },
  openGraph: {
    title: 'Car Loan Calculator – Monthly Auto Payment Estimator',
    description: 'Calculate your monthly car loan payment from vehicle price, down payment, interest rate, and term. Compare financing options before visiting the dealership.',
    url: 'https://calckit.yaro-labs.com/car-loan-calculator',
    siteName: 'calckit',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Car Loan Calculator – Monthly Auto Payment Estimator',
    description: 'Calculate your monthly car loan payment from vehicle price, down payment, interest rate, and term. Compare financing options before visiting the dealership.',
  },
}

const BASE = 'https://calckit.yaro-labs.com'
const jsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'Car Loan Calculator',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Web',
      url: `${BASE}/car-loan-calculator`,
      description: 'Calculate your monthly car loan payment from vehicle price, down payment, interest rate, and term.',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: { '@type': 'Organization', name: 'Yaro Labs', url: 'https://yaro-labs.com' },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'calckit', item: BASE },
        { '@type': 'ListItem', position: 2, name: 'Car Loan Calculator', item: `${BASE}/car-loan-calculator` },
      ],
    },
  ],
})

export default function CarLoanCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <LoanCalculator pageTitle="Car Loan Calculator" />
    </>
  )
}
