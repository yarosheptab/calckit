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

export default function TakeHomePayCalculatorPage() {
  return <SalaryCalculator />
}
