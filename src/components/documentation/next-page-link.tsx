import Link from 'next/link';
import { page_routes } from '@/lib/routes-config';
import { ChevronRight } from 'lucide-react';

export function NextPageLink({ currentPath }: { currentPath: string }) {
  // Ensure the current path has the /docs prefix
  const fullPath = currentPath.startsWith('/docs') ? currentPath : `/docs/${currentPath}`;

  // Find the current page index
  const currentIndex = page_routes.findIndex(route => 
    `/docs${route.href}` === fullPath
  );

  // If not found or last page, don't show anything
  if (currentIndex === -1 || currentIndex === page_routes.length - 1) {
    return null;
  }

  // Get next page
  const nextPage = page_routes[currentIndex + 1];
  const nextPagePath = `/docs${nextPage.href}`;

  return (
    <div className="next-page">
      <Link
        href={nextPagePath}
        className="next-page-link"
      >
        <span className="next-page-text">Next: {nextPage.title}</span>
        <ChevronRight className="next-page-icon" />
      </Link>
    </div>
  );
}