import React from "react";
import { Loader2 } from "lucide-react";

import { cn } from "@nourish/ui";

const LoaderComponent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex h-full w-full items-center justify-center bg-transparent",
        className,
      )}
      {...props}
    >
      <Loader2
        size={48}
        color="black"
        strokeWidth={2}
        className="animate-spin"
      />
    </div>
  );
});
LoaderComponent.displayName = "LoaderComponent";

export { LoaderComponent };
