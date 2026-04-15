import Link from 'next/link'

interface ToolHeaderProps {
  title: string
  description: string
}

export default function ToolHeader({ title, description }: ToolHeaderProps) {
  return (
    <div style={{ padding: '14px 20px 12px', background: '#fff', borderBottom: '1px solid #f0f0f0' }}>
      <div style={{ fontSize: '9px', color: '#9ca3af', marginBottom: '4px' }}>
        <Link href="/" style={{ color: '#9ca3af', textDecoration: 'none' }}>calckit</Link>
        {' / '}
        <span style={{ color: '#2563eb' }}>{title}</span>
      </div>
      <div style={{ fontSize: '16px', fontWeight: 800, color: '#111', letterSpacing: '-0.03em', marginBottom: '2px' }}>{title}</div>
      <div style={{ fontSize: '10px', color: '#9ca3af' }}>{description}</div>
    </div>
  )
}
