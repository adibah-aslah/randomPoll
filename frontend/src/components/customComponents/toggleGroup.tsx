import type React from "react";
import { ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";

export function CustomToggleGroup({
  children,
  className,
  ...props
}: React.ComponentProps<typeof ToggleGroupItem>) {
  return (
    <ToggleGroupItem
      className={cn(
        "flex items-center justify-center gap-2 px-4 py-2 transition-all duration-200",
        "rounded-lg h-9 normal-case tracking-normal shrink-0",
        "data-[state=on]:bg-primary data-[state=on]:text-primary-foreground",
        "data-[state=on]:shadow-[0_2px_10px_-3px_rgba(0,0,0,0.1),0_4px_6px_-2px_rgba(0,0,0,0.05)]",
        "hover:bg-primary/50 data-[state=on]:hover:bg-primary",
        className,
      )}
      {...props}
    >
      {children}
    </ToggleGroupItem>
  );
}
