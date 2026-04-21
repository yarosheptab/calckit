import { EVERYDAY_TOOLS, FINANCE_TOOLS, HEALTH_TOOLS, type Tool } from '@/lib/tools'
import Image from 'next/image'
import Link from 'next/link'
import { HeroWidget } from './_components/HeroWidget'

function ToolCard({ tool }: { tool: Tool }) {
  const Icon = tool.icon
  return (
    <Link href={tool.href} className="no-underline group">
      <div className="flex flex-col bg-white border h-full border-gray-200 rounded-xl p-5 transition-colors hover:border-blue-300 hover:shadow-sm">
        <div className={`inline-flex items-center justify-center w-8 h-8 rounded-lg ${tool.iconBg} mb-3`}>
          <Icon className={`w-4 h-4 ${tool.iconColor}`} />
        </div>
        <div className="text-[15px] font-bold text-gray-900 mb-1">{tool.name}</div>
        <div className="text-[13px] text-gray-400 leading-relaxed mb-3">{tool.desc}</div>
        <div className="flex-1 flex items-end">
          <span className="text-xs font-semibold text-blue-600">Open →</span>
        </div>
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
          <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Everyday</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {EVERYDAY_TOOLS.map(t => <ToolCard key={t.href} tool={t} />)}
        </div>

        <div className="flex items-center gap-3 mb-6">
          <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Finance</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {FINANCE_TOOLS.map(t => <ToolCard key={t.href} tool={t} />)}
        </div>

        <div className="flex items-center gap-3 mb-6">
          <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Health</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {HEALTH_TOOLS.map(t => <ToolCard key={t.href} tool={t} />)}
        </div>
      </section>

      {/* Featured On */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Featured On</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
        <div className="flex flex-wrap items-center gap-6">
          <a href="https://open-launch.com/projects/calckit" target="_blank" rel="noopener noreferrer" className="flex h-[40px] items-center opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0">
            <Image src="https://open-launch.com/api/badge/4a847206-9c28-45b0-a30f-f23329190ed1/featured-light.svg" alt="Featured on Open-Launch" width={200} height={50} unoptimized style={{ height: 40, width: 'auto' }} />
          </a>
          <a href="https://toolfio.com" target="_blank" rel="dofollow noopener noreferrer" className="flex h-[40px] items-center opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0">
            <Image src="https://toolfio.com/toolfio-light-badge.png" alt="Featured on Toolfio" width={200} height={54} unoptimized style={{ height: 40, width: 'auto' }} />
          </a>
          <a href="https://launchigniter.com/product/calckit?ref=badge-calckit" target="_blank" rel="noopener noreferrer" className="flex h-[40px] items-center opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0">
            <Image src="https://launchigniter.com/api/badge/calckit?theme=light" alt="Featured on LaunchIgniter" width={212} height={55} unoptimized style={{ height: 40, width: 'auto' }} />
          </a>
          <a href="https://www.startupfa.st/projects/calckit" target="_blank" rel="noopener noreferrer" className="flex h-[40px] items-center opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0">
            <Image src="https://www.startupfa.st/badge-light.png" alt="Featured on Startup Fast" width={200} height={54} unoptimized style={{ height: 40, width: 'auto' }} />
          </a>
          <a href="https://fazier.com/launches/calckit" target="_blank" rel="noopener noreferrer" className="flex h-[40px] items-center opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0">
            <Image src="https://fazier.com/api/v1/public/badges/launch_badges.svg?badge_type=launched&theme=light" alt="Launched on Fazier" width={200} height={54} unoptimized style={{ height: 40, width: 'auto' }} />
          </a>
          <a href="https://twelve.tools" target="_blank" rel="noopener noreferrer" className="flex h-[40px] items-center opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0">
            <Image src="https://twelve.tools/badge0-light.svg" alt="Featured on Twelve Tools" width={200} height={54} unoptimized style={{ height: 40, width: 'auto' }} />
          </a>
          <a href="https://findly.tools/calckit?utm_source=calckit" target="_blank" rel="noopener noreferrer" className="flex h-[40px] items-center opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0">
            <Image src="https://findly.tools/badges/findly-tools-badge-light.svg" alt="Featured on Findly Tools" width={200} height={54} unoptimized style={{ height: 40, width: 'auto' }} />
          </a>
          <a href="https://acidtools.com" target="_blank" rel="noopener noreferrer" className="flex h-[40px] items-center opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0">
            <Image src="https://acidtools.com/assets/images/badge.png" alt="Acid Tools" width={200} height={54} unoptimized style={{ height: 40, width: 'auto' }} />
          </a>
          <a href="https://neeed.directory/products/calckit?utm_source=calckit" target="_blank" rel="noopener noreferrer" className="flex h-[40px] items-center opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0">
            <Image src="https://neeed.directory/badges/neeed-badge-light.svg" alt="Featured on neeed.directory" width={139} height={40} unoptimized style={{ height: 40, width: 'auto' }} />
          </a>
        </div>
      </section>
    </div>
  )
}
