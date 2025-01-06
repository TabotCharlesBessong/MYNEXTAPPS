"use server";

import { createClient } from "@/supabase/client";
import { redirect } from "next/navigation";
import { Children, ReactNode } from "react";

// check if user is authenticated and if user is admin

export default async function AuthLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const supabase = createClient();

  const { data: authData } = await supabase.auth.getUser();

  if (authData.user) {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", authData.user.id)
      .single();

    if (error || !data) {
      console.log("Error fetchign user data", (error as TypeError).message);
      return;
    }

    if (data.type === "admin") return redirect("/admin");
  }

  return <>{children}</>;
}
