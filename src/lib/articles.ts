import fs from 'fs';
import path from 'path';
import { compileMDX } from 'next-mdx-remote/rsc';
import { ArticleMetadata, Article } from '@/components/articles/types';

const articlesDirectory = path.join(process.cwd(), 'src/articles');

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const fullPath = path.join(articlesDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    
    const { content, frontmatter } = await compileMDX<ArticleMetadata>({
      source: fileContents,
      options: {
        parseFrontmatter: true,
      },
    });
    
    return {
      metadata: {
        ...frontmatter,
        slug,
      },
      content,
      slug,
    };
  } catch (error) {
    console.error(`Error loading article ${slug}:`, error);
    return null;
  }
}

export async function getAllArticles(): Promise<Article[]> {
  const fileNames = fs.readdirSync(articlesDirectory);
  
  const articles = await Promise.all(
    fileNames
      .filter(fileName => fileName.endsWith('.mdx'))
      .map(async fileName => {
        const slug = fileName.replace(/\.mdx$/, '');
        const article = await getArticleBySlug(slug);
        return article;
      })
  );
  
  // Filter out any null articles and sort by date (newest first)
  return articles
    .filter((article): article is Article => article !== null)
    .sort((a, b) => {
      const dateA = new Date(a.metadata.date).getTime();
      const dateB = new Date(b.metadata.date).getTime();
      return dateB - dateA;
    });
}

export async function getArticleMetadata(): Promise<ArticleMetadata[]> {
  const articles = await getAllArticles();
  return articles.map(article => article.metadata);
}