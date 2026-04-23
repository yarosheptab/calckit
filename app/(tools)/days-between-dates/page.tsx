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

export default function DaysBetweenDatesPage() {
  return <DateCalculator pageTitle="Days Between Dates" />
}
