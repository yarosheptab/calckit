import type { Metadata } from 'next'
import CalorieCalculator from '../calorie-calculator/CalorieCalculator'

export const metadata: Metadata = {
  title: 'TDEE Calculator – Total Daily Energy Expenditure',
  description: 'Calculate your Total Daily Energy Expenditure (TDEE) based on age, weight, height, and activity level. Use TDEE to set accurate calorie goals for weight loss or gain.',
  keywords: ['TDEE calculator', 'total daily energy expenditure', 'maintenance calories calculator', 'daily calorie needs'],
  alternates: { canonical: 'https://calckit.yaro-labs.com/calorie-calculator' },
  openGraph: {
    title: 'TDEE Calculator – Total Daily Energy Expenditure',
    description: 'Calculate your Total Daily Energy Expenditure (TDEE) based on age, weight, height, and activity level.',
    url: 'https://calckit.yaro-labs.com/tdee-calculator',
    siteName: 'calckit',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TDEE Calculator – Total Daily Energy Expenditure',
    description: 'Calculate your TDEE to set accurate calorie goals for weight loss or gain.',
  },
}

export default function TdeeCalculatorPage() {
  return <CalorieCalculator />
}
