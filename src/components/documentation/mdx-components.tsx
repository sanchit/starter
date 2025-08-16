'use client'

import { CopyButton } from './copy-button'
import { useRef, useEffect, useState } from 'react'

interface PreProps {
  children: React.ReactNode
}

export function Pre({ children, ...props }: PreProps) {
  const preRef = useRef<HTMLPreElement>(null)
  const [codeString, setCodeString] = useState('')

  useEffect(() => {
    if (preRef.current) {
      const code = preRef.current.querySelector('code')
      const text = code?.textContent || ''
      setCodeString(text)
    }
  }, [])

  return (
    <div className="mdx-code-block">
      <div className="mdx-code-copy">
        <CopyButton text={codeString} />
      </div>
      <pre ref={preRef} {...props}>
        {children}
      </pre>
    </div>
  )
}

export const mdxComponents = {
  pre: Pre,
}