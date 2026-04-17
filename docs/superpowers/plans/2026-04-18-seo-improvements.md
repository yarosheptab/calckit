# SEO Improvements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix all critical and warning-level SEO issues: layout title template, broken SearchAction schema, missing metadata on about/blog/blog-posts, BreadcrumbList on tool pages, FAQPage schema on 4 more tools, legal page OG tags, sitemap lastModified, and per-route dynamic OG images via Next.js ImageResponse.

**Architecture:** All changes are metadata/schema additions to existing page files plus a new `lib/og.tsx` helper and `opengraph-image.tsx` files per route. No React component changes. No new routes. No new npm dependencies — `next/og` is already bundled with Next.js.

**Tech Stack:** Next.js App Router metadata API (`export const metadata`, `generateMetadata`), JSON-LD via inline `<script type="application/ld+json">`, `next/og` ImageResponse for dynamic OG images.

---

## File Map

| Action | File | What changes |
|--------|------|-------------|
| Modify | `app/layout.tsx` | Title → template object; remove `potentialAction` from WebSite schema; remove broken OG image ref |
| Modify | `app/about/page.tsx` | Add full `metadata` export with OG + Twitter |
| Modify | `app/blog/page.tsx` | Add OG + Twitter to existing metadata; expand description |
| Modify | `app/blog/[slug]/page.tsx` | Add `generateMetadata`; add BlogPosting JSON-LD; add back-link |
| Modify | `app/sitemap.ts` | Replace `new Date()` with static constants for non-blog pages |
| Modify | `app/privacy/page.tsx` | Add OG + Twitter tags |
| Modify | `app/terms/page.tsx` | Add OG + Twitter tags |
| Modify | `app/cookies/page.tsx` | Add OG + Twitter tags |
| Modify | `app/mortgage/page.tsx` | Consolidate into @graph; add BreadcrumbList; remove broken images array |
| Modify | `app/compound-interest/page.tsx` | Add BreadcrumbList + FAQPage; remove broken images array |
| Modify | `app/roi/page.tsx` | Add BreadcrumbList + FAQPage; remove broken images array |
| Modify | `app/currency/page.tsx` | Add BreadcrumbList; remove broken images array |
| Modify | `app/unit-converter/page.tsx` | Add BreadcrumbList; remove broken images array |
| Modify | `app/tip/page.tsx` | Add BreadcrumbList + FAQPage; remove broken images array; expand title |
| Modify | `app/tax/page.tsx` | Add BreadcrumbList + FAQPage; remove broken images array |
| Create | `lib/og.tsx` | Shared JSX markup factory for OG images |
| Create | `app/opengraph-image.tsx` | Homepage dynamic OG image |
| Create | `app/mortgage/opengraph-image.tsx` | Mortgage OG image |
| Create | `app/compound-interest/opengraph-image.tsx` | Compound OG image |
| Create | `app/roi/opengraph-image.tsx` | ROI OG image |
| Create | `app/currency/opengraph-image.tsx` | Currency OG image |
| Create | `app/unit-converter/opengraph-image.tsx` | Unit converter OG image |
| Create | `app/tip/opengraph-image.tsx` | Tip OG image |
| Create | `app/tax/opengraph-image.tsx` | Tax OG image |

---

### Task 1: Fix app/layout.tsx — title template + remove broken SearchAction

**Why:** (1) Tool pages output unbranded titles like "Mortgage Calculator" (19 chars) because the layout title is a plain string — child titles replace it entirely. `title.template` makes Next.js append `— calckit` automatically. (2) The WebSite schema `potentialAction` SearchAction points to `/search?q=` which does not exist — Google flags broken Sitelinks Searchbox implementations. (3) The hardcoded OG image `og/home.png` does not exist in public/ — Task 7 replaces it with opengraph-image.tsx.

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Replace the metadata export in app/layout.tsx**

Find the entire `export const metadata: Metadata = { ... }` block (lines 16–69) and replace it with:

