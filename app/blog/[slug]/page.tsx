import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAllPosts, getPostBySlug } from '@/lib/blog'

const BASE = 'https://calckit.yaro-labs.com'

export async function generateStaticParams() {
  return getAllPosts().map(p => ({ slug: p.slug }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${BASE}/blog/${slug}`,
      siteName: 'calckit',
      type: 'article',
      publishedTime: post.date,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    url: `${BASE}/blog/${slug}`,
    mainEntityOfPage: `${BASE}/blog/${slug}`,
    author: { '@type': 'Organization', name: 'Yaro Labs', url: 'https://yaro-labs.com' },
    publisher: { '@type': 'Organization', name: 'calckit', url: BASE },
  })

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '32px 20px' }}>
        <Link
          href="/blog"
          style={{ fontSize: '12px', color: '#6b7280', textDecoration: 'none', display: 'inline-block', marginBottom: '20px' }}
        >
          ← Back to blog
        </Link>
        <div style={{ fontSize: '10px', color: '#9ca3af', marginBottom: '8px' }}>{post.date}</div>
        <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#111', letterSpacing: '-0.03em', marginBottom: '20px' }}>
          {post.title}
        </h1>
        <div
          style={{ fontSize: '14px', color: '#374151', lineHeight: 1.7 }}
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </div>
    </>
  )
}
