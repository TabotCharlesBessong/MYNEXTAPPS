"use server";

import { z } from "zod";
import { loginSchema } from "@/schemas";
import bcrypt from "bcrypt";
import User from "@/models/User";
import { connectToDatabase } from "@/lib/db";

export const login = async (values: z.infer<typeof loginSchema>) => {
  await connectToDatabase(); // Ensure the database is connected

  const validatedFields = loginSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Validation failed. Please check your input.",
    };
  }

  const { email, password } = validatedFields.data;

  // Find the user by email
  const user = await User.findOne({ email });
  if (!user) {
    return {
      error: "Invalid email or password.",
    };
  }

  // Compare the provided password with the hashed password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return {
      error: "Invalid email or password.",
    };
  }

  return { success: "Login successful!" };
};
