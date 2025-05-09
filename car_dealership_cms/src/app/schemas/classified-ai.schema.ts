import {
  BodyType,
  Colour,
  FuelType,
  OdoUnit,
  Transmission,
  ULEZCompliance,
} from "@prisma/client";
import { z } from "zod";

export const ClassifiedTaxonomyAISchema = z.object({
  year: z.number().describe("The year of the vehicle"),
  makeId: z.number().nullable().describe("The make ID of the vehicle"),
  make: z.string().describe("The make of the vehicle"),
  modelId: z.number().nullable().describe("The model ID of the vehicle"),
  model: z.string().describe("The model of the vehicle"),
  modelVariantId: z
    .number()
    .nullable()
    .describe("The model variant ID of the vehicle"),
  modelVariant: z
    .string()
    .nullable()
    .describe("The model variant of the vehicle"),
});

export const ClassifiedDetailsAISchema = z.object({
  description: z
    .string()
    .describe(
      "The description of the vehicle. Ensure it is 50 words or less and does not contain any HTML tags."
    ),
  vrm: z
    .string()
    .describe(
      "The vehicle registration mark. If unable to detect use 'UNKNOWN'"
    ),
  odoReading: z.number().describe("The odometer reading of the vehicle"),
  doors: z.number().describe("The number of doors on the vhicle"),
  seats: z.number().describe("The number of seats in the vhicle"),
  ulezCompliance: z
    .nativeEnum(ULEZCompliance)
    .describe("The ULEZ Compliance status of the vehicle"),
  transmission: z
    .nativeEnum(Transmission)
    .describe("THe transmission of the vehicle"),
  colour: z.nativeEnum(Colour).describe("THe colour of the vehicle"),
  fuelType: z.nativeEnum(FuelType).describe("THe fuel type of the vehicle"),
  bodyType: z.nativeEnum(BodyType).describe("THe body type of the vehicle"),
  odoUnit: z.nativeEnum(OdoUnit).describe("THe odometer unit of the vehicle"),
});

export const ClassifiedAISchema = ClassifiedDetailsAISchema.merge(
  ClassifiedTaxonomyAISchema
).extend({
  title: z.string().describe("The title of the vehicle"),
  image: z.string().url().describe("The image of the vehicle"),
});

export type ClassifiedAI = z.infer<typeof ClassifiedAISchema>;
