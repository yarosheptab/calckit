import type { Metadata } from 'next'
import SalaryCalculator from '../salary-calculator/SalaryCalculator'

export const metadata: Metadata = {
  title: 'Paycheck Calculator – Estimate Your Take-Home Pay',
  description: 'Calculate your net paycheck after taxes. Enter hourly or salary pay to see weekly, biweekly, and monthly take-home amounts.',
  keywords: ['paycheck calculator', 'take home pay calculator', 'net pay calculator', 'paycheck estimator'],
  alternates: { canonical: 'https://calckit.yaro-labs.com/salary-calculator' },
  openGraph: {
    title: 'Paycheck Calculator – Estimate Your Take-Home Pay',
    description: 'Calculate your net paycheck after taxes. Enter hourly or salary pay to see weekly, biweekly, and monthly take-home amounts.',
    url: 'https://calckit.yaro-labs.com/paycheck-calculator',
    siteName: 'calckit',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Paycheck Calculator – Estimate Your Take-Home Pay',
    description: 'Calculate your net paycheck after taxes. Enter hourly or salary pay to see weekly, biweekly, and monthly take-home amounts.',
  },
}


const BASE = 'https://calckit.yaro-labs.com'
const jsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'Paycheck Calculator',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Web',
      url: `${BASE}/paycheck-calculator`,
      description: 'Calculate your net paycheck after taxes.',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: { '@type': 'Organization', name: 'Yaro Labs', url: 'https://yaro-labs.com' },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'calckit', item: BASE },
        { '@type': 'ListItem', position: 2, name: 'Paycheck Calculator', item: `${BASE}/paycheck-calculator` },
      ],
    },
  ],
})

export default function PaycheckCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <SalaryCalculator pageTitle="Paycheck Calculator" />
    </>
  )
}

