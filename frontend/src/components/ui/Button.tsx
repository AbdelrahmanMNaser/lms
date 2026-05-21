import React, { forwardRef } from "react";
import { clsx } from "clsx";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "accent";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPos?: "right" | "left";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      icon,
      iconPos,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center gap-x-2.5 rounded-lg font-semibold cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]";

    const variants = {
      primary:
        "bg-primary text-white hover:bg-primary-dark focus:ring-primary/50 shadow-md shadow-primary/20",
      secondary:
        "bg-text-muted/10 text-text-dark hover:bg-text-muted/20 focus:ring-text-muted/30",
      outline:
        "border-2 border-primary text-primary hover:bg-primary/5 focus:ring-primary/30",
      ghost: "text-text-dark hover:bg-text-muted/10 focus:ring-text-muted/20",
      danger:
        "bg-danger text-white hover:bg-danger-dark focus:ring-danger/50 shadow-md shadow-danger/20",
      accent:
        "bg-accent text-white hover:bg-accent-dark focus:ring-accent/50 shadow-md shadow-accent/20",
    };

    const sizes = {
      sm: "h-9 px-4 text-sm",
      md: "h-11 px-6 text-base",
      lg: "h-13 px-8 text-lg",
      icon: "h-11 w-11",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={clsx(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <>
            {iconPos === "left" && icon && <span>{icon}</span>}
            {children}
            {iconPos === "right" && icon && <span>{icon}</span>}
          </>
        )}
      </button>
    );
  },
);

Button.displayName = "Button";

export { Button };
