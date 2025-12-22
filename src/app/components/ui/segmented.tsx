"use client";

import * as React from "react";
import { cn } from "./utils";

interface SegmentedOption {
  label: React.ReactNode;
  value: string;
  disabled?: boolean;
}

interface SegmentedProps {
  options: SegmentedOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
  size?: "small" | "default" | "large";
  block?: boolean;
}

const Segmented = React.forwardRef<HTMLDivElement, SegmentedProps>(
  ({ options, value, defaultValue, onChange, className, size = "default", block = false, ...props }, ref) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue || options[0]?.value || "");
    const currentValue = value !== undefined ? value : internalValue;

    const handleChange = (newValue: string) => {
      if (value === undefined) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    };

    const sizeClasses = {
      small: "h-6 text-xs px-2",
      default: "h-8 text-xs px-3",
      large: "h-10 text-sm px-4",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-md bg-slate-100 p-0.5",
          block && "w-full",
          className
        )}
        role="tablist"
        {...props}
      >
        {options.map((option, index) => {
          const isSelected = currentValue === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => !option.disabled && handleChange(option.value)}
              disabled={option.disabled}
              className={cn(
                "relative flex items-center justify-center font-medium transition-all duration-200 ease-in-out",
                "rounded-md border-0 outline-none",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1",
                sizeClasses[size],
                isSelected
                  ? "bg-white text-slate-900 shadow-sm font-medium"
                  : "text-slate-600 hover:text-slate-900 bg-transparent",
                option.disabled && "opacity-50 cursor-not-allowed",
                !option.disabled && !isSelected && "hover:bg-slate-50/50"
              )}
              aria-selected={isSelected}
              role="tab"
            >
              <span className="whitespace-nowrap">{option.label}</span>
            </button>
          );
        })}
      </div>
    );
  }
);

Segmented.displayName = "Segmented";

export { Segmented, type SegmentedProps, type SegmentedOption };
