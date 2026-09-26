export interface ArticleMeta {
  title: string
  date: string
  slug: string
  tags?: string[]
  summary?: string
}

export interface Article extends ArticleMeta {
  content: string
}
