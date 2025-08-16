"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArticleMetadata } from './types';

interface ArticleLayoutProps {
    metadata: ArticleMetadata;
    children: React.ReactNode;
}

export const ArticleLayout = ({ metadata, children }: ArticleLayoutProps) => {
    const pathname = usePathname();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Add target="_blank" to all external links in article content
    useEffect(() => {
        const articleContent = document.querySelector('.article-mdx-content');
        if (articleContent) {
            const links = articleContent.querySelectorAll('a');
            links.forEach(link => {
                const href = link.getAttribute('href');
                if (href && !href.startsWith('#') && !href.startsWith('/')) {
                    link.setAttribute('target', '_blank');
                    link.setAttribute('rel', 'noopener noreferrer');
                }
            });
        }
    }, [children]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="article-layout">
            <header className="article-header">
                <div className="article-header-content">
                    <Link href="/blog" className="article-back-link">
                        ← Back to Blog
                    </Link>
                    <h1 className="article-title">{metadata.title}</h1>
                    <div className="article-meta">
                        {metadata.author && (
                            <span className="article-author">by {metadata.author}</span>
                        )}
                        <span className="article-divider">•</span>
                        <time className="article-date">{formatDate(metadata.date)}</time>
                    </div>
                </div>
            </header>
            
            {metadata.heroImage && (
                <div className="article-hero">
                    <div className="article-hero-image-placeholder" />
                </div>
            )}
            
            <article className="article-content">
                {children}
            </article>
            
            <footer className="article-footer">
                <Link href="/blog" className="article-footer-link">
                    ← Back to all articles
                </Link>
            </footer>
        </div>
    );
};