'use client'

import { useEffect, useRef, useState } from 'react'

interface CodeBlockProps {
  children: React.ReactNode
  className?: string
}

export function CodeBlock({ children, className, ...props }: CodeBlockProps) {
  const preRef = useRef<HTMLPreElement>(null)
  const [codeString, setCodeString] = useState<string>('')
  const [isCopied, setIsCopied] = useState(false)
  const [language, setLanguage] = useState<string>('code')

  useEffect(() => {
    // Set a small delay to ensure the DOM is fully rendered
    const timer = setTimeout(() => {
      if (preRef.current) {
        const codeElement = preRef.current.querySelector('code')
        const rawContent = codeElement?.textContent || preRef.current.textContent || ''
        setCodeString(rawContent)
        
        // Extract language from className if available
        if (className) {
          const langMatch = className.match(/language-(\w+)/)
          if (langMatch && langMatch[1]) {
            setLanguage(getLanguageDisplayName(langMatch[1]))
          }
        } else if (codeElement?.className) {
          const langMatch = codeElement.className.match(/language-(\w+)/)
          if (langMatch && langMatch[1]) {
            setLanguage(getLanguageDisplayName(langMatch[1]))
          }
        }
      }
    }, 100)
    
    return () => clearTimeout(timer)
  }, [className])

  const handleCopy = async () => {
    if (codeString) {
      try {
        await navigator.clipboard.writeText(codeString)
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), 2000) // Reset after 2 seconds
      } catch (err) {
        console.error('Failed to copy:', err)
      }
    }
  }

  // Convert language code to display name
  function getLanguageDisplayName(lang: string): string {
    const languageMap: Record<string, string> = {
      js: "JavaScript",
      jsx: "React JSX",
      ts: "TypeScript",
      tsx: "React TSX",
      html: "HTML",
      css: "CSS",
      json: "JSON",
      bash: "Bash",
      sh: "Shell",
      python: "Python",
      py: "Python",
      java: "Java",
      c: "C",
      cpp: "C++",
      csharp: "C#",
      go: "Go",
      rust: "Rust",
      php: "PHP",
      ruby: "Ruby",
      swift: "Swift",
      kotlin: "Kotlin",
      lua: "Lua",
      sql: "SQL"
    };
    
    return languageMap[lang] || lang.charAt(0).toUpperCase() + lang.slice(1);
  }

  return (
    <div className="code-container">
      <div className="relative">
        <button
          onClick={handleCopy}
          className={`code-copy-button ${isCopied ? 'copied' : ''}`}
          aria-label="Copy code to clipboard"
          title={isCopied ? "Copied!" : "Copy code"}
          type="button"
        >
          {isCopied ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          )}
        </button>
        <pre ref={preRef} className={className} {...props}>{children}</pre>
      </div>
      <div className="code-header">
        <div className="code-language">
          {language}
        </div>
      </div>
    </div>
  )
}
