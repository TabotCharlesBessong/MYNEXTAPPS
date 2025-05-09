// RangeSelect.tsx
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { ChangeEvent } from "react";

interface SelectProps {
  name: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: Array<{
    label: string;
    value: string | number;
  }>;
  placeholder?: string;
}

interface RangeSelectProps {
  label: string;
  className?: string;
  minSelect: SelectProps;
  maxSelect: SelectProps;
}

export function RangeSelect({
  label,
  className,
  minSelect,
  maxSelect,
}: RangeSelectProps) {
  // Create a custom select component that uses a standard select element
  // to maintain compatibility with the expected onChange handler
  const CustomSelect = ({
    name,
    value,
    onChange,
    options,
    placeholder,
  }: SelectProps) => (
    <select
      name={name}
      value={value.toString()}
      onChange={onChange}
      className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <option value="" disabled>
        {placeholder || "Select..."}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value.toString()}>
          {option.label}
        </option>
      ))}
    </select>
  );

  return (
    <div className={cn("space-y-2", className)}>
      <Label>{label}</Label>
      <div className="flex items-center gap-2">
        <CustomSelect {...minSelect} placeholder="Min" />
        <span className="text-muted-foreground">to</span>
        <CustomSelect {...maxSelect} placeholder="Max" />
      </div>
    </div>
  );
}
