"use client";

import { HomeIcon, HexagonIcon, BookOpenIcon, FolderIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navbar({ mobileMenu }: { mobileMenu?: React.ReactNode }) {
  const pathname = usePathname();
  
  // Determine which section we're in
  const isDocumentation = pathname.startsWith('/docs');
  const isBlog = pathname.startsWith('/blog');
  const isPortfolio = pathname.startsWith('/portfolio');
  
  // Get the appropriate title and icon based on the section
  const getSectionInfo = () => {
    if (isDocumentation) {
      return { title: "Documentation", icon: HexagonIcon, href: "/docs/introduction" };
    }
    if (isBlog) {
      return { title: "Blog", icon: BookOpenIcon, href: "/blog" };
    }
    if (isPortfolio) {
      return { title: "Portfolio", icon: FolderIcon, href: "/portfolio" };
    }
    return null;
  };
  
  const sectionInfo = getSectionInfo();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          {/* Home button always on the far left */}
          <Link href="/" className="home-button">
            <HomeIcon className="home-icon" />
            <span>Home</span>
          </Link>
          
          {/* Section title - only shows when in a specific section */}
          {sectionInfo && (
            <>
              <div className="navbar-divider" />
              <Link href={sectionInfo.href} className="section-title">
                <sectionInfo.icon className="section-icon" />
                <h2 className="section-text">{sectionInfo.title}</h2>
              </Link>
            </>
          )}
        </div>
        
        <div className="navbar-right">
          {/* Mobile menu passed from layout */}
          {mobileMenu}
        </div>
      </div>
    </nav>
  );
}