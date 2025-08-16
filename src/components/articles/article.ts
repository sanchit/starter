export interface ArticleMetadata {
    title: string;
    date: string;
    slug: string;
    author?: string;
    heroImage?: string;
    heroMobileImage?: string;
    heroImageAlt?: string;
}

export interface Article {
    metadata: ArticleMetadata;
    content: React.ComponentType;
}