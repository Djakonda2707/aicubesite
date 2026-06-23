import { notFound } from 'next/navigation'
import { getArticle, getAllSlugs } from '@/lib/articles'
import { CopyButton } from '@/components/CopyButton'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) return {}
  return {
    title: article.title,
    description: article.intro.promise,
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) notFound()

  const accentStyle = { '--accent': article.accent } as React.CSSProperties

  return (
    <main className="min-h-screen bg-[#0f0f0f] text-white" style={accentStyle}>
      {/* Header */}
      <div className="max-w-2xl mx-auto px-5 pt-10 pb-4">
        <span
          className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-6"
          style={{ background: article.accent + '22', color: article.accent }}
        >
          {article.topic}
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-6">
          {article.title}
        </h1>

        {/* Intro — 50% прогрев */}
        <div className="space-y-4 text-gray-300 text-[17px] leading-relaxed border-l-2 pl-5 mb-10" style={{ borderColor: article.accent }}>
          <p>{article.intro.hook}</p>
          <p>{article.intro.why}</p>
          <p className="text-white font-medium">{article.intro.promise}</p>
        </div>
      </div>

      {/* Steps — 50% инструменты */}
      <div className="max-w-2xl mx-auto px-5 space-y-10 pb-10">
        {article.steps.map((step) => (
          <div key={step.n} className="rounded-2xl bg-white/5 p-6 space-y-4">
            <div className="flex items-center gap-3">
              <span
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                style={{ background: article.accent }}
              >
                {step.n}
              </span>
              <h2 className="text-xl font-bold">{step.title}</h2>
            </div>

            <p className="text-gray-300 text-[16px] leading-relaxed">{step.body}</p>

            {step.prompt && (
              <div className="rounded-xl bg-black/50 border border-white/10 p-4">
                <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider">Промпт для Claude — скопируй и вставь</p>
                <pre className="text-sm text-gray-200 whitespace-pre-wrap font-mono leading-relaxed">
                  {step.prompt}
                </pre>
                <CopyButton text={step.prompt} />
              </div>
            )}

            {step.why && (
              <p className="text-sm text-gray-500 italic">
                <span className="text-gray-400 not-italic font-medium">Зачем: </span>
                {step.why}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="max-w-2xl mx-auto px-5 pb-16">
        <div className="rounded-2xl p-8 text-center space-y-4" style={{ background: article.accent + '18', border: `1px solid ${article.accent}44` }}>
          <h3 className="text-2xl font-extrabold">{article.cta.headline}</h3>
          <p className="text-gray-300 text-[16px]">{article.cta.body}</p>
          <a
            href={article.cta.buttonUrl}
            className="inline-block mt-2 px-8 py-4 rounded-xl font-bold text-white text-lg transition-opacity hover:opacity-90"
            style={{ background: article.accent }}
          >
            {article.cta.buttonText}
          </a>
        </div>
      </div>
    </main>
  )
}

