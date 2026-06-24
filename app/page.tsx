import { getAllArticles } from '@/lib/articles'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'AI Cube — Гайды',
  description: 'Практические гайды по AI, Claude и автоматизации',
}

export default async function GuidesPage() {
  const articles = await getAllArticles()

  return (
    <main className="min-h-screen bg-[#0f0f0f] text-white">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-5 pt-14 pb-10">
        <p className="text-xs font-bold uppercase tracking-widest text-purple-400 mb-4">AI Cube</p>
        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-4">
          Гайды
        </h1>
        <p className="text-gray-400 text-lg max-w-xl">
          Пошаговые руководства по AI и автоматизации. Каждый гайд — конкретные шаги с готовыми промптами.
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-4xl mx-auto px-5 pb-20">
        {articles.length === 0 ? (
          <p className="text-gray-600 text-sm">Гайды загружаются...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {articles.map((article) => (
              <a
                key={article.slug}
                href={`/${encodeURIComponent(article.slug)}`}
                className="group block rounded-2xl bg-white/5 border border-white/5 p-6 hover:bg-white/8 hover:border-white/10 transition-all duration-200"
              >
                {/* Topic badge */}
                <span
                  className="inline-block text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-4"
                  style={{ background: article.accent + '22', color: article.accent }}
                >
                  {article.topic}
                </span>

                {/* Title */}
                <h2 className="text-lg font-bold leading-snug mb-3 group-hover:text-white/90 transition-colors">
                  {article.title}
                </h2>

                {/* Excerpt */}
                <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-5">
                  {article.intro.hook}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">{article.steps.length} шагов</span>
                  <span
                    className="text-sm font-semibold group-hover:translate-x-1 transition-transform inline-block"
                    style={{ color: article.accent }}
                  >
                    Читать →
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
