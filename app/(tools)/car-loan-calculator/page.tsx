import type { Metadata } from 'next'
import LoanCalculator from '../loan-calculator/LoanCalculator'

export const metadata: Metadata = {
  title: 'Car Loan Calculator – Monthly Auto Payment Estimator',
  description: 'Calculate your monthly car loan payment based on vehicle price, down payment, interest rate, and loan term. Compare financing options before visiting the dealership.',
  keywords: ['car loan calculator', 'auto loan calculator', 'car payment calculator', 'vehicle financing calculator'],
  alternates: { canonical: 'https://calckit.yaro-labs.com/loan-calculator' },
  openGraph: {
    title: 'Car Loan Calculator – Monthly Auto Payment Estimator',
    description: 'Calculate your monthly car loan payment based on vehicle price, down payment, interest rate, and loan term.',
    url: 'https://calckit.yaro-labs.com/car-loan-calculator',
    siteName: 'calckit',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Car Loan Calculator – Monthly Auto Payment Estimator',
    description: 'Estimate your monthly car payment and compare financing options before visiting the dealership.',
  },
}

export default function CarLoanCalculatorPage() {
  return <LoanCalculator />
}
