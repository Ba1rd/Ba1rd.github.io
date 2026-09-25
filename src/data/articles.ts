import matter from 'gray-matter'
import type { Article } from '../types/article'

const articleModules = import.meta.glob('../content/articles/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

function filenameToSlug(path: string) {
  const filename = path.split('/').pop() ?? ''
  return filename.replace(/\.md$/, '')
}

export const articles: Article[] = Object.entries(articleModules)
  .map(([path, raw]) => {
    const parsed = matter(raw)

    return {
      title: String(parsed.data.title ?? 'Untitled'),
      date: String(parsed.data.date ?? '1970-01-01'),
      slug: String(parsed.data.slug ?? filenameToSlug(path)),
      category: parsed.data.category ? String(parsed.data.category) : undefined,
      tags: Array.isArray(parsed.data.tags)
        ? parsed.data.tags.map(String)
        : undefined,
      summary: parsed.data.summary ? String(parsed.data.summary) : undefined,
      content: parsed.content,
    }
  })
  .sort((a, b) => b.date.localeCompare(a.date))

export function getArticleBySlug(slug: string) {
  return articles.find((article) => article.slug === slug)
}