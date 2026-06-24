import { kv } from '@vercel/kv'

export interface ArticleStep {
  n: number
  title: string
  body: string
  prompt: string
  why: string
}

export interface Article {
  slug: string
  title: string
  topic: string
  codeword: string
  accent: string
  createdAt: string
  intro: { hook: string; why: string; promise: string }
  steps: ArticleStep[]
  svgBlocks?: {
    intro?: string
    steps?: string[]
  }
  cta: {
    headline: string
    body: string
    buttonText: string
    buttonUrl: string
    subtext?: string
  }
}

export async function getArticle(slug: string): Promise<Article | null> {
  return await kv.get<Article>(`article:${slug.toLowerCase()}`)
}

export async function saveArticle(article: Article): Promise<void> {
  await kv.set(`article:${article.slug.toLowerCase()}`, article)
}
