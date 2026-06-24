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
    openGraph: {
      title: article.title,
      description: article.intro.promise,
      type: 'article',
    },
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) notFound()

  const accent = article.accent

  return (
    <main className="min-h-screen bg-[#0f0f0f] text-white">
      {/* Header */}
      <div className="max-w-2xl mx-auto px-5 pt-12 pb-4">
        <span
          className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-6"
          style={{ background: accent + '22', color: accent }}
        >
          {article.topic}
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-8">
          {article.title}
        </h1>

        {/* Intro */}
        <div className="space-y-5 text-gray-300 text-[17px] leading-[1.8] border-l-2 pl-5 mb-2" style={{ borderColor: accent }}>
          <p>{article.intro.hook}</p>
          <p>{article.intro.why}</p>
          <p className="text-white font-semibold">{article.intro.promise}</p>
        </div>
      </div>

      {/* SVG after intro */}
      {article.svgBlocks?.intro && (
        <div
          className="max-w-2xl mx-auto px-5 my-8"
          dangerouslySetInnerHTML={{ __html: article.svgBlocks.intro }}
        />
      )}

      {/* Steps */}
      <div className="max-w-2xl mx-auto px-5 pb-10">
        {article.steps.map((step, i) => (
          <div key={step.n}>
            <div className="rounded-2xl bg-white/5 border border-white/5 p-6 space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <span
                  className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                  style={{ background: accent }}
                >
                  {step.n}
                </span>
                <h2 className="text-xl font-bold leading-tight">{step.title}</h2>
              </div>

              <p className="text-gray-300 text-[16px] leading-[1.8]">{step.body}</p>

              {step.prompt && (
                <div className="rounded-xl bg-black/60 border border-white/10 p-4 mt-2">
                  <p className="text-xs text-gray-500 mb-3 uppercase tracking-wider font-medium">
                    Промпт — скопируй и вставь в Claude
                  </p>
                  <pre className="text-sm text-gray-200 whitespace-pre-wrap font-mono leading-relaxed">
                    {step.prompt}
                  </pre>
                  <CopyButton text={step.prompt} />
                </div>
              )}

              {step.why && (
                <p className="text-sm text-gray-500 italic border-t border-white/5 pt-3">
                  <span className="text-gray-400 not-italic font-semibold">Зачем: </span>
                  {step.why}
                </p>
              )}
            </div>

            {/* SVG block between steps */}
            {article.svgBlocks?.steps?.[i] && (
              <div
                className="my-6"
                dangerouslySetInnerHTML={{ __html: article.svgBlocks.steps[i] }}
              />
            )}
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="max-w-2xl mx-auto px-5 pb-20">
        <div
          className="rounded-2xl p-8 sm:p-10 text-center space-y-5"
          style={{ background: accent + '15', border: `1px solid ${accent}33` }}
        >
          <h3 className="text-2xl sm:text-3xl font-extrabold">{article.cta.headline}</h3>
          <p className="text-gray-300 text-[16px] leading-relaxed max-w-md mx-auto">{article.cta.body}</p>
          <a
            href={article.cta.buttonUrl}
            className="inline-block mt-2 px-8 py-4 rounded-xl font-bold text-white text-lg transition-all hover:scale-105 hover:opacity-90"
            style={{ background: accent }}
          >
            {article.cta.buttonText}
          </a>
          <p className="text-xs text-gray-600 pt-2">{article.cta.subtext || ''}</p>
        </div>
      </div>
    </main>
  )
}
