import Link from "next/link";
import { getArticleMetadata } from "@/lib/articles";

export default async function BlogPage() {
  // Get all articles from MDX files
  const articles = await getArticleMetadata();

  return (
    <div className="blog-container">
      <div className="blog-header">
        <h1 className="blog-title">The blog</h1>
      </div>
      
      <div className="blog-masonry">
        {articles.map((article, index) => {
          // Determine card size based on position
          // Pattern: 1 full, 2 half, 1 full, 2 half, etc.
          const groupPattern = [1, 2, 1, 2]; // 1 = full width, 2 = half width
          let currentIndex = 0;
          let groupIndex = 0;
          let cardClass = "blog-card";
          
          for (let i = 0; i <= index; i++) {
            if (i === index) {
              cardClass = groupPattern[groupIndex % groupPattern.length] === 1 
                ? "blog-card blog-card-full" 
                : "blog-card blog-card-half";
            }
            currentIndex++;
            if (currentIndex >= groupPattern[groupIndex % groupPattern.length]) {
              currentIndex = 0;
              groupIndex++;
            }
          }

          return (
            <article key={article.slug} className={cardClass}>
              <Link href={`/blog/${article.slug}`} className="blog-card-link">
                <div className="blog-card-image">
                  <div className="blog-image-placeholder" />
                </div>
                <div className="blog-card-content">
                  <h2 className="blog-card-title">{article.title}</h2>
                  {article.author && (
                    <p className="blog-card-author">by {article.author}</p>
                  )}
                  {article.excerpt && (
                    <p className="blog-card-excerpt">{article.excerpt}</p>
                  )}
                </div>
              </Link>
            </article>
          );
        })}
      </div>
    </div>
  );
}