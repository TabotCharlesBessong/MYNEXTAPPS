"use server";

import { z } from "zod";
import { userSchema } from "@/schemas";
import bcrypt from "bcrypt";
import User from "@/models/User";
import { connectToDatabase } from "@/lib/db";

export const register = async (values: z.infer<typeof userSchema>) => {
  await connectToDatabase(); // Ensure the database is connected

  const validatedFields = userSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Validation failed. Please check your input.",
    };
  }

  const { email, password, name } = validatedFields.data;

  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return {
      error: "User with this email already exists.",
    };
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });

  await newUser.save();

  return { success: "User registered successfully!" };
};
