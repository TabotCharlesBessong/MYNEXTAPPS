"use server"

import { loginSchema } from "@/schemas";
import { z } from "zod";

export const login = async (values : z.infer<typeof loginSchema>) => {
  console.log(values);  
  const validatedFields = loginSchema.safeParse(values);

  if(!validatedFields.success) {
    return {
      error: "something went wrong",
    };
  }
  return {success:"Email sent successfully!"};
}