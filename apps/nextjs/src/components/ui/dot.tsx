import React from "react";

import { cn } from "@nourish/ui";

import { iconColorMap } from "~/lib/constants";

interface DotProps extends React.HTMLAttributes<HTMLSpanElement> {
  colorIndex: number | null;
}

const Dot = React.forwardRef<HTMLSpanElement, DotProps>(
  ({ colorIndex, className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "flex h-3 w-3 flex-shrink-0 rounded-full",
        iconColorMap[colorIndex ?? 0] ?? "bg-gray-400",
        className,
      )}
      {...props}
    />
  ),
);
Dot.displayName = "Dot";

export { Dot };
