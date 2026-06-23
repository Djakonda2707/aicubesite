import fs from 'fs'
import path from 'path'

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
  intro: {
    hook: string
    why: string
    promise: string
  }
  steps: ArticleStep[]
  cta: {
    headline: string
    body: string
    buttonText: string
    buttonUrl: string
  }
}

const contentDir = path.join(process.cwd(), 'content')

export function getArticle(slug: string): Article | null {
  const filePath = path.join(contentDir, `${slug.toLowerCase()}.json`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(raw) as Article
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(contentDir)) return []
  return fs
    .readdirSync(contentDir)
    .filter((f) => f.endsWith('.json'))
    .map((f) => f.replace('.json', ''))
}
