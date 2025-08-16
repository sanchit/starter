import { promises as fs } from "fs";
import path from "path";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
// We'll use the existing rehype plugins that are already in the project
import rehypePrism from "rehype-prism-plus";

interface CodeBlock {
  title?: string;
  code: string;
  language: string;
}

export async function extractCodeBlocks(slug: string): Promise<CodeBlock[]> {
  try {
    // Always use the main content file since we want to match the center panel
    const contentPath = getDocsContentPath(slug);
    const rawMdx = await fs.readFile(contentPath, "utf-8");
    
    // Extract code blocks with regex - improved to capture section headers
    const sectionRegex = /## ([^\n]+)\n\n(?:(?!##)[^\n]*\n)*?```(\w+)(?:[^\n]*)\n([\s\S]*?)```/g;
    const codeBlocks: CodeBlock[] = [];
    let sectionMatch;
    
    while ((sectionMatch = sectionRegex.exec(rawMdx)) !== null) {
      const sectionTitle = sectionMatch[1].trim();
      const language = sectionMatch[2];
      const codeContent = sectionMatch[3].trim();
      
      // Process the code with highlighting
      const processedCode = await processCodeWithHighlighting(codeContent, language);
      
      codeBlocks.push({
        title: sectionTitle, // Use section title instead of language
        code: processedCode,
        language
      });
    }
    
    // If no section-based code blocks found, fall back to regular code blocks
    if (codeBlocks.length === 0) {
      const codeBlockRegex = /```(\w+)(?:[^\n]*)\n([\s\S]*?)```/g;
      let match;
      
      while ((match = codeBlockRegex.exec(rawMdx)) !== null) {
        const language = match[1];
        const codeContent = match[2].trim();
        
        const processedCode = await processCodeWithHighlighting(codeContent, language);
        
        codeBlocks.push({
          title: getLanguageTitle(language),
          code: processedCode,
          language
        });
      }
    }
    
    return codeBlocks;
  } catch (err) {
    console.error("Error extracting code blocks:", err);
    return [];
  }
}

async function processCodeWithHighlighting(code: string, language: string): Promise<string> {
  const languageDisplay = getLanguageDisplayName(language);
  
  // Add a header with language name and copy button
  return `
    <div class="relative group rounded-md overflow-hidden border border-neutral-900">
      <div class="flex items-center justify-between px-4 py-2 bg-[#0d0d0d] border-b border-neutral-900">
        <div class="text-xs font-medium text-neutral-400">
          ${languageDisplay}
        </div>
        <button
          onclick="navigator.clipboard.writeText(\`${escapeHtml(code).replace(/`/g, '\\`')}\`); this.classList.add('text-green-400'); this.title='Copied!'; this.querySelector('svg').outerHTML='<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'16\\' height=\\'16\\' viewBox=\\'0 0 24 24\\' fill=\\'none\\' stroke=\\'currentColor\\' stroke-width=\\'2\\' stroke-linecap=\\'round\\' stroke-linejoin=\\'round\\'><polyline points=\\'20 6 9 17 4 12\\'></polyline></svg>'; setTimeout(() => { this.classList.remove('text-green-400'); this.title='Copy code'; this.querySelector('svg').outerHTML='<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'16\\' height=\\'16\\' viewBox=\\'0 0 24 24\\' fill=\\'none\\' stroke=\\'currentColor\\' stroke-width=\\'2\\' stroke-linecap=\\'round\\' stroke-linejoin=\\'round\\'><rect x=\\'9\\' y=\\'9\\' width=\\'13\\' height=\\'13\\' rx=\\'2\\' ry=\\'2\\'></rect><path d=\\'M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1\\'></path></svg>'; }, 2000)"
          class="flex h-8 w-8 items-center justify-center rounded-md bg-transparent text-neutral-400 transition-all hover:bg-neutral-800/50 hover:text-neutral-100"
          title="Copy code"
        >
          <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><rect x='9' y='9' width='13' height='13' rx='2' ry='2'></rect><path d='M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1'></path></svg>
        </button>
      </div>
      <pre class="language-${language} line-numbers m-0"><code class="language-${language}">${escapeHtml(code)}</code></pre>
    </div>
  `;
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

function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getLanguageTitle(lang: string): string {
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

// No longer needed as we're now always using the main content file

function getDocsContentPath(slug: string) {
  return path.join(process.cwd(), "/contents/docs-main-panel/", `${slug}/index.mdx`);
}
