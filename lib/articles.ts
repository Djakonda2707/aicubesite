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

const REPO = 'Djakonda2707/aicubesite'
const BRANCH = 'main'

export async function getArticle(slug: string): Promise<Article | null> {
  const url = `https://raw.githubusercontent.com/${REPO}/${BRANCH}/content/${encodeURIComponent(slug.toLowerCase())}.json`
  const res = await fetch(url, { next: { revalidate: 60 } })
  if (!res.ok) return null
  return res.json() as Promise<Article>
}
