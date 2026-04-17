import type { Metadata } from 'next'
import TipCalculator from '../tip-calculator/TipCalculator'

export const metadata: Metadata = {
  title: 'Bill Splitter – Split the Check & Calculate Tip Per Person',
  description: 'Split any restaurant bill evenly among friends and calculate the tip per person. Enter total, tip percentage, and number of people to see each share instantly.',
  keywords: ['bill splitter', 'split the bill calculator', 'restaurant bill splitter', 'tip splitter calculator'],
  alternates: { canonical: 'https://calckit.yaro-labs.com/tip-calculator' },
  openGraph: {
    title: 'Bill Splitter – Split the Check & Calculate Tip Per Person',
    description: 'Split any restaurant bill evenly among friends and calculate the tip per person.',
    url: 'https://calckit.yaro-labs.com/bill-splitter',
    siteName: 'calckit',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bill Splitter – Split the Check & Calculate Tip Per Person',
    description: 'Split any bill evenly and calculate each person\'s share including tip.',
  },
}

export default function BillSplitterPage() {
  return <TipCalculator />
}