```ts
export const metadata: Metadata = {
  title: {
    default: siteTitle,
    template: '%s — calckit',
  },
  description: siteDescription,
  keywords: [
    'calculators', 'mortgage calculator', 'compound interest calculator',
    'ROI calculator', 'currency converter', 'unit converter',
    'tip calculator', 'tax calculator', 'free online calculators',
  ],
  icons: {
    apple: [
      { url: '/apple-icon-57x57.png', sizes: '57x57' },
      { url: '/apple-icon-60x60.png', sizes: '60x60' },
      { url: '/apple-icon-72x72.png', sizes: '72x72' },
      { url: '/apple-icon-76x76.png', sizes: '76x76' },
      { url: '/apple-icon-114x114.png', sizes: '114x114' },
      { url: '/apple-icon-120x120.png', sizes: '120x120' },
      { url: '/apple-icon-144x144.png', sizes: '144x144' },
      { url: '/apple-icon-152x152.png', sizes: '152x152' },
      { url: '/apple-icon-180x180.png', sizes: '180x180' },
    ],
    icon: [
      { url: '/android-icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
  manifest: '/manifest.json',
  themeColor: '#ffffff',
  other: {
    'msapplication-TileColor': '#ffffff',
    'msapplication-TileImage': '/ms-icon-144x144.png',
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: 'https://calckit.yaro-labs.com',
    siteName: 'calckit',
    type: 'website',
    // no images — app/opengraph-image.tsx serves the OG image automatically
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
  },
}
```

- [ ] **Step 2: Remove potentialAction from the WebSite JSON-LD in RootLayout**

In the `RootLayout` body, find the inline `<script type="application/ld+json" ...>` block and replace its content so the JSON is:

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "name": "calckit",
      "url": "https://calckit.yaro-labs.com",
      "description": "<siteDescription>",
      "publisher": { "@type": "Organization", "name": "Yaro Labs", "url": "https://yaro-labs.com" }
    },
    {
      "@type": "Organization",
      "name": "Yaro Labs",
      "url": "https://yaro-labs.com"
    }
  ]
}
```

In the actual TSX, using the existing JSON.stringify pattern:
```tsx
{
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      name: 'calckit',
      url: 'https://calckit.yaro-labs.com',
      description: siteDescription,
      publisher: { '@type': 'Organization', name: 'Yaro Labs', url: 'https://yaro-labs.com' },
    },
    {
      '@type': 'Organization',
      name: 'Yaro Labs',
      url: 'https://yaro-labs.com',
    },
  ],
}
```

(The `potentialAction` object is simply deleted — no other changes to RootLayout.)

- [ ] **Step 3: Verify build passes**

```bash
npm run build
```

Expected: Build succeeds. No TypeScript errors. 23+ routes output.

- [ ] **Step 4: Commit**

```bash
git add app/layout.tsx
git commit -m "seo: add title template, remove broken SearchAction schema"
```

---

### Task 2: Add metadata to about/page.tsx and expand blog/page.tsx

**Why:** `about/page.tsx` has zero metadata — renders with the layout default title in all SERPs. `blog/page.tsx` has title and description but no OG/Twitter tags (social shares show no preview) and the description is 65 chars (target: 150–160).

**Files:**
- Modify: `app/about/page.tsx`
- Modify: `app/blog/page.tsx`

- [ ] **Step 1: Add metadata export to app/about/page.tsx**

Add this block at the top of the file (after the import statements, before the default export):

```ts
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: { absolute: 'About calckit — Free Online Calculators' },
  description: 'calckit is a free collection of everyday calculators — mortgage, compound interest, ROI, currency, units, tips, and taxes. No account, no ads, no data collected. Built by Yaro Labs.',
  openGraph: {
    title: 'About calckit — Free Online Calculators',
    description: 'calckit is a free collection of everyday calculators — mortgage, compound interest, ROI, currency, units, tips, and taxes. No account, no ads, no data collected.',
    url: 'https://calckit.yaro-labs.com/about',
    siteName: 'calckit',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About calckit — Free Online Calculators',
    description: 'calckit is a free collection of everyday calculators — mortgage, compound interest, ROI, currency, units, tips, and taxes. No account, no ads, no data collected.',
  },
}
```

Note: `title: { absolute: '...' }` bypasses the layout template so it doesn't render "About calckit — Free Online Calculators — calckit".

- [ ] **Step 2: Replace metadata in app/blog/page.tsx**

Replace the existing `export const metadata: Metadata = { ... }` block:

```ts
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
```

- [ ] **Step 3: Verify build passes**

```bash
cd /Users/a1111/Public/Prog/js/calckit && npm run build
```

Expected: Build succeeds, no errors.

- [ ] **Step 4: Commit**

```bash
git add app/about/page.tsx app/blog/page.tsx
git commit -m "seo: add metadata to about page, expand blog index metadata"
```

---

### Task 3: Add generateMetadata + BlogPosting schema + back-link to blog/[slug]/page.tsx

**Why:** Every blog post currently renders with the site-level title and description — Google indexes all posts as duplicates of the homepage. `generateMetadata` gives each post its own unique title, description, and OG tags. BlogPosting JSON-LD surfaces content as article-type in Google Search. The back-link prevents orphan pages for visitors who land directly on a post.

**Files:**
- Modify: `app/blog/[slug]/page.tsx`

- [ ] **Step 1: Replace the entire file**

```tsx
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
```

Note on security: `post.html` is the output of `marked.parse()` applied to markdown files from the local filesystem at build time. It is not user input — it is safe to render as HTML here. The JSON-LD content is fully hardcoded from static post metadata.

- [ ] **Step 2: Verify build passes**

```bash
cd /Users/a1111/Public/Prog/js/calckit && npm run build
```

Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add "app/blog/[slug]/page.tsx"
git commit -m "seo: add generateMetadata and BlogPosting schema to blog posts, add back-link"
```

