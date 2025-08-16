import { notFound } from "next/navigation";
import { getArticleBySlug, getAllArticles } from "@/lib/articles";
import { ArticleLayout } from "@/components/articles/ArticleLayout";

type PageProps = {
  params: { slug: string };
};

export default async function ArticlePage({ params }: PageProps) {
  const article = await getArticleBySlug(params.slug);
  
  if (!article) {
    notFound();
  }

  return (
    <ArticleLayout metadata={article.metadata}>
      <div className="article-mdx-content">
        {article.content}
      </div>
    </ArticleLayout>
  );
}

// Generate static params for all articles
export async function generateStaticParams() {
  const articles = await getAllArticles();
  
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps) {
  const article = await getArticleBySlug(params.slug);
  
  if (!article) {
    return null;
  }

  return {
    title: article.metadata.title,
    description: article.metadata.excerpt || `Article by ${article.metadata.author}`,
  };
}