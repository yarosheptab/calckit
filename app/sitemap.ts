import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog'

const BASE = 'https://calckit.yaro-labs.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const tools = ['mortgage', 'compound-interest', 'roi', 'currency', 'unit-converter', 'tip', 'tax']
  const blogPosts = getAllPosts()
  return [
    { url: BASE, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/about`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.4 },
    ...tools.map(slug => ({
      url: `${BASE}/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),
    ...blogPosts.map(post => ({
      url: `${BASE}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),
    { url: `${BASE}/privacy`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.2 },
    { url: `${BASE}/terms`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.2 },
    { url: `${BASE}/cookies`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.2 },
  ]
}