---

### Task 4: Fix sitemap.ts + add OG tags to privacy/terms/cookies pages

**Why:** The sitemap calls `new Date()` for every static page on every deploy — making `lastModified` meaningless (everything always appears just-updated). Using a fixed constant gives Googlebot real signal. Legal pages have metadata titles but no OG/Twitter tags.

**Files:**
- Modify: `app/sitemap.ts`
- Modify: `app/privacy/page.tsx`
- Modify: `app/terms/page.tsx`
- Modify: `app/cookies/page.tsx`

- [ ] **Step 1: Replace app/sitemap.ts**

```ts
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
```

- [ ] **Step 2: Replace metadata in app/privacy/page.tsx**

Replace only the `export const metadata` block (keep the rest of the file unchanged):

```ts
export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for calckit.yaro-labs.com, operated by Yaro Labs. We use Google Analytics for anonymous usage stats and store no personal data.',
  openGraph: {
    title: 'Privacy Policy — calckit',
    description: 'Privacy policy for calckit.yaro-labs.com, operated by Yaro Labs.',
    url: 'https://calckit.yaro-labs.com/privacy',
    siteName: 'calckit',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Privacy Policy — calckit',
    description: 'Privacy policy for calckit.yaro-labs.com, operated by Yaro Labs.',
  },
}
```

- [ ] **Step 3: Replace metadata in app/terms/page.tsx**

```ts
export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Terms of use for calckit, a free calculator site operated by Yaro Labs. All calculator results are for informational purposes only.',
  openGraph: {
    title: 'Terms of Use — calckit',
    description: 'Terms of use for calckit, a free calculator site operated by Yaro Labs.',
    url: 'https://calckit.yaro-labs.com/terms',
    siteName: 'calckit',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Terms of Use — calckit',
    description: 'Terms of use for calckit, a free calculator site operated by Yaro Labs.',
  },
}
```

- [ ] **Step 4: Replace metadata in app/cookies/page.tsx**

```ts
export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'Cookie policy for calckit — what cookies we use (Google Analytics), how to control them, and how to opt out.',
  openGraph: {
    title: 'Cookie Policy — calckit',
    description: 'Cookie policy for calckit — what cookies we use and how to control them.',
    url: 'https://calckit.yaro-labs.com/cookies',
    siteName: 'calckit',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Cookie Policy — calckit',
    description: 'Cookie policy for calckit — what cookies we use and how to control them.',
  },
}
```

- [ ] **Step 5: Verify build passes**

```bash
cd /Users/a1111/Public/Prog/js/calckit && npm run build
```

Expected: Build succeeds.

- [ ] **Step 6: Commit**

```bash
git add app/sitemap.ts app/privacy/page.tsx app/terms/page.tsx app/cookies/page.tsx
git commit -m "seo: fix sitemap lastModified, add OG tags to legal pages"
```

---

### Task 5: Add BreadcrumbList + expand titles on all 7 tool pages

