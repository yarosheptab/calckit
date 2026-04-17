import type { Metadata } from 'next'
import CalorieCalculator from './CalorieCalculator'

export const metadata: Metadata = {
  title: 'Calorie Calculator — Daily Calories & TDEE',
  description: 'Calculate your daily calorie needs (TDEE) based on age, weight, height, and activity level. Find your maintenance, weight loss, and weight gain calorie targets.',
  keywords: ['calorie calculator', 'tdee calculator', 'daily calorie calculator', 'calories to lose weight', 'bmr calculator'],
  openGraph: {
    title: 'Calorie Calculator — Daily Calories & TDEE',
    description: 'Calculate your daily calorie needs (TDEE) based on age, weight, height, and activity level. Find your maintenance, weight loss, and weight gain calorie targets.',
    url: 'https://calckit.yaro-labs.com/calorie',
    siteName: 'calckit',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calorie Calculator — Daily Calories & TDEE',
    description: 'Calculate your daily calorie needs (TDEE) based on age, weight, height, and activity level. Find your maintenance, weight loss, and weight gain calorie targets.',
  },
}

const BASE = 'https://calckit.yaro-labs.com'

const jsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'Calorie Calculator',
      applicationCategory: 'HealthApplication',
      operatingSystem: 'Web',
      url: `${BASE}/calorie`,
      description: 'Calculate your daily calorie needs (TDEE) based on age, weight, height, and activity level.',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: { '@type': 'Organization', name: 'Yaro Labs', url: 'https://yaro-labs.com' },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'calckit', item: BASE },
        { '@type': 'ListItem', position: 2, name: 'Calorie Calculator', item: `${BASE}/calorie` },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How many calories should I eat per day?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The average adult needs 2,000-2,500 calories/day, but your personal TDEE depends on age, sex, weight, height, and activity level. A sedentary 30-year-old woman at 65 kg needs about 1,700 kcal/day; an active 25-year-old man at 80 kg needs about 3,000 kcal/day.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is TDEE and how is it calculated?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'TDEE (Total Daily Energy Expenditure) is the total calories you burn in a day. It is calculated by multiplying your BMR by an activity multiplier: 1.2 for sedentary, 1.375 for lightly active, 1.55 for moderately active, 1.725 for very active, and 1.9 for extremely active.',
          },
        },
        {
          '@type': 'Question',
          name: 'How many calories to lose 1 pound per week?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A deficit of 500 calories/day creates approximately a 1 pound (0.45 kg) weight loss per week. This is because 1 lb of fat equals 3,500 calories. Do not go below 1,200 kcal/day (women) or 1,500 kcal/day (men).',
          },
        },
        {
          '@type': 'Question',
          name: 'What is BMR?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'BMR (Basal Metabolic Rate) is the number of calories your body needs to maintain basic functions while completely at rest. For a 70 kg, 175 cm, 25-year-old male, BMR is approximately 1,724 kcal/day.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is 2000 calories a day enough?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'For many women and smaller adults with low activity levels, 2,000 kcal is close to maintenance. For active men or larger individuals, it may cause weight loss. Personal needs vary by 30-50% based on individual factors.',
          },
        },
      ],
    },
  ],
})

export default function CaloriePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <CalorieCalculator />
    </>
  )
}
