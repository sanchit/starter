import Link from 'next/link';

export default function PortfolioPage() {
  return (
    <div className="portfolio-container">
      <div className="portfolio-hero">
        <h1 className="portfolio-title">Portfolio</h1>
        <p className="portfolio-subtitle">
          A collection of design work and projects
        </p>
      </div>

      <div className="portfolio-sections">
        <section className="portfolio-section">
          <h2 className="section-title">Design Work</h2>
          <div className="portfolio-grid">
            <Link href="/portfolio/designwork" className="portfolio-card">
              <div className="card-icon">🎨</div>
              <h3 className="card-title">Work Timeline</h3>
              <p className="card-description">
                See my design work from Google, YouTube, and more
              </p>
            </Link>
          </div>
        </section>

        <section className="portfolio-section">
          <h2 className="section-title">Projects</h2>
          <div className="portfolio-grid">
            <div className="portfolio-card">
              <div className="card-icon">📚</div>
              <h3 className="card-title">Danger Docs</h3>
              <p className="card-description">
                A personal documentation site for all my coding projects
              </p>
              <div className="card-links">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="card-link">
                  GitHub →
                </a>
              </div>
            </div>
            
            <div className="portfolio-card">
              <div className="card-icon">📋</div>
              <h3 className="card-title">KarroKan</h3>
              <p className="card-description">
                A simple Kanban board with time tracking per task
              </p>
              <div className="card-links">
                <a href="#" className="card-link">
                  Demo →
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="portfolio-section">
          <h2 className="section-title">Design Components</h2>
          <div className="portfolio-grid">
            <div className="portfolio-card">
              <div className="card-icon">📐</div>
              <h3 className="card-title">Padding Specs v2</h3>
              <p className="card-description">
                Dynamically resizable padding/typography specs for engineering handoffs
              </p>
              <div className="card-links">
                <a href="https://www.figma.com/community/file/1447562106839523138" target="_blank" rel="noopener noreferrer" className="card-link">
                  Figma →
                </a>
              </div>
            </div>
            
            <div className="portfolio-card">
              <div className="card-icon">📝</div>
              <h3 className="card-title">Post It Notes v2</h3>
              <p className="card-description">
                Dynamically resizable post-it notes for adding notes to mocks
              </p>
              <div className="card-links">
                <a href="https://www.figma.com/community/file/1444965835777082473" target="_blank" rel="noopener noreferrer" className="card-link">
                  Figma →
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}