import { cn } from "@/lib/utils";
import { type ElementType, forwardRef } from "react";
import { NumericFormat, type NumericFormatProps } from "react-number-format";

export const NumberInput = forwardRef<
  ElementType<typeof NumericFormat>,
  NumericFormatProps
>(({ className, ...props }, ref) => {
  return (
    <NumericFormat
      getInputRef={ref}
      thousandSeparator=","
      thousandsGroupStyle="thousand"
      decimalScale={0}
      allowNegative={false}
      className={cn(
        className,
        "mt-1 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-5 text-sm"
      )}
      {...props}
    />
  );
});
