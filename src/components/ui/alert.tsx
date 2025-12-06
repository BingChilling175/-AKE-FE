import * as React from "react";
import { cn } from "@/lib/utils";

const Alert = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative w-full rounded-lg border border-destructive bg-destructive/20 px-4 py-2 text-sm text-destructive",
        className
      )}
      {...props}
    />
  )
);
Alert.displayName = "Alert";

export { Alert };
