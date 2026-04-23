import type { Metadata } from 'next'
import BmiCalculator from '../bmi-calculator/BmiCalculator'

export const metadata: Metadata = {
  title: 'Ideal Weight Calculator – Healthy Weight Range for Your Height',
  description: 'Find the ideal weight range for your height and body frame. Uses BMI-based healthy ranges to give you a realistic target weight for your age and gender.',
  keywords: ['ideal weight calculator', 'healthy weight calculator', 'ideal body weight', 'target weight calculator'],
  alternates: { canonical: 'https://calckit.yaro-labs.com/bmi-calculator' },
  openGraph: {
    title: 'Ideal Weight Calculator – Healthy Weight Range for Your Height',
    description: 'Find the ideal weight range for your height and body frame based on healthy BMI ranges.',
    url: 'https://calckit.yaro-labs.com/ideal-weight-calculator',
    siteName: 'calckit',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ideal Weight Calculator – Healthy Weight Range for Your Height',
    description: 'Find the healthy weight range for your height and body frame.',
  },
}

export default function IdealWeightCalculatorPage() {
  return <BmiCalculator pageTitle="Ideal Weight Calculator" />
}
