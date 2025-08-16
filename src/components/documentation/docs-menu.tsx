import { ROUTES } from "@/lib/routes-config";
import SubLink from "./sublink";

export default function DocsMenu({ isSheet = false }) {
  return (
    <div className="docs-menu">
      {ROUTES.map((item, index) => {
        const modifiedItems = {
          ...item,
          href: `/docs${item.href}`,
          level: 0,
          isSheet,
        };
        return <SubLink key={item.title + index} {...modifiedItems} />;
      })}
    </div>
  );
}
