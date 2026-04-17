'use client'
import { useState, useEffect, useRef } from 'react'
import ToolHeader from '@/components/tool/ToolHeader'
import TwoColLayout from '@/components/tool/TwoColLayout'
import FieldInput from '@/components/tool/FieldInput'
import ResultPanel from '@/components/tool/ResultPanel'
import { SegmentedToggle } from '@/components/tool/SegmentedToggle'
import { RelatedTools } from '@/components/tool/RelatedTools'
import { FaqSection } from '@/components/tool/FaqSection'
import { calcBodyFatMetric, calcBodyFatImperial, BodyFatResult } from '@/lib/calculators/bodyfat'
import { TOOL } from '@/lib/tools'

const FAQS = [
  {
    q: 'What is a healthy body fat percentage?',
    a: 'For men: 6–13% is athlete range, 14–17% is fitness, 18–24% is acceptable. For women: 14–20% is athlete range, 21–24% is fitness, 25–31% is acceptable. Essential fat needed for life functions is 3–5% for men and 10–13% for women. The American Council on Exercise defines 25%+ for men and 32%+ for women as obese.',
  },
  {
    q: 'How accurate is the Navy body fat method?',
    a: 'The US Navy formula estimates body fat within 3–4% of DEXA scan results for most people. It\'s less accurate for very muscular individuals (overestimates fat) and those with unusual fat distribution. DEXA (dual-energy X-ray) is the gold standard. Calipers are also reasonably accurate when used consistently by the same person.',
  },
  {
    q: 'Can you lose body fat without losing weight?',
    a: 'Yes — body recomposition replaces fat with muscle. If you gain 2 kg of muscle and lose 2 kg of fat, scale weight stays the same but body fat% drops significantly. This is most common in people new to resistance training or returning after a break. It\'s slower than a focused cut or bulk, but achievable.',
  },
  {
    q: 'What is lean mass?',
    a: 'Lean mass is everything in your body except fat: muscles, bones, organs, water, and connective tissue. A 80 kg person at 20% body fat has 16 kg of fat and 64 kg of lean mass. Preserving or increasing lean mass while reducing fat is the goal of most physique transformations.',
  },
  {
    q: 'How do I measure waist and neck for this calculator?',
    a: 'For waist: measure at the level of your navel (belly button), relaxed and not sucked in. For neck: measure just below the larynx (Adam\'s apple) at the narrowest point. For hips (women only): measure at the widest point around the buttocks. Use a soft measuring tape and take 2–3 measurements for accuracy.',
  },
]

const RELATED = [TOOL.bmi, TOOL.calorie, TOOL.unitConverter]

const UNITS = ['Metric', 'Imperial']
const SEXES = ['Male', 'Female']

export default function BodyFatCalculator() {
  const [unit, setUnit] = useState('Metric')
  const [sex, setSex] = useState('Male')

  // Metric fields
  const [weight, setWeight] = useState('80')
  const [height, setHeight] = useState('178')
  const [waist, setWaist] = useState('85')
  const [neck, setNeck] = useState('38')
  const [hip, setHip] = useState('95')

  // Imperial fields
  const [weightLbs, setWeightLbs] = useState('176')
  const [heightFt, setHeightFt] = useState('5')
  const [heightInImp, setHeightInImp] = useState('10')
  const [waistIn, setWaistIn] = useState('33')
  const [neckIn, setNeckIn] = useState('15')
  const [hipIn, setHipIn] = useState('37')

  const [result, setResult] = useState<BodyFatResult | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      const bodyFatSex = sex === 'Male' ? 'male' : 'female'
      let res: BodyFatResult | null = null
      if (unit === 'Metric') {
        res = calcBodyFatMetric(
          bodyFatSex,
          parseFloat(weight) || 0,
          parseFloat(height) || 0,
          parseFloat(waist) || 0,
          parseFloat(neck) || 0,
          sex === 'Female' ? (parseFloat(hip) || 0) : undefined,
        )
      } else {
        const totalIn = (parseFloat(heightFt) || 0) * 12 + (parseFloat(heightInImp) || 0)
        res = calcBodyFatImperial(
          bodyFatSex,
          parseFloat(weightLbs) || 0,
          totalIn,
          parseFloat(waistIn) || 0,
          parseFloat(neckIn) || 0,
          sex === 'Female' ? (parseFloat(hipIn) || 0) : undefined,
        )
      }
      setResult(res)
    }, 150)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [unit, sex, weight, height, waist, neck, hip, weightLbs, heightFt, heightInImp, waistIn, neckIn, hipIn])

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
          {isMetric ? (
            <>
              <FieldInput label="Weight" suffix="kg" value={weight} onChange={setWeight} id="weight" />
              <FieldInput label="Height" suffix="cm" value={height} onChange={setHeight} id="height" />
              <FieldInput label="Waist" suffix="cm" value={waist} onChange={setWaist} id="waist" />
              <FieldInput label="Neck" suffix="cm" value={neck} onChange={setNeck} id="neck" />
              {sex === 'Female' && (
                <FieldInput label="Hip" suffix="cm" value={hip} onChange={setHip} id="hip" />
              )}
            </>
          ) : (
            <>
              <FieldInput label="Weight" suffix="lbs" value={weightLbs} onChange={setWeightLbs} id="weightLbs" />
              <div className="flex flex-col gap-1.5">
                <span className="text-sm font-medium text-gray-700">Height</span>
                <div className="flex gap-2">
                  <FieldInput label="" suffix="ft" value={heightFt} onChange={setHeightFt} id="heightFt" />
                  <FieldInput label="" suffix="in" value={heightInImp} onChange={setHeightInImp} id="heightIn" />
                </div>
              </div>
              <FieldInput label="Waist" suffix="in" value={waistIn} onChange={setWaistIn} id="waistIn" />
              <FieldInput label="Neck" suffix="in" value={neckIn} onChange={setNeckIn} id="neckIn" />
              {sex === 'Female' && (
                <FieldInput label="Hip" suffix="in" value={hipIn} onChange={setHipIn} id="hipIn" />
              )}
            </>
          )}
        </div>
      </div>
      <RelatedTools tools={RELATED} />
    </>
  )

  const resultPanel = result ? (
    <ResultPanel
      label="Body Fat"
      value={result.bodyFatPercent.toFixed(1) + '%'}
      subtitle={result.category}
      rows={[
        {
          label: 'Fat Mass',
          value: isMetric
            ? result.fatMass.toFixed(1) + ' kg'
            : (result.fatMass / 0.453592).toFixed(1) + ' lbs',
        },
        {
          label: 'Lean Mass',
          value: isMetric
            ? result.leanMass.toFixed(1) + ' kg'
            : (result.leanMass / 0.453592).toFixed(1) + ' lbs',
        },
        { label: 'Category', value: result.category },
      ]}
      bar={{
        pct: result.bodyFatPercent,
        left: result.bodyFatPercent.toFixed(1) + '% fat',
        right: (100 - result.bodyFatPercent).toFixed(1) + '% lean',
      }}
    />
  ) : (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-sm text-blue-300 font-medium">
      Enter your details to see your body fat percentage.
    </div>
  )

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToolHeader
        title="Body Fat Calculator"
        description="Calculate your body fat percentage using the US Navy method. Supports metric and imperial units."
      />
      <TwoColLayout left={inputPanel} right={resultPanel} />
      <FaqSection items={FAQS} />
    </div>
  )
}
