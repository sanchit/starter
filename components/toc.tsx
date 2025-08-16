import { getDocsTocs } from "@/lib/markdown";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import clsx from "clsx";

export default async function Toc({ path }: { path: string }) {
  const tocs = await getDocsTocs(path);

  return (
    <div className="toc">
      <div className="toc-container">
        <h3 className="toc-title">On this page</h3>
        <ScrollArea className="pb-4 pt-0.5">
          <div className="toc-links">
            {tocs.map(({ href, level, text }) => (
              <Link
                key={href}
                href={href}
                className={`toc-link-level-${level}`}
              >
                {text}
              </Link>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
