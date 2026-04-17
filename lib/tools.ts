import { Home, TrendingUp, BarChart2, Receipt, ArrowLeftRight, Ruler, UtensilsCrossed, Scale, Percent, Flame, CalendarDays, CreditCard, PiggyBank, Briefcase, CalendarRange } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface Tool {
  name: string
  desc: string
  href: string
  icon: LucideIcon
  iconBg: string
  iconColor: string
}

export const FINANCE_TOOLS: Tool[] = [
  {
    name: 'Loan Calculator',
    desc: 'Monthly payments & total interest for any loan',
    href: '/loan',
    icon: CreditCard,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-700',
  },
  {
    name: 'Savings Calculator',
    desc: 'Monthly savings needed or projected balance',
    href: '/savings',
    icon: PiggyBank,
    iconBg: 'bg-green-100',
    iconColor: 'text-green-700',
  },
  {
    name: 'Salary Calculator',
    desc: 'Convert salary to hourly, weekly, monthly & more',
    href: '/salary',
    icon: Briefcase,
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-700',
  },
  {
    name: 'Mortgage Calculator',
    desc: 'Monthly payment, total interest & amortization',
    href: '/mortgage',
    icon: Home,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-700',
  },
  {
    name: 'Compound Interest',
    desc: 'Future value with compounding and contributions',
    href: '/compound-interest',
    icon: TrendingUp,
    iconBg: 'bg-green-100',
    iconColor: 'text-green-700',
  },
  {
    name: 'ROI Calculator',
    desc: 'Return on investment and annualized return',
    href: '/roi',
    icon: BarChart2,
    iconBg: 'bg-indigo-100',
    iconColor: 'text-indigo-700',
  },
  {
    name: 'Tax Estimator',
    desc: 'Federal income tax and take-home pay',
    href: '/tax',
    icon: Receipt,
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-700',
  },
]

export const HEALTH_TOOLS: Tool[] = [
  {
    name: 'BMI Calculator',
    desc: 'Body mass index with healthy weight range',
    href: '/bmi',
    icon: Scale,
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-700',
  },
  {
    name: 'Calorie Calculator',
    desc: 'Daily calorie needs and TDEE by activity level',
    href: '/calorie',
    icon: Flame,
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-700',
  },
]

export const EVERYDAY_TOOLS: Tool[] = [
  {
    name: 'Percentage Calculator',
    desc: '% of, what %, and percentage change',
    href: '/percentage',
    icon: Percent,
    iconBg: 'bg-sky-100',
    iconColor: 'text-sky-700',
  },
  {
    name: 'Age Calculator',
    desc: 'Exact age in years, months, days & weeks',
    href: '/age',
    icon: CalendarDays,
    iconBg: 'bg-violet-100',
    iconColor: 'text-violet-700',
  },
  {
    name: 'Date Calculator',
    desc: 'Days between dates & add/subtract days',
    href: '/date',
    icon: CalendarRange,
    iconBg: 'bg-cyan-100',
    iconColor: 'text-cyan-700',
  },
  {
    name: 'Currency Converter',
    desc: 'Live exchange rates, 170+ currencies',
    href: '/currency',
    icon: ArrowLeftRight,
    iconBg: 'bg-teal-100',
    iconColor: 'text-teal-700',
  },
  {
    name: 'Unit Converter',
    desc: 'Length, weight, temperature, data',
    href: '/unit-converter',
    icon: Ruler,
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-700',
  },
  {
    name: 'Tip Calculator',
    desc: 'Split bills and calculate tip amounts',
    href: '/tip',
    icon: UtensilsCrossed,
    iconBg: 'bg-rose-100',
    iconColor: 'text-rose-700',
  },
]

export const ALL_TOOLS = [...FINANCE_TOOLS, ...HEALTH_TOOLS, ...EVERYDAY_TOOLS]
