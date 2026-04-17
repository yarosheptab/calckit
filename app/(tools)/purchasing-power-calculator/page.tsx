import type { Metadata } from 'next'
import InflationCalculator from '../inflation-calculator/InflationCalculator'

export const metadata: Metadata = {
  title: 'Purchasing Power Calculator – How Inflation Erodes Value',
  description: "See how inflation has eroded the purchasing power of money over time. Find out what today's dollars were worth in the past — or what past dollars equal today.",
  keywords: ['purchasing power calculator', 'inflation purchasing power', 'real value of money calculator', 'dollar value over time'],
  alternates: { canonical: 'https://calckit.yaro-labs.com/inflation-calculator' },
  openGraph: {
    title: 'Purchasing Power Calculator – How Inflation Erodes Value',
    description: "See how inflation has eroded the purchasing power of money over time.",
    url: 'https://calckit.yaro-labs.com/purchasing-power-calculator',
    siteName: 'calckit',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Purchasing Power Calculator – How Inflation Erodes Value',
    description: "Find out what today's dollars were worth in the past or what past dollars equal today.",
  },
}

export default function PurchasingPowerCalculatorPage() {
  return <InflationCalculator />
}
