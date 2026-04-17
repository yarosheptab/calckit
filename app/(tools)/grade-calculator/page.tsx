import type { Metadata } from 'next'
import GradeCalculator from './GradeCalculator'

export const metadata: Metadata = {
  title: 'Grade Calculator — Final Exam, Weighted Average & GPA',
  description: 'Calculate what grade you need on your final exam, your weighted course average, or your GPA. Free grade and GPA calculator for students.',
  keywords: ['grade calculator', 'final grade calculator', 'what grade do i need', 'gpa calculator', 'weighted grade calculator'],
  openGraph: {
    title: 'Grade Calculator — Final Exam, Weighted Average & GPA',
    description: 'Calculate what grade you need on your final exam, your weighted course average, or your GPA. Free grade and GPA calculator for students.',
    url: 'https://calckit.yaro-labs.com/grade-calculator',
    siteName: 'calckit',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Grade Calculator — Final Exam, Weighted Average & GPA',
    description: 'Calculate what grade you need on your final exam, your weighted course average, or your GPA. Free grade and GPA calculator for students.',
  },
}

const BASE = 'https://calckit.yaro-labs.com'

const jsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'Grade & GPA Calculator',
      applicationCategory: 'EducationalApplication',
      operatingSystem: 'Web',
      url: `${BASE}/grade-calculator`,
      description: 'Calculate what grade you need on your final exam, your weighted course average, or your GPA. Free grade and GPA calculator for students.',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: { '@type': 'Organization', name: 'Yaro Labs', url: 'https://yaro-labs.com' },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'calckit', item: BASE },
        { '@type': 'ListItem', position: 2, name: 'Grade Calculator', item: `${BASE}/grade-calculator` },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What grade do I need on my final exam?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Use the formula: Required = (Desired minus Current times CurrentWeight%) divided by FinalWeight%. Example: current average is 82%, worth 70% of the grade; you want 85%; final is worth 30%. Required = (85 minus 82 times 0.70) / 0.30 = (85 minus 57.4) / 0.30 = 92%.',
          },
        },
        {
          '@type': 'Question',
          name: 'How is GPA calculated?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Multiply each course grade points by its credit hours, sum everything, then divide by total credit hours. An A (4.0) in a 3-credit course = 12 grade points. An A in 3 courses and a B (3.0) in one: (12+12+12+9) / 12 credits = 45/12 = 3.75 GPA. This calculator uses the standard 4.0 scale.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is a weighted grade?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A weighted grade accounts for the fact that some assignments count more than others. If homework is 30%, midterm 30%, and final 40% of your grade, each is weighted differently. A 90 on homework, 80 on midterm, 95 on final = (90 times 0.3) + (80 times 0.3) + (95 times 0.4) = 27 + 24 + 38 = 89%.',
          },
        },
        {
          '@type': 'Question',
          name: 'What GPA do I need to graduate with honors?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Standards vary by school. Typical benchmarks: Cum Laude 3.0+, Magna Cum Laude 3.5+, Summa Cum Laude 3.7+. Latin honors require maintaining this GPA across all semesters. Many schools also require a minimum number of credits completed at the institution.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the difference between weighted and unweighted GPA?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'An unweighted GPA uses a standard 4.0 scale for all classes. A weighted GPA gives extra points for AP, IB, or honors courses — typically 0.5 or 1.0 extra points. A 4.0 in an AP class becomes a 4.5 or 5.0 on a weighted scale. Colleges usually re-calculate GPA on their own scale during admissions.',
          },
        },
      ],
    },
  ],
})

export default function GradePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <GradeCalculator />
    </>
  )
}
