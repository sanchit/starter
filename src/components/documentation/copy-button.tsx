'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'

interface CopyButtonProps {
  text: string
}

export function CopyButton({ text }: CopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false)

  const copy = async () => {
    if (!text) return
    
    try {
      await navigator.clipboard.writeText(text)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return (
    <button
      onClick={copy}
      className="btn btn-copy"
      title="Copy code"
      type="button"
    >
      {isCopied ? (
        <Check className="icon" />
      ) : (
        <Copy className="icon" />
      )}
      <span className="sr-only">Copy code</span>
    </button>
  )
}