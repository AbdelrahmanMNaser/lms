import { forwardRef } from "react";
import { clsx } from "clsx";

export interface RadioOption {
  label: string;
  value: string | number;
  description?: string;
}

export interface RadioGroupProps {
  label?: string;
  name: string;
  options: RadioOption[];
  value?: string | number;
  onChange: (value: string | number) => void;
  error?: string;
  className?: string;
  direction?: "horizontal" | "vertical";
}

const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ label, name, options, value, onChange, error, className, direction = "vertical" }, ref) => {
    return (
      <div className={clsx("w-full space-y-3", className)} ref={ref}>
        {label && (
          <label className="block text-sm font-bold text-text-dark">
            {label}
          </label>
        )}
        <div
          className={clsx(
            "flex gap-4",
            direction === "vertical" ? "flex-col" : "flex-col sm:flex-row sm:flex-wrap"
          )}
        >
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <label
                key={option.value}
                className={clsx(
                  "relative flex cursor-pointer items-start gap-3 rounded-xl border-2 p-4 transition-all duration-200",
                  isSelected
                    ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                    : "border-text-muted/10 bg-white hover:border-text-muted/20"
                )}
              >
                <div className="flex h-5 items-center">
                  <input
                    type="radio"
                    name={name}
                    value={option.value}
                    checked={isSelected}
                    onChange={() => onChange(option.value)}
                    className="sr-only"
                  />
                  <div
                    className={clsx(
                      "flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all",
                      isSelected
                        ? "border-primary bg-primary"
                        : "border-text-muted/20 bg-white"
                    )}
                  >
                    {isSelected && (
                      <div className="h-2 w-2 rounded-full bg-white" />
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span
                    className={clsx(
                      "text-base font-semibold transition-colors",
                      isSelected ? "text-primary" : "text-text-dark"
                    )}
                  >
                    {option.label}
                  </span>
                  {option.description && (
                    <span className="text-sm text-text-muted">
                      {option.description}
                    </span>
                  )}
                </div>
              </label>
            );
          })}
        </div>
        {error && (
          <p className="text-sm font-medium text-danger">{error}</p>
        )}
      </div>
    );
  }
);

RadioGroup.displayName = "RadioGroup";

export { RadioGroup };