**Why:** Tool pages render visible breadcrumbs via ToolHeader but have no BreadcrumbList JSON-LD — Google can't show breadcrumb trails in SERPs without it. The hardcoded `openGraph.images` reference `og/home.png` which does not exist in public/ — all OG image tags are currently 404s. Removing them lets opengraph-image.tsx (Task 7) take over. Titles are expanded for the 50–60 char SERP target (template adds `— calckit`).

**Files:** All 7 tool page.tsx files.

The pattern for each file is:
1. Expand `metadata.title`, `openGraph.title`, `twitter.title` to descriptive form
2. Remove the `openGraph.images` array
3. Merge all schemas into one `@graph` array inside a single `jsonLd` constant
4. Add a BreadcrumbList entry to the `@graph` array

- [ ] **Step 1: Replace app/mortgage/page.tsx**

```tsx
import type { Metadata } from 'next'
import MortgageCalculator from './MortgageCalculator'

export const metadata: Metadata = {
  title: 'Mortgage Calculator — Monthly Payment & Amortization',
  description: 'Calculate monthly mortgage payments, total interest, and amortization. Enter loan amount, rate, and term — get instant results.',
  keywords: ['mortgage calculator', 'monthly payment calculator', 'home loan calculator', 'mortgage payment', 'amortization calculator'],
  openGraph: {
    title: 'Mortgage Calculator — Monthly Payment & Amortization',
    description: 'Calculate monthly mortgage payments, total interest, and amortization. Enter loan amount, rate, and term — get instant results.',
    url: 'https://calckit.yaro-labs.com/mortgage',
    siteName: 'calckit',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mortgage Calculator — Monthly Payment & Amortization',
    description: 'Calculate monthly mortgage payments, total interest, and amortization. Enter loan amount, rate, and term — get instant results.',
  },
}

const BASE = 'https://calckit.yaro-labs.com'

const jsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'Mortgage Calculator',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Web',
      url: `${BASE}/mortgage`,
      description: 'Calculate monthly mortgage payments, total interest, and amortization. Enter loan amount, rate, and term — get instant results.',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: { '@type': 'Organization', name: 'Yaro Labs', url: 'https://yaro-labs.com' },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'calckit', item: BASE },
        { '@type': 'ListItem', position: 2, name: 'Mortgage Calculator', item: `${BASE}/mortgage` },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is the monthly payment on a $300,000 mortgage?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'At a 6.5% interest rate over 30 years, the monthly payment on a $300,000 mortgage is approximately $1,896. The exact payment depends on your interest rate and loan term.',
          },
        },
        {
          '@type': 'Question',
          name: 'How is a mortgage payment calculated?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A mortgage payment is calculated using the formula: M = P[r(1+r)^n]/[(1+r)^n-1], where P is the principal loan amount, r is the monthly interest rate, and n is the number of monthly payments.',
          },
        },
        {
          '@type': 'Question',
          name: 'How much of my mortgage payment goes to interest vs principal?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'In the early years, most of your payment goes toward interest. Over time, more goes toward principal. Our calculator shows the full breakdown of principal vs. total interest paid.',
          },
        },
      ],
    },
  ],
})

export default function MortgagePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <MortgageCalculator />
    </>
  )
}
```

- [ ] **Step 2: Replace app/compound-interest/page.tsx**

```tsx
import type { Metadata } from 'next'
import CompoundInterestCalculator from './CompoundInterestCalculator'

export const metadata: Metadata = {
  title: 'Compound Interest Calculator — Future Value & Growth',
  description: 'Calculate how investments grow with compound interest. Choose annual, monthly, or daily compounding — see future value and interest earned.',
  keywords: ['compound interest calculator', 'investment calculator', 'interest calculator', 'future value calculator', 'compounding frequency'],
  openGraph: {
    title: 'Compound Interest Calculator — Future Value & Growth',
    description: 'Calculate how investments grow with compound interest. Choose annual, monthly, or daily compounding — see future value and interest earned.',
    url: 'https://calckit.yaro-labs.com/compound-interest',
    siteName: 'calckit',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Compound Interest Calculator — Future Value & Growth',
    description: 'Calculate how investments grow with compound interest. Choose annual, monthly, or daily compounding — see future value and interest earned.',
  },
}

const BASE = 'https://calckit.yaro-labs.com'

const jsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'Compound Interest Calculator',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Web',
      url: `${BASE}/compound-interest`,
      description: 'Calculate how investments grow with compound interest. Choose annual, monthly, or daily compounding — see future value and interest earned.',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: { '@type': 'Organization', name: 'Yaro Labs', url: 'https://yaro-labs.com' },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'calckit', item: BASE },
        { '@type': 'ListItem', position: 2, name: 'Compound Interest Calculator', item: `${BASE}/compound-interest` },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is compound interest?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Compound interest is interest calculated on both the initial principal and the accumulated interest from previous periods. Unlike simple interest, it causes investments to grow exponentially over time.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the compound interest formula?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'FV = P × (1 + r/n)^(n×t), where P is the principal, r is the annual interest rate as a decimal, n is the number of compounding periods per year, and t is the time in years.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the difference between annual and monthly compounding?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'With monthly compounding (12 times/year), interest is added to the principal each month. Each month\'s earned interest starts earning interest sooner, producing higher returns than annual compounding over the same period.',
          },
        },
      ],
    },
  ],
})

export default function CompoundInterestPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <CompoundInterestCalculator />
    </>
  )
}
```

