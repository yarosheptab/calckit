import type { Metadata } from 'next'
import ROICalculator from '../roi-calculator/ROICalculator'

export const metadata: Metadata = {
  title: 'Return on Investment Calculator – ROI & Profit Analysis',
  description: 'Calculate return on investment for any project, stock, or business decision. Enter your initial cost and final value to get ROI percentage, net profit, and annualized return.',
  keywords: ['return on investment calculator', 'ROI calculator', 'investment return calculator', 'profit calculator'],
  alternates: { canonical: 'https://calckit.yaro-labs.com/roi-calculator' },
  openGraph: {
    title: 'Return on Investment Calculator – ROI & Profit Analysis',
    description: 'Calculate return on investment for any project, stock, or business decision. Get ROI percentage, net profit, and annualized return.',
    url: 'https://calckit.yaro-labs.com/return-on-investment-calculator',
    siteName: 'calckit',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Return on Investment Calculator – ROI & Profit Analysis',
    description: 'Calculate ROI percentage, net profit, and annualized return for any investment.',
  },
}

export default function ReturnOnInvestmentCalculatorPage() {
  return <ROICalculator />
}
