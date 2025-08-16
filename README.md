## Project Overview

This is **"Danger Docs"** - a personal documentation website built with:

### Tech Stack
- **Next.js 14** with App Router
- **MDX** for documentation content with enhanced markdown support
- **TypeScript** for type safety
- **Radix UI** components for UI elements
- **Rehype/Remark** plugins for markdown processing

### Key Features
- Dark-themed documentation site
- Dynamic routing for nested documentation structure
- Split panel layout (main content + right panel for additional context)
- Enhanced code blocks with syntax highlighting, copy buttons, and line numbers
- Static site generation for performance
- Auto-discovery of routes from file system

### Structure
- **`/contents/`** - MDX documentation files organized hierarchically
- **`/app/docs/`** - Dynamic catch-all route handling documentation pages
- **`/components/`** - React components including MDX components and UI elements
- **`/styles/`** - Organized CSS with base styles, components, layout, and page-specific styles
- **`/lib/`** - Utilities for markdown processing, route discovery, and configuration

The site redirects root (`/`) to `/docs/introduction` and automatically discovers documentation structure from the file system. It's designed as a personal knowledge base for documenting repetitive commands and project notes.