- [ ] **Step 3: Replace app/roi/page.tsx**

```tsx
import type { Metadata } from 'next'
import ROICalculator from './ROICalculator'

export const metadata: Metadata = {
  title: 'ROI Calculator — Return on Investment & Annualized Return',
  description: 'Calculate return on investment (ROI %) and annualized return for any investment. Enter initial value, final value, and time period.',
  keywords: ['ROI calculator', 'return on investment', 'investment ROI', 'annualized return', 'profit calculator'],
  openGraph: {
    title: 'ROI Calculator — Return on Investment & Annualized Return',
    description: 'Calculate return on investment (ROI %) and annualized return for any investment. Enter initial value, final value, and time period.',
    url: 'https://calckit.yaro-labs.com/roi',
    siteName: 'calckit',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ROI Calculator — Return on Investment & Annualized Return',
    description: 'Calculate return on investment (ROI %) and annualized return for any investment. Enter initial value, final value, and time period.',
  },
}

const BASE = 'https://calckit.yaro-labs.com'

const jsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'ROI Calculator',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Web',
      url: `${BASE}/roi`,
      description: 'Calculate return on investment (ROI %) and annualized return for any investment. Enter initial value, final value, and time period.',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: { '@type': 'Organization', name: 'Yaro Labs', url: 'https://yaro-labs.com' },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'calckit', item: BASE },
        { '@type': 'ListItem', position: 2, name: 'ROI Calculator', item: `${BASE}/roi` },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is ROI?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'ROI (Return on Investment) measures profit or loss relative to investment cost. Formula: ROI = ((Final Value − Initial Investment) / Initial Investment) × 100.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is a good ROI?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'It depends on asset class. The S&P 500 has historically averaged 7–10% annually. Real estate typically returns 8–12%. Short-term business ventures may target 15–30%. Always compare against alternatives.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the difference between ROI and annualized return?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'ROI is the total percentage gain over the full holding period. Annualized return converts that to a per-year rate: Annualized Return = (1 + ROI/100)^(1/years) − 1. This lets you compare investments held for different durations.',
          },
        },
      ],
    },
  ],
})

export default function ROIPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <ROICalculator />
    </>
  )
}
```

- [ ] **Step 4: Replace app/currency/page.tsx**

```tsx
import type { Metadata } from 'next'
import CurrencyConverter from './CurrencyConverter'

export const metadata: Metadata = {
  title: 'Currency Converter — Live Exchange Rates, 170+ Currencies',
  description: 'Convert between 170+ currencies with live exchange rates. Updated hourly. No account needed.',
  keywords: ['currency converter', 'exchange rate', 'live currency rates', 'forex converter', 'money converter online'],
  openGraph: {
    title: 'Currency Converter — Live Exchange Rates, 170+ Currencies',
    description: 'Convert between 170+ currencies with live exchange rates. Updated hourly. No account needed.',
    url: 'https://calckit.yaro-labs.com/currency',
    siteName: 'calckit',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Currency Converter — Live Exchange Rates, 170+ Currencies',
    description: 'Convert between 170+ currencies with live exchange rates. Updated hourly. No account needed.',
  },
}

const BASE = 'https://calckit.yaro-labs.com'

const jsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'Currency Converter',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Web',
      url: `${BASE}/currency`,
      description: 'Convert between 170+ currencies with live exchange rates. Updated hourly. No account needed.',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: { '@type': 'Organization', name: 'Yaro Labs', url: 'https://yaro-labs.com' },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'calckit', item: BASE },
        { '@type': 'ListItem', position: 2, name: 'Currency Converter', item: `${BASE}/currency` },
      ],
    },
  ],
})

export default function CurrencyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <CurrencyConverter />
    </>
  )
}
```

