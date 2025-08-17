'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ProjectsBox } from './ProjectsBox';

interface Article {
    title: string;
    slug: string;
    author?: string;
    date: string;
    excerpt?: string;
}

interface PortfolioHomeProps {
    articles: Article[];
}

export const PortfolioHome = ({ articles }: PortfolioHomeProps) => {
    const [activeProjectTab, setActiveProjectTab] = useState<'personal' | 'design'>('personal');

    return (
        <div className="home-frame">
            <nav className="home-nav">
                <div className="portfolio-nav-left">
                    <Link href="/portfolio/designwork" className="portfolio-nav-link portfolio-nav-link-design-work">
                        <img src="/symbols/design_work.svg" alt="Design Work" className="portfolio-nav-icon" />
                        <div className="portfolio-nav-text-wrapper">
                            <span>design work</span>
                            <div className="portfolio-nav-underline portfolio-nav-underline-design-work"></div>
                        </div>
                    </Link>
                </div>
                <Link href="/portfolio/about" className="portfolio-nav-link portfolio-nav-link-about">
                    <img src="/symbols/who_am_i.svg" alt="Who Am I" className="portfolio-nav-icon" />
                    <div className="portfolio-nav-text-wrapper">
                        <span>who am i</span>
                        <div className="portfolio-nav-underline portfolio-nav-underline-about"></div>
                    </div>
                </Link>
            </nav>

            <div className="home-sections">
                <div className="projects-section">
                    <div className="tab-bar">
                        <button
                            className={`tab-item ${activeProjectTab === 'personal' ? 'active' : ''}`}
                            onClick={() => setActiveProjectTab('personal')}
                        >
                            <img src="/symbols/projects.svg" alt="Projects" className="section-icon" />
                            <span>case studies</span>
                        </button>
                        <button
                            className={`tab-item ${activeProjectTab === 'design' ? 'active' : ''}`}
                            onClick={() => setActiveProjectTab('design')}
                        >
                            <img src="/symbols/design_component.svg" alt="Design Components" className="section-icon" />
                            <span>design components</span>
                        </button>
                    </div>
                    <div className="tab-content-area">
                        {activeProjectTab === 'personal' && (
                            <div className="project-grid">
                                <ProjectsBox
                                    title="Case Study #1"
                                    subtitle="My first case study showcasing a personal project"
                                    links={[
                                        { type: 'link', url: 'https://github.com/yourusername/portfolio-v4' },
                                        { type: 'link', url: 'https://yourportfolio.com' }
                                    ]}
                                />
                                <ProjectsBox
                                    title="Case Study #2"
                                    subtitle="A second case study showcasing a different project"
                                    links={[
                                        { type: 'fake link', url: 'https://yourportfolio.com' }
                                    ]}
                                    accentColor="#D6AF78"
                                />
                            </div>
                        )}
                        {activeProjectTab === 'design' && (
                            <div className="project-grid">
                                <ProjectsBox
                                    title="Padding Specs v2"
                                    subtitle="Dynamically resizable and modifiable padding / typography specs for engineering handoffs"
                                    links={[
                                        { type: 'figma', url: 'https://www.figma.com/community/file/1447562106839523138' },
                                    ]}
                                />
                                <ProjectsBox
                                    title="Post It Notes v2"
                                    subtitle="Dynamically resizable and modifiable post it notes for adding notes to mocks"
                                    links={[
                                        { type: 'figma', url: 'https://www.figma.com/community/file/1444965835777082473' }
                                    ]}
                                    accentColor="#D6AF78"
                                />
                            </div>
                        )}
                    </div>
                </div>

                <div className="articles-section">
                    <div className="tab-bar">
                        <div className="tab-item active">
                            <img src="/symbols/articles.svg" alt="Articles" className="section-icon" />
                            <span>articles</span>
                        </div>
                    </div>
                    <div className="article-list">
                        {articles.map((article) => (
                            <Link key={article.slug} href={`/blog/${article.slug}`} className="article-item">
                                <span className="article-title-group">
                                    <span>{article.title}</span>
                                </span>
                                <span className="article-author">{article.author || 'Anonymous'}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
