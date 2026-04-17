import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog'

const BASE = 'https://calckit.yaro-labs.com'
const TOOLS_UPDATED = new Date('2026-04-18')
const SITE_UPDATED = new Date('2026-04-18')

export default function sitemap(): MetadataRoute.Sitemap {
  const tools = ['mortgage', 'compound-interest', 'roi', 'currency', 'unit-converter', 'tip', 'tax']
  const blogPosts = getAllPosts()
  return [
    { url: BASE, lastModified: SITE_UPDATED, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/blog`, lastModified: SITE_UPDATED, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/about`, lastModified: SITE_UPDATED, changeFrequency: 'yearly', priority: 0.4 },
    ...tools.map(slug => ({
      url: `${BASE}/${slug}`,
      lastModified: TOOLS_UPDATED,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),
    ...blogPosts.map(post => ({
      url: `${BASE}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),
    { url: `${BASE}/privacy`, lastModified: SITE_UPDATED, changeFrequency: 'yearly' as const, priority: 0.2 },
    { url: `${BASE}/terms`, lastModified: SITE_UPDATED, changeFrequency: 'yearly' as const, priority: 0.2 },
    { url: `${BASE}/cookies`, lastModified: SITE_UPDATED, changeFrequency: 'yearly' as const, priority: 0.2 },
  ]
}
