import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'
import { Home, TrendingUp, BarChart2, Receipt, ArrowLeftRight, Ruler, UtensilsCrossed } from 'lucide-react'
import { HeroWidget } from './_components/HeroWidget'

const FINANCE_TOOLS = [
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

const EVERYDAY_TOOLS = [
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

interface Tool {
  name: string; desc: string; href: string
  icon: LucideIcon
  iconBg: string; iconColor: string
}

function ToolCard({ tool }: { tool: Tool }) {
  const Icon = tool.icon
  return (
    <Link href={tool.href} className="no-underline group">
      <div className="bg-white border border-gray-200 rounded-xl p-5 transition-colors hover:border-blue-300 hover:shadow-sm">
        <div className={`inline-flex items-center justify-center w-8 h-8 rounded-lg ${tool.iconBg} mb-3`}>
          <Icon className={`w-4 h-4 ${tool.iconColor}`} />
        </div>
        <div className="text-[15px] font-bold text-gray-900 mb-1">{tool.name}</div>
        <div className="text-[13px] text-gray-400 leading-relaxed mb-3">{tool.desc}</div>
        <span className="text-xs font-semibold text-blue-600">Open →</span>
      </div>
    </Link>
  )
}

export default function HomePage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-sm font-semibold text-gray-500 mb-4">
            Free calculators — no account, no ads
          </p>
          <h1 className="text-[44px] font-extrabold tracking-tight text-gray-900 leading-tight mb-5">
            Built for<br />
            <span className="text-blue-600">everyday math.</span>
          </h1>
          <p className="text-base text-gray-500 leading-relaxed max-w-sm mb-8">
            Mortgage, interest, ROI, currency, units, tips and tax — precise answers in seconds, no account needed.
          </p>
          <Link
            href="#tools"
            className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm"
          >
            Browse all tools →
          </Link>
        </div>
        <div>
          <HeroWidget />
        </div>
      </section>

      {/* Tool Grid */}
      <section id="tools" className="max-w-6xl mx-auto px-6 pb-20">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Finance</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {FINANCE_TOOLS.map(t => <ToolCard key={t.href} tool={t} />)}
        </div>

        <div className="flex items-center gap-3 mb-6">
          <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Everyday</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {EVERYDAY_TOOLS.map(t => <ToolCard key={t.href} tool={t} />)}
        </div>
      </section>
    </div>
  )
}
