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

function parseScalar(value: string) {
  const normalized = value.trim()

  if (
    (normalized.startsWith("'") && normalized.endsWith("'")) ||
    (normalized.startsWith('"') && normalized.endsWith('"'))
  ) {
    return normalized.slice(1, -1)
  }

  return normalized
}

function parseFrontMatter(raw: string) {
  const normalized = raw.replace(/^\uFEFF/, '').replace(/\r\n/g, '\n')

  if (!normalized.startsWith('---\n')) {
    return { data: {} as Record<string, string | string[]>, content: normalized }
  }

  const closingMarker = normalized.indexOf('\n---', 4)
  if (closingMarker === -1) {
    return { data: {} as Record<string, string | string[]>, content: normalized }
  }

  const header = normalized.slice(4, closingMarker)
  const content = normalized.slice(closingMarker + 4).replace(/^\n/, '')
  const data: Record<string, string | string[]> = {}
  let currentListKey: string | undefined

  for (const line of header.split('\n')) {
    const listItem = line.match(/^\s+-\s+(.*)$/)
    if (listItem && currentListKey) {
      const currentValue = data[currentListKey]
      if (Array.isArray(currentValue)) {
        currentValue.push(parseScalar(listItem[1]))
      }
      continue
    }

    const field = line.match(/^([A-Za-z][\w-]*):\s*(.*)$/)
    if (!field) continue

    const [, key, value] = field
    if (value.trim()) {
      data[key] = parseScalar(value)
      currentListKey = undefined
    } else {
      data[key] = []
      currentListKey = key
    }
  }

  return { data, content }
}

export const articles: Article[] = Object.entries(articleModules)
  .map(([path, raw]) => {
    const parsed = parseFrontMatter(raw)

    return {
      title: String(parsed.data.title ?? 'Untitled'),
      date: String(parsed.data.date ?? '1970-01-01'),
      slug: String(parsed.data.slug ?? filenameToSlug(path)),
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
