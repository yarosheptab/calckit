'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getRelatedTools } from '@/lib/tools'

export default function RelatedTools() {
  const pathname = usePathname()
  const tools = getRelatedTools(pathname)
  if (tools.length === 0) return null

  return (
    <div style={{ maxWidth: '680px', margin: '0 auto', padding: '0 20px 40px' }}>
      <div style={{ height: '1px', background: '#f0f0f0', marginBottom: '24px' }} />
      <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#9ca3af', marginBottom: '12px' }}>
        Try these next
      </p>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        {tools.map(tool => {
          const Icon = tool.icon
          return (
            <Link
              key={tool.href}
              href={tool.href}
              style={{ textDecoration: 'none', flex: '1 1 180px', minWidth: '160px' }}
            >
              <div style={{
                border: '1px solid #e5e7eb',
                borderRadius: '10px',
                padding: '12px 14px',
                background: '#fff',
                transition: 'border-color 0.15s',
              }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#111', marginBottom: '3px' }}>{tool.name}</div>
                <div style={{ fontSize: '11px', color: '#9ca3af', lineHeight: 1.4 }}>{tool.desc}</div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