- [ ] **Step 5: Replace app/unit-converter/page.tsx**

```tsx
import type { Metadata } from 'next'
import UnitConverterCalculator from './UnitConverterCalculator'

export const metadata: Metadata = {
  title: 'Unit Converter — Length, Weight, Temperature, Data',
  description: 'Convert between units of length, weight, temperature, and data storage. Instant conversions, no signup.',
  keywords: ['unit converter', 'length converter', 'weight converter', 'temperature converter', 'data storage converter', 'metric imperial converter'],
  openGraph: {
    title: 'Unit Converter — Length, Weight, Temperature, Data',
    description: 'Convert between units of length, weight, temperature, and data storage. Instant conversions, no signup.',
    url: 'https://calckit.yaro-labs.com/unit-converter',
    siteName: 'calckit',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Unit Converter — Length, Weight, Temperature, Data',
    description: 'Convert between units of length, weight, temperature, and data storage. Instant conversions, no signup.',
  },
}

const BASE = 'https://calckit.yaro-labs.com'

const jsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'Unit Converter',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web',
      url: `${BASE}/unit-converter`,
      description: 'Convert between units of length, weight, temperature, and data storage. Instant conversions, no signup.',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: { '@type': 'Organization', name: 'Yaro Labs', url: 'https://yaro-labs.com' },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'calckit', item: BASE },
        { '@type': 'ListItem', position: 2, name: 'Unit Converter', item: `${BASE}/unit-converter` },
      ],
    },
  ],
})

export default function UnitConverterPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <UnitConverterCalculator />
    </>
  )
}
```

- [ ] **Step 6: Replace app/tip/page.tsx**

```tsx
import type { Metadata } from 'next'
import TipCalculator from './TipCalculator'

export const metadata: Metadata = {
  title: 'Tip Calculator — Split Bill & Calculate Gratuity',
  description: 'Calculate tip amounts and split the bill between multiple people. Enter your total, tip %, and number of people.',
  keywords: ['tip calculator', 'bill splitter', 'split bill calculator', 'restaurant tip calculator', 'gratuity calculator'],
  openGraph: {
    title: 'Tip Calculator — Split Bill & Calculate Gratuity',
    description: 'Calculate tip amounts and split the bill between multiple people. Enter your total, tip %, and number of people.',
    url: 'https://calckit.yaro-labs.com/tip',
    siteName: 'calckit',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tip Calculator — Split Bill & Calculate Gratuity',
    description: 'Calculate tip amounts and split the bill between multiple people. Enter your total, tip %, and number of people.',
  },
}

const BASE = 'https://calckit.yaro-labs.com'

const jsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'Tip Calculator',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Web',
      url: `${BASE}/tip`,
      description: 'Calculate tip amounts and split the bill between multiple people. Enter your total, tip %, and number of people.',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: { '@type': 'Organization', name: 'Yaro Labs', url: 'https://yaro-labs.com' },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'calckit', item: BASE },
        { '@type': 'ListItem', position: 2, name: 'Tip Calculator', item: `${BASE}/tip` },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How much should I tip at a restaurant?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'In the US, a standard restaurant tip is 15–20% of the pre-tax bill. 18% is widely considered the baseline for good service; 20–25% acknowledges excellent service.',
          },
        },
        {
          '@type': 'Question',
          name: 'Should I tip on the pre-tax or post-tax amount?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Most etiquette guidelines recommend tipping on the pre-tax amount, though tipping on the total (including tax) is also common and appreciated by servers.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I split the bill evenly?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Enter your total bill, choose a tip percentage, and enter the number of people. The calculator divides the total (bill + tip) equally and shows the per-person amount.',
          },
        },
      ],
    },
  ],
})

export default function TipPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <TipCalculator />
    </>
  )
}
```

- [ ] **Step 7: Replace app/tax/page.tsx**

