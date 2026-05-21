import React, { forwardRef } from "react";
import { clsx } from "clsx";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The shape of the skeleton.
   * @default "rectangle"
   */
  variant?: "rectangle" | "circle" | "text";
}

/**
 * Skeleton component for high-fidelity loading states.
 * Built with Udacity-inspired aesthetics and Tailwind v4.
 */
const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant = "rectangle", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          "animate-pulse bg-text-muted/10 shrink-0",
          {
            "rounded-xl": variant === "rectangle",
            "rounded-full": variant === "circle",
            "rounded-md h-4 w-full": variant === "text",
          },
          className
        )}
        {...props}
      />
    );
  }
);

Skeleton.displayName = "Skeleton";

export default Skeleton;
