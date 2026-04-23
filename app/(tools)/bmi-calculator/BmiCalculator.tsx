'use client'
import { useState, useEffect, useRef } from 'react'
import ToolHeader from '@/components/tool/ToolHeader'
import TwoColLayout from '@/components/tool/TwoColLayout'
import FieldInput from '@/components/tool/FieldInput'
import ResultPanel from '@/components/tool/ResultPanel'
import { SegmentedToggle } from '@/components/tool/SegmentedToggle'
import { FaqSection } from '@/components/tool/FaqSection'
import { calcBmiMetric, calcBmiImperial, BmiResult } from '@/lib/calculators/bmi'
import { TOOL } from '@/lib/tools'

const FAQS = [
  {
    q: 'What is a healthy BMI range?',
    a: 'Normal BMI is 18.5 to 24.9. Below 18.5 is underweight, 25–29.9 is overweight, 30 and above is obese. These thresholds are set by the World Health Organization and used globally.',
  },
  {
    q: 'Is BMI accurate for everyone?',
    a: "BMI has limitations: it doesn't distinguish muscle from fat, so athletes may show as overweight. It also doesn't account for age, sex, or ethnicity. Asian populations often have higher health risks at lower BMI thresholds (overweight at 23+). Use BMI alongside waist circumference and body fat % for a fuller picture.",
  },
  {
    q: 'What is the average BMI in the US?',
    a: 'The average adult BMI in the US is 26.5 according to CDC data, placing the average American in the overweight range. About 42% of US adults have a BMI over 30, classified as obese.',
  },
  {
    q: 'How much do I need to weigh for a normal BMI?',
    a: "This depends entirely on your height. At 5'9\" (175 cm), a normal BMI of 18.5–24.9 corresponds to 125–168 lbs (57–76 kg). Use the Healthy Range in the results above to see your specific target.",
  },
  {
    q: 'What BMI is considered obese?',
    a: 'A BMI of 30 or above is classified as obese. Class 1: 30–34.9, Class 2: 35–39.9, Class 3 (severe): 40+. Health risks — including type 2 diabetes, cardiovascular disease, and sleep apnea — increase significantly above 30.',
  },
]


const UNITS = ['Metric', 'Imperial']

export default function BmiCalculator({ pageTitle }: { pageTitle?: string } = {}) {
  const [unit, setUnit] = useState('Metric')
  const [weightKg, setWeightKg] = useState('70')
  const [heightCm, setHeightCm] = useState('175')
  const [weightLbs, setWeightLbs] = useState('154')
  const [heightFt, setHeightFt] = useState('5')
  const [heightIn, setHeightIn] = useState('9')

  const [result, setResult] = useState<BmiResult | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      let res: BmiResult | null = null
      if (unit === 'Metric') {
        res = calcBmiMetric(parseFloat(weightKg) || 0, parseFloat(heightCm) || 0)
      } else {
        const totalIn = (parseFloat(heightFt) || 0) * 12 + (parseFloat(heightIn) || 0)
        res = calcBmiImperial(parseFloat(weightLbs) || 0, totalIn)
      }
      setResult(res)
    }, 150)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [unit, weightKg, heightCm, weightLbs, heightFt, heightIn])

  const isMetric = unit === 'Metric'

  const inputPanel = (
    <>
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-5 pt-5 pb-0">
          <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Your details</span>
        </div>
        <div className="p-5 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-gray-700">Unit system</span>
            <SegmentedToggle options={UNITS} value={unit} onChange={setUnit} />
          </div>
          {isMetric ? (
            <>
              <FieldInput label="Weight" suffix="kg" value={weightKg} onChange={setWeightKg} id="weightKg" />
              <FieldInput label="Height" suffix="cm" value={heightCm} onChange={setHeightCm} id="heightCm" />
            </>
          ) : (
            <>
              <FieldInput label="Weight" suffix="lbs" value={weightLbs} onChange={setWeightLbs} id="weightLbs" />
              <div className="flex flex-col gap-1.5">
                <span className="text-sm font-medium text-gray-700">Height</span>
                <div className="flex gap-2">
                  <FieldInput label="" suffix="ft" value={heightFt} onChange={setHeightFt} id="heightFt" />
                  <FieldInput label="" suffix="in" value={heightIn} onChange={setHeightIn} id="heightIn" />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )

  const resultPanel = result ? (
    <ResultPanel
      label="BMI"
      value={result.bmi.toFixed(1)}
      subtitle={result.category}
      rows={[
        {
          label: 'Healthy range',
          value: isMetric
            ? `${result.healthyMin.toFixed(1)}–${result.healthyMax.toFixed(1)} kg`
            : `${result.healthyMin.toFixed(1)}–${result.healthyMax.toFixed(1)} lbs`,
        },
        { label: 'Category', value: result.category },
      ]}
      bar={{ pct: Math.min((result.bmi / 40) * 100, 100), left: result.category, right: 'BMI ' + result.bmi.toFixed(1) }}
    />
  ) : (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-sm text-blue-300 font-medium">
      Enter your details to see your BMI.
    </div>
  )

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToolHeader title="BMI Calculator" description="Calculate your Body Mass Index. Supports metric and imperial units." pageTitle={pageTitle} />
      <TwoColLayout left={inputPanel} right={resultPanel} />
      <FaqSection items={FAQS} />
    </div>
  )
}
