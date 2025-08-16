import { useParams, Navigate } from 'react-router';
import { MDXProvider } from '@mdx-js/react';
import { ArticleLayout } from '../components/ArticleLayout/ArticleLayout';
import { getArticleBySlug } from '../utils/articles';

export const Article = () => {
    const { slug } = useParams<{ slug: string }>();
    
    if (!slug) {
        return <Navigate to="/" replace />;
    }
    
    const article = getArticleBySlug(slug);
    
    if (!article) {
        return <Navigate to="/" replace />;
    }
    
    const { default: Content, metadata } = article;
    
    return (
        <MDXProvider>
            <ArticleLayout metadata={metadata}>
                <Content />
            </ArticleLayout>
        </MDXProvider>
    );
};