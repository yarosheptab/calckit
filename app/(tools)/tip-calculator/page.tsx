import type { Metadata } from 'next'
import TipCalculator from './TipCalculator'

export const metadata: Metadata = {
  title: 'Tip Calculator — Split Bill & Calculate Gratuity',
  description: 'Calculate tip amounts and split the bill between multiple people. Enter your total, tip %, and number of people.',
  keywords: ['tip calculator', 'bill splitter', 'split bill calculator', 'restaurant tip calculator', 'gratuity calculator'],
  openGraph: {
    title: 'Tip Calculator — Split Bill & Calculate Gratuity',
    description: 'Calculate tip amounts and split the bill between multiple people. Enter your total, tip %, and number of people.',
    url: 'https://calckit.yaro-labs.com/tip-calculator',
    siteName: 'calckit',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tip Calculator — Split Bill & Calculate Gratuity',
    description: 'Calculate tip amounts and split the bill between multiple people. Enter your total, tip %, and number of people.',
  },
}

const BASE = 'https://calckit.yaro-labs.com'

const jsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'Tip Calculator',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Web',
      url: `${BASE}/tip-calculator`,
      description: 'Calculate tip amounts and split the bill between multiple people. Enter your total, tip %, and number of people.',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: { '@type': 'Organization', name: 'Yaro Labs', url: 'https://yaro-labs.com' },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'calckit', item: BASE },
        { '@type': 'ListItem', position: 2, name: 'Tip Calculator', item: `${BASE}/tip-calculator` },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How much should I tip at a restaurant?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'In the US, a standard restaurant tip is 15–20% of the pre-tax bill. 18% is widely considered the baseline for good service; 20–25% acknowledges excellent service.',
          },
        },
        {
          '@type': 'Question',
          name: 'Should I tip on the pre-tax or post-tax amount?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Most etiquette guidelines recommend tipping on the pre-tax amount, though tipping on the total (including tax) is also common and appreciated by servers.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I split the bill evenly?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Enter your total bill, choose a tip percentage, and enter the number of people. The calculator divides the total (bill + tip) equally and shows the per-person amount.',
          },
        },
      ],
    },
  ],
})

export default function TipPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <TipCalculator />
    </>
  )
}
