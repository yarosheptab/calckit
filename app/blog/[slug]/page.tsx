import { notFound } from 'next/navigation'
import { getAllPosts, getPostBySlug } from '@/lib/blog'

export async function generateStaticParams() {
  return getAllPosts().map(p => ({ slug: p.slug }))
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()
  return (
    <div style={{ maxWidth: '680px', margin: '0 auto', padding: '32px 20px' }}>
      <div style={{ fontSize: '10px', color: '#9ca3af', marginBottom: '8px' }}>{post.date}</div>
      <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#111', letterSpacing: '-0.03em', marginBottom: '20px' }}>{post.title}</h1>
      <div
        style={{ fontSize: '14px', color: '#374151', lineHeight: 1.7 }}
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </div>
  )
}
