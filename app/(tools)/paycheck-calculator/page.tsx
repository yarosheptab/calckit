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

export default function PaycheckCalculatorPage() {
  return <SalaryCalculator />
}
