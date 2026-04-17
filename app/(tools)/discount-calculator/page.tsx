import type { Metadata } from 'next'
import DiscountCalculator from './DiscountCalculator'

export const metadata: Metadata = {
  title: 'Discount Calculator — Percent Off & Sale Price',
  description: 'Calculate the sale price after a percentage discount, find what percentage off an item is, or work backwards from a sale price to find the original. Free discount calculator.',
  keywords: ['discount calculator', 'percent off calculator', 'sale price calculator', 'percentage discount calculator', 'how much is X percent off'],
  openGraph: {
    title: 'Discount Calculator — Percent Off & Sale Price',
    description: 'Calculate the sale price after a percentage discount, find what percentage off an item is, or work backwards from a sale price to find the original. Free discount calculator.',
    url: 'https://calckit.yaro-labs.com/discount-calculator',
    siteName: 'calckit',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Discount Calculator — Percent Off & Sale Price',
    description: 'Calculate the sale price after a percentage discount, find what percentage off an item is, or work backwards from a sale price to find the original. Free discount calculator.',
  },
}

const BASE = 'https://calckit.yaro-labs.com'

const jsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'Discount Calculator',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web',
      url: `${BASE}/discount-calculator`,
      description: 'Calculate the sale price after a percentage discount, find what percentage off an item is, or work backwards from a sale price to find the original.',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: { '@type': 'Organization', name: 'Yaro Labs', url: 'https://yaro-labs.com' },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'calckit', item: BASE },
        { '@type': 'ListItem', position: 2, name: 'Discount Calculator', item: `${BASE}/discount-calculator` },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How do I calculate a percentage discount?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Multiply the original price by the discount percentage, then subtract from the original. Formula: Sale Price = Original x (1 - Discount%). Example: 25% off $80 = $80 x 0.75 = $60. You save $20.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is 20% off $50?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '20% off $50 = $40. You save $10. Quick method: 10% of $50 = $5, doubled = $10 discount. Final price: $50 - $10 = $40.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I find the original price before a discount?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Divide the sale price by (1 - discount%). Example: if an item is $75 after a 25% discount: original = $75 / 0.75 = $100.',
          },
        },
        {
          '@type': 'Question',
          name: 'What percentage off is a sale price?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Subtract the sale price from the original, divide by the original, multiply by 100. Formula: Discount% = ((Original - Sale) / Original) x 100. Example: original $120, sale $84: (36/120) x 100 = 30% off.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I calculate multiple discounts stacked?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Apply discounts sequentially, not additively. A 20% discount followed by a 10% discount is NOT 30% off. Example: $100 - 20% = $80 - 10% = $72. Total savings: $28 (28% off, not 30%).',
          },
        },
      ],
    },
  ],
})

export default function DiscountPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <DiscountCalculator />
    </>
  )
}
