'use client'
import { useState, useEffect, useRef } from 'react'
import ToolHeader from '@/components/tool/ToolHeader'
import TwoColLayout from '@/components/tool/TwoColLayout'
import FieldInput from '@/components/tool/FieldInput'
import ResultPanel from '@/components/tool/ResultPanel'
import { SegmentedToggle } from '@/components/tool/SegmentedToggle'
import { RelatedTools } from '@/components/tool/RelatedTools'
import { FaqSection } from '@/components/tool/FaqSection'
import { calcRequiredGrade, calcWeightedGrade, calcGPA } from '@/lib/calculators/grade'
import { TOOL } from '@/lib/tools'

const MODES = ['Final Grade', 'Weighted Avg', 'GPA'] as const
type Mode = typeof MODES[number]

const FAQS = [
  {
    q: 'What grade do I need on my final exam?',
    a: 'Use the formula: Required = (Desired − Current × CurrentWeight%) ÷ FinalWeight%. Example: current average is 82%, worth 70% of the grade; you want 85%; final is worth 30%. Required = (85 − 82×0.70) / 0.30 = (85 − 57.4) / 0.30 = 92%. Enter these in the Final Grade tab above.',
  },
  {
    q: 'How is GPA calculated?',
    a: 'Multiply each course\'s grade points by its credit hours, sum everything, then divide by total credit hours. An A (4.0) in a 3-credit course = 12 grade points. An A in 3 courses and a B (3.0) in one: (12+12+12+9) / 12 credits = 45/12 = 3.75 GPA. This calculator uses the standard 4.0 scale.',
  },
  {
    q: 'What is a weighted grade?',
    a: 'A weighted grade accounts for the fact that some assignments count more than others. If homework is 30%, midterm 30%, and final 40% of your grade, each is weighted differently. A 90 on homework, 80 on midterm, 95 on final = (90×0.3) + (80×0.3) + (95×0.4) = 27 + 24 + 38 = 89%.',
  },
  {
    q: 'What GPA do I need to graduate with honors?',
    a: 'Standards vary by school. Typical benchmarks: Cum Laude ≥ 3.0, Magna Cum Laude ≥ 3.5, Summa Cum Laude ≥ 3.7. Latin honors require maintaining this GPA across all semesters. Many schools also require a minimum number of credits completed at the institution.',
  },
  {
    q: 'What is the difference between weighted and unweighted GPA?',
    a: 'An unweighted GPA uses a standard 4.0 scale for all classes. A weighted GPA gives extra points for AP, IB, or honors courses — typically 0.5 or 1.0 extra points. A 4.0 in an AP class becomes a 4.5 or 5.0 on a weighted scale. Colleges usually re-calculate GPA on their own scale during admissions.',
  },
]

const RELATED = [TOOL.percentage, TOOL.savings]

function letterGrade(score: number): string {
  if (score >= 93) return 'A'
  if (score >= 90) return 'A−'
  if (score >= 87) return 'B+'
  if (score >= 83) return 'B'
  if (score >= 80) return 'B−'
  if (score >= 77) return 'C+'
  if (score >= 73) return 'C'
  if (score >= 70) return 'C−'
  if (score >= 67) return 'D+'
  if (score >= 63) return 'D'
  if (score >= 60) return 'D−'
  return 'F'
}

function gpaLabel(gpa: number): string {
  if (gpa >= 3.7) return 'Summa Cum Laude'
  if (gpa >= 3.5) return 'Magna Cum Laude'
  if (gpa >= 3.0) return 'Cum Laude'
  return ''
}

