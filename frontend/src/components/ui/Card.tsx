import React from "react";
import { clsx } from "clsx";

/**
 * ===== Card System =====
 * A collection of components to build structured, modern containers.
 */

// --- Card Main ---
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "bordered" | "primary" | "glass";
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const variants = {
      default: "bg-white shadow-sm border border-text-muted/10",
      bordered: "bg-transparent border-2 border-text-muted/10",
      primary: "bg-primary text-white shadow-lg shadow-primary/20 border-0",
      glass: "bg-white/70 backdrop-blur-md border border-white/20 shadow-xl",
    };

    return (
      <div
        ref={ref}
        className={clsx(
          "rounded-4xl overflow-hidden transition-all duration-300",
          variants[variant],
          className,
        )}
        {...props}
      />
    );
  },
);
Card.displayName = "Card";

// --- Card Header ---
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={clsx("p-6 md:p-8 pb-0", className)} {...props} />
));
CardHeader.displayName = "CardHeader";

// --- Card Title ---
const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={clsx(
      "text-2xl font-bold tracking-tight text-inherit leading-tight",
      className,
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

// --- Card Description ---
const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={clsx(
      "text-sm text-text-muted/80 mt-1 leading-relaxed",
      className,
    )}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

// --- Card Content ---
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={clsx("p-6 md:p-8", className)} {...props} />
));
CardContent.displayName = "CardContent";

// --- Card Footer ---
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={clsx("p-6 md:p-8 pt-0 flex items-center", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
};
