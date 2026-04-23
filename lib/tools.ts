import { Home, TrendingUp, BarChart2, Receipt, ArrowLeftRight, Ruler, UtensilsCrossed, Scale, Percent, Flame, CalendarDays, CreditCard, PiggyBank, Briefcase, CalendarRange, TrendingDown, GraduationCap, DollarSign, Tag, Activity } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface Tool {
  name: string
  desc: string
  href: string
  icon: LucideIcon
  iconBg: string
  iconColor: string
}

export const TOOL = {
  loan:             { name: 'Loan Calculator',          desc: 'Monthly payments & total interest for any loan',          href: '/loan-calculator',              icon: CreditCard,   iconBg: 'bg-blue-100',    iconColor: 'text-blue-700'    },
  savings:          { name: 'Savings Calculator',        desc: 'Monthly savings needed or projected balance',             href: '/savings-calculator',           icon: PiggyBank,    iconBg: 'bg-green-100',   iconColor: 'text-green-700'   },
  salary:           { name: 'Salary Calculator',         desc: 'Convert salary to hourly, weekly, monthly & more',        href: '/salary-calculator',            icon: Briefcase,    iconBg: 'bg-amber-100',   iconColor: 'text-amber-700'   },
  mortgage:         { name: 'Mortgage Calculator',       desc: 'Monthly payment, total interest & amortization',          href: '/mortgage-calculator',          icon: Home,         iconBg: 'bg-blue-100',    iconColor: 'text-blue-700'    },
  compoundInterest: { name: 'Compound Interest',         desc: 'Future value with compounding and contributions',         href: '/compound-interest-calculator', icon: TrendingUp,   iconBg: 'bg-green-100',   iconColor: 'text-green-700'   },
  roi:              { name: 'ROI Calculator',            desc: 'Return on investment and annualized return',              href: '/roi-calculator',               icon: BarChart2,    iconBg: 'bg-indigo-100',  iconColor: 'text-indigo-700'  },
  tax:              { name: 'Tax Estimator',             desc: 'Federal income tax and take-home pay',                    href: '/tax-calculator',               icon: Receipt,      iconBg: 'bg-amber-100',   iconColor: 'text-amber-700'   },
  debt:             { name: 'Debt Payoff Calculator',    desc: 'How long to pay off debt & interest cost',                href: '/debt-payoff-calculator',       icon: TrendingDown, iconBg: 'bg-red-100',     iconColor: 'text-red-700'     },
  inflation:        { name: 'Inflation Calculator',      desc: 'Purchasing power & inflation-adjusted value',             href: '/inflation-calculator',         icon: DollarSign,   iconBg: 'bg-yellow-100',  iconColor: 'text-yellow-700'  },
  bmi:              { name: 'BMI Calculator',            desc: 'Body mass index with healthy weight range',               href: '/bmi-calculator',               icon: Scale,        iconBg: 'bg-emerald-100', iconColor: 'text-emerald-700' },
  calorie:          { name: 'Calorie Calculator',        desc: 'Daily calorie needs and TDEE by activity level',          href: '/calorie-calculator',           icon: Flame,        iconBg: 'bg-orange-100',  iconColor: 'text-orange-700'  },
  bodyFat:          { name: 'Body Fat Calculator',       desc: 'Body fat % using the US Navy method',                     href: '/body-fat-calculator',          icon: Activity,     iconBg: 'bg-pink-100',    iconColor: 'text-pink-700'    },
  percentage:       { name: 'Percentage Calculator',     desc: '% of, what %, and percentage change',                     href: '/percentage-calculator',        icon: Percent,      iconBg: 'bg-sky-100',     iconColor: 'text-sky-700'     },
  age:              { name: 'Age Calculator',            desc: 'Exact age in years, months, days & weeks',                href: '/age-calculator',               icon: CalendarDays, iconBg: 'bg-violet-100',  iconColor: 'text-violet-700'  },
  date:             { name: 'Date Calculator',           desc: 'Days between dates & add/subtract days',                  href: '/date-calculator',              icon: CalendarRange, iconBg: 'bg-cyan-100',   iconColor: 'text-cyan-700'    },
  currency:         { name: 'Currency Converter',        desc: 'Live exchange rates, 170+ currencies',                    href: '/currency-converter',           icon: ArrowLeftRight, iconBg: 'bg-teal-100', iconColor: 'text-teal-700'    },
  unitConverter:    { name: 'Unit Converter',            desc: 'Length, weight, temperature, data',                       href: '/unit-converter',               icon: Ruler,        iconBg: 'bg-purple-100',  iconColor: 'text-purple-700'  },
  tip:              { name: 'Tip Calculator',            desc: 'Split bills and calculate tip amounts',                   href: '/tip-calculator',               icon: UtensilsCrossed, iconBg: 'bg-rose-100', iconColor: 'text-rose-700'   },
  grade:            { name: 'Grade Calculator',          desc: 'Final exam grade needed, weighted avg & GPA',             href: '/grade-calculator',             icon: GraduationCap, iconBg: 'bg-indigo-100', iconColor: 'text-indigo-700' },
  discount:         { name: 'Discount Calculator',       desc: 'Sale price, % off, and original price',                  href: '/discount-calculator',          icon: Tag,          iconBg: 'bg-lime-100',    iconColor: 'text-lime-700'    },
} satisfies Record<string, Tool>

export const FINANCE_TOOLS: Tool[] = [
  TOOL.loan, TOOL.savings, TOOL.salary, TOOL.mortgage,
  TOOL.compoundInterest, TOOL.roi, TOOL.tax, TOOL.debt, TOOL.inflation,
  TOOL.currency, TOOL.percentage,
]

export const HEALTH_TOOLS: Tool[] = [TOOL.bmi, TOOL.calorie, TOOL.bodyFat, TOOL.unitConverter]

export const EVERYDAY_TOOLS: Tool[] = [
  TOOL.percentage, TOOL.age, TOOL.date, TOOL.currency,
  TOOL.unitConverter, TOOL.tip, TOOL.grade, TOOL.discount,
]

const _seen = new Set<string>()
export const ALL_TOOLS: Tool[] = [...EVERYDAY_TOOLS, ...FINANCE_TOOLS, ...HEALTH_TOOLS].filter(t => {
  if (_seen.has(t.href)) return false
  _seen.add(t.href)
  return true
})

export function getRelatedTools(href: string, count = 3): Tool[] {
  const groups = [FINANCE_TOOLS, HEALTH_TOOLS, EVERYDAY_TOOLS]
  const group = groups.find(g => g.some(t => t.href === href)) ?? ALL_TOOLS
  return group.filter(t => t.href !== href).slice(0, count)
}
