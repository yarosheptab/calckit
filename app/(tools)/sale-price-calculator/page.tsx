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

export default function SalePriceCalculatorPage() {
  return <DiscountCalculator />
}
