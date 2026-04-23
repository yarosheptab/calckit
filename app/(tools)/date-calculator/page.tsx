import type { Metadata } from 'next'
import DateCalculator from './DateCalculator'

export const metadata: Metadata = {
  title: 'Date Calculator — Days Between Dates & Date Math',
  description: 'Calculate the number of days between two dates, or add and subtract days from a date. Includes weeks, months, and workday estimates.',
  alternates: { canonical: 'https://calckit.yaro-labs.com/date-calculator' },
  keywords: ['date calculator', 'days between dates', 'days until calculator', 'date difference calculator', 'add days to date calculator'],
  openGraph: {
    title: 'Date Calculator — Days Between Dates & Date Math',
    description: 'Calculate the number of days between two dates, or add and subtract days from a date. Includes weeks, months, and workday estimates.',
    url: 'https://calckit.yaro-labs.com/date-calculator',
    siteName: 'calckit',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Date Calculator — Days Between Dates & Date Math',
    description: 'Calculate the number of days between two dates, or add and subtract days from a date. Includes weeks, months, and workday estimates.',
  },
}

const BASE = 'https://calckit.yaro-labs.com'

const jsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'Date Calculator',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web',
      url: `${BASE}/date-calculator`,
      description: 'Calculate the number of days between two dates, or add and subtract days from a date. Includes weeks, months, and workday estimates.',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: { '@type': 'Organization', name: 'Yaro Labs', url: 'https://yaro-labs.com' },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'calckit', item: BASE },
        { '@type': 'ListItem', position: 2, name: 'Date Calculator', item: `${BASE}/date-calculator` },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How many days between two dates?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Subtract the earlier date from the later date. The difference in milliseconds divided by 86,400,000 (ms per day) gives you the exact number of days. For example, from January 1 to December 31 is 364 days in a non-leap year. This calculator handles all the math including leap years automatically.',
          },
        },
        {
          '@type': 'Question',
          name: 'How many days until [a future date]?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Use the 'Days Between' mode: set Start Date to today and End Date to your target date. For example, days until December 25, 2026: enter today's date and December 25, 2026 — the calculator shows the exact count. It also shows weeks, months, and approximate workdays.",
          },
        },
        {
          '@type': 'Question',
          name: 'What date is 90 days from today?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Use the 'Add / Subtract' mode: enter today's date and type 90 in the days field. For example, 90 days from April 18, 2026 is July 17, 2026. This is commonly used for contract deadlines, return windows, and project timelines.",
          },
        },
        {
          '@type': 'Question',
          name: 'How many workdays between two dates?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Divide the total days by 7 and multiply by 5 to get approximate business days. For exact results accounting for holidays, use a dedicated business day calculator. This calculator provides a close approximation: 30 days ≈ 21 workdays, 90 days ≈ 64 workdays.',
          },
        },
        {
          '@type': 'Question',
          name: 'What day of the week is a specific date?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Use the 'Add / Subtract' mode: enter the date and add 0 days — the result shows the day of the week. Alternatively, use Zeller's congruence formula or rely on the JavaScript Date API. For example, July 4, 2026 falls on a Saturday.",
          },
        },
      ],
    },
  ],
})

export default function DatePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <DateCalculator />
    </>
  )
}
