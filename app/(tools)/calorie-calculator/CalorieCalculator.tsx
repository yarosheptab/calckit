'use client'
import { useState, useEffect, useRef } from 'react'
import ToolHeader from '@/components/tool/ToolHeader'
import TwoColLayout from '@/components/tool/TwoColLayout'
import FieldInput from '@/components/tool/FieldInput'
import ResultPanel from '@/components/tool/ResultPanel'
import { SegmentedToggle } from '@/components/tool/SegmentedToggle'
import { RelatedTools } from '@/components/tool/RelatedTools'
import { FaqSection } from '@/components/tool/FaqSection'
import { calcCalories, calcCaloriesImperial, CalorieResult, ActivityLevel } from '@/lib/calculators/calorie'
import { TOOL } from '@/lib/tools'

const FAQS = [
  {
    q: 'How many calories should I eat per day?',
    a: 'The average adult needs 2,000–2,500 calories/day, but your personal TDEE depends on age, sex, weight, height, and activity level. A sedentary 30-year-old woman at 65 kg needs about 1,700 kcal/day; an active 25-year-old man at 80 kg needs about 3,000 kcal/day. Use this calculator for your personal number.',
  },
  {
    q: 'What is TDEE and how is it calculated?',
    a: 'TDEE (Total Daily Energy Expenditure) is the total calories you burn in a day, including all activity. It\'s calculated by multiplying your BMR (the calories you burn at rest) by an activity multiplier: 1.2 for sedentary, 1.375 for lightly active, 1.55 for moderately active, 1.725 for very active, and 1.9 for extremely active.',
  },
  {
    q: 'How many calories to lose 1 pound per week?',
    a: 'A deficit of 500 calories/day creates approximately a 1 pound (0.45 kg) weight loss per week. This is because 1 lb of fat ≈ 3,500 calories. Eating 250 kcal less and burning 250 kcal more through exercise is a sustainable approach. Don\'t go below 1,200 kcal/day (women) or 1,500 kcal/day (men).',
  },
  {
    q: 'What is BMR?',
    a: 'BMR (Basal Metabolic Rate) is the number of calories your body needs to maintain basic functions — breathing, circulation, cell production — while completely at rest. For a 70 kg, 175 cm, 25-year-old male, BMR ≈ 1,724 kcal/day. All activity on top of that determines your TDEE.',
  },
  {
    q: 'Is 2000 calories a day enough?',
    a: 'For many women and smaller adults with low activity levels, 2,000 kcal is close to maintenance. For active men or larger individuals, it may cause weight loss. The FDA uses 2,000 kcal as a standard reference point for nutrition labels, but personal needs vary by 30–50% based on individual factors.',
  },
]

const RELATED = [TOOL.bmi, TOOL.bodyFat, TOOL.unitConverter]

const UNITS = ['Metric', 'Imperial']
const SEXES = ['Male', 'Female']

const ACTIVITY_OPTIONS: { label: string; value: ActivityLevel }[] = [
  { label: 'Sedentary (desk job)', value: 'sedentary' },
  { label: 'Light (1-3x/week)', value: 'light' },
  { label: 'Moderate (3-5x/week)', value: 'moderate' },
  { label: 'Active (6-7x/week)', value: 'active' },
  { label: 'Very Active (physical job)', value: 'very_active' },
]

export default function CalorieCalculator() {
  const [unit, setUnit] = useState('Metric')
  const [sex, setSex] = useState('Male')
  const [age, setAge] = useState('25')
  const [weightKg, setWeightKg] = useState('70')
  const [heightCm, setHeightCm] = useState('175')
  const [weightLbs, setWeightLbs] = useState('154')
  const [heightFt, setHeightFt] = useState('5')
  const [heightIn, setHeightIn] = useState('9')
  const [activity, setActivity] = useState<ActivityLevel>('moderate')

  const [result, setResult] = useState<CalorieResult | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      const ageNum = parseFloat(age) || 0
      const sexVal = sex === 'Male' ? 'male' : 'female'
      let res: CalorieResult | null = null
      if (unit === 'Metric') {
        res = calcCalories(parseFloat(weightKg) || 0, parseFloat(heightCm) || 0, ageNum, sexVal, activity)
      } else {
        const totalIn = (parseFloat(heightFt) || 0) * 12 + (parseFloat(heightIn) || 0)
        res = calcCaloriesImperial(parseFloat(weightLbs) || 0, totalIn, ageNum, sexVal, activity)
      }
      setResult(res)
    }, 150)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [unit, sex, age, weightKg, heightCm, weightLbs, heightFt, heightIn, activity])

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
          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-gray-700">Sex</span>
            <SegmentedToggle options={SEXES} value={sex} onChange={setSex} />
          </div>
          <FieldInput label="Age" suffix="yrs" value={age} onChange={setAge} id="age" type="number" min="1" step="1" />
          {isMetric ? (
            <>
              <FieldInput label="Weight" suffix="kg" value={weightKg} onChange={setWeightKg} id="weightKg" type="number" min="1" step="0.1" />
              <FieldInput label="Height" suffix="cm" value={heightCm} onChange={setHeightCm} id="heightCm" type="number" min="1" step="1" />
            </>
          ) : (
            <>
              <FieldInput label="Weight" suffix="lbs" value={weightLbs} onChange={setWeightLbs} id="weightLbs" type="number" min="1" step="0.1" />
              <div className="flex flex-col gap-1.5">
                <span className="text-sm font-medium text-gray-700">Height</span>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <FieldInput label="" suffix="ft" value={heightFt} onChange={setHeightFt} id="heightFt" type="number" min="1" step="1" />
                  </div>
                  <div className="flex-1">
                    <FieldInput label="" suffix="in" value={heightIn} onChange={setHeightIn} id="heightIn" type="number" min="0" step="1" />
                  </div>
                </div>
              </div>
            </>
          )}
          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-gray-700">Activity level</span>
            <select
              value={activity}
              onChange={e => setActivity(e.target.value as ActivityLevel)}
              className="h-11 rounded-lg border border-gray-200 bg-white px-3 text-[15px] font-medium text-gray-900 outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-500/10 cursor-pointer"
            >
              {ACTIVITY_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <RelatedTools tools={RELATED} />
    </>
  )

  const resultPanel = result ? (
    <ResultPanel
      label="Daily Calories"
      value={result.tdee.toFixed(0)}
      subtitle="calories/day to maintain weight"
      rows={[
        { label: 'Lose 0.5kg/week', value: result.weightLoss.toFixed(0) + ' kcal' },
        { label: 'Maintain', value: result.tdee.toFixed(0) + ' kcal' },
        { label: 'Gain 0.5kg/week', value: result.weightGain.toFixed(0) + ' kcal' },
        { label: 'BMR (at rest)', value: result.bmr.toFixed(0) + ' kcal' },
      ]}
    />
  ) : (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-sm text-blue-300 font-medium">
      Enter your details to see your daily calorie needs.
    </div>
  )

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToolHeader title="Calorie Calculator" description="Calculate your daily calorie needs based on age, sex, weight, height, and activity level." />
      <TwoColLayout left={inputPanel} right={resultPanel} />
      <FaqSection items={FAQS} />
    </div>
  )
}
