import { ScrollArea } from "@/components/ui/scroll-area";
import { getDocsForSlug, getRightPanelDocsForSlug } from "@/lib/markdown";
import { Typography } from "@/components/documentation/typography";

export default async function SideContent({ path }: { path: string }) {
  // Fetch the right panel MDX content
  const rightPanelRes = await getRightPanelDocsForSlug(path);
  
  // If right panel content doesn't exist, fall back to main content
  const mainPanelRes = !rightPanelRes ? await getDocsForSlug(path) : null;
  
  // Use right panel content if it exists, otherwise use main content
  const res = rightPanelRes || mainPanelRes;
  
  if (!res) {
    return (
      <div className="side-content">
        <div className="side-content-inner">
          <div className="side-content-scroll">
            <h3 className="side-content-empty">No content available</h3>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="side-content">
      <div className="side-content-inner">
        <div className="side-content-scroll">
          <div className="side-content-wrapper">
            <Typography isRightPanel>
              <div>{res.content}</div>
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}
