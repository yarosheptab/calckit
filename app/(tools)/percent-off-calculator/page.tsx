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

export default function PercentOffCalculatorPage() {
  return <DiscountCalculator />
}
