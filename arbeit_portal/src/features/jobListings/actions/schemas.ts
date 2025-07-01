import {
  experienceLevels,
  jobListingTypes,
  locationRequirements,
  wageIntervals,
} from "@/drizzle/schema"
import { z } from "zod"

export const jobListingSchema = z
  .object({
    title: z.string().min(1, "Required"),
    description: z.string().min(1, "Required"),
    experienceLevel: z.enum(experienceLevels),
    locationRequirement: z.enum(locationRequirements),
    type: z.enum(jobListingTypes),
    wage: z.number().int().positive().min(1).nullable(),
    wageInterval: z.enum(wageIntervals).nullable(),
    stateAbbreviation: z
      .string()
      .transform(val => (val.trim() === "" ? null : val))
      .nullable(),
    city: z
      .string()
      .transform(val => (val.trim() === "" ? null : val))
      .nullable(),
  })
  .refine(
    listing => {
      return listing.locationRequirement === "remote" || listing.city != null
    },
    {
      message: "Required for non-remote listings",
      path: ["city"],
    }
  )
  .refine(
    listing => {
      return (
        listing.locationRequirement === "remote" ||
        listing.stateAbbreviation != null
      )
    },
    {
      message: "Required for non-remote listings",
      path: ["stateAbbreviation"],
    }
  )

export const jobListingAiSearchSchema = z.object({
  query: z.string().min(1, "Required"),
})
