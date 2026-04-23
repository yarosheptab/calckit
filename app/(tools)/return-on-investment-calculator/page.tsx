import type { Metadata } from 'next'
import ROICalculator from '../roi-calculator/ROICalculator'

export const metadata: Metadata = {
  title: 'Return on Investment Calculator – ROI & Profit Analysis',
  description: 'Calculate ROI for any project, stock, or business decision. Enter cost and final value to get ROI percentage, net profit, and annualized return.',
  keywords: ['return on investment calculator', 'ROI calculator', 'investment return calculator', 'profit calculator'],
  alternates: { canonical: 'https://calckit.yaro-labs.com/roi-calculator' },
  openGraph: {
    title: 'Return on Investment Calculator – ROI & Profit Analysis',
    description: 'Calculate ROI for any project, stock, or business decision. Enter cost and final value to get ROI percentage, net profit, and annualized return.',
    url: 'https://calckit.yaro-labs.com/return-on-investment-calculator',
    siteName: 'calckit',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Return on Investment Calculator – ROI & Profit Analysis',
    description: 'Calculate ROI for any project, stock, or business decision. Enter cost and final value to get ROI percentage, net profit, and annualized return.',
  },
}

export default function ReturnOnInvestmentCalculatorPage() {
  return <ROICalculator pageTitle="Return on Investment Calculator" />
}
