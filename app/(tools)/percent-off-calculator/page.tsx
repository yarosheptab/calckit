import type { Metadata } from 'next'
import DiscountCalculator from '../discount-calculator/DiscountCalculator'

export const metadata: Metadata = {
  title: 'Percent Off Calculator – How Much Do You Save?',
  description: 'Find out how much you save with any percent-off deal. Enter the original price and discount percentage to instantly see the sale price and dollar savings.',
  keywords: ['percent off calculator', 'percentage off calculator', 'how much is X% off', 'discount price calculator'],
  alternates: { canonical: 'https://calckit.yaro-labs.com/discount-calculator' },
  openGraph: {
    title: 'Percent Off Calculator – How Much Do You Save?',
    description: 'Find out how much you save with any percent-off deal. Enter the original price and discount percentage to instantly see the sale price and dollar savings.',
    url: 'https://calckit.yaro-labs.com/percent-off-calculator',
    siteName: 'calckit',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Percent Off Calculator – How Much Do You Save?',
    description: 'See the sale price and dollar savings for any percent-off discount.',
  },
}


const BASE = 'https://calckit.yaro-labs.com'
const jsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'Percent Off Calculator',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web',
      url: `${BASE}/percent-off-calculator`,
      description: 'Find out how much you save with any percent-off deal.',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: { '@type': 'Organization', name: 'Yaro Labs', url: 'https://yaro-labs.com' },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'calckit', item: BASE },
        { '@type': 'ListItem', position: 2, name: 'Percent Off Calculator', item: `${BASE}/percent-off-calculator` },
      ],
    },
  ],
})

export default function PercentOffCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <DiscountCalculator pageTitle="Percent Off Calculator" />
    </>
  )
}

