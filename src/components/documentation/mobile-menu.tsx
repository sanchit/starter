"use client";

import { AlignLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";

export function MobileMenu({ children }: { children: React.ReactNode }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="sidebar-mobile-trigger sm:hidden">
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
            {children}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}