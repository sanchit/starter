# Danger Docs - Personal Documentation for my projects 

A sleek, dark-themed documentation website

## Features

```plaintext
Features
├── MDX supported documentation
├── Nested document structure 
├── Right panel for additional context
├── Enhanced code blocks
│   ├── Language title headers
│   ├── Line numbers
│   ├── Copy button with visual feedback
│   └── Improved styling
├── Static site generation
├── Custom components
```

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

The project follows a Next.js App Router structure:

```plaintext
danger_docs/
├── app/ - Next.js app directory
│   └── docs/[[...slug]]/ - Dynamic route handling for documentation
├── components/ - React components
│   └── ui/ - Reusable UI components
├── lib/
│   └── routes-config.ts - set left side nav sections 
├── contents/ - MDX documentation content
│   ├── docs/ - Main documentation
│   └── docs-right-panel/ - Content for right panel
├── lib/ - Utility functions
├── public/ - Static assets
└── styles/ - CSS files
    ├── base/ - Core styles and variables
    ├── components/ - Component-specific styles
    ├── layout/ - Layout styles
    └── pages/ - Page-specific styles
```

## Content Management

Documentation is written in MDX and stored in the `contents/docs/` directory, organized in a hierarchical folder structure. Each page is defined by an `index.mdx` file with frontmatter.

The right panel content is stored separately in `contents/docs-right-panel/` and follows the same structure as the main documentation.

To add a new section you need to add code in `lib/routes-config.ts` and then content added to `contents/` will show up

## Customization
- **Colors & Styling**: Update the CSS variables in `styles/base/variables.css`
- **Navigation**: Modify the navigation structure in `lib/routes-config.ts`
- **Layout**: Adjust layouts in the corresponding CSS files in the `styles` directory
- **Components**: Each component has its own CSS in the appropriate styles subdirectory

## Future Enhancements
Potential areas for further improvement:
- Mobile responsiveness refinements
- Search functionality
- Adding mdx files from the front end for quick adding for documentation 
- Table of contents for longer pages

## Credits
This project is a customized version of the AriaDocsLite template, modified and updated by jyn fairchild
