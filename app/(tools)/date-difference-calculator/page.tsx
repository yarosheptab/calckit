import type { Metadata } from 'next'
import DateCalculator from '../date-calculator/DateCalculator'

export const metadata: Metadata = {
  title: 'Date Difference Calculator – Find Time Between Two Dates',
  description: 'Find the difference between two dates in days, weeks, months, and years. Great for calculating ages, contract durations, or time until an event.',
  keywords: ['date difference calculator', 'time between dates', 'date duration calculator', 'how many days between dates'],
  alternates: { canonical: 'https://calckit.yaro-labs.com/date-calculator' },
  openGraph: {
    title: 'Date Difference Calculator – Find Time Between Two Dates',
    description: 'Find the difference between two dates in days, weeks, months, and years.',
    url: 'https://calckit.yaro-labs.com/date-difference-calculator',
    siteName: 'calckit',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Date Difference Calculator – Find Time Between Two Dates',
    description: 'Find the difference between two dates in days, weeks, months, and years.',
  },
}

const BASE = 'https://calckit.yaro-labs.com'
const jsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'Date Difference Calculator',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web',
      url: `${BASE}/date-difference-calculator`,
      description: 'Find the difference between two dates in days, weeks, months, and years.',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: { '@type': 'Organization', name: 'Yaro Labs', url: 'https://yaro-labs.com' },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'calckit', item: BASE },
        { '@type': 'ListItem', position: 2, name: 'Date Difference Calculator', item: `${BASE}/date-difference-calculator` },
      ],
    },
  ],
})

export default function DateDifferenceCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <DateCalculator pageTitle="Date Difference Calculator" />
    </>
  )
}
