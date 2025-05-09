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
import { useRouter } from "next/navigation";
import { parseAsString, useQueryStates } from "nuqs";
import { type ChangeEvent, useEffect, useState } from "react";
import { SearchInput } from "../shared/search-input";
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

export const Sidebar = ({ minMaxValues, searchParams }: SidebarProps) => {
  const router = useRouter();
  const [filterCount, setFilterCount] = useState(0);
  const { _min, _max } = minMaxValues;
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
    window.location.replace(url.toString());
    setFilterCount(0);
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
        <SelectTrigger id={name} className="w-full">
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
    <div className="py-4 w-[21.25rem] bg-white border-r border-muted hidden lg:block">
      <div>
        <div className="text-lg font-semibold flex justify-between px-4">
          <span>Filters</span>
          <button
            type="button"
            onClick={clearFilters}
            aria-disabled={!filterCount}
            className={cn(
              "text-sm text-gray-500 py-1",
              !filterCount
                ? "disabled opacity-50 pointer-events-none cursor-default"
                : "hover:underline cursor-pointer"
            )}
          >
            Clear all {filterCount ? `(${filterCount})` : null}
          </button>
        </div>
        <div className="mt-2" />
      </div>
      <div className="p-4">
        <SearchInput
          placeholder="Search classifieds..."
          className="w-full px-3 py-2 border rounded-md focus:outline-hidden focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="p-4 space-y-4">
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
          queryStates.currency || "",
          Object.values(CurrencyCode).map((value) => ({
            label: value,
            value,
          }))
        )}

        {renderSelect(
          "Odometer Unit",
          "odoUnit",
          queryStates.odoUnit || "",
          Object.values(OdoUnit).map((value) => ({
            label: formatOdometerUnit(value),
            value,
          }))
        )}

        {renderSelect(
          "Transmission",
          "transmission",
          queryStates.transmission || "",
          Object.values(Transmission).map((value) => ({
            label: formatTransmission(value),
            value,
          }))
        )}

        {renderSelect(
          "Fuel Type",
          "fuelType",
          queryStates.fuelType || "",
          Object.values(FuelType).map((value) => ({
            label: formatFuelType(value),
            value,
          }))
        )}

        {renderSelect(
          "Body Type",
          "bodyType",
          queryStates.bodyType || "",
          Object.values(BodyType).map((value) => ({
            label: formatBodyType(value),
            value,
          }))
        )}

        {renderSelect(
          "Colour",
          "colour",
          queryStates.colour || "",
          Object.values(Colour).map((value) => ({
            label: formatColour(value),
            value,
          }))
        )}

        {renderSelect(
          "ULEZ Compliance",
          "ulezCompliance",
          queryStates.ulezCompliance || "",
          Object.values(ULEZCompliance).map((value) => ({
            label: formatUlezCompliance(value),
            value,
          }))
        )}

        {renderSelect(
          "Doors",
          "doors",
          queryStates.doors || "",
          Array.from({ length: 6 }).map((_, i) => ({
            label: Number(i + 1).toString(),
            value: Number(i + 1).toString(),
          }))
        )}

        {renderSelect(
          "Seats",
          "seats",
          queryStates.seats || "",
          Array.from({ length: 8 }).map((_, i) => ({
            label: Number(i + 1).toString(),
            value: Number(i + 1).toString(),
          }))
        )}
      </div>
    </div>
  );
};
