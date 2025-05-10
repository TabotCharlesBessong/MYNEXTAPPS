"use server";

import { z } from "zod";
import { userSchema } from "@/schemas";

export const register = async (values: z.infer<typeof userSchema>) => {
  console.log(values);
  const validatedFields = userSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Validation failed. Please check your input.",
    };
  }

  // Simulate registration logic (e.g., saving to a database)
  return { success: "User registered successfully!" };
};