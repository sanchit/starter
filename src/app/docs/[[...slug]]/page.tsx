import SideContent from "@/components/documentation/side-content";
import { page_routes } from "@/lib/routes-config";
import { notFound } from "next/navigation";
import { getDocsForSlug } from "@/lib/markdown";
import { Typography } from "@/components/documentation/typography";
import { NextPageLink } from "@/components/documentation/next-page-link";

type PageProps = {
  params: { slug: string[] };
};

export default async function DocsPage({ params: { slug = [] } }: PageProps) {
  const pathName = slug.join("/");
  const res = await getDocsForSlug(pathName);

  if (!res) notFound();
  return (
    <div className="content-container">
      <div className="content-panel">
        <Typography>
          <h1 className="content-title">{res.frontmatter.title}</h1>
          <p className="content-description">
            {res.frontmatter.description}
          </p>
          <div>{res.content}</div>
        </Typography>
        <NextPageLink currentPath={pathName} />
      </div>
      <SideContent path={pathName} />
    </div>
  );
}

export async function generateMetadata({ params: { slug = [] } }: PageProps) {
  const pathName = slug.join("/");
  const res = await getDocsForSlug(pathName);
  if (!res) return null;
  const { frontmatter } = res;
  return {
    title: frontmatter.title,
    description: frontmatter.description,
  };
}

export function generateStaticParams() {
  return page_routes.map((item) => ({
    slug: item.href.split("/").slice(1),
  }));
}
