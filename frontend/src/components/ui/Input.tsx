import React, { forwardRef } from "react";
import { clsx } from "clsx";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  iconPos?: "left" | "right";
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, icon, iconPos, type, ...props }, ref) => {
    return (
      <div className="w-full space-y-2">
        {label && (
          <label className="block text-sm font-bold text-text-dark">
            {label}
          </label>
        )}
        <div className="relative flex items-center group">
          {icon && iconPos === "left" && (
            <div className={clsx(
              "absolute left-3 transition-colors duration-200",
              error ? "text-danger" : "text-text-muted group-focus-within:text-primary"
            )}>
              {icon}
            </div>
          )}
          <input
            type={type}
            className={clsx(
              "flex h-11 w-full rounded-lg border-2 bg-white px-4 py-2 text-base transition-all duration-200",
              "placeholder:text-text-muted/50",
              "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
              "disabled:cursor-not-allowed disabled:bg-bg-light disabled:opacity-50",
              error ? "border-danger focus:ring-danger/20 focus:border-danger" : "border-text-muted/10",
              icon && iconPos === "left" && "pl-11",
              icon && iconPos === "right" && "pr-11",
              className
            )}
            ref={ref}
            {...props}
          />
          {icon && iconPos === "right" && (
            <div className={clsx(
              "absolute right-3 transition-colors duration-200",
              error ? "text-danger" : "text-text-muted group-focus-within:text-primary"
            )}>
              {icon}
            </div>
          )}
        </div>
        {error && (
          <p className="text-sm font-medium text-danger">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
