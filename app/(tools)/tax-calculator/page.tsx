import type { Metadata } from 'next'
import TaxCalculator from './TaxCalculator'

export const metadata: Metadata = {
  title: 'Income Tax Calculator 2025 — US Federal Brackets',
  description: 'Estimate your 2025 US federal income tax based on gross salary and filing status. Uses current tax brackets.',
  alternates: { canonical: 'https://calckit.yaro-labs.com/tax-calculator' },
  keywords: ['tax calculator', 'income tax calculator', '2025 tax brackets', 'US federal tax', 'take-home pay calculator'],
  openGraph: {
    title: 'Income Tax Calculator 2025 — US Federal Brackets',
    description: 'Estimate your 2025 US federal income tax based on gross salary and filing status. Uses current tax brackets.',
    url: 'https://calckit.yaro-labs.com/tax-calculator',
    siteName: 'calckit',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Income Tax Calculator 2025 — US Federal Brackets',
    description: 'Estimate your 2025 US federal income tax based on gross salary and filing status. Uses current tax brackets.',
  },
}

const BASE = 'https://calckit.yaro-labs.com'

const jsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'Income Tax Calculator',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Web',
      url: `${BASE}/tax-calculator`,
      description: 'Estimate your 2025 US federal income tax based on gross salary and filing status. Uses current tax brackets.',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: { '@type': 'Organization', name: 'Yaro Labs', url: 'https://yaro-labs.com' },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'calckit', item: BASE },
        { '@type': 'ListItem', position: 2, name: 'Income Tax Calculator', item: `${BASE}/tax-calculator` },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What are the 2025 US federal tax brackets?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'For single filers in 2025: 10% up to $11,925; 12% up to $48,475; 22% up to $103,350; 24% up to $197,300; 32% up to $250,525; 35% up to $626,350; 37% above that. Married filing jointly thresholds are approximately double.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the standard deduction for 2025?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The 2025 standard deduction is $15,000 for single filers and $30,000 for married filing jointly. This amount is subtracted from gross income before applying tax brackets.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is effective tax rate vs marginal tax rate?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Your marginal tax rate is the rate applied to your last dollar of income (your top bracket). Your effective tax rate is the percentage of your total income paid in taxes overall — always lower than your marginal rate because lower income portions are taxed at lower rates.',
          },
        },
      ],
    },
  ],
})

export default function TaxPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <TaxCalculator />
    </>
  )
}
