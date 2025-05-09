"use client";
import { routes } from "@/config/routes";
import type { SidebarProps } from "@/config/types";
// @ts-ignore
// import { env } from "@/env";
import {
  cn,
  formatBodyType,
  formatColour,
  formatFuelType,
  formatOdometerUnit,
  formatTransmission,
  formatUlezCompliance,
} from "@/lib/utils";
import {
  BodyType,
  Colour,
  CurrencyCode,
  FuelType,
  OdoUnit,
  Transmission,
  ULEZCompliance,
} from "@prisma/client";
import { Settings2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { parseAsString, useQueryStates } from "nuqs";
import { type ChangeEvent, useEffect, useState } from "react";
import { SearchInput } from "../shared/search-input";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";
import { RangeFilter } from "./range-filters";
import { TaxonomyFilters } from "./taxonomy-filters";

interface DialogFiltersProps extends SidebarProps {
  count: number;
}

export const DialogFilters = (props: DialogFiltersProps) => {
  const { minMaxValues, searchParams, count } = props;

  const { _min, _max } = minMaxValues;
  const [open, setIsOpen] = useState(false);
  const router = useRouter();
  const [filterCount, setFilterCount] = useState(0);

  const [queryStates, setQueryStates] = useQueryStates(
    {
      make: parseAsString.withDefault(""),
      model: parseAsString.withDefault(""),
      modelVariant: parseAsString.withDefault(""),
      minYear: parseAsString.withDefault(""),
      maxYear: parseAsString.withDefault(""),
      minPrice: parseAsString.withDefault(""),
      maxPrice: parseAsString.withDefault(""),
      minReading: parseAsString.withDefault(""),
      maxReading: parseAsString.withDefault(""),
      currency: parseAsString.withDefault(""),
      odoUnit: parseAsString.withDefault(""),
      transmission: parseAsString.withDefault(""),
      fuelType: parseAsString.withDefault(""),
      bodyType: parseAsString.withDefault(""),
      colour: parseAsString.withDefault(""),
      doors: parseAsString.withDefault(""),
      seats: parseAsString.withDefault(""),
      ulezCompliance: parseAsString.withDefault(""),
    },
    {
      shallow: false,
    }
  );

  useEffect(() => {
    const filterCount = Object.entries(
      searchParams as Record<string, string>
    ).filter(([key, value]) => key !== "page" && value).length;

    setFilterCount(filterCount);
  }, [searchParams]);

  const clearFilters = () => {
    const url = new URL(routes.inventory, process.env.NEXT_PUBLIC_APP_URL);
    router.replace(url.toString());
    setFilterCount(0);
  };

  // Create a wrapper function to handle the Select component's value change
  const handleSelectChange = (name: string) => (value: string) => {
    // Create a synthetic event that matches the expected ChangeEvent<HTMLSelectElement> structure
    const syntheticEvent = {
      // @ts-ignore
      target: {
        name,
        value,
        nodeName: "SELECT",
        type: "change",
        checked: false,
        selectedOptions: [{ value, text: value }],
        getAttribute: (attr: string) => (attr === "name" ? name : null),
      } as HTMLSelectElement,
      currentTarget: {} as HTMLSelectElement,
      bubbles: true,
      cancelable: true,
      defaultPrevented: false,
      eventPhase: 0,
      isTrusted: true,
      preventDefault: () => {},
      isDefaultPrevented: () => false,
      stopPropagation: () => {},
      isPropagationStopped: () => false,
      persist: () => {},
      timeStamp: Date.now(),
      type: "change",
    };

    // Call the original handleChange with our synthetic event
    handleChange(syntheticEvent as React.ChangeEvent<HTMLSelectElement>);
  };

  const handleChange = async (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setQueryStates({
      [name]: value || null,
    });

    if (name === "make") {
      setQueryStates({
        model: null,
        modelVariant: null,
      });
    }

    router.refresh();
  };

  // Helper function to create a Select component
  const renderSelect = (
    label: string,
    name: string,
    value: string,
    options: Array<{ label: string; value: string }>,
    disabled: boolean = false
  ) => (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Select
        value={value}
        onValueChange={handleSelectChange(name)}
        disabled={disabled}
      >
        <SelectTrigger id={name}>
          <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="lg:hidden">
          <Settings2 className="w-4 h-4" />{" "}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px] h-[90vh] overflow-y-auto rounded-xl bg-white">
        <div className="space-y-6">
          <div>
            <div className="text-lg font-semibold flex justify-between">
              <DialogTitle>Filters</DialogTitle>
            </div>
            <div className="mt-2" />
          </div>

          <SearchInput
            placeholder="Search classifieds..."
            className="w-full px-3 py-2 border rounded-md focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          />

          <div className="space-y-4">
            <TaxonomyFilters
              searchParams={searchParams}
              handleChange={handleChange}
            />

            <RangeFilter
              label="Year"
              minName="minYear"
              maxName="maxYear"
              defaultMin={_min.year || 1925}
              defaultMax={_max.year || new Date().getFullYear()}
              handleChange={handleChange}
              searchParams={searchParams}
            />
            <RangeFilter
              label="Price"
              minName="minPrice"
              maxName="maxPrice"
              defaultMin={_min.price || 0}
              defaultMax={_max.price || 21474836}
              handleChange={handleChange}
              searchParams={searchParams}
              increment={1000000}
              thousandSeparator
              currency={{
                currencyCode: "GBP",
              }}
            />
            <RangeFilter
              label="Odometer Reading"
              minName="minReading"
              maxName="maxReading"
              defaultMin={_min.odoReading || 0}
              defaultMax={_max.odoReading || 1000000}
              handleChange={handleChange}
              searchParams={searchParams}
              increment={5000}
              thousandSeparator
            />

            {renderSelect(
              "Currency",
              "currency",
              queryStates.currency,
              Object.values(CurrencyCode).map((value) => ({
                label: value,
                value,
              }))
            )}

            {renderSelect(
              "Odometer Unit",
              "odoUnit",
              queryStates.odoUnit,
              Object.values(OdoUnit).map((value) => ({
                label: formatOdometerUnit(value),
                value,
              }))
            )}

            {renderSelect(
              "Transmission",
              "transmission",
              queryStates.transmission,
              Object.values(Transmission).map((value) => ({
                label: formatTransmission(value),
                value,
              }))
            )}

            {renderSelect(
              "Fuel Type",
              "fuelType",
              queryStates.fuelType,
              Object.values(FuelType).map((value) => ({
                label: formatFuelType(value),
                value,
              }))
            )}

            {renderSelect(
              "Body Type",
              "bodyType",
              queryStates.bodyType,
              Object.values(BodyType).map((value) => ({
                label: formatBodyType(value),
                value,
              }))
            )}

            {renderSelect(
              "Colour",
              "colour",
              queryStates.colour,
              Object.values(Colour).map((value) => ({
                label: formatColour(value),
                value,
              }))
            )}

            {renderSelect(
              "ULEZ Compliance",
              "ulezCompliance",
              queryStates.ulezCompliance,
              Object.values(ULEZCompliance).map((value) => ({
                label: formatUlezCompliance(value),
                value,
              }))
            )}

            {renderSelect(
              "Doors",
              "doors",
              queryStates.doors,
              Array.from({ length: 6 }).map((_, i) => ({
                label: Number(i + 1).toString(),
                value: Number(i + 1).toString(),
              }))
            )}

            {renderSelect(
              "Seats",
              "seats",
              queryStates.seats,
              Array.from({ length: 8 }).map((_, i) => ({
                label: Number(i + 1).toString(),
                value: Number(i + 1).toString(),
              }))
            )}
          </div>

          <div className="flex flex-col space-y-2">
            <Button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-full"
            >
              Search{count > 0 ? ` (${count})` : null}
            </Button>

            {filterCount > 0 && (
              <Button
                type="button"
                variant="outline"
                onClick={clearFilters}
                aria-disabled={!filterCount}
                className={cn(
                  "text-sm py-1",
                  !filterCount
                    ? "disabled opacity-50 pointer-events-none cursor-default"
                    : "hover:underline"
                )}
              >
                Clear all {filterCount ? `(${filterCount})` : null}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
