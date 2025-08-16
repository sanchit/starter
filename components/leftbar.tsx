import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { AlignLeftIcon } from "lucide-react";
import DocsMenu from "./docs-menu";

export function Leftbar() {
  return (
    <aside className="sidebar">
      <ScrollArea className="sidebar-scroll">
        <DocsMenu />
      </ScrollArea>
    </aside>
  );
}

export function SheetLeftbar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="sidebar-mobile-trigger">
          <AlignLeftIcon className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent className="sidebar-sheet" side="left">
        <SheetTitle className="sidebar-sheet-title">Menu</SheetTitle>
        <SheetHeader>
          <h2 className="sidebar-sheet-header">Menu</h2>
        </SheetHeader>
        <ScrollArea className="flex flex-col gap-4">
          <div className="sidebar-sheet-content">
            <DocsMenu isSheet />
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
