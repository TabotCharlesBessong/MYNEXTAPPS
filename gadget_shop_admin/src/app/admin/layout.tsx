import { createClient } from '@/supabase/client';
import { redirect } from 'next/navigation';
import React, { ReactNode } from 'react'

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
    <>
      {children}
    </>
  )
};

export default AdminLayout