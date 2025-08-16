import { Link } from 'react-router';
import { useState } from 'react';
import designWorkIcon from '../../assets/symbols/design_work.svg';
import designPhilosophyIcon from '../../assets/symbols/design_philosophy.svg';
import whoAmIIcon from '../../assets/symbols/who_am_i.svg';
import projectsIcon from '../../assets/symbols/projects.svg';
import articlesIcon from '../../assets/symbols/articles.svg';
import linkIcon from '../../assets/symbols/link.svg';
import designComponentIcon from '../../assets/symbols/design_component.svg';
import { SymbolGridHome } from '../SymbolGridHome/SymbolGridHome';
import { getAllArticles } from '../../utils/articles';
import { ProjectsBox } from './ProjectsBox';
import './HomeNav.css';

export const HomeNav = () => {
    const [activeProjectTab, setActiveProjectTab] = useState<'personal' | 'design'>('personal');
    const articles = getAllArticles().filter(article => article.slug !== 'example');

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const months = ['january', 'february', 'march', 'april', 'may', 'june',
                       'july', 'august', 'september', 'october', 'november', 'december'];
        return `${months[date.getMonth()]} ${date.getDate().toString().padStart(2, '0')}, ${date.getFullYear()}`;
    };

    return (
        <div className="home-frame">
            <div className="cluster">
                <SymbolGridHome />
            </div>
            <nav className="home-nav">
                <div className="nav-left">
                    <Link to="/designwork" className="nav-link nav-link-design-work">
                        <img src={designWorkIcon} alt="" className="nav-icon" />
                        <div className="nav-text-wrapper">
                            <span>design work</span>
                            <div className="nav-underline nav-underline-design-work"></div>
                        </div>
                    </Link>
                    <Link to="/designphilosophy" className="nav-link nav-link-philosophy">
                        <img src={designPhilosophyIcon} alt="" className="nav-icon" />
                        <div className="nav-text-wrapper">
                            <span>design philosophy</span>
                            <div className="nav-underline nav-underline-philosophy"></div>
                        </div>
                    </Link>
                </div>
                <Link to="/about" className="nav-link nav-link-about">
                    <img src={whoAmIIcon} alt="" className="nav-icon" />
                    <div className="nav-text-wrapper">
                        <span>who am i</span>
                        <div className="nav-underline nav-underline-about"></div>
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
                            <img src={projectsIcon} alt="" className="section-icon" />
                            <span>projects</span>
                        </button>
                        <button
                            className={`tab-item ${activeProjectTab === 'design' ? 'active' : ''}`}
                            onClick={() => setActiveProjectTab('design')}
                        >
                            <img src={designComponentIcon} alt="" className="section-icon" />
                            <span>design components</span>
                        </button>
                    </div>
                    <div className="tab-content-area">
                        {activeProjectTab === 'personal' && (
                            <div className="project-grid">
                                <ProjectsBox
                                    title="Danger Docs"
                                    subtitle="A personal documentation site for all my coding projects. Updatable from the front end with mdx files"
                                    links={[
                                        { type: 'github', url: 'https://github.com/yourusername/portfolio-v4' },
                                        { type: 'website', url: 'https://yourportfolio.com' }
                                    ]}
                                />
                                <ProjectsBox
                                    title="KarroKan"
                                    subtitle="A simple Kanban with time tracking per task"
                                    links={[
                                        { type: 'website', url: 'https://yourportfolio.com' }
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
                                    subtitle="Dynmaically resizable and modifiable post it notes for adding notes to mocks"
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
                            <img src={articlesIcon} alt="" className="section-icon" />
                            <span>articles</span>
                        </div>
                    </div>
                    <div className="article-list">
                        {articles.map((article) => (
                            <Link
                                key={article.slug}
                                to={`/article/${article.slug}`}
                                className="article-item"
                            >
                                <div className="article-title-group">
                                    <img src={linkIcon} alt="" className="link-icon" />
                                    <span>{article.title}</span>
                                </div>
                                <span className="article-date">{formatDate(article.date)}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
