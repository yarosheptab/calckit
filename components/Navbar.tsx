'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { FINANCE_TOOLS, HEALTH_TOOLS, EVERYDAY_TOOLS } from '@/lib/tools'

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', handleOutsideClick)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  const isToolActive = [...FINANCE_TOOLS, ...HEALTH_TOOLS, ...EVERYDAY_TOOLS].some(t => pathname === t.href)

  return (
    <nav className="h-[58px] bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-50">
      <Link href="/" className="no-underline">
        <span className="text-[17px] font-extrabold tracking-tight text-gray-900">
          calc<span className="text-blue-600">kit</span>
        </span>
      </Link>

      <div className="flex items-center gap-1">
        {/* Tools dropdown */}
        <div ref={dropdownRef} className="relative">
          <button
            onClick={() => setOpen(v => !v)}
            className={cn(
              'flex items-center gap-1 text-sm font-medium px-3 py-1.5 rounded-lg transition-colors cursor-pointer',
              open || isToolActive
                ? 'text-gray-900 bg-gray-100'
                : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
            )}
          >
            Tools
            <ChevronDown
              className={cn('w-3.5 h-3.5 transition-transform duration-150', open && 'rotate-180')}
            />
          </button>

          {open && (
            <div className="absolute right-0 top-[calc(100%+6px)] bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden
              w-56 flex flex-col max-h-[80dvh] overflow-y-auto
              md:w-auto md:flex-row md:max-h-none md:overflow-visible md:divide-x md:divide-gray-100">
              {[
                { label: 'Finance', tools: FINANCE_TOOLS },
                { label: 'Health', tools: HEALTH_TOOLS },
                { label: 'Everyday', tools: EVERYDAY_TOOLS },
              ].map(({ label, tools }) => (
                <div key={label} className="md:w-48 shrink-0">
                  <div className="px-3 pt-3 pb-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{label}</span>
                  </div>
                  {tools.map(tool => {
                    const Icon = tool.icon
                    return (
                      <Link
                        key={tool.href}
                        href={tool.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          'flex items-center gap-3 px-3 py-2 mx-1 rounded-lg transition-colors no-underline',
                          pathname === tool.href
                            ? 'bg-blue-50 text-blue-700'
                            : 'text-gray-700 hover:bg-gray-50'
                        )}
                      >
                        <div className={cn('flex items-center justify-center w-7 h-7 rounded-md shrink-0', tool.iconBg)}>
                          <Icon className={cn('w-3.5 h-3.5', tool.iconColor)} />
                        </div>
                        <span className="text-[13px] font-medium">{tool.name}</span>
                      </Link>
                    )
                  })}
                  <div className="h-2" />
                </div>
              ))}
            </div>
          )}
        </div>

        <Link
          href="/blog"
          className={cn(
            'text-sm font-medium px-3 py-1.5 rounded-lg transition-colors',
            pathname.startsWith('/blog')
              ? 'text-gray-900 bg-gray-100'
              : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
          )}
        >
          Blog
        </Link>
        <Link
          href="/about"
          className={cn(
            'text-sm font-medium px-3 py-1.5 rounded-lg transition-colors',
            pathname === '/about'
              ? 'text-gray-900 bg-gray-100'
              : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
          )}
        >
          About
        </Link>
      </div>
    </nav>
  )
}
