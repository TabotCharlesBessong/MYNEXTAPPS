import { z } from "zod";

// User schema
export const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long")
});

// Login schema
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

// Example usage
// const parsedUser = userSchema.parse({
//   id: "some-uuid",
//   name: "John Doe",
//   email: "john.doe@example.com",
//   password: "securepassword",
//   createdAt: new Date(),
//   updatedAt: new Date(),
// });

// export type User = z.infer<typeof userSchema>;
// export type LoginSchema = z.infer<typeof loginSchema>;
