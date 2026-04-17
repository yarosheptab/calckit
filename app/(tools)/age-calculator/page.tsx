import type { Metadata } from 'next'
import AgeCalculator from './AgeCalculator'

export const metadata: Metadata = {
  title: 'Age Calculator — How Old Am I in Years, Months & Days',
  description: "Calculate your exact age in years, months, and days. Find out how many days and weeks you've been alive, and when your next birthday is.",
  keywords: ['age calculator', 'how old am i', 'age in days calculator', 'days old calculator', 'birthday calculator'],
  openGraph: {
    title: 'Age Calculator — How Old Am I in Years, Months & Days',
    description: "Calculate your exact age in years, months, and days. Find out how many days and weeks you've been alive, and when your next birthday is.",
    url: 'https://calckit.yaro-labs.com/age-calculator',
    siteName: 'calckit',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Age Calculator — How Old Am I in Years, Months & Days',
    description: "Calculate your exact age in years, months, and days. Find out how many days and weeks you've been alive, and when your next birthday is.",
  },
}

const BASE = 'https://calckit.yaro-labs.com'

const jsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'Age Calculator',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web',
      url: `${BASE}/age-calculator`,
      description: "Calculate your exact age in years, months, and days. Find out how many days and weeks you've been alive, and when your next birthday is.",
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: { '@type': 'Organization', name: 'Yaro Labs', url: 'https://yaro-labs.com' },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'calckit', item: BASE },
        { '@type': 'ListItem', position: 2, name: 'Age Calculator', item: `${BASE}/age-calculator` },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How do I calculate my exact age in years, months, and days?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Subtract your birth date from today's date. First count full years, then remaining months, then remaining days.",
          },
        },
        {
          '@type': 'Question',
          name: 'How many days old am I?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Multiply your age in years by 365, then add the days for partial years. A 30-year-old is approximately 10,950 days old.",
          },
        },
        {
          '@type': 'Question',
          name: 'When is the next leap year?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The next leap years are 2028, 2032, and 2036. Years divisible by 4 are leap years, with exceptions for century years not divisible by 400.',
          },
        },
        {
          '@type': 'Question',
          name: 'How old is someone born in 1990?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Someone born in 1990 is 34-35 years old as of 2025, depending on whether their birthday has passed this year.',
          },
        },
        {
          '@type': 'Question',
          name: "How do I know how many weeks I've been alive?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Divide your total days lived by 7. At 30 years old, you've lived approximately 10,950 / 7 = 1,564 weeks.",
          },
        },
      ],
    },
  ],
})

export default function AgePage() {
  // jsonLd is a static compile-time constant (JSON.stringify of a literal object)
  // eslint-disable-next-line react/no-danger
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <AgeCalculator />
    </>
  )
}
