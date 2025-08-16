import { HexagonIcon, HomeIcon } from "lucide-react";
import Link from "next/link";
import Anchor from "./anchor";
import { SheetLeftbar } from "./leftbar";
import { page_routes } from "@/lib/routes-config";

export const NAVLINKS: { title: string; href: string }[] = [];

export function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Logo />
          <SheetLeftbar />
        </div>
        <div className="navbar-content">
          <div className="navbar-links">
            <Link href="/" className="home-button">
              <HomeIcon className="home-icon" />
              <span>Home</span>
            </Link>
            {NAVLINKS.map((item) => {
              return (
                <Anchor
                  key={item.title + item.href}
                  activeClassName="text-primary font-semibold"
                  absolute
                  className="flex items-center gap-1"
                  href={item.href}
                >
                  {item.title}
                </Anchor>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}

function Logo() {
  return (
    <Link href="/docs/introduction" className="logo">
      <HexagonIcon className="logo-icon" />
      <h2 className="logo-text">Documentation</h2>
    </Link>
  );
}