```tsx
import type { Metadata } from 'next'
import TaxCalculator from './TaxCalculator'

export const metadata: Metadata = {
  title: 'Income Tax Calculator 2024 — US Federal Brackets',
  description: 'Estimate your 2024 US federal income tax based on gross salary and filing status. Uses current tax brackets.',
  keywords: ['tax calculator', 'income tax calculator', '2024 tax brackets', 'US federal tax', 'take-home pay calculator'],
  openGraph: {
    title: 'Income Tax Calculator 2024 — US Federal Brackets',
    description: 'Estimate your 2024 US federal income tax based on gross salary and filing status. Uses current tax brackets.',
    url: 'https://calckit.yaro-labs.com/tax',
    siteName: 'calckit',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Income Tax Calculator 2024 — US Federal Brackets',
    description: 'Estimate your 2024 US federal income tax based on gross salary and filing status. Uses current tax brackets.',
  },
}

const BASE = 'https://calckit.yaro-labs.com'

const jsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'Income Tax Calculator',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Web',
      url: `${BASE}/tax`,
      description: 'Estimate your 2024 US federal income tax based on gross salary and filing status. Uses current tax brackets.',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: { '@type': 'Organization', name: 'Yaro Labs', url: 'https://yaro-labs.com' },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'calckit', item: BASE },
        { '@type': 'ListItem', position: 2, name: 'Income Tax Calculator', item: `${BASE}/tax` },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What are the 2024 US federal tax brackets?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'For single filers in 2024: 10% up to $11,600; 12% up to $47,150; 22% up to $100,525; 24% up to $191,950; 32% up to $243,725; 35% up to $609,350; 37% above that. Married filing jointly thresholds are approximately double.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the standard deduction for 2024?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The 2024 standard deduction is $14,600 for single filers and $29,200 for married filing jointly. This amount is subtracted from gross income before applying tax brackets.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is effective tax rate vs marginal tax rate?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Your marginal tax rate is the rate applied to your last dollar of income (your top bracket). Your effective tax rate is the percentage of your total income paid in taxes overall — always lower than your marginal rate because lower income portions are taxed at lower rates.',
          },
        },
      ],
    },
  ],
})

export default function TaxPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <TaxCalculator />
    </>
  )
}
```

- [ ] **Step 8: Verify build passes**

```bash
cd /Users/a1111/Public/Prog/js/calckit && npm run build
```

Expected: Build succeeds. All 7 tool routes generated without errors.

- [ ] **Step 9: Commit**

```bash
git add app/mortgage/page.tsx app/compound-interest/page.tsx app/roi/page.tsx app/currency/page.tsx app/unit-converter/page.tsx app/tip/page.tsx app/tax/page.tsx
git commit -m "seo: add BreadcrumbList + FAQPage schemas, expand titles, fix OG on all tool pages"
```

---

### Task 6: Create dynamic OG images via Next.js ImageResponse

**Why:** No `public/og/` directory exists — OG image URLs were all 404s before Task 5 removed them. This task creates proper OG images using Next.js built-in `ImageResponse` (from `next/og`, included with Next.js — no new npm packages). Each route gets a branded image with its tool name. Next.js auto-discovers `opengraph-image.tsx` files and serves them at `/{route}/opengraph-image`, automatically including them in OG and Twitter meta tags.

**Files:**
- Create: `lib/og.tsx`
- Create: `app/opengraph-image.tsx`
- Create: `app/mortgage/opengraph-image.tsx`
- Create: `app/compound-interest/opengraph-image.tsx`
- Create: `app/roi/opengraph-image.tsx`
- Create: `app/currency/opengraph-image.tsx`
- Create: `app/unit-converter/opengraph-image.tsx`
- Create: `app/tip/opengraph-image.tsx`
- Create: `app/tax/opengraph-image.tsx`

- [ ] **Step 1: Create lib/og.tsx — shared OG image markup factory**

This file exports a function that returns JSX suitable for passing to `ImageResponse`. All styling uses inline style objects (required by ImageResponse — it does not support Tailwind or external CSS).

