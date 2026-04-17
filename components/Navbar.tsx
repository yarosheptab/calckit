'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { href: '/#tools', label: 'Tools' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="h-[58px] bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-50">
      <Link href="/" className="no-underline">
        <span className="text-[17px] font-extrabold tracking-tight text-gray-900">
          calc<span className="text-blue-600">kit</span>
        </span>
      </Link>
      <div className="flex items-center gap-1">
        {NAV_LINKS.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              'text-sm font-medium px-3 py-1.5 rounded-lg transition-colors',
              pathname === href || (href === '/blog' && pathname.startsWith('/blog'))
                ? 'text-gray-900 bg-gray-100'
                : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
            )}
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  )
}
