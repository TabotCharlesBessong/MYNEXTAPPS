"use client";

import { routes } from "@/config/routes";
// import { env } from "@/env";
import Link from "next/link";
import { parseAsString, useQueryStates } from "nuqs";
import { Button } from "../ui/button";

export const SearchButton = ({ count }: { count: number }) => {
  const [{ make, model, modelVariant, minYear, maxYear, minPrice, maxPrice }] =
    useQueryStates(
      {
        make: parseAsString.withDefault(""),
        model: parseAsString.withDefault(""),
        modelVariant: parseAsString.withDefault(""),
        minYear: parseAsString.withDefault(""),
        maxYear: parseAsString.withDefault(""),
        minPrice: parseAsString.withDefault(""),
        maxPrice: parseAsString.withDefault(""),
      },
      { shallow: false }
    );

  const queryParams = new URLSearchParams();
  if (make) queryParams.append("make", make);
  if (model) queryParams.append("model", model);
  if (modelVariant) queryParams.append("modelVariant", modelVariant);
  if (minYear) queryParams.append("minYear", minYear);
  if (maxYear) queryParams.append("maxYear", maxYear);
  if (minPrice) queryParams.append("minPrice", minPrice);
  if (maxPrice) queryParams.append("maxPrice", maxPrice);

  const url = new URL(routes.inventory, process.env.NEXT_PUBLIC_APP_URL);
  url.search = queryParams.toString();

  return (
    <Button className="w-full" asChild>
      <Link href={url.toString()}>
        Search{count > 0 ? ` (${count})` : null}
      </Link>
    </Button>
  );
};
