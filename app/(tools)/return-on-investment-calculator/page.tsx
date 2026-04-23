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


const BASE = 'https://calckit.yaro-labs.com'
const jsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'Return on Investment Calculator',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Web',
      url: `${BASE}/return-on-investment-calculator`,
      description: 'Calculate ROI for any project, stock, or business decision.',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: { '@type': 'Organization', name: 'Yaro Labs', url: 'https://yaro-labs.com' },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'calckit', item: BASE },
        { '@type': 'ListItem', position: 2, name: 'Return on Investment Calculator', item: `${BASE}/return-on-investment-calculator` },
      ],
    },
  ],
})

export default function ReturnOnInvestmentCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <ROICalculator pageTitle="Return on Investment Calculator" />
    </>
  )
}

