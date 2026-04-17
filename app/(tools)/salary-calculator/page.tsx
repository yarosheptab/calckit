import type { Metadata } from 'next'
import SalaryCalculator from './SalaryCalculator'

export const metadata: Metadata = {
  title: 'Salary to Hourly Calculator — Convert Any Pay Period',
  description: 'Convert salary to hourly rate or any pay period instantly. Enter annual, monthly, weekly, or hourly pay to see all equivalent rates.',
  keywords: ['salary to hourly calculator', 'hourly to salary calculator', 'salary calculator', 'pay period converter', 'annual salary calculator'],
  openGraph: {
    title: 'Salary to Hourly Calculator — Convert Any Pay Period',
    description: 'Convert salary to hourly rate or any pay period instantly. Enter annual, monthly, weekly, or hourly pay to see all equivalent rates.',
    url: 'https://calckit.yaro-labs.com/salary-calculator',
    siteName: 'calckit',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Salary to Hourly Calculator — Convert Any Pay Period',
    description: 'Convert salary to hourly rate or any pay period instantly. Enter annual, monthly, weekly, or hourly pay to see all equivalent rates.',
  },
}

const BASE = 'https://calckit.yaro-labs.com'

const jsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'Salary to Hourly Calculator',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Web',
      url: `${BASE}/salary-calculator`,
      description: 'Convert salary to hourly rate or any pay period instantly. Enter annual, monthly, weekly, or hourly pay to see all equivalent rates.',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: { '@type': 'Organization', name: 'Yaro Labs', url: 'https://yaro-labs.com' },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'calckit', item: BASE },
        { '@type': 'ListItem', position: 2, name: 'Salary to Hourly Calculator', item: `${BASE}/salary-calculator` },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How do I convert salary to hourly rate?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Divide your annual salary by 2,080 (52 weeks × 40 hours). A $75,000 salary = $75,000 ÷ 2,080 = $36.06/hour. For a different schedule, multiply your weekly hours by 52 to get total annual hours, then divide. This calculator adjusts for custom hours/day and days/week automatically.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is $20 an hour annually?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "$20/hour × 40 hours/week × 52 weeks = $41,600/year. At 35 hours/week it's $36,400/year. These figures are pre-tax — your take-home depends on federal, state, and local taxes.",
          },
        },
        {
          '@type': 'Question',
          name: 'What salary is $25 an hour?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "$25/hour working full-time (40 hrs/week, 52 weeks) = $52,000/year. Monthly that's ~$4,333. Weekly: $1,000. As of 2025, $25/hour is above the US median hourly wage of about $23.",
          },
        },
        {
          '@type': 'Question',
          name: 'What is $100,000 a year hourly?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '$100,000 ÷ 2,080 hours = $48.08/hour. Daily (8 hrs): $384.62. Weekly: $1,923. Bi-weekly paycheck: $3,846 gross. After taxes, a $100k salary in most US states results in approximately $65,000–$72,000 take-home pay annually.',
          },
        },
        {
          '@type': 'Question',
          name: 'How many work hours are in a year?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A standard full-time year has 2,080 hours (52 weeks × 40 hrs). Accounting for 10 federal holidays: ~2,000 hours. With 2 weeks of vacation: ~1,960 hours. This calculator uses customizable hours/day and days/week so you can set the exact schedule that applies to you.',
          },
        },
      ],
    },
  ],
})

export default function SalaryPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <SalaryCalculator />
    </>
  )
}
