import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid #e5e7eb', padding: '0 24px', height: '52px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11px', color: '#9ca3af', fontFamily: 'var(--font-inter, Inter, sans-serif)' }}>
      <a href="https://yaro-labs.com" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
        © {new Date().getFullYear()} Yaro Labs
      </a>
      <div style={{ display: 'flex', gap: '14px' }}>
        {[
          { href: '/privacy', label: 'Privacy' },
          { href: '/terms', label: 'Terms' },
          { href: '/cookies', label: 'Cookies' },
          { href: '/about', label: 'About' },
          { href: '/blog', label: 'Blog' },
        ].map(({ href, label }) => (
          <Link key={href} href={href} style={{ color: 'inherit', textDecoration: 'none' }}>{label}</Link>
        ))}
      </div>
    </footer>
  )
}
