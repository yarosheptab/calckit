import { findToolForPost, getAllPosts, getPostBySlug, getRelatedPosts } from '@/lib/blog'
import { ArrowRight, CalendarDays, ChevronRight } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

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
    alternates: { canonical: `${BASE}/blog/${slug}` },
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

  const tool = findToolForPost(slug)
  const related = getRelatedPosts(slug)

  // Content is static markdown from repo files, not user input — safe to render
  const postHtml = post.html
  const ldJson = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.excerpt,
        datePublished: post.date,
        url: `${BASE}/blog/${slug}`,
        mainEntityOfPage: `${BASE}/blog/${slug}`,
        author: { '@type': 'Organization', name: 'Yaro Labs', url: 'https://yaro-labs.com' },
        publisher: { '@type': 'Organization', name: 'calckit', url: BASE },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'calckit', item: BASE },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BASE}/blog` },
          { '@type': 'ListItem', position: 3, name: post.title, item: `${BASE}/blog/${slug}` },
        ],
      },
    ],
  })

  const dateFormatted = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson }} />

      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-8">
            <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/blog" className="hover:text-gray-600 transition-colors">Blog</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-500 truncate max-w-48">{post.title}</span>
          </nav>

          {/* Article */}
          <article className="bg-white rounded-2xl border border-gray-200 overflow-hidden">

            {/* Header */}
            <div className="px-8 pt-10 pb-8 border-b border-gray-100">
              <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
                <CalendarDays className="w-3.5 h-3.5" />
                <time dateTime={post.date}>{dateFormatted}</time>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight leading-tight mb-4">
                {post.title}
              </h1>
              <p className="text-base text-gray-500 leading-relaxed">{post.excerpt}</p>
            </div>

            {/* Prose content — HTML from static markdown files in /content/blog */}
            <div className="px-8 pb-10 pt-0">
              <div className="blog-prose" dangerouslySetInnerHTML={{ __html: postHtml }} />
            </div>

            {/* CTA */}
            {tool && (
              <div className="mx-8 mb-10 rounded-xl bg-blue-50 border border-blue-100 px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="text-sm font-semibold text-blue-900 mb-0.5">Try it yourself</div>
                  <div className="text-xs text-blue-600">{tool.name} — free, no account needed</div>
                </div>
                <Link
                  href={tool.href}
                  className="shrink-0 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
                >
                  Open {tool.name}
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </article>

          {/* Related articles */}
          {related.length > 0 && (
            <section className="mt-10">
              <h2 className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-5">Related articles</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {related.map(p => (
                  <Link
                    key={p.slug}
                    href={`/blog/${p.slug}`}
                    className="group bg-white border border-gray-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-sm transition-all no-underline"
                  >
                    <div className="text-[11px] text-gray-400 mb-2">
                      {new Date(p.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </div>
                    <div className="text-sm font-semibold text-gray-900 leading-snug mb-2 group-hover:text-blue-600 transition-colors">
                      {p.title}
                    </div>
                    <div className="text-xs text-gray-400 leading-relaxed line-clamp-2">{p.excerpt}</div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <div className="mt-8 text-center">
            <Link href="/blog" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">
              ← All articles
            </Link>
          </div>

        </div>
      </div>
    </>
  )
}
