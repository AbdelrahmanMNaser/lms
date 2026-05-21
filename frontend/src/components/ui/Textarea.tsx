import React, { forwardRef } from "react";
import { clsx } from "clsx";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="w-full space-y-2">
        {label && (
          <label className="block text-sm font-bold text-text-dark">
            {label}
          </label>
        )}
        <textarea
          className={clsx(
            "flex min-h-[120px] w-full rounded-lg border-2 bg-white px-4 py-3 text-base transition-all duration-200",
            "placeholder:text-text-muted/50",
            "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
            "disabled:cursor-not-allowed disabled:bg-bg-light disabled:opacity-50",
            "resize-none", // Premium look often hides manual resizing or uses auto-expand
            error ? "border-danger focus:ring-danger/20 focus:border-danger" : "border-text-muted/10",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="text-sm font-medium text-danger">{error}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
