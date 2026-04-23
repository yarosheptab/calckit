import { getAllPosts } from '@/lib/blog'

export async function GET() {
  const posts = getAllPosts()
  const baseUrl = 'https://calckit.yaro-labs.com'
  const feedUrl = `${baseUrl}/blog/feed.xml`

  // Convert YYYY-MM-DD to RFC 822 format
  const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate)
    return date.toUTCString()
  }

  const feedTitle = 'calckit Blog — Personal Finance & Math'
  const feedDescription = 'Articles about personal finance, everyday math, mortgage, investment, tax, health, and more from calckit.'

  // Build XML manually
  const items = posts
    .map(post => {
      const postUrl = `${baseUrl}/blog/${post.slug}`
      const pubDate = formatDate(post.date)
      return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <description>${escapeXml(post.excerpt)}</description>
      <pubDate>${pubDate}</pubDate>
    </item>`
    })
    .join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(feedTitle)}</title>
    <link>${baseUrl}/blog</link>
    <description>${escapeXml(feedDescription)}</description>
    <language>en-us</language>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}

// Escape special XML characters
function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}