```tsx
export function ogImageMarkup(title: string, subtitle: string) {
  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 100%)',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '72px 80px',
        fontFamily: 'system-ui, sans-serif',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 'auto' }}>
        <span style={{ color: '#93c5fd', fontSize: 24, fontWeight: 800 }}>calc</span>
        <span style={{ color: '#ffffff', fontSize: 24, fontWeight: 800 }}>kit</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ color: '#ffffff', fontSize: 58, fontWeight: 800, lineHeight: 1.1, marginBottom: 18, letterSpacing: '-1px' }}>
          {title}
        </div>
        <div style={{ color: '#93c5fd', fontSize: 26, fontWeight: 500 }}>
          {subtitle}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Create app/opengraph-image.tsx**

```tsx
import { ImageResponse } from 'next/og'
import { ogImageMarkup } from '@/lib/og'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OG() {
  return new ImageResponse(
    ogImageMarkup('Free Online Calculators', 'Mortgage · Compound · ROI · Currency · Units · Tip · Tax'),
    { width: 1200, height: 630 }
  )
}
```

- [ ] **Step 3: Create app/mortgage/opengraph-image.tsx**

```tsx
import { ImageResponse } from 'next/og'
import { ogImageMarkup } from '@/lib/og'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OG() {
  return new ImageResponse(
    ogImageMarkup('Mortgage Calculator', 'Monthly payment, total interest & amortization'),
    { width: 1200, height: 630 }
  )
}
```

- [ ] **Step 4: Create app/compound-interest/opengraph-image.tsx**

```tsx
import { ImageResponse } from 'next/og'
import { ogImageMarkup } from '@/lib/og'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OG() {
  return new ImageResponse(
    ogImageMarkup('Compound Interest', 'Future value with compounding and contributions'),
    { width: 1200, height: 630 }
  )
}
```

- [ ] **Step 5: Create app/roi/opengraph-image.tsx**

```tsx
import { ImageResponse } from 'next/og'
import { ogImageMarkup } from '@/lib/og'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OG() {
  return new ImageResponse(
    ogImageMarkup('ROI Calculator', 'Return on investment & annualized return'),
    { width: 1200, height: 630 }
  )
}
```

- [ ] **Step 6: Create app/currency/opengraph-image.tsx**

```tsx
import { ImageResponse } from 'next/og'
import { ogImageMarkup } from '@/lib/og'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OG() {
  return new ImageResponse(
    ogImageMarkup('Currency Converter', 'Live exchange rates · 170+ currencies'),
    { width: 1200, height: 630 }
  )
}
```

- [ ] **Step 7: Create app/unit-converter/opengraph-image.tsx**

```tsx
import { ImageResponse } from 'next/og'
import { ogImageMarkup } from '@/lib/og'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OG() {
  return new ImageResponse(
    ogImageMarkup('Unit Converter', 'Length · Weight · Temperature · Data'),
    { width: 1200, height: 630 }
  )
}
```

- [ ] **Step 8: Create app/tip/opengraph-image.tsx**

```tsx
import { ImageResponse } from 'next/og'
import { ogImageMarkup } from '@/lib/og'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OG() {
  return new ImageResponse(
    ogImageMarkup('Tip Calculator', 'Split the bill & calculate gratuity'),
    { width: 1200, height: 630 }
  )
}
```

- [ ] **Step 9: Create app/tax/opengraph-image.tsx**

```tsx
import { ImageResponse } from 'next/og'
import { ogImageMarkup } from '@/lib/og'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OG() {
  return new ImageResponse(
    ogImageMarkup('Income Tax Calculator', 'US federal brackets · 2024 standard deduction'),
    { width: 1200, height: 630 }
  )
}
```

- [ ] **Step 10: Verify build passes and OG routes appear**

```bash
cd /Users/a1111/Public/Prog/js/calckit && npm run build 2>&1 | grep -E "(opengraph|error|Error)" | head -30
```

Expected: Build succeeds. Lines like `○ /mortgage/opengraph-image` (or similar) appear in output, confirming the dynamic image routes were generated. No TypeScript errors.

If you see an error like "JSX element type does not have any construct or call signatures", ensure `lib/og.tsx` has the `.tsx` extension (not `.ts`).

- [ ] **Step 11: Commit**

```bash
git add lib/og.tsx app/opengraph-image.tsx app/mortgage/opengraph-image.tsx app/compound-interest/opengraph-image.tsx app/roi/opengraph-image.tsx app/currency/opengraph-image.tsx app/unit-converter/opengraph-image.tsx app/tip/opengraph-image.tsx app/tax/opengraph-image.tsx
git commit -m "seo: add dynamic OG images via Next.js ImageResponse for all routes"
```

