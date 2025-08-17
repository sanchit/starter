import { PortfolioHome } from '@/components/portfolio/PortfolioHome';
import { getArticleMetadata } from '@/lib/articles';

export default async function PortfolioPage() {
  const articles = await getArticleMetadata();
  return <PortfolioHome articles={articles} />;
}