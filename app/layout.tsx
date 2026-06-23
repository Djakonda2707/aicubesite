import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin', 'cyrillic'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'AI Cube — Лид-магниты',
  description: 'Гайды и инструменты по AI и автоматизации',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${inter.variable} h-full`}>
      <body className="min-h-full bg-[#0f0f0f] antialiased">{children}</body>
    </html>
  )
}
