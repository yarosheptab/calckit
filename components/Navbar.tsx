import Link from 'next/link'

interface NavbarProps {
  showCta?: boolean
}

export default function Navbar({ showCta = false }: NavbarProps) {
  return (
    <nav style={{
      height: '50px',
      background: '#fff',
      borderBottom: '1px solid #efefef',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      position: 'sticky',
      top: 0,
      zIndex: 50,
    }}>
      <Link href="/" style={{ textDecoration: 'none' }}>
        <span style={{ fontSize: '15px', fontWeight: 800, color: '#111', letterSpacing: '-0.03em' }}>
          calc<span style={{ color: '#2563eb' }}>kit</span>
        </span>
      </Link>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <Link href="/#tools" style={{ fontSize: '11px', color: '#9ca3af', textDecoration: 'none' }}>Tools</Link>
        <Link href="/blog" style={{ fontSize: '11px', color: '#9ca3af', textDecoration: 'none' }}>Blog</Link>
        <Link href="/about" style={{ fontSize: '11px', color: '#9ca3af', textDecoration: 'none' }}>About</Link>
        {showCta && (
          <Link href="/#tools" style={{
            background: '#2563eb', color: '#fff',
            fontSize: '10px', fontWeight: 600,
            padding: '5px 12px', borderRadius: '5px',
            textDecoration: 'none',
          }}>Browse tools</Link>
        )}
      </div>
    </nav>
  )
}
