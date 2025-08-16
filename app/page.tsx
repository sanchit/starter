import { buttonVariants } from "@/components/ui/button";
import { page_routes } from "@/lib/routes-config";
import Link from "next/link";

export default function Home() {
  return (
    <div className="home-container">
      <h1 className="home-title">
        Danger Docs
      </h1>
      <h1 className="home-subtitle">
        A minimal version of AriaDocs
      </h1>
      <p className="home-description">
        This feature-packed documentation template, built with Next.js, offers a
        sleek and responsive design, perfect for all your project documentation
        needs.
      </p>
      <div>
        <Link
          href={`/docs${page_routes[0].href}`}
          className={buttonVariants({
            className: "get-started-button",
            size: "lg",
          })}
        >
          Get Stared
        </Link>
      </div>
    </div>
  );
}
