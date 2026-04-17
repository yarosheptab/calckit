import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'
import { ALL_TOOLS, type Tool } from './tools'

const BLOG_DIR = path.join(process.cwd(), 'content/blog')

export interface PostMeta {
  slug: string
  title: string
  date: string
  excerpt: string
}

export interface Post extends PostMeta {
  html: string
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return []
  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.md'))
  return files
    .map(file => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf8')
      const { data } = matter(raw)
      return {
        slug: file.replace(/\.md$/, ''),
        title: data.title ?? '',
        date: data.date ?? '',
        excerpt: data.excerpt ?? '',
      }
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function findToolForPost(slug: string): Tool | null {
  // Find the tool whose href slug appears in the blog post slug
  return ALL_TOOLS.find(t => slug.includes(t.href.slice(1))) ?? null
}

export function getRelatedPosts(slug: string, count = 3): PostMeta[] {
  const tool = findToolForPost(slug)
  const all = getAllPosts().filter(p => p.slug !== slug)
  // Prefer posts that reference the same tool
  if (tool) {
    const toolSlug = tool.href.slice(1)
    const same = all.filter(p => p.slug.includes(toolSlug))
    const others = all.filter(p => !p.slug.includes(toolSlug))
    return [...same, ...others].slice(0, count)
  }
  return all.slice(0, count)
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(BLOG_DIR, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)
  const html = marked.parse(content) as string
  return {
    slug,
    title: data.title ?? '',
    date: data.date ?? '',
    excerpt: data.excerpt ?? '',
    html,
  }
}
