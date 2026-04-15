import type { Metadata } from 'next'
import ROICalculator from './ROICalculator'

export const metadata: Metadata = {
  title: 'ROI Calculator — Return on Investment',
  description: 'Calculate return on investment (ROI %) and annualized return for any investment. Enter initial value, final value, and time period.',
  keywords: ['ROI calculator', 'return on investment', 'investment ROI', 'annualized return', 'profit calculator'],
  openGraph: {
    title: 'ROI Calculator — Return on Investment',
    description: 'Calculate return on investment (ROI %) and annualized return for any investment. Enter initial value, final value, and time period.',
    url: 'https://calckit.yaro-labs.com/roi',
    siteName: 'calckit',
    type: 'website',
    images: [{ url: 'https://calckit.yaro-labs.com/og/home.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ROI Calculator — Return on Investment',
    description: 'Calculate return on investment (ROI %) and annualized return for any investment. Enter initial value, final value, and time period.',
  },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'ROI Calculator',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://calckit.yaro-labs.com/roi',
  description: 'Calculate return on investment (ROI %) and annualized return for any investment. Enter initial value, final value, and time period.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  author: { '@type': 'Organization', name: 'Yaro Labs', url: 'https://yaro-labs.com' },
}

export default function ROIPage() {
  const schemaStr = JSON.stringify(schema)
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaStr }} />
      <ROICalculator />
    </>
  )
}
