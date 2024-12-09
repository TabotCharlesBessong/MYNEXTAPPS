"use client"

import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

export function AppProviders({children}:{children:ReactNode}){
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem >
      {children}
    </ThemeProvider>
  )
}