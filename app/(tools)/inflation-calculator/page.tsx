import type { Metadata } from 'next'
import InflationCalculator from './InflationCalculator'

export const metadata: Metadata = {
  title: 'Inflation Calculator — Adjust for Inflation & Purchasing Power',
  description: 'Calculate the inflation-adjusted value of money over time. See what $1,000 from any past year is worth today, or find the implied inflation rate.',
  keywords: ['inflation calculator', 'purchasing power calculator', 'cpi calculator', 'dollar value over time', 'inflation adjusted calculator'],
  openGraph: {
    title: 'Inflation Calculator — Adjust for Inflation & Purchasing Power',
    description: 'Calculate the inflation-adjusted value of money over time. See what $1,000 from any past year is worth today, or find the implied inflation rate.',
    url: 'https://calckit.yaro-labs.com/inflation-calculator',
    siteName: 'calckit',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Inflation Calculator — Adjust for Inflation & Purchasing Power',
    description: 'Calculate the inflation-adjusted value of money over time. See what $1,000 from any past year is worth today, or find the implied inflation rate.',
  },
}

const BASE = 'https://calckit.yaro-labs.com'

const jsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'Inflation Calculator',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Web',
      url: `${BASE}/inflation-calculator`,
      description: 'Calculate the inflation-adjusted value of money over time. See what $1,000 in any past year is worth today, or find the implied inflation rate between two prices.',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: { '@type': 'Organization', name: 'Yaro Labs', url: 'https://yaro-labs.com' },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'calckit', item: BASE },
        { '@type': 'ListItem', position: 2, name: 'Inflation Calculator', item: `${BASE}/inflation-calculator` },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is inflation?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Inflation is the rate at which the general price level of goods and services rises over time, reducing purchasing power. At 3% annual inflation, $100 today buys what $97 bought last year. The US Federal Reserve targets 2% annual inflation. Measured by the Consumer Price Index (CPI), US inflation averaged about 3.1% per year from 1914 to 2024.',
          },
        },
        {
          '@type': 'Question',
          name: 'How much is $1,000 in 2000 worth today?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "At the US historical average of ~2.7% inflation, $1,000 in 2000 is worth approximately $1,890 in 2025. In other words, you'd need $1,890 today to have the same purchasing power as $1,000 in 2000 — a 89% cumulative increase over 25 years.",
          },
        },
        {
          '@type': 'Question',
          name: 'What was the inflation rate in 2022?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "US inflation peaked at 9.1% in June 2022 — the highest since 1981. This was driven by pandemic supply chain disruptions, stimulus spending, and the 2022 energy crisis following the Ukraine invasion. By 2024, inflation had moderated to around 3.5%, still above the Fed's 2% target.",
          },
        },
        {
          '@type': 'Question',
          name: 'How does inflation affect savings?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'At 3% inflation, money in a 0% savings account loses 3% of its purchasing power each year. $100,000 becomes worth only $73,700 in real terms after 10 years at 3% inflation. This is why keeping large amounts in a checking account erodes wealth — high-yield savings or investments are needed to outpace inflation.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the real interest rate?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The real interest rate = nominal rate minus inflation rate. If your savings account pays 5% but inflation is 3%, your real return is only 2%. If your loan charges 7% but inflation is 4%, your real cost is 3%. The real rate matters more than the nominal rate for financial planning.',
          },
        },
      ],
    },
  ],
})

export default function InflationPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <InflationCalculator />
    </>
  )
}
