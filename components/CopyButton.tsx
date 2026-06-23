'use client'

import { useState } from 'react'

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="mt-3 text-xs px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
    >
      {copied ? '✓ Скопировано' : 'Скопировать промпт'}
    </button>
  )
}
