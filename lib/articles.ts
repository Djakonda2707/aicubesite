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
  const decodedSlug = decodeURIComponent(slug).toLowerCase()
  const url = `https://raw.githubusercontent.com/${REPO}/${BRANCH}/content/${encodeURIComponent(decodedSlug)}.json`
  const res = await fetch(url, { cache: 'no-store' })
  if (!res.ok) return null
  return res.json() as Promise<Article>
}

export async function getAllArticles(): Promise<Article[]> {
  const apiUrl = `https://api.github.com/repos/${REPO}/contents/content`
  const res = await fetch(apiUrl, { cache: 'no-store' })
  if (!res.ok) return []
  const files: { name: string; type: string }[] = await res.json()
  const slugs = files.filter((f) => f.type === 'file' && f.name.endsWith('.json')).map((f) => f.name.replace('.json', ''))
  const articles = await Promise.all(slugs.map((s) => getArticle(s)))
  return articles.filter(Boolean) as Article[]
}
