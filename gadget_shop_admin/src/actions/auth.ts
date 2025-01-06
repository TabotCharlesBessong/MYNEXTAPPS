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


export const getLatestUsers = async () => {
  const supabase = createClient();
  const { data, error } = await (await supabase)
    .from("users")
    .select("id, email, created_at")
    .order("created_at", { ascending: false })
    .limit(5);

  if (error) throw new Error(`Error fetching latest users: ${error.message}`);

  return data.map(
    (user: { id: string; email: string; created_at: string | null }) => ({
      id: user.id,
      email: user.email,
      date: user.created_at,
    })
  );
};