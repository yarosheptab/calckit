import type { Metadata } from 'next'
import ROICalculator from './ROICalculator'

export const metadata: Metadata = {
  title: 'ROI Calculator — Return on Investment & Annualized Return',
  description: 'Calculate return on investment (ROI %) and annualized return for any investment. Enter initial value, final value, and time period.',
  keywords: ['ROI calculator', 'return on investment', 'investment ROI', 'annualized return', 'profit calculator'],
  openGraph: {
    title: 'ROI Calculator — Return on Investment & Annualized Return',
    description: 'Calculate return on investment (ROI %) and annualized return for any investment. Enter initial value, final value, and time period.',
    url: 'https://calckit.yaro-labs.com/roi',
    siteName: 'calckit',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ROI Calculator — Return on Investment & Annualized Return',
    description: 'Calculate return on investment (ROI %) and annualized return for any investment. Enter initial value, final value, and time period.',
  },
}

const BASE = 'https://calckit.yaro-labs.com'

const jsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'ROI Calculator',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Web',
      url: `${BASE}/roi`,
      description: 'Calculate return on investment (ROI %) and annualized return for any investment. Enter initial value, final value, and time period.',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: { '@type': 'Organization', name: 'Yaro Labs', url: 'https://yaro-labs.com' },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'calckit', item: BASE },
        { '@type': 'ListItem', position: 2, name: 'ROI Calculator', item: `${BASE}/roi` },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is ROI?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'ROI (Return on Investment) measures profit or loss relative to investment cost. Formula: ROI = ((Final Value − Initial Investment) / Initial Investment) × 100.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is a good ROI?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'It depends on asset class. The S&P 500 has historically averaged 7–10% annually. Real estate typically returns 8–12%. Short-term business ventures may target 15–30%. Always compare against alternatives.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the difference between ROI and annualized return?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'ROI is the total percentage gain over the full holding period. Annualized return converts that to a per-year rate: Annualized Return = (1 + ROI/100)^(1/years) − 1. This lets you compare investments held for different durations.',
          },
        },
      ],
    },
  ],
})

export default function ROIPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <ROICalculator />
    </>
  )
}
