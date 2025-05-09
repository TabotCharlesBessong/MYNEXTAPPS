// components/ui/select.tsx
import React, { ChangeEvent } from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export interface SelectProps {
  label?: string;
  name: string;
  value: string;
  onChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void | Promise<void>;
  options: Array<{
    label: string;
    value: string;
  }>;
  className?: string;
  placeholder?: string;
}

export function Select({
  label,
  name,
  value,
  onChange,
  options,
  className,
  placeholder = "Select an option",
}: SelectProps) {
  return (
    <div className="space-y-2">
      {label && <Label htmlFor={name}>{label}</Label>}
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={cn(
          "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
