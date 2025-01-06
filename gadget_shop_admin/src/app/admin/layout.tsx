import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { RenderMounted } from "@/components/render-mounted";
import { createClient } from "@/supabase/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

// revalidatePath("/","layout")

const AdminLayout = async ({ children }: Readonly<{ children: ReactNode }>) => {
  // check if user is authenticated
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

    if (data.type === "admin") return redirect("/");
  }
  return (
    <RenderMounted>
      <Header />
      <main className="min-h-[calc(100svh-128px)] py-3">{children}</main>
      <Footer />
    </RenderMounted>
  );
};

export default AdminLayout;
