import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'Blog — Personal Finance & Math Articles',
  description: 'Articles, guides, and explainers about personal finance, everyday math, mortgage calculations, investment growth, tax planning, and more — from the calckit team.',
  openGraph: {
    title: 'Blog — Personal Finance & Math Articles',
    description: 'Articles, guides, and explainers about personal finance, everyday math, mortgage calculations, investment growth, tax planning, and more — from the calckit team.',
    url: 'https://calckit.yaro-labs.com/blog',
    siteName: 'calckit',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog — Personal Finance & Math Articles',
    description: 'Articles, guides, and explainers about personal finance, everyday math, mortgage calculations, investment growth, tax planning, and more — from the calckit team.',
  },
}

export default function BlogIndexPage() {
  const posts = getAllPosts()
  return (
    <div style={{ maxWidth: '680px', margin: '0 auto', padding: '32px 20px' }}>
      <h1 style={{ fontSize: '20px', fontWeight: 800, color: '#111', letterSpacing: '-0.03em', marginBottom: '24px' }}>Blog</h1>
      {posts.length === 0 && <p style={{ color: '#9ca3af', fontSize: '12px' }}>No posts yet.</p>}
      {posts.map((post, i) => (
        <div key={post.slug}>
          {i > 0 && <div style={{ height: '1px', background: '#f0f0f0', margin: '16px 0' }} />}
          <div style={{ display: 'flex', gap: '12px', alignItems: 'baseline' }}>
            <span style={{ fontSize: '10px', color: '#9ca3af', whiteSpace: 'nowrap' }}>{post.date}</span>
            <div>
              <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#111', marginBottom: '3px' }}>{post.title}</div>
              </Link>
              <div style={{ fontSize: '11px', color: '#6b7280', lineHeight: 1.5 }}>{post.excerpt}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
