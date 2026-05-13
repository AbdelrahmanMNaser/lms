import React, { forwardRef, useState, useRef, useEffect } from "react";
import { clsx } from "clsx";
import { ChevronDown, Check } from "lucide-react";

export interface SelectOption {
  label: string;
  value: string | number;
}

export interface SelectProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  iconPos?: "left" | "right";
  options: SelectOption[];
  value?: string | number;
  placeholder?: string;
  onChange?: (value: string | number) => void;
  disabled?: boolean;
}

const Select = forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      className,
      label,
      error,
      icon,
      iconPos,
      options,
      value,
      placeholder = "Select an option",
      onChange,
      disabled,
      ...props
    },
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find((opt) => opt.value === value);

    // Close on click outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (optionValue: string | number) => {
      if (disabled) return;
      onChange?.(optionValue);
      setIsOpen(false);
    };

    return (
      <div className="w-full space-y-2" ref={containerRef}>
        {label && (
          <label className="block text-sm font-bold text-text-dark">
            {label}
          </label>
        )}
        
        <div className="relative" {...props}>
          <button
            type="button"
            disabled={disabled}
            onClick={() => setIsOpen(!isOpen)}
            className={clsx(
              "flex h-11 w-full items-center justify-between rounded-lg border-2 bg-white px-4 py-2 text-base transition-all duration-200 group",
              "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
              "disabled:cursor-not-allowed disabled:bg-bg-light disabled:opacity-50",
              isOpen ? "border-primary ring-2 ring-primary/20" : "border-text-muted/10",
              error ? "border-danger focus:ring-danger/20 focus:border-danger" : "",
              className
            )}
          >
            <div className="flex items-center gap-3">
              {icon && iconPos === "left" && (
                <span className={clsx(
                  "transition-colors duration-200",
                  error ? "text-danger" : (isOpen ? "text-primary" : "text-text-muted group-focus:text-primary")
                )}>
                  {icon}
                </span>
              )}
              <span className={clsx(!selectedOption && "text-text-muted/50")}>
                {selectedOption ? selectedOption.label : placeholder}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {icon && iconPos === "right" && (
                <span className={clsx(
                  "transition-colors duration-200",
                  error ? "text-danger" : (isOpen ? "text-primary" : "text-text-muted group-focus:text-primary")
                )}>
                  {icon}
                </span>
              )}
              <ChevronDown 
                size={18} 
                className={clsx(
                  "transition-all duration-200",
                  error ? "text-danger" : (isOpen ? "text-primary" : "text-text-muted group-focus:text-primary"),
                  isOpen && "rotate-180"
                )} 
              />
            </div>
          </button>

          {/* Options Window */}
          {isOpen && (
            <div className="absolute top-full left-0 right-0 z-50 mt-2 max-h-60 overflow-auto rounded-xl border border-text-muted/10 bg-white p-1 shadow-xl shadow-primary/10 animate-in fade-in zoom-in-95 duration-100">
              {options.map((option) => (
                <div
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  className={clsx(
                    "group flex cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-base transition-colors",
                    option.value === value
                      ? "bg-primary/10 text-primary font-semibold"
                      : "text-text-dark hover:bg-bg-light"
                  )}
                >
                  <span className="flex-1">{option.label}</span>
                  {option.value === value && (
                    <Check size={16} className="text-primary" />
                  )}
                </div>
              ))}
              {options.length === 0 && (
                <div className="px-3 py-4 text-center text-sm text-text-muted">
                  No options available
                </div>
              )}
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

Select.displayName = "Select";

export { Select };
