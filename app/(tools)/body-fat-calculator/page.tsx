import type { Metadata } from 'next'
import BodyFatCalculator from './BodyFatCalculator'

export const metadata: Metadata = {
  title: 'Body Fat Calculator — US Navy Method',
  description: 'Calculate your body fat percentage using the US Navy method. Enter height, waist, and neck measurements for an accurate body fat estimate without equipment.',
  keywords: ['body fat calculator', 'body fat percentage calculator', 'navy body fat calculator', 'how to calculate body fat', 'body fat percentage chart'],
  openGraph: {
    title: 'Body Fat Calculator — US Navy Method',
    description: 'Calculate your body fat percentage using the US Navy method. Enter height, waist, and neck measurements for an accurate body fat estimate without equipment.',
    url: 'https://calckit.yaro-labs.com/body-fat-calculator',
    siteName: 'calckit',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Body Fat Calculator — US Navy Method',
    description: 'Calculate your body fat percentage using the US Navy method. Enter height, waist, and neck measurements for an accurate body fat estimate without equipment.',
  },
}

const BASE = 'https://calckit.yaro-labs.com'

const jsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'Body Fat Calculator',
      applicationCategory: 'HealthApplication',
      operatingSystem: 'Web',
      url: `${BASE}/body-fat-calculator`,
      description: 'Calculate your body fat percentage using the US Navy method. Enter height, waist, and neck measurements for an accurate body fat estimate without equipment.',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: { '@type': 'Organization', name: 'Yaro Labs', url: 'https://yaro-labs.com' },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'calckit', item: BASE },
        { '@type': 'ListItem', position: 2, name: 'Body Fat Calculator', item: `${BASE}/body-fat-calculator` },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is a healthy body fat percentage?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'For men: 6-13% is athlete range, 14-17% is fitness, 18-24% is acceptable. For women: 14-20% is athlete range, 21-24% is fitness, 25-31% is acceptable. Essential fat needed for life functions is 3-5% for men and 10-13% for women. The American Council on Exercise defines 25%+ for men and 32%+ for women as obese.',
          },
        },
        {
          '@type': 'Question',
          name: 'How accurate is the Navy body fat method?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "The US Navy formula estimates body fat within 3-4% of DEXA scan results for most people. It is less accurate for very muscular individuals (overestimates fat) and those with unusual fat distribution. DEXA (dual-energy X-ray) is the gold standard. Calipers are also reasonably accurate when used consistently by the same person.",
          },
        },
        {
          '@type': 'Question',
          name: 'Can you lose body fat without losing weight?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Yes - body recomposition replaces fat with muscle. If you gain 2 kg of muscle and lose 2 kg of fat, scale weight stays the same but body fat% drops significantly. This is most common in people new to resistance training or returning after a break. It is slower than a focused cut or bulk, but achievable.",
          },
        },
        {
          '@type': 'Question',
          name: 'What is lean mass?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Lean mass is everything in your body except fat: muscles, bones, organs, water, and connective tissue. A 80 kg person at 20% body fat has 16 kg of fat and 64 kg of lean mass. Preserving or increasing lean mass while reducing fat is the goal of most physique transformations.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I measure waist and neck for this calculator?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "For waist: measure at the level of your navel (belly button), relaxed and not sucked in. For neck: measure just below the larynx (Adam's apple) at the narrowest point. For hips (women only): measure at the widest point around the buttocks. Use a soft measuring tape and take 2-3 measurements for accuracy.",
          },
        },
      ],
    },
  ],
})

export default function BodyFatPage() {
  // jsonLd is static build-time content — no user input, no XSS risk
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <BodyFatCalculator />
    </>
  )
}
