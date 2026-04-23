import type { Metadata } from 'next'
import SalaryCalculator from '../salary-calculator/SalaryCalculator'

export const metadata: Metadata = {
  title: 'Take-Home Pay Calculator – Net Income After Deductions',
  description: 'Find out exactly how much of your salary you actually take home. Accounts for federal and state taxes, Social Security, Medicare, and other deductions.',
  keywords: ['take home pay calculator', 'net income calculator', 'salary after tax', 'net pay estimator'],
  alternates: { canonical: 'https://calckit.yaro-labs.com/salary-calculator' },
  openGraph: {
    title: 'Take-Home Pay Calculator – Net Income After Deductions',
    description: 'Find out exactly how much of your salary you actually take home. Accounts for federal and state taxes, Social Security, Medicare, and other deductions.',
    url: 'https://calckit.yaro-labs.com/take-home-pay-calculator',
    siteName: 'calckit',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Take-Home Pay Calculator – Net Income After Deductions',
    description: 'Find out exactly how much of your salary you actually take home.',
  },
}


const BASE = 'https://calckit.yaro-labs.com'
const jsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'Take-Home Pay Calculator',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Web',
      url: `${BASE}/take-home-pay-calculator`,
      description: 'Find out exactly how much of your salary you actually take home.',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: { '@type': 'Organization', name: 'Yaro Labs', url: 'https://yaro-labs.com' },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'calckit', item: BASE },
        { '@type': 'ListItem', position: 2, name: 'Take-Home Pay Calculator', item: `${BASE}/take-home-pay-calculator` },
      ],
    },
  ],
})

export default function TakeHomePayCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <SalaryCalculator pageTitle="Take-Home Pay Calculator" />
    </>
  )
}

