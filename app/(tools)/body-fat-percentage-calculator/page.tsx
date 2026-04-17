import type { Metadata } from 'next'
import BodyFatCalculator from '../body-fat-calculator/BodyFatCalculator'

export const metadata: Metadata = {
  title: 'Body Fat Percentage Calculator – Estimate Your Body Composition',
  description: 'Estimate your body fat percentage using the US Navy or BMI method. Find out where you fall in healthy body composition ranges for your age and gender.',
  keywords: ['body fat percentage calculator', 'body fat calculator', 'body composition calculator', 'fat percentage estimator'],
  alternates: { canonical: 'https://calckit.yaro-labs.com/body-fat-calculator' },
  openGraph: {
    title: 'Body Fat Percentage Calculator – Estimate Your Body Composition',
    description: 'Estimate your body fat percentage and see where you fall in healthy body composition ranges for your age and gender.',
    url: 'https://calckit.yaro-labs.com/body-fat-percentage-calculator',
    siteName: 'calckit',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Body Fat Percentage Calculator – Estimate Your Body Composition',
    description: 'Estimate your body fat percentage using the US Navy or BMI method.',
  },
}

export default function BodyFatPercentageCalculatorPage() {
  return <BodyFatCalculator />
}
