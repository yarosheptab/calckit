import type { Metadata } from 'next'
import SavingsCalculator from './SavingsCalculator'

export const metadata: Metadata = {
  title: 'Savings Calculator — Monthly Savings & Goal Planner',
  description: 'Calculate how much to save each month to reach your goal, or project your final savings balance. Includes compound interest and current savings.',
  alternates: { canonical: 'https://calckit.yaro-labs.com/savings-calculator' },
  keywords: ['savings calculator', 'savings goal calculator', 'how much to save calculator', 'monthly savings calculator', 'compound savings calculator'],
  openGraph: {
    title: 'Savings Calculator — Monthly Savings & Goal Planner',
    description: 'Calculate how much to save each month to reach your goal, or project your final savings balance. Includes compound interest and current savings.',
    url: 'https://calckit.yaro-labs.com/savings-calculator',
    siteName: 'calckit',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Savings Calculator — Monthly Savings & Goal Planner',
    description: 'Calculate how much to save each month to reach your goal, or project your final savings balance. Includes compound interest and current savings.',
  },
}

const BASE = 'https://calckit.yaro-labs.com'

// jsonLd is a static string with no user input — safe to use with dangerouslySetInnerHTML
const jsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'Savings Calculator',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Web',
      url: `${BASE}/savings-calculator`,
      description: 'Calculate how much to save each month to reach your goal, or project your final savings balance. Includes compound interest and current savings.',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: { '@type': 'Organization', name: 'Yaro Labs', url: 'https://yaro-labs.com' },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'calckit', item: BASE },
        { '@type': 'ListItem', position: 2, name: 'Savings Calculator', item: `${BASE}/savings-calculator` },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How much should I save each month?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "A common rule is to save 20% of your income (the 50/30/20 budget). On a $60,000 salary that's $1,000/month. If saving for a specific goal — like a $20,000 emergency fund — use this calculator to find the exact monthly amount based on your timeline and interest rate.",
          },
        },
        {
          '@type': 'Question',
          name: 'How long does it take to save $10,000?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Saving $500/month with no interest takes 20 months. With a 4.5% APY high-yield savings account, you reach $10,000 in about 19 months. Starting with $2,000 already saved reduces that to 16 months. The higher your starting balance and interest rate, the faster you get there.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is compound interest on savings?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Compound interest means you earn interest on your interest. At 5% APY on $10,000 over 10 years: simple interest gives $15,000; compound interest gives $16,289. The longer the time horizon, the more dramatic the difference. Einstein reputedly called compound interest "the eighth wonder of the world."',
          },
        },
        {
          '@type': 'Question',
          name: 'What is a high-yield savings account?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "A high-yield savings account (HYSA) pays significantly more than a traditional savings account. As of 2025, the best HYSAs pay 4.5-5.0% APY vs. the national average of ~0.5%. On $10,000, that's $450-500/year vs. $50. FDIC-insured, they're as safe as regular savings.",
          },
        },
        {
          '@type': 'Question',
          name: 'How much interest does $10,000 earn in a year?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'At 5% APY, $10,000 earns $500 in one year. At 4%, $400. At 0.5% (typical bank account), only $50. Over 10 years at 5%, that $10,000 grows to $16,289 -- $6,289 in pure interest with no additional contributions.',
          },
        },
      ],
    },
  ],
})

export default function SavingsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <SavingsCalculator />
    </>
  )
}
