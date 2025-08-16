import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArticleMetadata } from '../types';
import './ArticleLayout.css';

interface ArticleLayoutProps {
    metadata: ArticleMetadata;
    children: React.ReactNode;
}

export const ArticleLayout = ({ metadata, children }: ArticleLayoutProps) => {
    const [heroImageUrl, setHeroImageUrl] = useState<string | null>(null);
    const [heroMobileImageUrl, setHeroMobileImageUrl] = useState<string | null>(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Add target="_blank" to all external links in article content
    useEffect(() => {
        const articleContent = document.querySelector('.article-content');
        if (articleContent) {
            const links = articleContent.querySelectorAll('a');
            links.forEach(link => {
                // Check if it's an external link (not starting with # or /)
                const href = link.getAttribute('href');
                if (href && !href.startsWith('#') && !href.startsWith('/')) {
                    link.setAttribute('target', '_blank');
                    link.setAttribute('rel', 'noopener noreferrer');
                }
            });
        }
    }, [children]);

    useEffect(() => {
        if (metadata.heroImage) {
            // Dynamically import the image from the articles folder
            import(/* @vite-ignore */ `../../assets/images/articles/${metadata.heroImage}`)
                .then(module => setHeroImageUrl(module.default))
                .catch(err => console.error('Failed to load hero image:', err));
        }
    }, [metadata.heroImage]);

    useEffect(() => {
        if (metadata.heroMobileImage) {
            // Dynamically import the mobile image from the articles folder
            import(/* @vite-ignore */ `../../assets/images/articles/${metadata.heroMobileImage}`)
                .then(module => setHeroMobileImageUrl(module.default))
                .catch(err => console.error('Failed to load mobile hero image:', err));
        }
    }, [metadata.heroMobileImage]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <>
            <div className="article-layout">
                <header className="article-header">
                    <h1 className="article-title">{metadata.title}</h1>
                </header>
                <div className={`article-meta ${!(heroImageUrl || heroMobileImageUrl) ? 'no-hero' : ''}`}>
                    {metadata.author && (
                        <p className="article-author">written by {metadata.author}</p>
                    )}
                    <time className="article-date">{formatDate(metadata.date)}</time>
                </div>
                {(heroImageUrl || heroMobileImageUrl) && (
                    <div className="article-hero">
                        <img
                            src={isMobile && heroMobileImageUrl ? heroMobileImageUrl : heroImageUrl || ''}
                            alt={metadata.heroImageAlt || metadata.title}
                            className="article-hero-image"
                        />
                    </div>
                )}
                <article className="article-content">
                    {children}
                </article>
                <Link href="/blog" className="article-home-button">
                    Back to Blog
                </Link>
            </div>
        </>
    );
};
