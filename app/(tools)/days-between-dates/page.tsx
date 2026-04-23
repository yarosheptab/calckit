import type { Metadata } from 'next'
import DateCalculator from '../date-calculator/DateCalculator'

export const metadata: Metadata = {
  title: 'Days Between Dates – Count Days, Weeks & Months',
  description: 'Count the exact number of days between two dates. Also shows weeks and months elapsed — useful for deadlines, project timelines, and anniversaries.',
  keywords: ['days between dates', 'count days between dates', 'days between two dates calculator', 'date interval calculator'],
  alternates: { canonical: 'https://calckit.yaro-labs.com/date-calculator' },
  openGraph: {
    title: 'Days Between Dates – Count Days, Weeks & Months',
    description: 'Count the exact number of days between two dates. Also shows weeks and months elapsed.',
    url: 'https://calckit.yaro-labs.com/days-between-dates',
    siteName: 'calckit',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Days Between Dates – Count Days, Weeks & Months',
    description: 'Count the exact number of days, weeks, and months between two dates.',
  },
}


const BASE = 'https://calckit.yaro-labs.com'
const jsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'Days Between Dates',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web',
      url: `${BASE}/days-between-dates`,
      description: 'Count the exact number of days between two dates.',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: { '@type': 'Organization', name: 'Yaro Labs', url: 'https://yaro-labs.com' },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'calckit', item: BASE },
        { '@type': 'ListItem', position: 2, name: 'Days Between Dates', item: `${BASE}/days-between-dates` },
      ],
    },
  ],
})

export default function DaysBetweenDatesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <DateCalculator pageTitle="Days Between Dates" />
    </>
  )
}

