import fs from 'fs';
import path from 'path';
import { EachRoute } from './routes-config';

interface FileSystemRoute {
  title: string;
  href: string;
  hasRightPanel?: boolean;
  items?: FileSystemRoute[];
}

// Convert slug to title (e.g., "getting-started" -> "Getting Started")
function slugToTitle(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Check if a directory has an index.mdx file
function hasIndexMdx(dirPath: string): boolean {
  return fs.existsSync(path.join(dirPath, 'index.mdx'));
}

// Check if a directory has a right-panel.mdx file
function hasRightPanel(dirPath: string): boolean {
  return fs.existsSync(path.join(dirPath, 'right-panel.mdx'));
}

// Get frontmatter title from MDX file
function getTitleFromMdx(filePath: string): string | null {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const match = content.match(/^---\s*\n([\s\S]*?)\n---/);
    if (match) {
      const frontmatter = match[1];
      const titleMatch = frontmatter.match(/title:\s*["']?([^"'\n]+)["']?/);
      return titleMatch ? titleMatch[1].trim() : null;
    }
  } catch (error) {
    console.error(`Error reading MDX file ${filePath}:`, error);
  }
  return null;
}

// Recursively discover routes from file system
function discoverRoutesRecursive(
  dirPath: string,
  baseHref: string = ''
): FileSystemRoute[] {
  const routes: FileSystemRoute[] = [];
  
  try {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    
    for (const entry of entries) {
      if (entry.isDirectory()) {
        const fullPath = path.join(dirPath, entry.name);
        const href = `${baseHref}/${entry.name}`;
        
        // Check if this directory has an index.mdx
        if (hasIndexMdx(fullPath)) {
          // Try to get title from MDX frontmatter
          const mdxPath = path.join(fullPath, 'index.mdx');
          const title = getTitleFromMdx(mdxPath) || slugToTitle(entry.name);
          
          const route: FileSystemRoute = {
            title,
            href,
            hasRightPanel: hasRightPanel(fullPath),
          };
          
          // Check for subdirectories with index.mdx
          const subRoutes = discoverRoutesRecursive(fullPath, href);
          if (subRoutes.length > 0) {
            route.items = subRoutes;
          }
          
          routes.push(route);
        }
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dirPath}:`, error);
  }
  
  return routes;
}

// Main function to discover all routes
export function discoverRoutes(): EachRoute[] {
  const contentsPath = path.join(process.cwd(), 'contents');
  const routes = discoverRoutesRecursive(contentsPath);
  
  // Sort routes alphabetically, but keep special ones at the top
  return routes.sort((a, b) => {
    // Keep Introduction first
    if (a.title === 'Introduction') return -1;
    if (b.title === 'Introduction') return 1;
    
    // Then Installation
    if (a.title === 'Installation') return -1;
    if (b.title === 'Installation') return 1;
    
    // Everything else alphabetically
    return a.title.localeCompare(b.title);
  });
}

// Function to merge static and dynamic routes
export function getMergedRoutes(staticRoutes: EachRoute[]): EachRoute[] {
  const dynamicRoutes = discoverRoutes();
  
  // Create a map of static routes by href for easy lookup
  const staticMap = new Map<string, EachRoute>();
  staticRoutes.forEach(route => staticMap.set(route.href, route));
  
  // Merge dynamic routes with static ones, preserving static configuration
  return dynamicRoutes.map(route => {
    const staticRoute = staticMap.get(route.href);
    if (staticRoute) {
      // Preserve static configuration but update items from file system
      return {
        ...staticRoute,
        items: route.items,
      };
    }
    return route;
  });
}