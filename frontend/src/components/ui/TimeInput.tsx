import React, { useState, useEffect } from "react";
import { clsx } from "clsx";
import { Clock, ChevronUp, ChevronDown } from "lucide-react";

export interface TimeInputProps {
  label?: string;
  value?: number; // Total minutes
  onChange?: (totalMinutes: number) => void;
  error?: string;
  className?: string;
}

const TimeInput: React.FC<TimeInputProps> = ({
  label,
  value = 0,
  onChange,
  error,
  className,
}) => {
  const [hours, setHours] = useState(Math.floor(value / 60));
  const [minutes, setMinutes] = useState(value % 60);

  useEffect(() => {
    setHours(Math.floor(value / 60));
    setMinutes(value % 60);
  }, [value]);

  const updateDuration = (newHours: number, newMinutes: number) => {
    const total = newHours * 60 + newMinutes;
    if (onChange) onChange(total);
  };

  const handleHourChange = (delta: number) => {
    const next = Math.max(0, hours + delta);
    setHours(next);
    updateDuration(next, minutes);
  };

  const handleMinChange = (delta: number) => {
    let nextMin = minutes + delta;

    if (nextMin >= 60) {
      nextMin = 0;
    } else if (nextMin < 0) {
      nextMin = 55;
    }

    setMinutes(nextMin);
    updateDuration(hours, nextMin);
  };

  return (
    <div className={clsx("w-full space-y-2", className)}>
      {label && (
        <label className="block text-sm font-bold text-text-dark">
          {label}
        </label>
      )}

      <div
        className={clsx(
          "flex items-center h-12 w-full rounded-xl border-2 bg-white px-3 transition-all duration-200 group",
          "focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary",
          error ? "border-danger" : "border-text-muted/10",
        )}
      >
        <Clock
          size={18}
          className={clsx(
            "mr-3 transition-colors duration-200",
            error
              ? "text-danger"
              : "text-text-muted group-focus-within:text-primary",
          )}
        />

        <div className="flex items-center gap-1 flex-1">
          {/* Hours Section */}
          <div className="flex items-center bg-bg-light/30 px-2 py-1 rounded-lg">
            <span className="text-xl font-bold text-text-dark w-7 text-center">
              {hours}
            </span>
            <span className="text-[10px] font-black text-text-muted uppercase ml-1">
              h
            </span>

            <div className="flex flex-col ml-2 border-l border-text-muted/10 pl-1 h-9 justify-between">
              <button
                type="button"
                onClick={() => handleHourChange(1)}
                className="hover:text-primary transition-colors flex items-center justify-center h-full cursor-pointer"
              >
                <ChevronUp size={14} strokeWidth={3} />
              </button>
              <button
                type="button"
                onClick={() => handleHourChange(-1)}
                className="hover:text-primary transition-colors flex items-center justify-center h-full cursor-pointer"
              >
                <ChevronDown size={14} strokeWidth={3} />
              </button>
            </div>
          </div>

          <span className="text-text-muted/40 font-bold mx-1 text-xl">:</span>

          {/* Minutes Section */}
          <div className="flex items-center bg-bg-light/30 px-2 py-1 rounded-lg">
            <span className="text-xl font-bold text-text-dark w-8 text-center">
              {minutes.toString().padStart(2, "0")}
            </span>
            <span className="text-[10px] font-black text-text-muted uppercase ml-1">
              m
            </span>

            <div className="flex flex-col ml-2 border-l border-text-muted/10 pl-1 h-9 justify-between">
              <button
                type="button"
                onClick={() => handleMinChange(5)}
                className="hover:text-primary transition-colors flex items-center justify-center h-full cursor-pointer"
              >
                <ChevronUp size={14} strokeWidth={3} />
              </button>
              <button
                type="button"
                onClick={() => handleMinChange(-5)}
                className="hover:text-primary transition-colors flex items-center justify-center h-full cursor-pointer"
              >
                <ChevronDown size={14} strokeWidth={3} />
              </button>
            </div>
          </div>
        </div>

        {/* Global Controls */}
        <div className="flex items-center gap-1 ml-4 border-l border-text-muted/10 pl-3">
          <button
            type="button"
            onClick={() => updateDuration(0, 0)}
            className="text-[10px] font-bold text-text-muted hover:text-danger transition-colors uppercase cursor-pointer"
          >
            Reset
          </button>
        </div>
      </div>

      {error && <p className="text-sm font-medium text-danger">{error}</p>}
    </div>
  );
};

export default TimeInput;
