import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  const projects = [
    {
      title: "Documentation",
      description: "Clean, minimal docs site with MDX support",
      href: "/docs/introduction",
      status: "ready",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Blog",
      description: "Modern blog with clean article cards",
      href: "/blog",
      status: "ready",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "Portfolio",
      description: "Showcase your work beautifully",
      href: "/portfolio",
      status: "ready",
      gradient: "from-orange-500 to-red-500",
    },
  ];

  return (
    <div className="home-container">
      <div className="home-hero">
        <h1 className="home-title">Starter Templates</h1>
        <p className="home-subtitle">
          Starter demos for your next project, built with Next.js
        </p>
      </div>

      <div className="projects-grid">
        {projects.map((project) =>
          project.status === "ready" ? (
            <Link key={project.title} href={project.href} className="project-card-link">
              <div className="project-card">
                <div className={`project-gradient bg-gradient-to-br ${project.gradient}`} />
                <div className="project-content">
                  <h2 className="project-title">{project.title}</h2>
                  <p className="project-description">{project.description}</p>
                  <div className="project-footer">
                    <span className="project-status">View Demo →</span>
                  </div>
                </div>
              </div>
            </Link>
          ) : (
            <div key={project.title} className="project-card project-card-disabled">
              <div className={`project-gradient bg-gradient-to-br ${project.gradient}`} />
              <div className="project-content">
                <h2 className="project-title">{project.title}</h2>
                <p className="project-description">{project.description}</p>
                <div className="project-footer">
                  <span className="coming-soon-badge">Coming Soon</span>
                </div>
              </div>
            </div>
          )
        )}
      </div>

      <div className="home-footer">
        <p className="footer-text">
          None of these projects are production-ready, but they are a great starting point for your next Next.js project.
        </p>
      </div>
    </div>
  );
}
