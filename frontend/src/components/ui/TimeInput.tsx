import React, { useState, useEffect } from "react";
import { clsx } from "clsx";
import { Clock, Plus, Minus } from "lucide-react";

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
    let nextHour = hours;

    if (nextMin >= 60) {
      nextMin = 0;
      nextHour += 1;
    } else if (nextMin < 0) {
      if (nextHour > 0) {
        nextMin = 55;
        nextHour -= 1;
      } else {
        nextMin = 0;
      }
    }

    setMinutes(nextMin);
    setHours(nextHour);
    updateDuration(nextHour, nextMin);
  };

  return (
    <div className={clsx("w-full space-y-2", className)}>
      {label && (
        <label className="block text-sm font-bold text-text-dark">
          {label}
        </label>
      )}
      
      <div className={clsx(
        "flex items-center h-11 w-full rounded-lg border-2 bg-white px-3 transition-all duration-200 group",
        "focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary",
        error ? "border-danger" : "border-text-muted/10"
      )}>
        <Clock 
          size={18} 
          className={clsx(
            "mr-3 transition-colors duration-200",
            error ? "text-danger" : "text-text-muted group-focus-within:text-primary"
          )} 
        />
        
        <div className="flex items-center gap-1 flex-1">
          {/* Hours Section */}
          <div className="flex items-center">
            <input
              type="text"
              value={hours}
              readOnly
              className="w-8 text-center font-semibold text-text-dark bg-transparent outline-none"
            />
            <span className="text-[10px] font-bold text-text-muted uppercase mt-0.5">h</span>
          </div>

          <span className="text-text-muted/40 font-bold">:</span>

          {/* Minutes Section */}
          <div className="flex items-center">
            <input
              type="text"
              value={minutes.toString().padStart(2, "0")}
              readOnly
              className="w-8 text-center font-semibold text-text-dark bg-transparent outline-none"
            />
            <span className="text-[10px] font-bold text-text-muted uppercase mt-0.5">m</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center border-l border-text-muted/10 ml-2 pl-2 gap-1">
          <button
            type="button"
            onClick={() => handleMinChange(-5)}
            className="p-1 hover:bg-text-muted/10 rounded-md text-text-muted transition-colors active:scale-90"
          >
            <Minus size={14} strokeWidth={3} />
          </button>
          <button
            type="button"
            onClick={() => handleMinChange(5)}
            className="p-1 hover:bg-text-muted/10 rounded-md text-text-muted transition-colors active:scale-90"
          >
            <Plus size={14} strokeWidth={3} />
          </button>
        </div>
      </div>

      {error && (
        <p className="text-sm font-medium text-danger">{error}</p>
      )}
    </div>
  );
};

export default TimeInput;
