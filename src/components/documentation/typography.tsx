import { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

interface TypographyProps extends PropsWithChildren {
  isRightPanel?: boolean;
}

export function Typography({ children, isRightPanel = false }: TypographyProps) {
  return (
    <div className={cn(
      "typography",
      isRightPanel ? "typography-right-panel" : "typography-main-panel"
    )}>
      {children}
    </div>
  );
}
