import type { Metadata } from 'next'
import DiscountCalculator from '../discount-calculator/DiscountCalculator'

export const metadata: Metadata = {
  title: 'Sale Price Calculator – Final Price After Discount',
  description: 'Calculate the final sale price after applying a discount. Enter the list price and percent off to see exactly what you pay at checkout.',
  keywords: ['sale price calculator', 'final price calculator', 'price after discount', 'discounted price calculator'],
  alternates: { canonical: 'https://calckit.yaro-labs.com/discount-calculator' },
  openGraph: {
    title: 'Sale Price Calculator – Final Price After Discount',
    description: 'Calculate the final sale price after applying a discount. Enter the list price and percent off to see exactly what you pay at checkout.',
    url: 'https://calckit.yaro-labs.com/sale-price-calculator',
    siteName: 'calckit',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sale Price Calculator – Final Price After Discount',
    description: 'See exactly what you pay after a discount is applied to any price.',
  },
}


const BASE = 'https://calckit.yaro-labs.com'
const jsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'Sale Price Calculator',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web',
      url: `${BASE}/sale-price-calculator`,
      description: 'Calculate the final sale price after applying a discount.',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: { '@type': 'Organization', name: 'Yaro Labs', url: 'https://yaro-labs.com' },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'calckit', item: BASE },
        { '@type': 'ListItem', position: 2, name: 'Sale Price Calculator', item: `${BASE}/sale-price-calculator` },
      ],
    },
  ],
})

export default function SalePriceCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <DiscountCalculator pageTitle="Sale Price Calculator" />
    </>
  )
}

