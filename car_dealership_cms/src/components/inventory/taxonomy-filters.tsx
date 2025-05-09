"use client";

import { endpoints } from "@/config/endpoints";
import type { FilterOptions, TaxonomyFiltersProps } from "@/config/types";
import { api } from "@/lib/api-client";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";

export const TaxonomyFilters = (props: TaxonomyFiltersProps) => {
  const { searchParams, handleChange } = props;

  const [makes, setMakes] = useState<FilterOptions<string, string>>([]);
  const [models, setModels] = useState<FilterOptions<string, string>>([]);
  const [modelVariants, setModelVariants] = useState<
    FilterOptions<string, string>
  >([]);

  useEffect(() => {
    (async function fetchMakesOptions() {
      const params = new URLSearchParams();
      for (const [k, v] of Object.entries(
        searchParams as Record<string, string>
      )) {
        if (v) params.set(k, v as string);
      }

      const url = new URL(endpoints.taxonomy, window.location.href);

      url.search = params.toString();

      const data = await api.get<{
        makes: FilterOptions<string, string>;
        models: FilterOptions<string, string>;
        modelVariants: FilterOptions<string, string>;
      }>(url.toString());

      setMakes(data.makes);
      setModels(data.models);
      setModelVariants(data.modelVariants);
    })();
  }, [searchParams]);

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
        // Add other properties as needed
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

    handleChange(syntheticEvent as React.ChangeEvent<HTMLSelectElement>);
  };

  return (
    <>
      <div className="grid gap-4">
        <div className="space-y-2">
          <Label htmlFor="make">Make</Label>
          <Select
            value={searchParams?.make as string}
            onValueChange={handleSelectChange("make")}
          >
            <SelectTrigger id="make">
              <SelectValue placeholder="Select a make" />
            </SelectTrigger>
            <SelectContent>
              {makes.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="model">Model</Label>
          <Select
            value={searchParams?.model as string}
            onValueChange={handleSelectChange("model")}
            disabled={!models.length}
          >
            <SelectTrigger id="model">
              <SelectValue placeholder="Select a model" />
            </SelectTrigger>
            <SelectContent>
              {models.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="modelVariant">Model Variant</Label>
          <Select
            value={searchParams?.modelVariant as string}
            onValueChange={handleSelectChange("modelVariant")}
            disabled={!modelVariants.length}
          >
            <SelectTrigger id="modelVariant">
              <SelectValue placeholder="Select a variant" />
            </SelectTrigger>
            <SelectContent>
              {modelVariants.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  );
};
