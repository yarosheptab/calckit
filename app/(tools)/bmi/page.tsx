import type { Metadata } from 'next'
import BmiCalculator from './BmiCalculator'

export const metadata: Metadata = {
  title: 'BMI Calculator — Body Mass Index for Adults',
  description: 'Calculate your BMI (Body Mass Index) instantly. Supports metric and imperial units. See your BMI category, healthy weight range, and what your score means.',
  keywords: ['bmi calculator', 'body mass index calculator', 'bmi calculator metric', 'bmi calculator imperial', 'healthy bmi range'],
  openGraph: {
    title: 'BMI Calculator — Body Mass Index for Adults',
    description: 'Calculate your BMI (Body Mass Index) instantly. Supports metric and imperial units. See your BMI category, healthy weight range, and what your score means.',
    url: 'https://calckit.yaro-labs.com/bmi',
    siteName: 'calckit',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BMI Calculator — Body Mass Index for Adults',
    description: 'Calculate your BMI (Body Mass Index) instantly. Supports metric and imperial units. See your BMI category, healthy weight range, and what your score means.',
  },
}

const BASE = 'https://calckit.yaro-labs.com'

const jsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'BMI Calculator',
      applicationCategory: 'HealthApplication',
      operatingSystem: 'Web',
      url: `${BASE}/bmi`,
      description: 'Calculate your BMI (Body Mass Index) instantly. Supports metric and imperial units. See your BMI category, healthy weight range, and what your score means.',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: { '@type': 'Organization', name: 'Yaro Labs', url: 'https://yaro-labs.com' },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'calckit', item: BASE },
        { '@type': 'ListItem', position: 2, name: 'BMI Calculator', item: `${BASE}/bmi` },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is a healthy BMI range?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Normal BMI is 18.5 to 24.9. Below 18.5 is underweight, 25-29.9 is overweight, 30 and above is obese. These thresholds are set by the World Health Organization and used globally.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is BMI accurate for everyone?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "BMI has limitations: it does not distinguish muscle from fat, so athletes may show as overweight. It also does not account for age, sex, or ethnicity. Asian populations often have higher health risks at lower BMI thresholds (overweight at 23+). Use BMI alongside waist circumference and body fat % for a fuller picture.",
          },
        },
        {
          '@type': 'Question',
          name: 'What is the average BMI in the US?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The average adult BMI in the US is 26.5 according to CDC data, placing the average American in the overweight range. About 42% of US adults have a BMI over 30, classified as obese.',
          },
        },
        {
          '@type': 'Question',
          name: 'How much do I need to weigh for a normal BMI?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "This depends entirely on your height. At 5'9\" (175 cm), a normal BMI of 18.5-24.9 corresponds to 125-168 lbs (57-76 kg). Use the Healthy Range in the results above to see your specific target.",
          },
        },
        {
          '@type': 'Question',
          name: 'What BMI is considered obese?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A BMI of 30 or above is classified as obese. Class 1: 30-34.9, Class 2: 35-39.9, Class 3 (severe): 40+. Health risks including type 2 diabetes, cardiovascular disease, and sleep apnea increase significantly above 30.',
          },
        },
      ],
    },
  ],
})

export default function BmiPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <BmiCalculator />
    </>
  )
}
