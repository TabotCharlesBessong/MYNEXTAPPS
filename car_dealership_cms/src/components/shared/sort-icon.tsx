import { ArrowUpDown, ArrowUpNarrowWide } from "lucide-react";

interface SortIconProps<TKeys> {
  sort: TKeys;
  currentSort: TKeys | null;
  currentOrder: "asc" | "desc" | null;
}

export function SortIcon<TKeys>(props: SortIconProps<TKeys>) {
  const { sort, currentOrder, currentSort } = props;

  if (sort !== currentSort) return <ArrowUpDown className="w-4 h-4" />;

  return currentOrder === "asc" ? (
    <ArrowUpNarrowWide className="w-4 h-4" />
  ) : (
    <ArrowUpNarrowWide className="w-4 h-4 rotate-180" />
  );
}
