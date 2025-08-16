import { cn } from "@/lib/utils";
import clsx from "clsx";
import { PropsWithChildren } from "react";

type NoteProps = PropsWithChildren & {
  title?: string;
  type?: "note" | "danger" | "warning" | "success";
};

export default function Note({
  children,
  title = "Note",
  type = "note",
}: NoteProps) {
  const noteTypeClass = `note-${type === "note" ? "default" : type}`;

  return (
    <div className={cn("note", noteTypeClass)}>
      <p className="note-title">{title}:</p> {children}
    </div>
  );
}