export default function GradeCalculator() {
  const [mode, setMode] = useState<Mode>('Final Grade')

  // Mode A: Final Grade
  const [currentGrade, setCurrentGrade] = useState('85')
  const [currentWeight, setCurrentWeight] = useState('70')
  const [targetGrade, setTargetGrade] = useState('90')
  const [finalWeight, setFinalWeight] = useState('30')
  const [finalResult, setFinalResult] = useState<number | null>(null)

  // Mode B: Weighted Avg
  const [weightedEntries, setWeightedEntries] = useState([
    { grade: '90', weight: '30' },
    { grade: '80', weight: '30' },
    { grade: '95', weight: '40' },
  ])
  const [weightedResult, setWeightedResult] = useState<number | null>(null)

  // Mode C: GPA
  const [gpaEntries, setGpaEntries] = useState([
    { grade: '95', credits: '3' },
    { grade: '88', credits: '3' },
    { grade: '82', credits: '3' },
  ])
  const [gpaResult, setGpaResult] = useState<number | null>(null)

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Mode A effect
  useEffect(() => {
    if (mode !== 'Final Grade') return
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      const result = calcRequiredGrade(
        parseFloat(currentGrade) || 0,
        parseFloat(currentWeight) || 0,
        parseFloat(targetGrade) || 0,
        parseFloat(finalWeight) || 0
      )
      setFinalResult(result)
    }, 150)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [mode, currentGrade, currentWeight, targetGrade, finalWeight])

  // Mode B effect
  useEffect(() => {
    if (mode !== 'Weighted Avg') return
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      const entries = weightedEntries.map(e => ({
        grade: parseFloat(e.grade) || 0,
        weight: parseFloat(e.weight) || 0,
      }))
      setWeightedResult(calcWeightedGrade(entries))
    }, 150)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, JSON.stringify(weightedEntries)])

  // Mode C effect
  useEffect(() => {
    if (mode !== 'GPA') return
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      const entries = gpaEntries.map(e => ({
        grade: parseFloat(e.grade) || 0,
        credits: parseFloat(e.credits) || 0,
      }))
      setGpaResult(calcGPA(entries))
    }, 150)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, JSON.stringify(gpaEntries)])

  // Dynamic row helpers
  function addWeightedRow() {
    setWeightedEntries(prev => [...prev, { grade: '0', weight: '0' }])
  }
  function removeWeightedRow(i: number) {
    setWeightedEntries(prev => prev.filter((_, idx) => idx !== i))
  }
  function updateWeightedRow(i: number, field: 'grade' | 'weight', value: string) {
    setWeightedEntries(prev => prev.map((e, idx) => idx === i ? { ...e, [field]: value } : e))
  }

  function addGpaRow() {
    setGpaEntries(prev => [...prev, { grade: '0', credits: '3' }])
  }
  function removeGpaRow(i: number) {
    setGpaEntries(prev => prev.filter((_, idx) => idx !== i))
  }
  function updateGpaRow(i: number, field: 'grade' | 'credits', value: string) {
    setGpaEntries(prev => prev.map((e, idx) => idx === i ? { ...e, [field]: value } : e))
  }

  // Input panels
  const finalGradePanel = (
    <div className="p-5 flex flex-col gap-4">
      <FieldInput label="Current Grade" suffix="%" value={currentGrade} onChange={setCurrentGrade} id="currentGrade" />
      <FieldInput label="Current Weight" suffix="% of grade" value={currentWeight} onChange={setCurrentWeight} id="currentWeight" />
      <FieldInput label="Target Grade" suffix="%" value={targetGrade} onChange={setTargetGrade} id="targetGrade" />
      <FieldInput label="Final Exam Weight" suffix="% of grade" value={finalWeight} onChange={setFinalWeight} id="finalWeight" />
    </div>
  )

  const weightedAvgPanel = (
    <div className="p-5 flex flex-col gap-4">
      {weightedEntries.map((entry, i) => (
        <div key={i} className="flex gap-2 items-end">
          <div className="flex-1">
            <FieldInput label={i === 0 ? 'Grade' : ''} suffix="%" value={entry.grade} onChange={v => updateWeightedRow(i, 'grade', v)} id={`wgrade-${i}`} />
          </div>
          <div className="flex-1">
            <FieldInput label={i === 0 ? 'Weight' : ''} suffix="%" value={entry.weight} onChange={v => updateWeightedRow(i, 'weight', v)} id={`wweight-${i}`} />
          </div>
          {i > 0 && (
            <button
              type="button"
              onClick={() => removeWeightedRow(i)}
              className="text-gray-400 hover:text-red-500 text-lg leading-none cursor-pointer self-center mb-0.5"
            >
              ×
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={addWeightedRow}
        className="text-sm font-medium text-blue-600 hover:text-blue-700 cursor-pointer text-left"
      >
        + Add Assignment
      </button>
    </div>
  )

  const gpaPanel = (
    <div className="p-5 flex flex-col gap-4">
      {gpaEntries.map((entry, i) => (
        <div key={i} className="flex gap-2 items-end">
          <div className="flex-1">
            <FieldInput label={i === 0 ? 'Grade' : ''} suffix="%" value={entry.grade} onChange={v => updateGpaRow(i, 'grade', v)} id={`ggrade-${i}`} />
          </div>
          <div className="flex-1">
            <FieldInput label={i === 0 ? 'Credits' : ''} value={entry.credits} onChange={v => updateGpaRow(i, 'credits', v)} id={`gcredits-${i}`} />
          </div>
          {i > 0 && (
            <button
              type="button"
              onClick={() => removeGpaRow(i)}
              className="text-gray-400 hover:text-red-500 text-lg leading-none cursor-pointer self-center mb-0.5"
            >
              ×
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={addGpaRow}
        className="text-sm font-medium text-blue-600 hover:text-blue-700 cursor-pointer text-left"
      >
        + Add Course
      </button>
    </div>
  )

  const inputPanel = (
    <>
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-5 pt-5 pb-0">
          <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Your details</span>
        </div>
        <div className="p-5 pb-0">
          <SegmentedToggle options={[...MODES]} value={mode} onChange={v => setMode(v as Mode)} />
        </div>
        {mode === 'Final Grade' && finalGradePanel}
        {mode === 'Weighted Avg' && weightedAvgPanel}
        {mode === 'GPA' && gpaPanel}
      </div>
      <RelatedTools tools={RELATED} />
    </>
  )

  // Result panels
  let resultPanel: React.ReactNode

  if (mode === 'Final Grade') {
    if (finalResult !== null) {
      let warning: string | null = null
      let value = finalResult.toFixed(1) + '%'
      if (finalResult > 100) {
        warning = 'You need over 100% — this goal may not be achievable'
      } else if (finalResult < 0) {
        warning = "You've already achieved your goal!"
      }
      resultPanel = (
        <>
          <ResultPanel
            label="Required Final Score"
            value={value}
            subtitle={`to achieve ${targetGrade}% overall`}
          />
          {warning && (
            <div className="mt-3 bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-700 font-medium">
              {warning}
            </div>
          )}
        </>
      )
    } else {
      resultPanel = (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-sm text-blue-300 font-medium">
          Enter your details to see the result.
        </div>
      )
    }
  } else if (mode === 'Weighted Avg') {
    if (weightedResult !== null) {
      resultPanel = (
        <ResultPanel
          label="Weighted Average"
          value={weightedResult.toFixed(1) + '%'}
          subtitle={`Letter Grade: ${letterGrade(weightedResult)}`}
        />
      )
    } else {
      resultPanel = (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-sm text-blue-300 font-medium">
          Add assignments to see your weighted average.
        </div>
      )
    }
  } else {
    if (gpaResult !== null) {
      const label = gpaLabel(gpaResult)
      resultPanel = (
        <ResultPanel
          label="GPA"
          value={gpaResult.toFixed(2)}
          subtitle={label || undefined}
        />
      )
    } else {
      resultPanel = (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-sm text-blue-300 font-medium">
          Add courses to calculate your GPA.
        </div>
      )
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToolHeader title="Grade & GPA Calculator" description="Calculate what grade you need on your final, your weighted average, or your GPA." />
      <TwoColLayout left={inputPanel} right={resultPanel} />
      <FaqSection items={FAQS} />
    </div>
  )
}
