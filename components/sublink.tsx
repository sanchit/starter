"use client";

import { EachRoute } from "@/lib/routes-config";
import Anchor from "./anchor";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { SheetClose } from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export default function SubLink({
  title,
  href,
  items,
  noLink,
  level,
  isSheet,
}: EachRoute & { level: number; isSheet: boolean }) {
  const [isOpen, setIsOpen] = useState(false);

  const Comp = (
    <Anchor activeClassName="link-active" href={href}>
      {title}
    </Anchor>
  );

  const titleOrLink = !noLink ? (
    isSheet ? (
      <SheetClose asChild>{Comp}</SheetClose>
    ) : (
      Comp
    )
  ) : (
    <h4 className="font-medium">{title}</h4>
  );

  if (!items) {
    return <div className="nav-links">{titleOrLink}</div>;
  }

  return (
    <div className="sublink">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className="sublink-header">
          {titleOrLink}
          <CollapsibleTrigger asChild>
            <Button
              className="sublink-toggle"
              variant="link"
              size="icon"
            >
              {!isOpen ? (
                <ChevronDown className="sublink-toggle-icon" />
              ) : (
                <ChevronUp className="sublink-toggle-icon" />
              )}
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent>
          <div
            className={cn(
              "sublink-children",
              level > 0 && "nested"
            )}
          >
            {items?.map((innerLink) => {
              const modifiedItems = {
                ...innerLink,
                href: `${href + innerLink.href}`,
                level: level + 1,
                isSheet,
              };
              return <SubLink key={modifiedItems.href} {...modifiedItems} />;
            })}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
