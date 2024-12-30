"use server"

import { createClient } from "@/supabase/server"

export const authenticate = async (email: string, password: string) => {
  try {
    const supabase = createClient()
    const {error,data} = await (await supabase).auth.signInWithPassword({email,password})
    if (error) {
      console.log("part 1",(error as TypeError).message);
      console.log(data)
      throw error
    }
  } catch (error) {
    console.log("part 2",(error as TypeError).message)
    throw error
  }
}